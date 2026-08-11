import {
  SECTION_IDS,
  type SectionId,
  useScrollNav,
} from '../context/ScrollNavContext'

const NAV_LABELS: Record<SectionId, string> = {
  secret: 'Welcome',
  home: 'Home',
  resume: 'Resume',
  projects: 'Projects',
  contact: 'Contact',
}

export function Navbar() {
  const { activeSection, scrollToSection } = useScrollNav()
  const stepIndex = Math.max(0, SECTION_IDS.indexOf(activeSection))
  const progressPct = ((stepIndex + 1) / SECTION_IDS.length) * 100

  return (
    <header className="header">
      <div className="header-inner">
        <button
          type="button"
          className="brand"
          onClick={() => scrollToSection('secret')}
          aria-label="Welcome"
        >
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">Yuyang Zhang</span>
        </button>
        <nav className="nav" aria-label="Primary">
          {SECTION_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`nav-link${activeSection === id ? ' nav-link--active' : ''}`}
              onClick={() => scrollToSection(id)}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {NAV_LABELS[id]}
            </button>
          ))}
        </nav>
      </div>
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
    </header>
  )
}
