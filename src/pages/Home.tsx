import portrait from '../assets/portrait.png'
import { useScrollNav } from '../context/ScrollNavContext'
import './pages.css'

export function Home() {
  const { scrollToSection } = useScrollNav()

  return (
    <div className="page home">
      <section className="hero hero--fill">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              Product Management. Analytics. Machine Learning.
            </p>
            <h1>Hi, I&apos;m Yuyang Zhang</h1>
            <p className="lede">
              Product-minded builder based out of NYC with experience in machine learning and analytics.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => scrollToSection('projects')}
              >
                View projects
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => scrollToSection('contact')}
              >
                Get in touch
              </button>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src={portrait}
              alt="Yuyang Zhang"
              width={720}
              height={720}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>
      <button
        type="button"
        className="home-scroll-hint"
        onClick={() => scrollToSection('resume')}
        aria-label="Scroll to Resume"
      >
        <svg
          className="home-scroll-hint-arrow"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}
