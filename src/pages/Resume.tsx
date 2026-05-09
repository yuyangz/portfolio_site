import './pages.css'

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
        subtitle:
          'Academic Year Program - Global Streaming',
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
    degree:
      'Master of Science in Analytics — Focus in Business Analytics',
  },
  {
    school: 'Boston University',
    dates: 'Sep 2018 — May 2022',
    degree:
      'Bachelor of Arts in International Relations — Focus in International Economics & Business',
    minor: 'Minor in Computer Science',
  },
]

export function Resume() {
  return (
    <div className="page resume">
      <header className="page-header">
        <h1>Resume</h1>
        <p className="resume-caption">
          (For full resume, please reach out via the Contact form or LinkedIn.)
        </p>
      </header>

      <section className="resume-section">
        <h2>Experience</h2>
        <div className="resume-company-blocks">
          {experienceByCompany.map((block) => (
            <div key={block.company} className="resume-company">
              <div className="resume-company-head">
                <h3>{block.company}</h3>
                <span className="resume-location">{block.location}</span>
              </div>
              <ul className="resume-role-list">
                {block.roles.map((role) => (
                  <li key={`${role.title}-${role.period}`}>
                    <div className="resume-role-row">
                      <span className="resume-role-title">{role.title}</span>
                      <span className="resume-period">{role.period}</span>
                    </div>
                    {'subtitle' in role && role.subtitle ? (
                      <p className="resume-role-subtitle">{role.subtitle}</p>
                    ) : null}
                    {'subtitle2' in role && role.subtitle2 ? (
                      <p className="resume-role-subtitle">{role.subtitle2}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        <ul className="resume-edu">
          {education.map((e) => (
            <li key={e.school}>
              <div className="resume-edu-row">
                <span className="resume-edu-school">{e.school}</span>
                <span className="resume-edu-dates">{e.dates}</span>
              </div>
              {e.gpa ? (
                <div className="resume-edu-degree-row">
                  <div className="resume-edu-degree">{e.degree}</div>
                  <span className="resume-edu-gpa">{e.gpa}</span>
                </div>
              ) : (
                <div className="resume-edu-degree">{e.degree}</div>
              )}
              {e.minor ? (
                <div className="resume-edu-minor">{e.minor}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume-section">
        <h2>Skills</h2>
        <ul className="resume-skills-list">
          <li>
            <div className="resume-skills-label">Programming languages</div>
            <p className="resume-skills-items">Python, SQL, R, Java</p>
          </li>
          <li>
            <div className="resume-skills-label">Product & development</div>
            <p className="resume-skills-items">
              Agile, Jira, Confluence, Flask, Django, Cursor, Copilot Studio
            </p>
          </li>
          <li>
            <div className="resume-skills-label">Data science & analytics</div>
            <p className="resume-skills-items">
              Pandas, NumPy, scikit-learn, NLTK, spaCy, gensim, BeautifulSoup, RegEx, Excel, Smartsheet, Power BI, SQLite, Tableau, Jupyter Notebook
            </p>
          </li>
        </ul>
      </section>
    </div>
  )
}
