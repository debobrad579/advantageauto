import "./assets/layout.css"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

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
