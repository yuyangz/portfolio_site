const experienceByCompany = [
  {
    company: 'NBCUniversal',
    location: 'New York, NY',
    roles: [
      {
        title: 'Product Management Intern',
        period: 'Jun 2026 — Present',
        subtitle: 'Summer Media Tech Program - Content Supply Chain Team',
      },
      {
        title: 'Product & Program Management Intern',
        period: 'Sep 2025 — May 2026',
        subtitle: 'Academic Year Program - Global Streaming',
      },
    ],
  },
  {
    company: 'SAP',
    location: 'Alpharetta, GA',
    roles: [
      {
        title: 'Strategy & Operations Intern',
        period: 'Jan 2025 — Jul 2025',
        subtitle: 'Global Revenue Operations',
        subtitle2: 'Product Management Shadowing - SuccessFactor GenAI Team',
      },
    ],
  },
] as const

type EduEntry = {
  school: string
  dates: string
  degree: string
  gpa?: string
  minor?: string
}

const education: EduEntry[] = [
  {
    school: 'Georgia Institute of Technology',
    dates: 'Expected Dec 2026',
    gpa: 'GPA 4.0/4.0',
    degree: 'Master of Science in Analytics — Focus in Business Analytics',
  },
  {
    school: 'Boston University',
    dates: 'Sep 2018 — May 2022',
    degree:
      'Bachelor of Arts in International Relations — Focus in International Economics & Business',
    minor: 'Minor in Computer Science',
  },
]

export function IssueDescription() {
  return (
    <section id="description" className="issue-panel" aria-labelledby="desc-heading">
      <h2 id="desc-heading">Description</h2>
      <p className="issue-lede">
        Hi, I&apos;m Yuyang Zhang. Based in NYC with experience across product
        management, analytics, and ML.
      </p>

      <div className="desc-block">
        <h3 className="desc-block-title">
          Experience{' '}
          <span className="desc-inline-hint">
            (For the full resume, reach out via Contact form below or LinkedIn.)
          </span>
        </h3>
        <div className="desc-companies">
          {experienceByCompany.map((block) => (
            <div key={block.company} className="desc-company">
              <div className="desc-company-head">
                <strong>{block.company}</strong>
                <span className="desc-muted">{block.location}</span>
              </div>
              <ul className="desc-role-list">
                {block.roles.map((role) => (
                  <li key={`${role.title}-${role.period}`}>
                    <div className="desc-role-row">
                      <span className="desc-role-title">{role.title}</span>
                      <span className="desc-muted">{role.period}</span>
                    </div>
                    {'subtitle' in role && role.subtitle ? (
                      <p className="desc-role-sub">{role.subtitle}</p>
                    ) : null}
                    {'subtitle2' in role && role.subtitle2 ? (
                      <p className="desc-role-sub">{role.subtitle2}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="desc-block">
        <h3 className="desc-block-title">Education</h3>
        <ul className="desc-edu">
          {education.map((e) => (
            <li key={e.school}>
              <div className="desc-role-row">
                <strong>{e.school}</strong>
                <span className="desc-muted">{e.dates}</span>
              </div>
              <div className="desc-role-row">
                <span>{e.degree}</span>
                {e.gpa ? <span className="desc-muted">{e.gpa}</span> : null}
              </div>
              {e.minor ? <p className="desc-role-sub">{e.minor}</p> : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="desc-block">
        <h3 className="desc-block-title">Skills</h3>
        <ul className="desc-skills">
          <li>
            <span className="desc-skills-label">Programming</span>
            <span>Python, SQL, R, Java</span>
          </li>
          <li>
            <span className="desc-skills-label">Product &amp; development</span>
            <span>
              Agile, Jira, Confluence, Flask, Django, Cursor, Copilot Studio
            </span>
          </li>
          <li>
            <span className="desc-skills-label">Data science &amp; analytics</span>
            <span>
              Pandas, NumPy, scikit-learn, NLTK, spaCy, gensim, BeautifulSoup,
              RegEx, Excel, Smartsheet, Power BI, SQLite, Tableau, Jupyter
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}
