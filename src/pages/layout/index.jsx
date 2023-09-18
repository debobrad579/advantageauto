import "./assets/layout.css"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "./Navbar"

export function Layout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <main>
        <Outlet />
      </main>
      <footer>
        <div>&copy; Advantage Auto</div>
        <div>All rights reserved.</div>
      </footer>
    </>
  )
}
