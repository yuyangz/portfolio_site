import type { ReactNode } from 'react'
import type { IssueMeta } from '../../data/issues'
import { IssueHeader } from './IssueHeader'
import { IssueDetails } from './IssueDetails'
import '../../pages/IssuePage.css'

type IssueShellProps = {
  issue: IssueMeta
  children: ReactNode
}

export function IssueShell({ issue, children }: IssueShellProps) {
  return (
    <div className="issue-page">
      <article className="issue-ticket" aria-label={`Issue ${issue.key}`}>
        <IssueHeader issue={issue} />
        <div className="issue-body">
          <div className="issue-main">{children}</div>
          <IssueDetails issue={issue} />
        </div>
        <footer className="issue-footer">
          © {new Date().getFullYear()} Yuyang Zhang
        </footer>
      </article>
    </div>
  )
}
