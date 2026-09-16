import type { StaticImageData } from "next/image"
import amberFloral from "@/candle_images/amber-floral-candle-lifestyle-portrait.webp"
import citrusZest from "@/candle_images/India-Circus-by-Krsnaa-Mehta-Citrus-Zest-Jar-Candle-39112604SD00311-2.avif"
import spicyCitrus from "@/candle_images/India-Circus-by-Krsnaa-Mehta-Spicy-Citrus-Jar-Candle-39112604SD00314-1.avif"
import pinkJar from "@/candle_images/Pink-Scented-jar-Candle-1200x1497.webp"
import rasaDuo from "@/candle_images/ira-candles-set-of-2-decorative-candles-icrh-rasa-home-ira-candles-set-of-2-4826101.webp"
import tobaccoVanilla from "@/candle_images/tobacco-vanilla-soy-candle-luxury-warm-smoky-aroma-bgsc000011-baaag-1002296.webp"
import threeWickOne from "@/candle_images/scented-3-wick-candles-combo-pack-1.webp"
import threeWickFive from "@/candle_images/scented-3-wick-candles-combo-pack-5.webp"
import jar71 from "@/candle_images/71k9SkuwpOL.jpg"
import jar81 from "@/candle_images/81qg3fv8KeL.jpg"
import photo397 from "@/candle_images/39725674-15064630.jpg"
import photo1755 from "@/candle_images/1755096023_7792.jpg"
import images from "@/candle_images/images.jpeg"
import images1 from "@/candle_images/images (1).jpeg"
import images2 from "@/candle_images/images (2).jpeg"
import images3 from "@/candle_images/images (3).jpeg"

const CANDLE_IMAGES: StaticImageData[] = [
  amberFloral,
  citrusZest,
  spicyCitrus,
  pinkJar,
  rasaDuo,
  tobaccoVanilla,
  threeWickOne,
  threeWickFive,
  jar71,
  jar81,
  photo397,
  photo1755,
  images,
  images1,
  images2,
  images3,
]

export const CANDLE_THUMBNAILS = CANDLE_IMAGES.map((image) => image.src)

/** Stable pick from the candle photo pool so the same SKU keeps one image. */
export function candleThumbnail(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  const index = Math.abs(hash) % CANDLE_THUMBNAILS.length
  return CANDLE_THUMBNAILS[index] ?? CANDLE_THUMBNAILS[0]
}
