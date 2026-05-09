import forkIcon from '../assets/fork-icon.png'
import venmoLogo from '../assets/venmo-logo.png'
import streamingMoviesThumb from '../assets/streaming-movies-project.png'
import './pages.css'

type Project = {
  title: string
  description: string
  url?: string
  demoLinks?: Array<{ label: string; url: string }>
  image?: string
  /** Use cover for screenshots; default contain (e.g. logos). */
  imageFit?: 'contain' | 'cover'
}

const projects: Project[] = [
  {
    title: 'Forked — AI Restaurant Rating & Review Platform',
    description:
      'AI Restaurant discovery platform using Yelp, Google Reviews, and OpenAI',
    url: 'https://tryforked.com',
    image: forkIcon,
  },
  {
    title: 'Venmo Group-Split Redesign',
    description:
      'Group-split redesign based on collaborative item claiming process with requester and requestee roles',
    url: 'https://bit.ly/4mo0Wgs',
    image: venmoLogo,
  },
  {
    title: 'Pre-Streaming & Streaming Movie Classification Web App',
    description:
      'Classification model using TMDB dataset of over 200,000 movies to identify what era a movie is made in',
    demoLinks: [
      {
        label: 'Presentation Demo',
        url: 'https://www.youtube.com/watch?v=-mM6qu9rbdg',
      },
      {
        label: 'App Demo',
        url: 'https://youtu.be/AixAeLvU3ik',
      },
    ],
    image: streamingMoviesThumb,
    imageFit: 'cover',
  },
]

function ProjectTile({ p }: { p: Project }) {
  const hasInlineDemoLinks = Boolean(p.demoLinks?.length)
  const inner = (
    <>
      <div className="project-card-visual" aria-hidden>
        {p.image ? (
          <img
            src={p.image}
            alt=""
            className={`project-card-thumb${p.imageFit === 'cover' ? ' project-card-thumb--cover' : ''}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="project-card-placeholder" />
        )}
      </div>
      <h2>{p.title}</h2>
      <p>{p.description}</p>
      {hasInlineDemoLinks ? (
        <p className="project-demo-links">
          {p.demoLinks?.map((link, index) => (
            <span key={link.label}>
              {index > 0 ? ' | ' : null}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-demo-link"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
      ) : null}
    </>
  )

  const shellClass = 'project-card card card--interactive'

  if (p.url && !hasInlineDemoLinks) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
        aria-label={`${p.title}: open demo in new tab`}
      >
        {inner}
      </a>
    )
  }

  return (
    <article className={shellClass} tabIndex={0}>
      {inner}
    </article>
  )
}

export function Projects() {
  return (
    <div className="page projects">
      <header className="page-header">
        <h1>Projects</h1>
        <p className="page-intro projects-intro-caption">
          Selected work spanning product builds, UX research, and analytics —
          click each project to view demo.
        </p>
      </header>

      <ul className="project-grid">
        {projects.map((p) => (
          <li key={p.title}>
            <ProjectTile p={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
