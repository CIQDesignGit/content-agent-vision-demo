"use client"

import { useLayoutEffect, useState, type RefObject } from "react"

/**
 * Height of the meter column while its calculation panel is closed.
 * The side cards match that size and keep it when the panel opens.
 */
export function useCollapsedSiblingHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const sibling = ref.current?.previousElementSibling
    if (!(sibling instanceof HTMLElement)) return

    const measure = () => {
      if (sibling.querySelector("#opportunity-calculation-panel")) return
      setHeight(sibling.offsetHeight)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(sibling)
    return () => observer.disconnect()
  }, [ref])

  return height
}
