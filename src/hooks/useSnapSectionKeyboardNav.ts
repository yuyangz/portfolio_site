import { useEffect } from 'react'
import {
  SECTION_IDS,
  useScrollNav,
} from '../context/ScrollNavContext'
import {
  contentTopInScrollRoot,
  footerKeyboardScrollTop,
  programmaticScrollTo,
  scrollSnapAlignTop,
} from '../utils/scrollRootGeometry'

const KEYBOARD_STOPS = [...SECTION_IDS, 'footer'] as const

const CONTACT_SNAP_SLOP = 8
/** Within this distance of the footer keyboard target counts as “footer showing” (↓ does nothing). */
const FOOTER_REACHED_TOL = 14

function keyboardStopIndex(root: HTMLElement): number {
  const contact = document.getElementById('contact')
  const footer = document.getElementById('footer')

  if (!contact || !footer) {
    const probe = root.scrollTop + root.clientHeight * 0.5
    let idx = 0
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i])
      if (!el) continue
      if (contentTopInScrollRoot(el, root) <= probe + 2) idx = i
    }
    return idx
  }

  const tContact = scrollSnapAlignTop(contact, root)
  const tFooter = footerKeyboardScrollTop(root, footer)
  const footerShowing = root.scrollTop >= tFooter - FOOTER_REACHED_TOL

  if (footerShowing) {
    return KEYBOARD_STOPS.length - 1
  }

  if (root.scrollTop <= tContact + CONTACT_SNAP_SLOP) {
    const probe = root.scrollTop + root.clientHeight * 0.5
    let idx = 0
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i])
      if (!el) continue
      if (contentTopInScrollRoot(el, root) <= probe + 2) idx = i
    }
    return idx
  }

  /* Between full Contact and the footer target: still “on Contact” so ↓ scrolls to the footer once. */
  return SECTION_IDS.indexOf('contact')
}

function allowSnapArrowNav(target: Element, scrollRoot: HTMLElement): boolean {
  if (target.closest('header.header')) return false
  if (target.closest('input, textarea, select, [contenteditable="true"]')) {
    return false
  }
  if (scrollRoot.contains(target)) return true
  /* Focus often starts on body/html/#root — not descendants of <main> */
  if (target === document.body || target === document.documentElement) return true
  return target instanceof HTMLElement && target.id === 'root'
}

export function useSnapSectionKeyboardNav() {
  const { scrollRootRef, scrollToSection } = useScrollNav()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const target = e.target
      if (!(target instanceof Element)) return

      const root = scrollRootRef.current
      if (!root) return

      if (!allowSnapArrowNav(target, root)) return

      e.preventDefault()
      e.stopImmediatePropagation()

      const i = keyboardStopIndex(root)
      const delta = e.key === 'ArrowDown' ? 1 : -1
      const contactIndex = SECTION_IDS.indexOf('contact')

      /* Footer showing: never move further down via keyboard. */
      if (i === KEYBOARD_STOPS.length - 1 && delta === 1) {
        return
      }

      /*
       * Mid-scroll between Contact snap and footer target: ↑ snaps back to full Contact first
       * (hides any partial footer motion), then ↑ again goes to Projects.
       */
      if (delta === -1 && i === contactIndex) {
        const contact = document.getElementById('contact')
        const footer = document.getElementById('footer')
        if (contact && footer) {
          const tContact = scrollSnapAlignTop(contact, root)
          const tFooter = footerKeyboardScrollTop(root, footer)
          if (
            root.scrollTop > tContact + CONTACT_SNAP_SLOP &&
            root.scrollTop < tFooter - FOOTER_REACHED_TOL
          ) {
            scrollToSection('contact')
            return
          }
        }
      }

      const next = Math.min(Math.max(0, i + delta), KEYBOARD_STOPS.length - 1)
      const stopId = KEYBOARD_STOPS[next]

      if (stopId === 'footer') {
        const footer = document.getElementById('footer')
        if (!footer) return
        programmaticScrollTo(root, footerKeyboardScrollTop(root, footer), {
          behavior: 'smooth',
        })
        return
      }

      scrollToSection(stopId)
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [scrollRootRef, scrollToSection])
}
