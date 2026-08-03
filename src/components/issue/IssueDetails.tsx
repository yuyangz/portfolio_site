import portrait from '../../assets/portrait.png'

const LABELS = [
  'Python',
  'SQL',
  'Product',
  'Analytics',
  'ML',
  'Agile',
  'Jira',
] as const

function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg
      className="issue-chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d={up ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IssueDetails() {
  return (
    <div className="issue-sidebar">
      <button type="button" className="issue-status-btn issue-status--enter" tabIndex={-1}>
        In Progress
        <Chevron />
      </button>
      <aside className="issue-details" aria-label="Issue details">
        <div className="issue-details-header">
          <h2 className="issue-details-title">Details</h2>
          <Chevron up />
        </div>
        <dl className="issue-fields">
          <div className="issue-field">
            <dt>Assignee</dt>
            <dd className="issue-field-person">
              <img
                src={portrait}
                alt=""
                className="issue-avatar issue-avatar--xs"
                width={24}
                height={24}
              />
              Yuyang Zhang
            </dd>
          </div>
          <div className="issue-field">
            <dt>Reporter</dt>
            <dd className="issue-field-person">
              <img
                src={portrait}
                alt=""
                className="issue-avatar issue-avatar--xs"
                width={24}
                height={24}
              />
              Yuyang Zhang
            </dd>
          </div>
          <div className="issue-field">
            <dt>Priority</dt>
            <dd>
              <span className="issue-priority">
                <span className="issue-priority-bars" aria-hidden>
                  <span />
                  <span />
                </span>
                High
              </span>
            </dd>
          </div>
          <div className="issue-field">
            <dt>Location</dt>
            <dd>New York, NY</dd>
          </div>
          <div className="issue-field">
            <dt>Labels</dt>
            <dd className="issue-labels">
              {LABELS.map((label) => (
                <span key={label} className="issue-label">
                  {label}
                </span>
              ))}
            </dd>
          </div>
          <div className="issue-field">
            <dt>Links</dt>
            <dd className="issue-detail-links">
              <a
                href="https://www.linkedin.com/in/yuyang-zhang"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://yuyangthephotographer.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Photography
              </a>
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  )
}
