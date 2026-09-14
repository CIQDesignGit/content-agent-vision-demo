/**
 * Snapshot the three launchpad pages into self-contained HTML files.
 * Requires the Next.js dev server on localhost:3000 and Google Chrome.
 *
 *   node scripts/export-html-pages.mjs
 */

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const OUT_DIR = path.join(ROOT, "html-exports")
const ORIGIN = process.env.EXPORT_ORIGIN ?? "http://localhost:3000"
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

const PAGES = [
  {
    slug: "landing",
    url: `${ORIGIN}/`,
    title: "Content Agent — Overview",
    waitFor: 'nav[aria-label="Launchpad sections"]',
  },
  {
    slug: "review",
    url: `${ORIGIN}/workbench`,
    title: "Content Agent — Review",
    waitFor: 'nav[aria-label="Launchpad sections"]',
  },
  {
    slug: "impact",
    url: `${ORIGIN}/impact`,
    title: "Content Agent — Impact",
    waitFor: 'nav[aria-label="Launchpad sections"]',
  },
]

async function inlinePage() {
  const toDataUrl = async (href) => {
    const res = await fetch(href)
    if (!res.ok) throw new Error(`Failed ${res.status} ${href}`)
    const buffer = await res.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let binary = ""
    const chunk = 0x8000
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
    }
    const mime =
      res.headers.get("content-type")?.split(";")[0] ||
      "application/octet-stream"
    return `data:${mime};base64,${btoa(binary)}`
  }

  const cache = new Map()
  const cachedDataUrl = async (href) => {
    if (cache.has(href)) return cache.get(href)
    try {
      const data = await toDataUrl(href)
      cache.set(href, data)
      return data
    } catch {
      cache.set(href, null)
      return null
    }
  }

  const URL_RE = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g
  const IMPORT_RE = /@import\s+(?:url\()?\s*['"]?([^'"\)]+)['"]?\s*\)?[^;]*;/g

  const skipUrl = (spec) =>
    !spec ||
    spec.startsWith("data:") ||
    spec.startsWith("blob:") ||
    spec.startsWith("#")

  const inlineCssUrls = async (css, baseHref) => {
    const specs = new Set()
    for (const match of css.matchAll(URL_RE)) {
      const spec = match[2].trim()
      if (skipUrl(spec)) continue
      specs.add(new URL(spec, baseHref).href)
    }
    const map = new Map()
    await Promise.all(
      [...specs].map(async (href) => {
        map.set(href, await cachedDataUrl(href))
      }),
    )
    return css.replace(URL_RE, (full, _quote, spec) => {
      const trimmed = spec.trim()
      if (skipUrl(trimmed)) return full
      const href = new URL(trimmed, baseHref).href
      const data = map.get(href)
      return data ? `url("${data}")` : full
    })
  }

  const processCss = async (css, baseHref, depth = 0) => {
    if (depth > 6) return css
    let result = css
    const imports = [...css.matchAll(IMPORT_RE)]
    for (const match of imports) {
      const spec = match[1].trim()
      if (skipUrl(spec)) continue
      const href = new URL(spec, baseHref).href
      try {
        const imported = await (await fetch(href)).text()
        const processed = await processCss(imported, href, depth + 1)
        result = result.replace(match[0], processed)
      } catch {
        /* keep original @import */
      }
    }
    return inlineCssUrls(result, baseHref)
  }

  const cssChunks = []
  const seenHrefs = new Set()

  for (const link of document.querySelectorAll("link[rel='stylesheet']")) {
    const href = link.href
    if (!href || seenHrefs.has(href)) continue
    seenHrefs.add(href)
    try {
      const text = await (await fetch(href)).text()
      cssChunks.push(await processCss(text, href))
    } catch {
      /* skip */
    }
  }

  for (const styleEl of document.querySelectorAll("style")) {
    if (styleEl.textContent) {
      cssChunks.push(await processCss(styleEl.textContent, location.href))
    }
  }

  const origin = location.origin
  let css = cssChunks.join("\n")

  for (const img of document.querySelectorAll("img")) {
    const src = img.currentSrc || img.src
    if (src && !src.startsWith("data:")) {
      const data = await cachedDataUrl(src)
      if (data) {
        img.setAttribute("src", data)
      }
    }
    img.removeAttribute("srcset")
    img.removeAttribute("sizes")
  }

  for (const el of document.querySelectorAll("[style]")) {
    const style = el.getAttribute("style")
    if (style && style.includes("url(")) {
      el.setAttribute("style", await inlineCssUrls(style, origin))
    }
  }

  document
    .querySelectorAll(
      "script, link[rel='stylesheet'], link[rel='preload'], link[rel='modulepreload'], link[rel='prefetch'], noscript",
    )
    .forEach((node) => node.remove())

  document.querySelectorAll("style").forEach((node) => node.remove())

  const style = document.createElement("style")
  style.setAttribute("data-export", "inlined")
  style.textContent = `${css}

html {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}`
  document.head.appendChild(style)

  const fontLink = document.createElement("link")
  fontLink.rel = "stylesheet"
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  document.head.appendChild(fontLink)

  if (!document.querySelector("meta[name='viewport']")) {
    const meta = document.createElement("meta")
    meta.setAttribute("name", "viewport")
    meta.setAttribute("content", "width=device-width, initial-scale=1")
    document.head.prepend(meta)
  }

  await document.fonts.ready
}

/** Scroll every band into view, then freeze Framer Motion at the visible state. */
async function revealFullPage() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  )
  const step = Math.max(240, Math.floor(window.innerHeight * 0.35))
  for (let y = 0; y <= height; y += step) {
    window.scrollTo(0, y)
    await delay(220)
  }
  window.scrollTo(0, height)
  await delay(900)

  const skip = "dialog, [role='dialog'], [data-state='closed']"
  for (const el of document.querySelectorAll("[style]")) {
    if (el.closest(skip)) continue
    const style = el.getAttribute("style") || ""
    if (!/opacity\s*:\s*0/.test(style) && !/scaleY\(\s*0\s*\)/.test(style)) {
      continue
    }
    el.style.setProperty("opacity", "1", "important")
    el.style.setProperty("transform", "none", "important")
    el.style.setProperty("filter", "none", "important")
  }

  window.scrollTo(0, 0)
  await delay(200)
}

async function exportPage(browser, pageDef) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
  page.setDefaultTimeout(60_000)

  await page.goto(pageDef.url, { waitUntil: "networkidle0", timeout: 60_000 })
  await page.waitForSelector(pageDef.waitFor)
  await page.evaluate(() => document.fonts.ready)
  await new Promise((resolve) => setTimeout(resolve, 1200))
  await page.evaluate(revealFullPage)

  await page.evaluate(inlinePage)
  await page.evaluate((title) => {
    document.title = title
  }, pageDef.title)

  const html = await page.content()
  await page.close()

  const filePath = path.join(OUT_DIR, `${pageDef.slug}.html`)
  const banner = `<!--\n  Static HTML export of ${pageDef.title}\n  Source: ${pageDef.url}\n  Generated: ${new Date().toISOString()}\n  Open this file directly in a browser. React interactivity is not included.\n-->\n`
  const output = html.startsWith("<!DOCTYPE")
    ? `${banner}${html}`
    : `${banner}<!DOCTYPE html>\n${html}`

  await fs.writeFile(filePath, output, "utf8")
  const stats = await fs.stat(filePath)
  return { filePath, bytes: stats.size }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--disable-gpu", "--hide-scrollbars"],
  })

  try {
    for (const pageDef of PAGES) {
      process.stdout.write(`Exporting ${pageDef.slug} (${pageDef.url})… `)
      const result = await exportPage(browser, pageDef)
      const mb = (result.bytes / (1024 * 1024)).toFixed(2)
      console.log(`${path.basename(result.filePath)} (${mb} MB)`)
    }
  } finally {
    await browser.close()
  }

  console.log(`\nWrote ${PAGES.length} files to ${OUT_DIR}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
