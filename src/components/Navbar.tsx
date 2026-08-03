import { Link, NavLink } from 'react-router-dom'
import { NAV_ISSUES, issuePath } from '../data/issues'

export function Navbar() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img
            className="brand-mark"
            src="/favicon.png"
            alt=""
            width={18}
            height={18}
            aria-hidden
          />
          <span className="brand-text">Portfolio</span>
        </Link>
        <nav className="nav" aria-label="Issues">
          {NAV_ISSUES.map((item) => (
            <NavLink
              key={item.key}
              to={issuePath(item.key)}
              end={item.key === 'YZ-1'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link--active' : ''}`
              }
            >
              {item.navLabel}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
