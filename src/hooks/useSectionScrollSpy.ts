import { useLayoutEffect } from 'react'
import {
  SECTION_IDS,
  type SectionId,
  useScrollNav,
} from '../context/ScrollNavContext'
import { contentTopInScrollRoot } from '../utils/scrollRootGeometry'

/** Last section whose top is at or above the probe line (classic scrollspy). */
function pickSection(root: HTMLElement): SectionId {
  const probe = root.scrollTop + root.clientHeight * 0.5

  let active: SectionId = SECTION_IDS[0]
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = contentTopInScrollRoot(el, root)
    if (top <= probe + 2) {
      active = id
    }
  }
  return active
}

export function useSectionScrollSpy() {
  const { scrollRootRef, setActiveSection, navScrollLockRef } = useScrollNav()

  useLayoutEffect(() => {
    let cancelled = false
    let waitRootRaf = 0
    let detach: (() => void) | undefined

    const scrollOpts: AddEventListenerOptions = { passive: true }
    const scrollCapture: AddEventListenerOptions = { passive: true, capture: true }

    const attach = (root: HTMLElement) => {
      let innerRaf = 0

      const tick = () => {
        if (navScrollLockRef.current !== null) return
        if (!SECTION_IDS.every((id) => document.getElementById(id))) return
        const active = pickSection(root)
        setActiveSection((prev) => (prev === active ? prev : active))
      }

      const schedule = () => {
        cancelAnimationFrame(innerRaf)
        innerRaf = requestAnimationFrame(tick)
      }

      const io = new IntersectionObserver(schedule, {
        root,
        threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
      })

      const waitSections = () => {
        if (cancelled) return
        if (!SECTION_IDS.every((id) => document.getElementById(id))) {
          innerRaf = requestAnimationFrame(waitSections)
          return
        }
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id)
          if (el) io.observe(el)
        }
        schedule()
      }

      const settleTimer = window.setTimeout(schedule, 120)

      root.addEventListener('scroll', schedule, scrollOpts)
      root.addEventListener('scroll', schedule, scrollCapture)
      root.addEventListener('wheel', schedule, scrollOpts)
      root.addEventListener('touchmove', schedule, scrollOpts)
      root.addEventListener('scrollend', schedule as EventListener)

      const wakeIfInsideRoot = (e: Event) => {
        const t = e.target
        if (t instanceof Node && root.contains(t)) schedule()
      }
      document.addEventListener('wheel', wakeIfInsideRoot, scrollCapture)
      document.addEventListener('touchmove', wakeIfInsideRoot, scrollCapture)

      const ro = new ResizeObserver(schedule)
      ro.observe(root)

      waitSections()

      return () => {
        window.clearTimeout(settleTimer)
        cancelAnimationFrame(innerRaf)
        root.removeEventListener('scroll', schedule, scrollOpts)
        root.removeEventListener('scroll', schedule, scrollCapture)
        root.removeEventListener('wheel', schedule, scrollOpts)
        root.removeEventListener('touchmove', schedule, scrollOpts)
        root.removeEventListener('scrollend', schedule as EventListener)
        document.removeEventListener('wheel', wakeIfInsideRoot, scrollCapture)
        document.removeEventListener('touchmove', wakeIfInsideRoot, scrollCapture)
        ro.disconnect()
        io.disconnect()
      }
    }

    const waitRoot = () => {
      if (detach) return
      const root = scrollRootRef.current
      if (!root) {
        waitRootRaf = requestAnimationFrame(waitRoot)
        return
      }
      detach = attach(root)
    }

    waitRoot()

    return () => {
      cancelled = true
      cancelAnimationFrame(waitRootRaf)
      detach?.()
    }
  }, [scrollRootRef, setActiveSection, navScrollLockRef])
}
