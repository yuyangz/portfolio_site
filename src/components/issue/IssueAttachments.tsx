import forkIcon from '../../assets/fork-icon.png'
import venmoLogo from '../../assets/venmo-logo.png'
import streamingMoviesThumb from '../../assets/streaming-movies-project.png'

type Project = {
  title: string
  description: string
  url?: string
  linkLabel?: string
  demoLinks?: Array<{ label: string; url: string }>
  image?: string
  imageFit?: 'contain' | 'cover'
}

const projects: Project[] = [
  {
    title: 'Forked — AI Restaurant Rating & Review Platform',
    description:
      'AI Restaurant discovery platform using Yelp, Google Reviews, and OpenAI',
    url: 'https://tryforked.com',
    linkLabel: 'Visit site',
    image: forkIcon,
  },
  {
    title: 'Venmo Group-Split Redesign',
    description:
      'Group-split redesign based on collaborative item claiming process with requester and requestee roles',
    url: 'https://bit.ly/4mo0Wgs',
    linkLabel: 'Presentation Demo',
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

function AttachmentRow({ p }: { p: Project }) {
  const hasInlineDemoLinks = Boolean(p.demoLinks?.length)
  const thumb = (
    <div className="attach-thumb" aria-hidden>
      {p.image ? (
        <img
          src={p.image}
          alt=""
          className={
            p.imageFit === 'cover' ? 'attach-thumb-img attach-thumb-img--cover' : 'attach-thumb-img'
          }
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="attach-thumb-fallback" />
      )}
    </div>
  )

  if (p.url && !hasInlineDemoLinks) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="attach-row attach-row--link"
        aria-label={`${p.title}: open in new tab`}
      >
        {thumb}
        <div className="attach-body">
          <div className="attach-title">{p.title}</div>
          <p className="attach-desc">{p.description}</p>
          <p className="attach-links attach-links--muted">
            {p.linkLabel ?? 'Visit site'}
          </p>
        </div>
      </a>
    )
  }

  return (
    <div className="attach-row">
      {thumb}
      <div className="attach-body">
        <div className="attach-title">{p.title}</div>
        <p className="attach-desc">{p.description}</p>
        {hasInlineDemoLinks ? (
          <p className="attach-links">
            {p.demoLinks?.map((link, index) => (
              <span key={link.label}>
                {index > 0 ? ' · ' : null}
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function IssueAttachments() {
  return (
    <section
      id="attachments"
      className="issue-panel"
      aria-labelledby="attach-heading"
    >
      <div className="issue-panel-head">
        <h2 id="attach-heading">Attachments</h2>
        <span className="issue-count">{projects.length}</span>
      </div>
      <ul className="attach-list">
        {projects.map((p) => (
          <li key={p.title}>
            <AttachmentRow p={p} />
          </li>
        ))}
      </ul>
    </section>
  )
}
