import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { ISSUES, isIssueKey, type IssueKey } from '../data/issues'
import { IssueShell } from '../components/issue/IssueShell'
import { EpicDescription } from '../components/issue/EpicDescription'
import { ChildIssues } from '../components/issue/ChildIssues'
import {
  LinkedPages,
  linkedPageKeys,
} from '../components/issue/LinkedPages'
import { ExperienceDescription } from '../components/issue/ExperienceDescription'
import { EducationDescription } from '../components/issue/EducationDescription'
import { SkillsDescription } from '../components/issue/SkillsDescription'
import { IssueAttachments } from '../components/issue/IssueAttachments'
import { IssueComments } from '../components/issue/IssueComments'
import './IssuePage.css'

function IssueBody({ issueKey }: { issueKey: IssueKey }) {
  switch (issueKey) {
    case 'YZ-1':
      return (
        <>
          <EpicDescription />
          <ChildIssues childKeys={ISSUES['YZ-1'].children ?? []} />
          <IssueComments />
        </>
      )
    case 'YZ-2':
      return (
        <>
          <ExperienceDescription />
          <LinkedPages pageKeys={linkedPageKeys('YZ-2')} />
        </>
      )
    case 'YZ-3':
      return (
        <>
          <EducationDescription />
          <LinkedPages pageKeys={linkedPageKeys('YZ-3')} />
        </>
      )
    case 'YZ-4':
      return (
        <>
          <SkillsDescription />
          <IssueAttachments />
          <LinkedPages pageKeys={linkedPageKeys('YZ-4')} />
        </>
      )
  }
}

export function IssuePage({ issueKey }: { issueKey?: IssueKey }) {
  const params = useParams()
  const keyFromRoute = params.issueKey
  const resolved: IssueKey | null =
    issueKey ??
    (keyFromRoute && isIssueKey(keyFromRoute) ? keyFromRoute : null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [resolved])

  if (!resolved) {
    return <Navigate to="/" replace />
  }

  const issue = ISSUES[resolved]

  return (
    <IssueShell issue={issue}>
      <IssueBody issueKey={resolved} />
    </IssueShell>
  )
}
