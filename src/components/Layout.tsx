import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import './Layout.css'

export function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
