/** Top edge of `el` in `root`'s scroll coordinate space (content pixels). */
export function contentTopInScrollRoot(el: HTMLElement, root: HTMLElement): number {
  const er = el.getBoundingClientRect()
  const rr = root.getBoundingClientRect()
  return er.top - rr.top + root.scrollTop
}

/** `scrollTop` value that aligns `el`'s block-start with `root`'s scrollport top (honours scroll-margin). */
export function scrollSnapAlignTop(el: HTMLElement, root: HTMLElement): number {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  return Math.max(0, contentTopInScrollRoot(el, root) - margin)
}

/** `scrollTop` that aligns `el`'s block-end with `root`'s scrollport bottom (honours scroll-margin). */
export function scrollSnapAlignEnd(el: HTMLElement, root: HTMLElement): number {
  const marginBottom = parseFloat(getComputedStyle(el).scrollMarginBottom) || 0
  const top = contentTopInScrollRoot(el, root)
  const bottom = top + el.getBoundingClientRect().height
  const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
  const y = bottom + marginBottom - root.clientHeight
  return Math.min(maxScroll, Math.max(0, y))
}

/**
 * Scroll position for “contact + footer” keyboard stop: footer end-aligned, but capped so mandatory
 * snap cannot jump to `#secret` (footer end and secret start can be adjacent in scroll space).
 */
export function footerKeyboardScrollTop(root: HTMLElement, footer: HTMLElement): number {
  const yEnd = scrollSnapAlignEnd(footer, root)
  const secret = document.getElementById('secret')
  if (!secret) return yEnd
  const yBeforeSecret = Math.max(0, scrollSnapAlignTop(secret, root) - 12)
  return Math.min(yEnd, yBeforeSecret)
}

/**
 * Programmatic scroll while scroll-snap is off, then restore snap after the scroll settles.
 * Keeps smooth scrolling without mandatory snap pulling past the footer into `#secret` mid-animation.
 */
export function programmaticScrollTo(
  root: HTMLElement,
  top: number,
  options?: {
    behavior?: ScrollBehavior
    /** After snap returns, clamp if the browser moved past this (keyboard footer stop). */
    postRestoreMax?: number
    /** Fires once scroll + snap restore settle (scrollend, rAF for instant, or fallback timeout). */
    onSettled?: () => void
  },
): void {
  const postRestoreMax = options?.postRestoreMax
  const requested = options?.behavior ?? 'smooth'
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior: ScrollBehavior = reduced ? 'auto' : requested

  const prevSnap = root.style.scrollSnapType

  const applyCleanup = () => {
    if (postRestoreMax !== undefined && root.scrollTop > postRestoreMax + 2) {
      root.style.scrollSnapType = 'none'
      root.scrollTop = Math.min(root.scrollTop, postRestoreMax)
    }
    root.style.scrollSnapType = prevSnap
  }

  let settled = false
  let fallbackTimer = 0
  const finish = () => {
    if (settled) return
    settled = true
    root.removeEventListener('scrollend', finish)
    window.clearTimeout(fallbackTimer)
    applyCleanup()
    options?.onSettled?.()
  }

  root.style.scrollSnapType = 'none'
  root.scrollTo({ top, behavior })

  if (behavior === 'smooth') {
    root.addEventListener('scrollend', finish)
    fallbackTimer = window.setTimeout(finish, 900)
    return
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(finish)
  })
}
