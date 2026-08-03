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

export function ExperienceDescription() {
  return (
    <section id="description" className="issue-panel" aria-labelledby="desc-heading">
      <h2 id="desc-heading">Description</h2>
      <p className="issue-panel-hint">
        (For the full resume, reach out via Contact on the Epic or LinkedIn.)
      </p>
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
    </section>
  )
}
