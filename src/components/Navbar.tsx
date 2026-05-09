import { useEffect, useState } from 'react'
import {
  SECTION_IDS,
  type SectionId,
  useScrollNav,
} from '../context/ScrollNavContext'

const NAV_LABELS: Record<SectionId, string> = {
  home: 'Home',
  resume: 'Resume',
  projects: 'Projects',
  contact: 'Contact',
}

export function Navbar() {
  const { activeSection, scrollToSection, scrollRootRef } = useScrollNav()
  const stepIndex = Math.max(0, SECTION_IDS.indexOf(activeSection))
  const progressPct = ((stepIndex + 1) / SECTION_IDS.length) * 100
  const [secretVisible, setSecretVisible] = useState(false)
  const navActiveSection: SectionId | null = secretVisible ? null : activeSection

  useEffect(() => {
    const root = scrollRootRef.current
    const secret = document.getElementById('secret')
    if (!root || !secret) return

    const io = new IntersectionObserver(
      ([entry]) => {
        setSecretVisible(entry.isIntersecting)
      },
      {
        root,
        threshold: 0.05,
      },
    )

    io.observe(secret)
    return () => io.disconnect()
  }, [scrollRootRef])

  return (
    <header className="header">
      <div className="header-inner">
        <button
          type="button"
          className="brand"
          onClick={() => scrollToSection('home')}
          aria-label="Home"
        >
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">Yuyang Zhang</span>
        </button>
        <nav className="nav" aria-label="Primary">
          {SECTION_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`nav-link${navActiveSection === id ? ' nav-link--active' : ''}`}
              onClick={() => scrollToSection(id)}
              aria-current={navActiveSection === id ? 'page' : undefined}
            >
              {NAV_LABELS[id]}
            </button>
          ))}
        </nav>
      </div>
      {!secretVisible ? (
        <div
          className="scroll-progress-track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={SECTION_IDS.length}
          aria-valuenow={stepIndex + 1}
          aria-label="Site sections"
        >
          <div
            className="scroll-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      ) : null}
    </header>
  )
}
