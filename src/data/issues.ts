export type IssueType = 'epic' | 'feature'

export type IssueKey = 'YZ-1' | 'YZ-2' | 'YZ-3' | 'YZ-4'

export type IssueMeta = {
  key: IssueKey
  type: IssueType
  /** Short nav / child-list label */
  label: string
  /** Full issue summary title */
  summary: string
  parent?: IssueKey
  children?: IssueKey[]
}

export const ISSUES: Record<IssueKey, IssueMeta> = {
  'YZ-1': {
    key: 'YZ-1',
    type: 'epic',
    label: 'Home',
    summary: 'Product-minded builder — PM, analytics, & machine learning',
    children: ['YZ-2', 'YZ-3', 'YZ-4'],
  },
  'YZ-2': {
    key: 'YZ-2',
    type: 'feature',
    label: 'Experience',
    summary: 'Experience',
    parent: 'YZ-1',
  },
  'YZ-3': {
    key: 'YZ-3',
    type: 'feature',
    label: 'Education',
    summary: 'Education',
    parent: 'YZ-1',
  },
  'YZ-4': {
    key: 'YZ-4',
    type: 'feature',
    label: 'Skills & Projects',
    summary: 'Skills & Projects',
    parent: 'YZ-1',
  },
}

export const ISSUE_KEYS = Object.keys(ISSUES) as IssueKey[]

export const NAV_ISSUES: { key: IssueKey; navLabel: string }[] = [
  { key: 'YZ-1', navLabel: 'Home' },
  { key: 'YZ-2', navLabel: 'Experience' },
  { key: 'YZ-3', navLabel: 'Education' },
  { key: 'YZ-4', navLabel: 'Projects' },
]

export function issueTitle(issue: IssueMeta): string {
  return `${issue.key} ${issue.label}`
}

export function isIssueKey(value: string): value is IssueKey {
  return value in ISSUES
}

export function issuePath(key: IssueKey): string {
  return key === 'YZ-1' ? '/' : `/${key}`
}

/** Sibling feature pages under the same parent (excludes `key`). */
export function linkedIssueKeys(key: IssueKey): IssueKey[] {
  const issue = ISSUES[key]
  if (!issue.parent) return []
  const siblings = ISSUES[issue.parent].children ?? []
  return siblings.filter((k) => k !== key)
}

