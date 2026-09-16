import type {
  BulletRecommendation,
  ProductImage,
  SkuContent,
  TitleRecommendation,
  TitleStatus,
} from "./types"

/** Per-SKU seed data. Every SKU must include an AI description recommendation. */
export type SkuContentBundle = Omit<SkuContent, "descriptionStatus" | "descriptionRecommendation"> & {
  descriptionStatus?: TitleStatus
  descriptionRecommendation: TitleRecommendation
}

// ─── Shared image helper ──────────────────────────────────────────────────────

function makeImages(hues: number[]): ProductImage[] {
  return hues.map((hue, i) => ({
    id: `img-${i + 1}`,
    label: `Image ${i + 1}`,
    hue,
  }))
}

// ─── Shared title-recommendation factory ─────────────────────────────────────

function rec(
  agentName: string,
  recommendedText: string,
  kept: string,
  removed: string,
  added: string,
  seoSummary: string,
  seoDetail: string,
  complianceSummary: string,
  complianceDetail: string,
): TitleRecommendation {
  return {
    agentName,
    recommendedText,
    diff: [
      { kind: "kept", text: kept },
      { kind: "removed", text: removed },
      { kind: "added", text: added },
    ],
    reasoning: [
      {
        key: "seo",
        label: "SEO",
        reasons: [{ type: "ADDED", summary: seoSummary, detail: seoDetail }],
      },
      {
        key: "compliance",
        label: "Compliance",
        reasons: [{ type: "REMOVED", summary: complianceSummary, detail: complianceDetail }],
      },
    ],
  }
}

// ─── Per-SKU content map ──────────────────────────────────────────────────────

export const SKU_CONTENT: Record<string, SkuContentBundle> = {

  "sku-1": {
    titleStatus: "pending",
    title: "Aurelle Candles Noir Cherry Large Jar, 22 oz",
    bullets: [
      "RICH BLACK CHERRY FRAGRANCE — Deep, dark cherry blended with warming spice fills any room with an indulgent, fruity-sweet aroma.",
      "LONG BURN TIME — Up to 110–150 hours of fragrance from a single 22 oz jar, making it one of the best-value candles available.",
      "CLEAN BURN TECHNOLOGY — Natural paraffin blend with a lead-free cotton wick delivers a consistent, soot-minimizing flame.",
      "IDEAL GIFT — Presented in Aurelle Candles' signature glass jar with a classic label, perfect for birthdays, holidays, and housewarmings.",
      "HAND-POURED — Crafted in small batches to ensure even fragrance distribution and a smooth, polished surface.",
      "REUSABLE JAR — The wide-mouth glass jar is easy to clean and can be repurposed as a decorative storage container.",
      "AUTHENTIC AURELLE CANDLES — Only genuine Aurelle Candles products are backed by their satisfaction guarantee and quality standards.",
    ],
    description:
      "Transport yourself to a lush summer orchard with the Aurelle Candles Noir Cherry Large Jar. This iconic 22 oz jar is filled with a bold, sweet-meets-spicy cherry fragrance that evolves from top notes of fresh cherry to warm, velvety base notes of musk and sandalwood.",
    images: makeImages([340, 350, 10, 355, 5, 345, 0, 360]),
    titleRecommendation: {
      ...rec(
        "Jessica",
        "Aurelle Candles Noir Cherry 22 oz — 150-Hr Burn, Premium Scented Candle",
        "Aurelle Candles Noir Cherry",
        "Large Jar Candle, 22 oz",
        "22 oz — 150-Hr Burn, Premium Scented Candle",
        "Add high-intent gift keywords",
        "'Premium Scented Candle' and 'Ideal Gift' match top search queries and are expected to lift CTR by ~12%.",
        "Remove implicit filler phrasing",
        "The original title ends abruptly at '22 oz' — appending benefit descriptors adds value without triggering character-limit flags.",
      ),
      altKeywords: [
        // Ordered left-right per row for the 2-column grid
        { id: "kw-1", keyword: "scented candles large jar", rank: 4,  volume: "90.5K" },
        { id: "kw-2", keyword: "aurelle candles gift",        rank: 2,  volume: "165K"  },
        { id: "kw-3", keyword: "long burn time candle",     rank: 7,  volume: "27K"   },
        { id: "kw-4", keyword: "sage citrus candle",        rank: 3,  volume: "14.8K" },
        { id: "kw-5", keyword: "birthday candle gift",      rank: 11, volume: "8.2K"  },
        { id: "kw-6", keyword: "150 hour burn candle",      rank: 5,  volume: "5.4K"  },
      ],
      aeoPerformance: {
        sources: ["Rufus", "Perplexity Shop", "ChatGPT"],
        questions: [
          {
            question: "how long does it burn?",
            answer: "explicit 110–150 hour burn range now in title",
            isNew: true,
          },
          {
            question: "what size is it?",
            answer: "22oz Large Jar surfaced directly in title",
          },
          {
            question: "is it a good gift?",
            answer: '"Ideal Gift" explicitly signals gift intent',
            isNew: true,
          },
          {
            question: "what scent is it?",
            answer: "Black Cherry with warm spice — explicit scent profile",
          },
        ],
      },
    },
    descriptionStatus: "pending",
    descriptionRecommendation: {
      ...rec(
        "Jessica",
        "Indulge in Aurelle Candles Noir Cherry Large Jar (22 oz)—a bold black cherry fragrance with warm spice and vanilla notes. Enjoy up to 150 hours of room-filling aroma with a premium paraffin blend and lead-free cotton wick for a clean, soot-minimizing burn. Perfect for gifting and everyday home fragrance.",
        "Transport yourself to a lush summer orchard with the Aurelle Candles Noir Cherry Large Jar. This iconic 22 oz jar is filled with a bold, sweet-meets-spicy cherry fragrance that evolves from top notes of fresh cherry to warm, velvety base notes of musk and sandalwood.",
        "",
        "",
        "Front-load retailer scent keywords",
        "Opens with 'black cherry' and burn-time benefits that match top Amazon description search queries.",
        "Add quantified benefits",
        "150-hour burn and clean-burn claims align with bullet and PDP language to improve conversion.",
      ),
      altKeywords: [
        { id: "desc-kw-1", keyword: "black cherry scented candle", rank: 3,  volume: "74K"   },
        { id: "desc-kw-2", keyword: "aurelle candles large jar",     rank: 1,  volume: "210K"  },
        { id: "desc-kw-3", keyword: "vanilla spice candle",        rank: 6,  volume: "31K"   },
        { id: "desc-kw-4", keyword: "room filling fragrance",      rank: 9,  volume: "12.5K" },
      ],
      aeoPerformance: {
        sources: ["Rufus", "ChatGPT"],
        questions: [
          {
            question: "How long does a Aurelle Candles Noir Cherry last?",
            answer: "Up to 150 hours of room-filling aroma from a 22 oz jar",
            isNew: true,
          },
          {
            question: "What does Black Cherry smell like?",
            answer: "Bold black cherry fragrance with warm spice and vanilla notes",
          },
        ],
      },
    },
    bulletRecommendations: [
      {
        id: "br-1",
        label: "Bullet 1",
        kind: "edit",
        pimIndex: 0,
        status: "pending",
        recommendedText:
          "RICH BLACK CHERRY FRAGRANCE — Deep, dark cherry with warm spice undertones for an indulgent, fruity-sweet room-filling aroma.",
        reasoning: [
          {
            key: "seo",
            label: "SEO",
            reasons: [
              {
                type: "REPLACED",
                summary: "Mirror retailer scent keywords",
                detail: "Aligns with Amazon 'bold cherry' and 'warm spice' phrasing while keeping PIM brand voice.",
              },
            ],
          },
        ],
        altKeywords: [
          { id: "bkw-1", keyword: "black cherry candle", rank: 4, volume: "110K", replacesWord: "FRAGRANCE" },
          { id: "bkw-2", keyword: "fruity scented candle", rank: 11, volume: "74K" },
          { id: "bkw-3", keyword: "warm spice home fragrance", rank: 18, volume: "52K" },
          { id: "bkw-4", keyword: "cherry blossom jar candle", rank: 23, volume: "38K" },
        ],
      },
      {
        id: "br-2",
        label: "Bullet 2",
        kind: "edit",
        pimIndex: 1,
        status: "pending",
        recommendedText:
          "LONG BURN TIME — Up to 150 hours of fragrance from a single 22 oz jar for lasting home fragrance value.",
        reasoning: [
          {
            key: "seo",
            label: "SEO",
            reasons: [
              {
                type: "ADDED",
                summary: "Lead with quantified burn time",
                detail: "Amazon shoppers filter by duration; '150 hours' matches top queries for jar candles.",
              },
            ],
          },
        ],
      },
      {
        id: "br-3",
        label: "Bullet 3",
        kind: "edit",
        pimIndex: 2,
        status: "pending",
        recommendedText:
          "CLEAN BURN TECHNOLOGY — Lead-free cotton wick and premium paraffin blend for a consistent, soot-minimizing flame.",
        reasoning: [
          {
            key: "compliance",
            label: "Compliance",
            reasons: [
              {
                type: "REPLACED",
                summary: "Match retailer clean-burn claims",
                detail: "Uses retailer-approved 'lead-free wick' language while retaining PIM technology framing.",
              },
            ],
          },
        ],
        aeoPerformance: {
          sources: ["Rufus", "ChatGPT"],
          questions: [
            {
              question: "Is this candle safe to burn indoors?",
              answer: "Lead-free cotton wick and soot-minimizing formula",
              isNew: true,
            },
            {
              question: "Are Aurelle Candles non-toxic?",
              answer: "Premium paraffin blend with no lead in the wick",
            },
          ],
        },
      },
      {
        id: "br-4",
        label: "Bullet 4",
        kind: "edit",
        pimIndex: 3,
        status: "pending",
        recommendedText:
          "IDEAL GIFT — Signature Aurelle Candles glass jar presentation perfect for birthdays, holidays, and housewarmings.",
        reasoning: [
          {
            key: "compliance",
            label: "Compliance",
            reasons: [
              {
                type: "REPLACED",
                summary: "Sharpen gift positioning",
                detail: "Aligns with retailer gift-keyword patterns without exceeding character limits.",
              },
            ],
          },
        ],
        aeoPerformance: {
          sources: ["Rufus", "Perplexity Shop"],
          questions: [
            {
              question: "What's a good candle gift for a birthday?",
              answer: "Signature glass jar presentation for birthdays, holidays, and housewarmings",
              isNew: true,
            },
            {
              question: "Does Aurelle Candles come gift-ready?",
              answer: "Iconic jar presentation suitable for gifting without extra packaging",
            },
          ],
        },
      },
      {
        id: "br-5",
        label: "Bullet 5",
        kind: "edit",
        pimIndex: 4,
        status: "pending",
        recommendedText:
          "LARGE 22 OZ JAR — Ideal size for medium and large rooms; hand-poured for even fragrance and a smooth finish.",
        reasoning: [
          {
            key: "seo",
            label: "SEO",
            reasons: [
              {
                type: "REPLACED",
                summary: "Replace hand-poured with size benefit",
                detail: "Retailer bullet emphasizes 12 oz tumbler size; PIM should lead with 22 oz jar differentiator.",
              },
            ],
          },
        ],
      },
      {
        id: "br-6",
        label: "Bullet 6",
        kind: "edit",
        pimIndex: 5,
        status: "pending",
        recommendedText:
          "REUSABLE GLASS JAR — Wide-mouth design for easy cleaning and repurposing as decorative home storage.",
        reasoning: [
          {
            key: "aeo",
            label: "AEO",
            reasons: [
              {
                type: "REPLACED",
                summary: "Clarify reuse benefit",
                detail: "Adds explicit 'home storage' phrasing surfaced in voice-search bullet comparisons.",
              },
            ],
          },
        ],
      },
      {
        id: "br-7",
        label: "Bullet 7",
        kind: "edit",
        pimIndex: 6,
        status: "pending",
        recommendedText:
          "AUTHENTIC AURELLE CANDLES — Genuine product backed by Aurelle Candles quality standards and satisfaction guarantee.",
        reasoning: [
          {
            key: "compliance",
            label: "Compliance",
            reasons: [
              {
                type: "REPLACED",
                summary: "Tighten authenticity claim",
                detail: "Shortens guarantee language to stay within retailer character limits while preserving trust signals.",
              },
            ],
          },
        ],
      },
    ] satisfies BulletRecommendation[],
    pdpContent: {
      title: "Aurelle Candles Noir Cherry | Large 2-Wick Jar Candle, 12 oz",
      bullets: [
        "BOLD CHERRY SCENT: Rich black cherry fragrance with warm spice undertones.",
        "BURN TIME: Up to 65–75 hours per candle.",
        "CLEAN BURN: Lead-free wick and premium paraffin blend.",
        "PERFECT GIFT: Great for birthdays, holidays, and any occasion.",
        "SIZE: 12 oz tumbler — ideal for smaller rooms.",
      ],
      description:
        "Aurelle Candles Noir Cherry is a rich, indulgent fragrance with notes of fresh cherry, warm spice, and vanilla.",
      imageCount: 5,
      lastUpdated: "Apr 2, 2025",
    },
  },

  // sku-2 — Citrus Zest: PIM catalog + retailer PDP (content gaps drive AI recs)
  "sku-2": {
    titleStatus: "pending",
    title: "Citrus Zest Soy Jar, 14 oz",
    bullets: [
      "500W MOTOR — Handles everyday chopping, slicing, and shredding tasks.",
      "8-CUP CAPACITY — Room for family-sized recipes without multiple batches.",
      "DIGITAL CONTROL PANEL — Touch display for speed and function selection.",
      "STAINLESS STEEL BLADE SET — Includes S-blade, slicing disc, and shredding disc.",
      "EASY CLEANUP — Removable parts are top-rack dishwasher safe and BPA-free.",
    ],
    description:
      "Aurelle Candles Citrus Zest Soy Jar pairs bright orange peel and lemon leaf with a soft white-floral base in a 14 oz hand-poured jar.",
    images: makeImages([260, 270, 250, 280]),
    titleRecommendation: {
      ...rec(
        "Jessica",
        "Aurelle Candles Citrus Zest 14 oz — Soy Blend, 60-Hr Burn",
        "Aurelle Candles Citrus Zest Soy Jar, 14 oz",
        "Soy Jar, 14 oz",
        "14 oz — Soy Blend, 60-Hr Burn",
        "Match high-intent search queries",
        "Leading with wattage and blade material targets top food-processor search filters and is expected to lift impressions ~18%.",
        "Include compliance-required specifics",
        "Capacity (8-Cup) and BPA-Free certification are required fields for the Kitchen Appliances category on this retailer.",
      ),
      altKeywords: [
        { id: "kw-n1", keyword: "food processor 8 cup",        rank: 3,  volume: "48K"   },
        { id: "kw-n2", keyword: "electric food chopper 500w",  rank: 6,  volume: "22K"   },
        { id: "kw-n3", keyword: "bpa free food processor",     rank: 4,  volume: "31K"   },
        { id: "kw-n4", keyword: "stainless steel blade mixer", rank: 9,  volume: "14.5K" },
        { id: "kw-n5", keyword: "aurelle citrus zest candle", rank: 12, volume: "8.8K"  },
        { id: "kw-n6", keyword: "dishwasher safe processor",   rank: 7,  volume: "11.2K" },
      ],
    },
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Jessica",
      "Brighten the room with Aurelle Candles Citrus Zest Soy Jar (14 oz). Orange peel and lemon leaf open into a clean white-floral base, and the soy blend burns for up to 60 hours with a lead-free cotton wick.",
      "Aurelle Candles Citrus Zest Soy Jar pairs bright orange peel and lemon leaf with a soft white-floral base in a 14 oz hand-poured jar.",
      "",
      "",
      "Open with the primary use-case and differentiator",
      "Amazon shoppers scan the first sentence; leading with motor power and capacity matches top product description queries.",
      "Surface compliance-required attributes",
      "BPA-free and dishwasher-safe claims are required by retailer category policy for kitchen appliances.",
    ),
    bulletRecommendations: [
      {
        id: "br-sku2-b1",
        label: "Bullet 1",
        kind: "edit",
        pimIndex: 0,
        status: "pending",
        recommendedText:
          "POWERFUL 500W MOTOR — Handles tough chopping, slicing, shredding, and pureeing with consistent high performance.",
        reasoning: [
          {
            key: "seo",
            label: "SEO",
            reasons: [
              {
                type: "ADDED",
                summary: "Lead with motor wattage",
                detail: "Shoppers filter by wattage; surfacing '500W' in the first bullet improves ranking on power-based queries.",
              },
            ],
          },
        ],
      },
      {
        id: "br-sku2-b2",
        label: "Bullet 2",
        kind: "edit",
        pimIndex: 1,
        status: "pending",
        recommendedText:
          "8-CUP CAPACITY — Generous bowl handles family-sized recipes without multiple batches.",
        reasoning: [
          {
            key: "compliance",
            label: "Compliance",
            reasons: [
              {
                type: "ADDED",
                summary: "Required capacity attribute",
                detail: "Category policy mandates explicit capacity statement in bullet points for Kitchen Appliances.",
              },
            ],
          },
        ],
      },
      {
        id: "br-sku2-b3",
        label: "Bullet 3",
        kind: "edit",
        pimIndex: 2,
        status: "pending",
        recommendedText:
          "DIGITAL LCD CONTROL PANEL — Intuitive touch display lets you select speed and function with a single tap.",
        reasoning: [
          {
            key: "seo",
            label: "SEO",
            reasons: [
              {
                type: "ADDED",
                summary: "Mirror retailer feature language",
                detail: "PDP uses 'Digital LCD' — syncing this language improves keyword consistency across the listing.",
              },
            ],
          },
        ],
      },
      {
        id: "br-sku2-b4",
        label: "Bullet 4",
        kind: "edit",
        pimIndex: 3,
        status: "pending",
        recommendedText:
          "THREE STAINLESS STEEL ATTACHMENTS — S-blade, slicing disc, and shredding disc included for maximum versatility.",
        reasoning: [
          {
            key: "seo",
            label: "SEO",
            reasons: [
              {
                type: "ADDED",
                summary: "Surface blade material explicitly",
                detail: "'Stainless steel' is a top filter attribute and increases conversion for durability-conscious buyers.",
              },
            ],
          },
        ],
      },
      {
        id: "br-sku2-b5",
        label: "Bullet 5",
        kind: "edit",
        pimIndex: 4,
        status: "pending",
        recommendedText:
          "BPA-FREE & DISHWASHER SAFE — All removable parts are top-rack dishwasher safe and certified BPA-free.",
        reasoning: [
          {
            key: "compliance",
            label: "Compliance",
            reasons: [
              {
                type: "ADDED",
                summary: "Required safety certification",
                detail: "BPA-Free certification disclosure is mandatory for food-contact appliances in this category.",
              },
            ],
          },
        ],
      },
    ] satisfies BulletRecommendation[],
    pdpContent: {
      title: "Aurelle Candles Citrus Zest Scented Soy Candle, 14 oz Jar",
      bullets: [
        "MULTI-FUNCTION: Chop, slice, shred, and blend with included attachments.",
        "MOTOR: 300W for everyday kitchen tasks.",
        "8-CUP CAPACITY — Generous bowl size handles family-sized recipes without multiple batches.",
        "EASY CLEAN: Removable parts are dishwasher safe.",
        "COMPACT DESIGN: Small footprint, great for limited counter space.",
      ],
      description: "Aurelle Candles Citrus Zest is a bright soy jar with orange peel, lemon leaf, and a soft floral finish.",
      imageCount: 4,
      lastUpdated: "Mar 7, 2025",
    },
  },

  "sku-3": {
    titleStatus: "pending",
    title: "Amber Floral Soy Candle, 16 oz",
    bullets: [
      "HIGH-TORQUE CLEANER HEAD — Automatically adapts between carpet and hard floors for optimal suction on every surface.",
      "INTELLIGENT SUCTION — Three auto-adjusted modes continuously sense floor type and adjust power to maintain performance.",
      "60-MINUTE RUN TIME — Fade-free power lasts up to 60 minutes on non-motorized tools (Eco mode).",
      "DYNAMIC LOAD SENSOR — The motor senses floor type 100x/second and adjusts power to extend battery life.",
      "WHOLE MACHINE FILTRATION — Advanced HEPA filtration captures 99.97% of particles as small as 0.3 microns.",
      "ANTI-TANGLE HAIR SCREW TOOL — Removes long hair and pet hair from the brush bar automatically during use.",
      "LCD SCREEN — Displays real-time performance, blockage reports, and maintenance reminders on a bright screen.",
    ],
    description:
      "Aurelle Candles Amber Floral Soy Candle fills medium rooms with amber, jasmine, and soft musk from a 16 oz hand-poured soy jar.",
    images: makeImages([200, 195, 210, 190, 215, 185, 220, 180]),
    titleRecommendation: rec(
      "Maya",
      "Aurelle Candles Amber Floral 16 oz — Hand-Poured Soy, Floral Bouquet",
      "Aurelle Candles Amber Floral",
      "Soy Candle, 16 oz",
      "— Hand-Poured Soy, Floral Bouquet",
      "Add performance specs to title",
      "'185 AW' and '60-Min Runtime' are top buyer search filters; surfacing them in the title increases conversion by ~15%.",
      "Replace vague superlative",
      "'Powerful Suction' is a compliance risk; measurable specs like '185 AW' remove ambiguity and meet marketplace standards.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Maya",
      "Aurelle Candles Amber Floral Soy Candle (16 oz) opens with warm amber and jasmine, then settles into soft musk. The hand-poured soy blend burns for up to 70 hours with a lead-free cotton wick.",
      "Aurelle Candles Amber Floral Soy Candle fills medium rooms with amber, jasmine, and soft musk from a 16 oz hand-poured soy jar.",
      "",
      "",
      "Lead with suction, runtime, and HEPA specs",
      "Shoppers filter cordless vacuums by AW rating, runtime, and HEPA; opening with 185 AW, 60 minutes, and 0.3-micron capture matches top description queries.",
      "Quantify filtration instead of vague power claims",
      "Citing the certified HEPA 0.3-micron threshold and Eco-mode runtime replaces unsubstantiated 'powerful' language and meets marketplace standards.",
    ),
    bulletRecommendations: [
      { id: "sku3-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "AMBER FLORAL BOUQUET — Warm amber, jasmine, and soft musk fill a medium room from the first light.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Lead with suction wattage", detail: "Shoppers filter by AW rating; leading with '185 AW' matches top cordless vacuum search patterns." }] }] },
      { id: "sku3-br-2", label: "Bullet 2", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "60-MINUTE RUNTIME — Up to 60 minutes of cord-free cleaning per charge in Eco mode — enough for large homes in a single session.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Add Eco mode context", detail: "Clarifying 'Eco mode' sets accurate expectations and aligns with how buyers compare cordless runtimes." }] }] },
      { id: "sku3-br-3", label: "Bullet 3", kind: "edit", pimIndex: 2, status: "pending",
        recommendedText: "WHOLE-MACHINE HEPA FILTRATION — Captures 99.97% of particles ≥0.3 microns and expels only clean air, protecting allergy sufferers.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Cite HEPA definition precisely", detail: "Using the 0.3-micron threshold is the certified HEPA standard; avoids vague filtration claims that can trigger policy flags." }] }] },
      { id: "sku3-br-4", label: "Bullet 4", kind: "edit", pimIndex: 3, status: "pending",
        recommendedText: "ANTI-TANGLE HAIR SCREW TOOL — Automatically de-tangles long hair and pet fur from the brush bar mid-clean, so performance never drops.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Highlight pet use case", detail: "Pet owners are a primary buyer segment in the cordless vacuum category; calling out pet-hair removal drives purchase intent." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Amber Floral Soy Jar Candle, 16 oz",
      bullets: [
        "INTELLIGENT OPTIMIZATION: Automatically adapts power to floor type.",
        "FILTRATION: Whole-machine HEPA filtration captures fine particles.",
        "RUNTIME: Up to 60 minutes from a single charge.",
        "LCD DISPLAY: Shows run time, performance mode, and blockage alerts.",
        "COMES WITH: High Torque cleaner head, combination tool, crevice tool, and dock.",
      ],
      description:
        "Aurelle Candles Amber Floral is a 16 oz soy jar with amber, jasmine, and a clean floral finish.",
      imageCount: 8,
      lastUpdated: "Feb 14, 2025",
    },
  },

  "sku-4": {
    titleStatus: "pending",
    title: "Aurelle Candles Vanilla Tobacco Jar, 12 oz",
    bullets: [
      "EXTRA-WIDE SLOTS — 1.5-inch wide slots easily fit bagels, artisan bread, and thick Texas toast.",
      "6 BROWNING SETTINGS — Dial adjusts shade from light golden to deep brown so every slice is perfectly toasted.",
      "TOAST BOOST FEATURE — Raises bread automatically for easy removal without burning your fingers.",
      "CANCEL BUTTON — Stop toasting mid-cycle instantly at the press of a button.",
      "REMOVABLE CRUMB TRAY — Slides out for fast, mess-free cleanup under the toaster.",
      "COMPACT DESIGN — Fits neatly on any countertop and slides into a standard cabinet shelf.",
      "DURABLE CONSTRUCTION — Stainless steel accents and a sturdy housing built to last years of daily use.",
    ],
    description:
      "Aurelle Candles Vanilla Tobacco Jar wraps sweet vanilla around a dry tobacco leaf in a 12 oz soy jar made for evening rooms.",
    images: makeImages([30, 35, 25, 40, 20, 45, 15, 50]),
    titleRecommendation: rec(
      "Jessica",
      "Aurelle Candles Vanilla Tobacco 12 oz — Warm Smoke, Soy Blend",
      "Aurelle Candles Vanilla Tobacco Jar",
      "with 12 oz",
      "— Warm Smoke, Soy Blend",
      "List key features in title",
      "Including '6 Browning Settings' and 'Removable Crumb Tray' matches high-frequency long-tail searches for toaster features.",
      "Remove function word from title",
      "'with Wide Slots' is a weak connector; restructuring to an em-dash feature list aligns with marketplace title best practices.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Jessica",
      "Settle in with Aurelle Candles Vanilla Tobacco Jar (12 oz). Sweet vanilla opens into dry tobacco leaf and a hint of warm spice, and the soy blend burns for up to 50 hours.",
      "Aurelle Candles Vanilla Tobacco Jar wraps sweet vanilla around a dry tobacco leaf in a 12 oz soy jar made for evening rooms.",
      "",
      "",
      "Name slot width and everyday bread types",
      "1.5-inch slots plus bagels, artisan bread, and Texas toast match high-intent toaster description searches and set clear fit expectations.",
      "Surface safety and cleanup controls",
      "Toast Boost, cancel, and removable crumb tray are expected kitchen-appliance disclosures that reduce returns and policy flags.",
    ),
    bulletRecommendations: [
      { id: "sku4-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "EXTRA-WIDE 1.5\" SLOTS — Fits bagels, thick-cut Texas toast, and artisan loaves that standard toasters can't accommodate.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Quantify slot width", detail: "Including the exact 1.5\" measurement matches buyer searches for 'wide slot toaster' and sets clear expectations." }] }] },
      { id: "sku4-br-2", label: "Bullet 2", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "6 BROWNING SETTINGS — Precise shade dial from light golden to deep brown so bagels, waffles, and sourdough toast exactly how you like.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Add bread variety examples", detail: "Mentioning specific bread types (bagels, waffles, sourdough) matches long-tail searches and improves relevance signals." }] }] },
      { id: "sku4-br-3", label: "Bullet 3", kind: "edit", pimIndex: 4, status: "pending",
        recommendedText: "REMOVABLE CRUMB TRAY — Slide-out tray catches every crumb for quick, mess-free cleanup — no turning the toaster upside down.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Frame as consumer benefit", detail: "Benefit-first phrasing ('no turning upside down') outperforms feature-only statements in A/B tests for kitchen appliances." }] }] },
      { id: "sku4-br-4", label: "Bullet 4", kind: "edit", pimIndex: 2, status: "pending",
        recommendedText: "TOAST BOOST & CANCEL — Raises finished toast safely above the slot for easy removal, and cancel button stops any cycle instantly.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Combine safety features", detail: "Grouping Toast Boost and Cancel into one bullet highlights safety UX — a top purchase driver for small kitchen appliances." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Vanilla Tobacco Scented Jar Candle, 12 oz",
      bullets: [
        "WIDE SLOTS: Fits bagels, thick bread, and artisan slices.",
        "BROWNING CONTROL: 6-shade dial for perfect toast every time.",
        "EASY CLEAN: Removable crumb tray slides out for cleaning.",
        "TOAST BOOST: Automatically raises bread for safe removal.",
        "AFFORDABLE: Reliable quality at a budget-friendly price.",
      ],
      description: "Aurelle Candles Vanilla Tobacco is a 12 oz soy jar of sweet vanilla, dry tobacco leaf, and warm spice.",
      imageCount: 3,
      lastUpdated: "Jan 22, 2025",
    },
  },

  "sku-5": {
    titleStatus: "pending",
    title: "Spiced Cedar 3-Wick, 21 oz",
    bullets: [
      "HIGH-SPEED MOTOR — 3000 RPM stainless steel grinding blades reduce grains to fine powder in under 2 minutes.",
      "COMMERCIAL-GRADE BUILD — Heavy-duty stainless steel grinding chamber withstands continuous operation in commercial kitchens.",
      "MULTI-GRAIN CAPABLE — Grinds wheat, corn, oats, rice, dried spices, coffee, and more with a single machine.",
      "FINE POWDER OUTPUT — Produces flour as fine as 50–200 mesh, suitable for bread, pastry, and specialty baking.",
      "EASY-CLEAN DESIGN — Removable stainless steel container and lid clean in seconds with a damp cloth.",
      "OVERLOAD PROTECTION — Built-in thermal cut-off prevents motor burnout during extended use.",
      "TRANSPARENT LID — Watch the grinding process through the clear lid to monitor consistency in real time.",
    ],
    description:
      "Aurelle Candles Spiced Cedar 3-Wick fills large rooms with cedar, clove, and smoked wood from a 21 oz three-wick jar.",
    images: makeImages([120, 115, 125, 110, 130, 105, 135, 100]),
    titleRecommendation: rec(
      "Maya",
      "Aurelle Candles Spiced Cedar 3-Wick — 80-Hr Burn, Room-Filling",
      "Aurelle Candles Spiced Cedar 3-Wick",
      ", 21 oz",
      "— 80-Hr Burn, Room-Filling",
      "Add RPM and compatible grains",
      "Buyers search by RPM and grain type — surfacing '3000 RPM' and grain names improves impression share on high-intent queries.",
      "Remove vague qualifier",
      "'Commercial Grade' without a spec is a compliance gray area; replacing with measurable specs reduces policy-flag risk.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Maya",
      "Fill a large room with Aurelle Candles Spiced Cedar 3-Wick (21 oz). Cedar, clove, and smoked wood burn evenly across three cotton wicks for up to 80 hours.",
      "Aurelle Candles Spiced Cedar 3-Wick fills large rooms with cedar, clove, and smoked wood from a 21 oz three-wick jar.",
      "",
      "",
      "Lead with RPM, grain types, and mesh output",
      "Buyers search grain mills by RPM and grain name; 3000 RPM plus wheat, oats, and 50–200 mesh matches high-intent description queries.",
      "Replace unverifiable commercial-grade wording",
      "Food-grade stainless, thermal cut-off, and measurable output replace a vague 'commercial grade' claim that can trigger a policy review.",
    ),
    bulletRecommendations: [
      { id: "sku5-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "3000 RPM MOTOR — High-speed stainless blades pulverize wheat, corn, oats, and dried spices to fine powder in under 2 minutes.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Lead with RPM spec", detail: "Buyers search by RPM when comparing grain mills; quantifying speed as '3000 RPM' improves spec-match ranking." }] }] },
      { id: "sku5-br-2", label: "Bullet 2", kind: "edit", pimIndex: 2, status: "pending",
        recommendedText: "MULTI-GRAIN CAPABLE — Grinds wheat, corn, oats, rice, dried spices, coffee beans, and more with consistent 50–200 mesh fineness.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "List specific grain names", detail: "Naming individual grains (wheat, coffee, oats) boosts long-tail search matches for each grain type." }] }] },
      { id: "sku5-br-3", label: "Bullet 3", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "FOOD-GRADE STAINLESS CHAMBER — Heavy-duty grinding chamber withstands continuous commercial operation with no plastic contact points.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Remove unverifiable 'Commercial Grade' claim", detail: "Replacing 'Commercial Grade' with 'continuous commercial operation' is substantiated and avoids a compliance flag." }] }] },
      { id: "sku5-br-4", label: "Bullet 4", kind: "edit", pimIndex: 4, status: "pending",
        recommendedText: "EASY-CLEAN DESIGN — Removable stainless container and lid wipe clean in seconds; no residue buildup between grain types.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Emphasize cross-grain cleanup", detail: "Cleanup between grain types is a primary concern for buyers; addressing it directly reduces purchase hesitation." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Spiced Cedar 3-Wick Jar Candle, 21 oz",
      bullets: [
        "CAPACITY: 700g grain per batch.",
        "SPEED: High-torque motor for fast grinding.",
        "MATERIAL: Food-grade stainless steel chamber.",
        "VERSATILE: Suitable for wheat, rice, corn, and spices.",
        "INCLUDES: Machine, extra grinding blade, and cleaning brush.",
      ],
      description: "Aurelle Candles Spiced Cedar is a 21 oz three-wick jar of cedar, clove, and smoked wood.",
      imageCount: 6,
      lastUpdated: "Mar 19, 2025",
    },
  },

  "sku-6": {
    titleStatus: "pending",
    title: "Aurelle Candles Pink Sands Tumbler, 10 oz",
    bullets: [
      "LIFT-AWAY CANISTER — Detach the pod with one button press to clean stairs, upholstery, and under furniture effortlessly.",
      "NEVER LOSES SUCTION — Advanced swivel steering and sealed suction design maintain peak performance on every floor type.",
      "ANTI-ALLERGEN COMPLETE SEAL — Captures and traps 99.9% of dust and allergens inside the vacuum, not back in your air.",
      "PET POWER BRUSH — Included motorized pet brush attachment removes embedded pet hair from furniture and carpets.",
      "BRUSHROLL SHUTOFF — Easily switch from deep carpet cleaning to smooth bare floor cleaning at the flip of a switch.",
      "LARGE DUST CUP — 2.2-liter capacity means fewer emptying trips during extended cleaning sessions.",
      "LIGHTWEIGHT & MANEUVERABLE — Weighs just 12.5 lbs and features swivel steering for tight corners and around furniture.",
    ],
    description:
      "Aurelle Candles Pink Sands Tumbler is a 10 oz pour of coconut, sea salt, and a light floral breeze, made for bedrooms and baths.",
    images: makeImages([180, 175, 185, 170, 190, 165, 195, 160]),
    titleRecommendation: rec(
      "Jessica",
      "Aurelle Candles Pink Sands Tumbler — Coconut, Sea Salt, 45-Hr Burn",
      "Aurelle Candles Pink Sands",
      "Tumbler, 10 oz",
      "— Coconut, Sea Salt, 45-Hr Burn",
      "Replace model number with benefit keywords",
      "'Anti-Allergen Seal' and 'Pet Brush' match top search filters; replacing the model number with features lifts organic CTR.",
      "Model numbers in consumer titles",
      "Marketplace guidelines recommend benefits over part numbers in the primary title — NV356E can stay in the detail section.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Jessica",
      "Aurelle Candles Pink Sands Tumbler (10 oz) opens with coconut and sea salt, then settles into a light floral breeze. The soy blend burns for up to 45 hours with a single cotton wick.",
      "Aurelle Candles Pink Sands Tumbler is a 10 oz pour of coconut, sea salt, and a light floral breeze, made for bedrooms and baths.",
      "",
      "",
      "Name Lift-Away, pet brush, and allergen seal first",
      "Detachable canister, pet hair, and anti-allergen are the top upright-vacuum description intents; leading with them lifts relevance versus a generic dual-mode intro.",
      "Substantiate 99.9% capture and weight",
      "Specifying dust and dander plus 12.5 lbs supports the seal claim and answers mobility questions without overpromising.",
    ),
    bulletRecommendations: [
      { id: "sku6-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "LIFT-AWAY DETACHABLE CANISTER — Press one button to remove the pod and clean stairs, upholstery, and under furniture with full suction.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Name the key differentiator first", detail: "Lift-Away is Shark's signature feature; naming it first captures comparison shoppers who search specifically for detachable canister vacuums." }] }] },
      { id: "sku6-br-2", label: "Bullet 2", kind: "edit", pimIndex: 2, status: "pending",
        recommendedText: "ANTI-ALLERGEN COMPLETE SEAL — Traps 99.9% of dust, dander, and allergens inside the vacuum — nothing escapes back into your air.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Substantiate 99.9% claim", detail: "Adding 'dust, dander, and allergens' specifies what is captured, supporting the percentage claim and reducing policy risk." }] }] },
      { id: "sku6-br-3", label: "Bullet 3", kind: "edit", pimIndex: 3, status: "pending",
        recommendedText: "MOTORIZED PET POWER BRUSH — Included pet brush attachment pulls embedded pet hair from fabric, furniture, and upholstery effortlessly.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Target pet owner segment", detail: "Pet hair removal is the #1 search intent in the upright vacuum category; naming it in a dedicated bullet lifts category rank." }] }] },
      { id: "sku6-br-4", label: "Bullet 4", kind: "edit", pimIndex: 6, status: "pending",
        recommendedText: "LIGHTWEIGHT SWIVEL STEERING — At just 12.5 lbs with 180° swivel head, it navigates effortlessly around furniture and into tight corners.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Quantify weight", detail: "Including '12.5 lbs' answers the buyer's implicit 'is it easy to carry?' question and matches weight-filtered searches." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Pink Sands Scented Tumbler Candle, 10 oz",
      bullets: [
        "LIFT-AWAY: Detachable pod for portable above-floor cleaning.",
        "ANTI-ALLERGEN: Complete seal traps 99.9% of dust and allergens.",
        "PET ATTACHMENT: Motorized pet brush for stubborn hair.",
        "SWIVEL STEERING: Easy navigation around furniture.",
        "LARGE CUP: 2.2L dust cup for longer cleaning sessions.",
      ],
      description:
        "Aurelle Candles Pink Sands is a 10 oz tumbler of coconut, sea salt, and a light floral breeze.",
      imageCount: 7,
      lastUpdated: "Mar 3, 2025",
    },
  },

  "sku-7": {
    titleStatus: "pending",
    title: "Bergamot Grove Pillar Set",
    bullets: [
      "67-POINT PLANETARY MIXING — The beater moves in 67 touch points per rotation, reaching every part of the bowl for thorough, even mixing.",
      "59 VERSATILE ATTACHMENTS — Power Hub fits optional attachments including pasta maker, food grinder, ice cream maker, and more.",
      "5-QUART STAINLESS BOWL — Polished stainless steel bowl with a comfortable handle holds enough dough for 9 dozen cookies.",
      "10-SPEED CONTROL — Fine-tuned speed settings from a gentle fold to a high-speed whip handle any recipe requirement.",
      "TILT-HEAD DESIGN — Head tilts back for clear, easy access to the bowl and attachments during assembly and cleanup.",
      "POWER HUB — Single power outlet drives all attachments without additional motors or power supplies.",
      "ICONIC DESIGN — Available in 30+ colors to complement any kitchen aesthetic, with a classic silhouette that hasn't changed since 1937.",
    ],
    description:
      "Aurelle Candles Bergamot Grove Pillar Set is a pair of hand-poured pillars scented with bergamot, green leaf, and a soft cedar base.",
    images: makeImages([0, 10, 350, 15, 345, 20, 340, 5]),
    titleRecommendation: rec(
      "Maya",
      "Aurelle Candles Bergamot Grove Pillar Set — Set of 2, Hand-Poured",
      "Aurelle Candles Bergamot Grove",
      "Pillar Set",
      "— Set of 2, Hand-Poured",
      "Add wattage and key specs",
      "Buyers compare mixers by wattage and speed count; '325W' and '10 Speeds' in the title improve spec-based filter matching.",
      "Move model number out of title",
      "KSM150PS is a model number, not a consumer-facing feature; removing it reduces title length and shifts focus to benefits.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Maya",
      "Aurelle Candles Bergamot Grove Pillar Set pairs two hand-poured pillars of bergamot, green leaf, and cedar. Each pillar burns evenly for dinners, mantels, and gift tables.",
      "Aurelle Candles Bergamot Grove Pillar Set is a pair of hand-poured pillars scented with bergamot, green leaf, and a soft cedar base.",
      "",
      "",
      "Lead with wattage, bowl size, and attachment hub",
      "Shoppers compare mixers by 325W, 5-quart capacity, and attachment count; naming those in the first two sentences matches top description queries.",
      "Keep heritage and color claims specific",
      "30+ colors and recipe-scale capacity (9 dozen cookies) are substantiated attributes; they replace vague 'professional bakery' positioning.",
    ),
    bulletRecommendations: [
      { id: "sku7-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "67-POINT PLANETARY MIXING — Beater traces 67 touch points per rotation, coating every part of the bowl for lump-free, even results.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Lead with the spec benefit", detail: "'Lump-free, even results' translates a technical spec into a shopper outcome, improving engagement on the listing." }] }] },
      { id: "sku7-br-2", label: "Bullet 2", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "59 OPTIONAL ATTACHMENTS — Single Power Hub powers pasta makers, food grinders, ice cream bowls, and more with no extra motor.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Name popular attachments", detail: "Listing specific attachments (pasta, ice cream) drives cross-product searches and increases attachment accessory attach rate." }] }] },
      { id: "sku7-br-3", label: "Bullet 3", kind: "edit", pimIndex: 2, status: "pending",
        recommendedText: "5-QUART STAINLESS BOWL — Holds enough batter for 9 dozen cookies or a 4-lb bread dough; comfortable handle for easy transfer.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Quantify capacity in recipes", detail: "Translating '5-quart' to '9 dozen cookies' gives shoppers a relatable reference that drives add-to-cart decisions." }] }] },
      { id: "sku7-br-4", label: "Bullet 4", kind: "edit", pimIndex: 6, status: "pending",
        recommendedText: "30+ COLORS, ICONIC DESIGN — Match any kitchen aesthetic with over 30 color options; the silhouette has been a kitchen staple since 1937.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Substantiate heritage claim", detail: "Anchoring '1937' to the silhouette (not the product line) is historically accurate and avoids misleading longevity claims." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Bergamot Grove Decorative Pillar Candles, Set of 2",
      bullets: [
        "POWER: 325-watt motor handles the most demanding recipes.",
        "10 SPEEDS: From slow stir to fast whip.",
        "TILT HEAD: Easy bowl and attachment access.",
        "PLANETARY MIXING: 67 touch points per rotation for thorough mixing.",
        "BOWL: 5-quart polished stainless steel bowl with handle.",
      ],
      description:
        "Aurelle Candles Bergamot Grove Pillar Set is two hand-poured pillars with bergamot, green leaf, and a soft cedar finish.",
      imageCount: 8,
      lastUpdated: "Apr 12, 2025",
    },
  },

  "sku-8": {
    titleStatus: "pending",
    title: "Aurelle Candles Coastal Linen Large Jar, 22 oz",
    bullets: [
      "7-IN-1 VERSATILITY — Replaces pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and food warmer.",
      "UP TO 70% FASTER — Pressure cooking dramatically reduces meal time compared to conventional methods.",
      "SMART PROGRAMS — 13 one-touch cooking programs for ribs, soups, beans, rice, poultry, yogurt, and more.",
      "SAFE & RELIABLE — 10 safety mechanisms including overheat protection, safe-locking lid, and automatic pressure control.",
      "EASY-CLEAN INNER POT — Stainless steel pot with tri-ply base is fingerprint-resistant and dishwasher safe.",
      "DELAY START & KEEP WARM — Schedule cooking up to 24 hours in advance; auto keep-warm holds food at ideal serving temperature.",
      "6-QUART CAPACITY — Feeds up to 6 people comfortably; ideal for families, meal prepping, and entertaining.",
    ],
    description:
      "Aurelle Candles Coastal Linen Large Jar is a 22 oz pour of clean cotton, sea air, and soft musk for living rooms and guest suites.",
    images: makeImages([240, 245, 235, 250, 230, 255, 225, 260]),
    titleRecommendation: rec(
      "Jessica",
      "Aurelle Candles Coastal Linen 22 oz — Clean Cotton, 110-Hr Burn",
      "Aurelle Candles Coastal Linen",
      "Large Jar, 22 oz",
      "22 oz — Clean Cotton, 110-Hr Burn",
      "Surface speed and program count",
      "'Up to 70% Faster' and '13 Programs' are high-conversion claims that drive clicks from comparison shoppers.",
      "No compliance issues found",
      "Speed claim is substantiated in listing; recommend keeping it consistent across all placements.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Jessica",
      "Aurelle Candles Coastal Linen Large Jar (22 oz) opens with clean cotton and sea air, then settles into soft musk. The soy blend burns for up to 110 hours from a single lead-free wick.",
      "Aurelle Candles Coastal Linen Large Jar is a 22 oz pour of clean cotton, sea air, and soft musk for living rooms and guest suites.",
      "",
      "",
      "List all seven functions and program count",
      "Naming each replaced appliance plus 13 programs captures long-tail searches for rice cooker, yogurt maker, and pressure cooker in one description.",
      "Keep the 70% faster claim tied to safety count",
      "Pairing the burn-time claim with a lead-free wick matches Aurelle Candles specs and reduces policy-flag risk.",
    ),
    bulletRecommendations: [
      { id: "sku8-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "7-IN-1 MULTI-COOKER — Replaces pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and food warmer in one appliance.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "List all 7 functions explicitly", detail: "Listing every replaced appliance drives searches for each individual function (e.g., 'rice cooker') and signals breadth of use." }] }] },
      { id: "sku8-br-2", label: "Bullet 2", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "UP TO 70% FASTER — Pressure cooking cuts cook times dramatically — ribs in 25 minutes, whole chicken in 30, dried beans in 15.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Ground speed claim in examples", detail: "Concrete cook-time examples make the '70% faster' claim tangible and generate long-tail searches by dish name." }] }] },
      { id: "sku8-br-3", label: "Bullet 3", kind: "edit", pimIndex: 3, status: "pending",
        recommendedText: "10 PROVEN SAFETY MECHANISMS — Overheat protection, safe-locking lid, and automatic pressure control for completely worry-free cooking.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Specify the safety number", detail: "Changing the safety wording to match the published wick and wax specs is more accurate and aligns with Aurelle Candles documentation." }] }] },
      { id: "sku8-br-4", label: "Bullet 4", kind: "edit", pimIndex: 5, status: "pending",
        recommendedText: "DELAY START & KEEP-WARM — Schedule meals up to 24 hours ahead; auto keep-warm holds food at ideal serving temperature for hours.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Highlight convenience use case", detail: "Delay start and keep-warm are top requested features among busy family cooks — surfacing them lifts consideration in that segment." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Coastal Linen Large Jar Candle, 22 oz",
      bullets: [
        "7-IN-1: Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt, and warmer.",
        "UP TO 70% FASTER than stove top cooking.",
        "13 SMART PROGRAMS: Soup, meat, beans, rice, and more.",
        "10 SAFETY MECHANISMS for worry-free cooking.",
        "DISHWASHER SAFE: Inner pot, steam rack, and accessories.",
      ],
      description:
        "Aurelle Candles Coastal Linen is a 22 oz jar of clean cotton, sea air, and soft musk.",
      imageCount: 8,
      lastUpdated: "Apr 1, 2025",
    },
  },

  "sku-9": {
    titleStatus: "pending",
    title: "Hearthwood Cedar Jar, 18 oz",
    bullets: [
      "AIRCRAFT-GRADE STAINLESS BLADES — Hardened stainless steel blades pulverize the toughest ingredients including ice, nuts, and fibrous greens.",
      "48 OZ CONTAINER — The low-profile 48 oz container fits under most kitchen cabinets and works great for medium-to-large batches.",
      "VARIABLE SPEED CONTROL — 10-speed dial gives precise control over blending consistency from chunky salsa to silky smooth soup.",
      "PULSE FEATURE — One-touch pulse button adds quick bursts of power for controlled chopping and final texture adjustments.",
      "SELF-CLEANING — Add warm water and a drop of dish soap, run for 30–60 seconds, and the container cleans itself.",
      "RADIAL COOLING FAN — Thermal protection system prevents overheating and extends motor life for years of reliable use.",
      "SATISFACTION GUARANTEE — Aurelle Candles backs every jar for scent throw, even burn, and finish.",
    ],
    description:
      "Aurelle Candles Hearthwood Cedar Jar is an 18 oz soy pour of smoked cedar, clove, and a dry vanilla base for living rooms and studies.",
    images: makeImages([160, 165, 155, 170, 150, 175, 145, 180]),
    titleRecommendation: rec(
      "Maya",
      "Aurelle Candles Hearthwood Cedar 18 oz — Smoked Wood, Soy Wax",
      "Aurelle Candles Hearthwood Cedar",
      "Jar, 18 oz",
      "18 oz — Smoked Wood, Soy Wax",
      "Add container size and warranty",
      "Container size and warranty length are top comparison factors for blenders; surfacing both boosts spec-match rankings.",
      "Remove vague tier label",
      "'Professional Grade' without certification can trigger a quality-claim review; replacing it with verifiable specs removes the risk.",
    ),
    bulletRecommendations: [
      { id: "sku9-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "HARDENED STAINLESS BLADES — Aircraft-grade blades pulverize ice, nuts, frozen fruit, and fibrous greens that weaker blenders can't handle.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Name tough ingredients explicitly", detail: "Listing specific hard-to-blend ingredients (ice, nuts, frozen fruit) matches buyer searches for high-performance blenders." }] }] },
      { id: "sku9-br-2", label: "Bullet 2", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "48 OZ LOW-PROFILE CONTAINER — Fits under standard kitchen cabinets; ideal for smoothies, soups, sauces, and dips for up to 6 servings.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Specify serving yield", detail: "'Up to 6 servings' answers the implicit capacity question and appeals to buyers making food for families or meal prep." }] }] },
      { id: "sku9-br-3", label: "Bullet 3", kind: "edit", pimIndex: 2, status: "pending",
        recommendedText: "10-SPEED VARIABLE CONTROL + PULSE — Dial precisely from chunky salsa to silky smooth soup; Pulse adds quick power bursts for perfect texture.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Combine speed and pulse features", detail: "Grouping variable speed and pulse in one bullet highlights full texture control and reduces bullet count without losing information." }] }] },
      { id: "sku9-br-4", label: "Bullet 4", kind: "edit", pimIndex: 6, status: "pending",
        recommendedText: "SATISFACTION GUARANTEE — Aurelle Candles covers scent throw, even burn, and finish — stated in plain language on the listing.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Clarify warranty scope", detail: "Stating scent throw, even burn, and finish mirrors the published guarantee and avoids overpromising." }] }] },
    ],
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Maya",
      "Unlock restaurant-quality results at home with the Aurelle Candles Hearthwood Cedar. Aircraft-grade stainless steel blades and a robust motor blend ice, nuts, and fibrous greens into silky smoothies, hot soup, and nut butter. The 48 oz low-profile container fits under most cabinets; 10 speeds plus Pulse deliver precise texture control. Self-cleaning in under a minute — backed by a 7-year full warranty.",
      "Aurelle Candles Hearthwood Cedar Jar is an 18 oz soy pour of smoked cedar, clove, and a dry vanilla base for living rooms and studies.",
      "",
      "",
      "Lead with outcome keywords",
      "First sentence names smoothies, soup, and nut butter — top blender description search intents on the retailer.",
      "Close with warranty trust signal",
      "7-year warranty messaging mirrors bullets and reduces hesitation on high-ticket purchases.",
    ),
    pdpContent: {
      title: "Aurelle Candles Hearthwood Cedar Soy Jar Candle, 18 oz",
      bullets: [
        "AIRCRAFT-GRADE BLADES: Laser-cut stainless steel blades handle any ingredient.",
        "VARIABLE SPEED: 10 speeds plus pulse for total texture control.",
        "48 OZ CONTAINER: Fits under most kitchen cabinets.",
        "SELF-CLEANING: Just blend warm water and soap.",
        "7-YEAR WARRANTY: Full coverage including parts and labor.",
      ],
      description:
        "Aurelle Candles Hearthwood Cedar is an 18 oz soy jar of smoked cedar, clove, and dry vanilla.",
      imageCount: 6,
      lastUpdated: "Mar 28, 2025",
    },
  },

  "sku-10": {
    titleStatus: "pending",
    title: "Rasa Decorative Candle Duo",
    bullets: [
      "SELF-EMPTYING BASE — The Clean Base Automatic Dirt Disposal holds up to 60 days of debris so you don't have to touch the bin for months.",
      "GIFT-READY PAIR — Two hand-poured candles, one floral and one woody, packed as a set for tables and gift boxes.",
      "DUAL MULTI-SURFACE BRUSHES — Rubber brushes flex and adjust to carpet and hard floors, grabbing dirt from every direction.",
      "IMPRINT LINK TECHNOLOGY — Works with Braava jet m6 to auto-mop after vacuuming in a single coordinated session.",
      "PERSONALIZED SCHEDULES — Cleans automatically on your schedule, recharges when needed, and resumes until the job is complete.",
      "ALLERGY-FRIENDLY — High-efficiency filter captures 99% of cat and dog allergens and seals them in the disposal bag.",
      "WORKS WITH VOICE ASSISTANTS — Compatible with Alexa and Google Assistant for hands-free room-by-room control.",
    ],
    description:
      "Aurelle Candles Rasa Decorative Candle Duo is a set of two hand-poured candles — one floral, one woody — for tables and gift boxes.",
    images: makeImages([220, 215, 225, 210, 230, 205, 235, 200]),
    titleRecommendation: rec(
      "Jessica",
      "Aurelle Candles Rasa Duo — Set of 2 Scented Decorative Candles",
      "Aurelle Candles Rasa Decorative",
      "Candle Duo",
      "— Set of 2 Scented Decorative Candles",
      "Add smart home and storage highlights",
      "'Smart Mapping' and 'Alexa Compatible' are top filter terms in the robot vacuum category and improve discoverability on app-connected device searches.",
      "No compliance issues found",
      "All claims match verified product specs; no changes needed for compliance.",
    ),
    descriptionStatus: "pending",
    descriptionRecommendation: rec(
      "Jessica",
      "Aurelle Candles Rasa Decorative Candle Duo pairs a floral candle with a woody candle in one gift-ready set. Both are hand-poured soy with lead-free cotton wicks.",
      "Aurelle Candles Rasa Decorative Candle Duo is a set of two hand-poured candles — one floral, one woody — for tables and gift boxes.",
      "",
      "",
      "Lead with self-empty, mapping, and 60-day hold",
      "Clean Base, room-by-room mapping, and 60-day debris storage are the top robot-vacuum description intents and lift discoverability on app-connected searches.",
      "Specify allergen types and voice platforms",
      "Naming cat and dog allergens plus Alexa and Google Assistant keeps the 99% claim substantiated and matches both smart-speaker ecosystems.",
    ),
    bulletRecommendations: [
      { id: "sku10-br-1", label: "Bullet 1", kind: "edit", pimIndex: 0, status: "pending",
        recommendedText: "SELF-EMPTYING CLEAN BASE — Automatically empties the bin after every run and holds up to 60 days of debris so you never touch the dustbin.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Lead with the hero feature benefit", detail: "Self-emptying capability is the primary purchase driver for the i3+; leading with it and the 60-day figure maximizes engagement." }] }] },
      { id: "sku10-br-2", label: "Bullet 2", kind: "edit", pimIndex: 1, status: "pending",
        recommendedText: "SMART HOME MAPPING — Learns your floor plan over multiple runs, enabling room-by-room cleaning commands via app or voice.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "REPLACED", summary: "Mention app and voice together", detail: "Combining 'app' and 'voice' in one bullet captures both app-centric and smart-speaker-first buyer segments." }] }] },
      { id: "sku10-br-3", label: "Bullet 3", kind: "edit", pimIndex: 5, status: "pending",
        recommendedText: "ALLERGY-FRIENDLY HIGH-EFFICIENCY FILTER — Captures 99% of cat and dog allergens and seals them in the disposal bag, not back in your air.",
        reasoning: [{ key: "compliance", label: "Compliance", reasons: [{ type: "REPLACED", summary: "Specify allergen types", detail: "Naming floral and woody as the two scents matches the set contents and avoids a vague 'scented' claim." }] }] },
      { id: "sku10-br-4", label: "Bullet 4", kind: "edit", pimIndex: 6, status: "pending",
        recommendedText: "SET OF TWO SCENTS — Ask for a floral and a woody candle together; the Rasa duo is ready to gift or display.",
        reasoning: [{ key: "seo", label: "SEO", reasons: [{ type: "ADDED", summary: "Name both voice platforms", detail: "Naming Alexa and Google Assistant drives discovery from owners of both ecosystems; generic 'voice assistant' loses that specificity." }] }] },
    ],
    pdpContent: {
      title: "Aurelle Candles Rasa Set of 2 Decorative Scented Candles",
      bullets: [
        "SELF-EMPTYING: Clean Base holds 60 days of debris automatically.",
        "SMART MAPPING: Learns your floor plan and cleans room by room.",
        "DUAL BRUSHES: Multi-surface rubber brushes on all floor types.",
        "RECHARGE & RESUME: Returns to dock, recharges, and finishes the job.",
        "VOICE CONTROL: Works with Alexa and Google Assistant.",
      ],
      description:
        "Aurelle Candles Rasa is a set of two decorative scented candles, one floral and one woody.",
      imageCount: 7,
      lastUpdated: "Feb 27, 2025",
    },
  },
}
