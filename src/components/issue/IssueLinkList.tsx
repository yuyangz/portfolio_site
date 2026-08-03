import { Link } from 'react-router-dom'
import { ISSUES, issuePath, type IssueKey, type IssueType } from '../../data/issues'

function TypeIcon({ type }: { type: IssueType }) {
  if (type === 'epic') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect width="16" height="16" rx="3" fill="#904EE2" />
        <path
          d="M8 3.5l1.2 2.4 2.7.4-1.95 1.9.45 2.65L8 9.7l-2.4 1.25.45-2.65-1.95-1.9 2.7-.4L8 3.5z"
          fill="#fff"
        />
      </svg>
    )
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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

export function IssueLinkList({
  title,
  headingId,
  keys,
}: {
  title: string
  headingId: string
  keys: IssueKey[]
}) {
  if (keys.length === 0) return null

  return (
    <section className="issue-panel" aria-labelledby={headingId}>
      <div className="issue-panel-head">
        <h2 id={headingId}>{title}</h2>
        <span className="issue-count">{keys.length}</span>
      </div>
      <ul className="child-list">
        {keys.map((key) => {
          const linked = ISSUES[key]
          return (
            <li key={key}>
              <Link to={issuePath(key)} className="child-row">
                <span className="child-type-icon">
                  <TypeIcon type={linked.type} />
                </span>
                <span className="child-key">{linked.key}</span>
                <span className="child-summary">{linked.label}</span>
                <span className="child-status">In Progress</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
