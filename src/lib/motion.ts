import type { Transition, Variants } from "framer-motion"

/** Decelerating curve — anything arriving on the page settles on this. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Symmetric curve for swaps and accordions, where nothing is "arriving". */
export const EASE_SWAP: [number, number, number, number] = [0.4, 0, 0.2, 1]

/** Starts gently and settles gently — for staged reveals the eye is meant to follow. */
export const EASE_IN_OUT: [number, number, number, number] = [0.42, 0, 0.58, 1]

export const DURATION = {
  quick: 0.16,
  base: 0.28,
  calm: 0.45,
  draw: 0.6,
  figure: 1.05,
} as const

/**
 * Scroll-revealed bands run 300ms longer than the same gesture on mount.
 * On load the user is waiting and watching, so `calm` reads fine; a band
 * revealed mid-scroll starts before the eye lands on it, and at `calm`
 * it has already finished by the time anyone is looking at it.
 */
const SCROLL_EXTRA = 0.3

/** Past ~12px an entrance stops reading as settling and starts reading as flying in. */
const RISE = 10

export const enterTransition: Transition = {
  duration: DURATION.calm,
  ease: EASE_OUT,
}

export const swapTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_SWAP,
}

function fadeRiseAt(duration: number, distance: number): Variants {
  return {
    hidden: { opacity: 1, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
  }
}

function drawDownAt(duration: number): Variants {
  return {
    hidden: { opacity: 1, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration, ease: EASE_OUT },
    },
  }
}

export const fadeRise = fadeRiseAt(DURATION.calm, RISE)

/** Same gesture at a third of the travel — for text and controls inside a pane. */
export const fadeRiseTight = fadeRiseAt(DURATION.base, 4)

/** Accent rules and timeline connectors that draw themselves downward. */
export const drawDown = drawDownAt(DURATION.calm)

// Scroll-band counterparts. Same travel, same curve — only the duration moves.
export const fadeRiseOnScroll = fadeRiseAt(DURATION.calm + SCROLL_EXTRA, RISE)
export const fadeRiseTightOnScroll = fadeRiseAt(
  DURATION.base + SCROLL_EXTRA,
  4,
)
export const drawDownOnScroll = drawDownAt(DURATION.calm + SCROLL_EXTRA)

/** Crossfade for panels that replace one another in the same slot. */
export const swapPanel: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...swapTransition, staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: DURATION.quick, ease: EASE_SWAP },
  },
}

export function staggerContainer(stagger = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}

/**
 * Shared viewport config so every below-the-fold band reveals identically.
 * The negative bottom margin holds the trigger until the band has cleared the
 * lower sixth of the viewport — firing on first pixel meant the reveal was
 * spent before the band reached reading position.
 */
export const revealViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -16% 0px",
} as const
