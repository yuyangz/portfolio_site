const ANCHORS = [
  { id: 'description', label: 'Description' },
  { id: 'attachments', label: 'Projects' },
  { id: 'comments', label: 'Contact' },
] as const

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="breadcrumb" aria-label="Breadcrumb">
          <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              className="brand-mark"
              src="/favicon.png"
              alt=""
              width={18}
              height={18}
              aria-hidden
            />
            <span className="brand-text">Portfolio</span>
          </button>
          <span className="breadcrumb-sep" aria-hidden>
            /
          </span>
          <span className="breadcrumb-key">YZ-1</span>
        </div>
        <nav className="nav" aria-label="Issue sections">
          {ANCHORS.map((a) => (
            <button
              key={a.id}
              type="button"
              className="nav-link"
              onClick={() => scrollToId(a.id)}
            >
              {a.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
