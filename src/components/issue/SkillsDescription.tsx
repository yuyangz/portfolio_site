export function SkillsDescription() {
  return (
    <section id="description" className="issue-panel" aria-labelledby="desc-heading">
      <h2 id="desc-heading">Description</h2>
      <ul className="desc-skills">
        <li>
          <span className="desc-skills-label">Programming</span>
          <span>Python, SQL, R, Java</span>
        </li>
        <li>
          <span className="desc-skills-label">Product &amp; Development</span>
          <span>
            Agile, Jira, Confluence, Flask, Django, Cursor, Copilot Studio, Git
          </span>
        </li>
        <li>
          <span className="desc-skills-label">Data Science &amp; Analytics</span>
          <span>
            Pandas, NumPy, scikit-learn, NLTK, spaCy, gensim, BeautifulSoup,
            RegEx, Excel, Smartsheet, Power BI, SQLite, Tableau, Jupyter
          </span>
        </li>
      </ul>
    </section>
  )
}
