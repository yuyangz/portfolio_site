import { IssueLinkList } from './IssueLinkList'
import type { IssueKey } from '../../data/issues'

export function ChildIssues({ childKeys }: { childKeys: IssueKey[] }) {
  return (
    <IssueLinkList
      title="Child pages"
      headingId="children-heading"
      keys={childKeys}
    />
  )
}
