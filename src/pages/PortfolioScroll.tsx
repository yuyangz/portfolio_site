import { useMobileLayout } from '../hooks/useMobileLayout'
import { useSnapSectionKeyboardNav } from '../hooks/useSnapSectionKeyboardNav'
import { useSectionScrollSpy } from '../hooks/useSectionScrollSpy'
import { Home } from './Home'
import { Resume } from './Resume'
import { Projects } from './Projects'
import { Contact } from './Contact'
import { SecretPokemon } from './SecretPokemon'

export function PortfolioScroll() {
  const isMobileLayout = useMobileLayout()
  useSectionScrollSpy()
  useSnapSectionKeyboardNav()

  return (
    <>
      <section
        id="home"
        className="snap-section snap-section--home"
        aria-label="Home"
      >
        <div className="snap-section-inner snap-section-inner--home">
          <Home />
        </div>
      </section>
      <section
        id="resume"
        className="snap-section snap-section--resume"
        aria-label="Resume"
      >
        <div className="snap-section-inner snap-section-inner--resume">
          <Resume />
        </div>
      </section>
      <section
        id="projects"
        className="snap-section"
        aria-label="Projects"
      >
        <div className="snap-section-inner">
          <Projects />
        </div>
      </section>
      <section
        id="contact"
        className="snap-section"
        aria-label="Contact"
      >
        <div className="snap-section-inner">
          <Contact />
        </div>
      </section>
      <footer id="footer" className="footer snap-footer">
        <div className="footer-inner">
          <span className="footer-note">
            © {new Date().getFullYear()} Yuyang Zhang
          </span>
        </div>
      </footer>
      {!isMobileLayout ? <SecretPokemon /> : null}
    </>
  )
}
