import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { ScrollNavProvider, useScrollNav } from '../context/ScrollNavContext'
import './Layout.css'

function LayoutShell() {
  const { scrollRootRef } = useScrollNav()

  return (
    <div className="layout layout--snap">
      <Navbar />
      <main ref={scrollRootRef} className="main main--snap">
        <Outlet />
      </main>
    </div>
  )
}

export function Layout() {
  return (
    <ScrollNavProvider>
      <LayoutShell />
    </ScrollNavProvider>
  )
}
