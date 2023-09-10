import "./assets/layout.css"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function Layout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <div id="content">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
