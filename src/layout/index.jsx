import "./assets/layout.css"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Suspense } from "react"

export function Layout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <main>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <div>&copy; Advantage Auto</div>
        <div>All rights reserved.</div>
      </footer>
    </>
  )
}
