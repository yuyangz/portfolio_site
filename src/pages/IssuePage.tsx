import { IssueHeader } from '../components/issue/IssueHeader'
import { IssueDetails } from '../components/issue/IssueDetails'
import { IssueDescription } from '../components/issue/IssueDescription'
import { IssueAttachments } from '../components/issue/IssueAttachments'
import { IssueComments } from '../components/issue/IssueComments'
import './IssuePage.css'

export function IssuePage() {
  return (
    <div className="issue-page">
      <article className="issue-ticket" aria-label="Issue YZ-1">
        <IssueHeader />
        <div className="issue-body">
          <div className="issue-main">
            <IssueDescription />
            <IssueAttachments />
            <IssueComments />
          </div>
          <IssueDetails />
        </div>
        <footer className="issue-footer">
          © {new Date().getFullYear()} Yuyang Zhang
        </footer>
      </article>
    </div>
  )
}
