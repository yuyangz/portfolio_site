import { IssueLinkList } from './IssueLinkList'
import { ISSUES, type IssueKey } from '../../data/issues'

/** Sibling feature pages under the same parent, excluding the current issue. */
export function linkedPageKeys(currentKey: IssueKey): IssueKey[] {
  const issue = ISSUES[currentKey]
  if (!issue.parent) return []
  const siblings = ISSUES[issue.parent].children ?? []
  return siblings.filter((key) => key !== currentKey)
}

export function LinkedPages({ pageKeys }: { pageKeys: IssueKey[] }) {
  return (
    <IssueLinkList
      title="Linked pages"
      headingId="linked-heading"
      keys={pageKeys}
    />
  )
}
