import "./assets/layout.css"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Suspense } from "react"
import { HelmetProvider } from "react-helmet-async"
import { Analytics } from "@vercel/analytics/react"

export function Layout() {
  return (
    <HelmetProvider>
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
      <Analytics />
    </HelmetProvider>
  )
}
