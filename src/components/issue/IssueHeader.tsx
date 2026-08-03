export function IssueHeader() {
  return (
    <header className="issue-header">
      <div className="issue-meta-row">
        <span className="issue-type" title="Story">
          <span className="issue-type-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect width="16" height="16" rx="3" fill="#63BA3C" />
              <path
                d="M4 8.2l2.2 2.2L12 4.8"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="issue-key">YZ-1</span>
        </span>
      </div>
      <h1 className="issue-summary">
        Product-minded builder — PM, analytics &amp; machine learning
      </h1>
    </header>
  )
}
