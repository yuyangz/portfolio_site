import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react'
import {
  programmaticScrollTo,
  scrollSnapAlignTop,
} from '../utils/scrollRootGeometry'

export const SECTION_IDS = ['home', 'resume', 'projects', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

type ScrollNavContextValue = {
  scrollRootRef: RefObject<HTMLElement | null>
  activeSection: SectionId
  setActiveSection: Dispatch<SetStateAction<SectionId>>
  scrollToSection: (id: SectionId, options?: { behavior?: ScrollBehavior }) => void
}

const ScrollNavContext = createContext<ScrollNavContextValue | null>(null)

export function ScrollNavProvider({ children }: { children: ReactNode }) {
  const scrollRootRef = useRef<HTMLElement | null>(null)
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  const scrollToSection = useCallback(
    (id: SectionId, options?: { behavior?: ScrollBehavior }) => {
      setActiveSection(id)
      const root = scrollRootRef.current
      const el = document.getElementById(id)
      if (!root || !el) return
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const top = scrollSnapAlignTop(el, root)
      const explicit = options?.behavior

      if (explicit === 'instant') {
        const prevSnap = root.style.scrollSnapType
        root.style.scrollSnapType = 'none'
        root.scrollTo({ top, behavior: 'instant' })
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            root.style.scrollSnapType = prevSnap
          })
        })
        return
      }

      const behavior: ScrollBehavior =
        explicit ?? (reduced ? 'auto' : 'smooth')
      programmaticScrollTo(root, top, { behavior })
    },
    [],
  )

  const value: ScrollNavContextValue = {
    scrollRootRef,
    activeSection,
    setActiveSection,
    scrollToSection,
  }

  return (
    <ScrollNavContext.Provider value={value}>{children}</ScrollNavContext.Provider>
  )
}

export function useScrollNav() {
  const ctx = useContext(ScrollNavContext)
  if (!ctx) {
    throw new Error('useScrollNav must be used within ScrollNavProvider')
  }
  return ctx
}
