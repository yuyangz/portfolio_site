const skillGroups = [
  {
    category: 'Programming',
    items: 'Python, SQL, R, Java',
  },
  {
    category: 'Product & Development',
    items: 'Agile, Jira, Confluence, Flask, Django, Cursor, Copilot Studio, Git',
  },
  {
    category: 'Data Science & Analytics',
    items:
      'Pandas, NumPy, scikit-learn, NLTK, spaCy, gensim, BeautifulSoup, RegEx, Excel, Smartsheet, Power BI, SQLite, Tableau, Jupyter',
  },
] as const

export function SkillsDescription() {
  return (
    <section id="description" className="issue-panel" aria-labelledby="desc-heading">
      <h2 id="desc-heading">Description</h2>
      <div className="desc-companies">
        {skillGroups.map((group) => (
          <div key={group.category} className="desc-company">
            <div className="desc-company-head">
              <strong>{group.category}</strong>
            </div>
            <p className="desc-role-title desc-skills-items">{group.items}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
