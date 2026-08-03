import { Link } from 'react-router-dom'
import {
  ISSUES,
  issuePath,
  issueTitle,
  type IssueMeta,
  type IssueType,
} from '../../data/issues'

function TypeIcon({ type }: { type: IssueType }) {
  if (type === 'epic') {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect width="16" height="16" rx="3" fill="#904EE2" />
        <path
          d="M8 3.5l1.2 2.4 2.7.4-1.95 1.9.45 2.65L8 9.7l-2.4 1.25.45-2.65-1.95-1.9 2.7-.4L8 3.5z"
          fill="#fff"
        />
      </svg>
    )
  }

  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect width="16" height="16" rx="3" fill="#2684FF" />
      <path
        d="M4.5 8h7M8 4.5v7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IssueHeader({ issue }: { issue: IssueMeta }) {
  const parent = issue.parent ? ISSUES[issue.parent] : null
  const typeLabel = issue.type === 'epic' ? 'Home' : 'Feature'

  return (
    <header className="issue-header">
      <nav className="issue-hierarchy" aria-label="Issue hierarchy">
        {parent ? (
          <>
            <Link to={issuePath(parent.key)} className="issue-hierarchy-item">
              <span className="issue-type-icon">
                <TypeIcon type={parent.type} />
              </span>
              <span>{issueTitle(parent)}</span>
            </Link>
            <span className="issue-hierarchy-sep" aria-hidden>
              /
            </span>
          </>
        ) : null}
        <span className="issue-hierarchy-item issue-hierarchy-item--current">
          <span className="issue-type-icon" title={typeLabel}>
            <TypeIcon type={issue.type} />
          </span>
          <span>{issueTitle(issue)}</span>
        </span>
      </nav>
      <h1 className="issue-summary">{issue.summary}</h1>
    </header>
  )
}
