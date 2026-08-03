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

export function EducationDescription() {
  return (
    <section id="description" className="issue-panel" aria-labelledby="desc-heading">
      <h2 id="desc-heading">Description</h2>
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
    </section>
  )
}
