"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import logo from "@/img/logo.png"

export function Navbar() {
  const hamburgerRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (hamburgerRef.current != null) hamburgerRef.current.checked = false
  }, [pathname])

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="logo-container">
          <Image src={logo} alt="Advantage Auto" sizes="190px" fill />
        </div>
      </Link>
      <label className="hamburger-menu">
        <input ref={hamburgerRef} type="checkbox" />
      </label>
      <ul className="navbar-links">
        <li>
          <Link
            href="who-we-are"
            className={pathname === "/who-we-are" ? "active" : ""}
          >
            Who We Are
          </Link>
        </li>
        <li>
          <Link href="staff" className={pathname === "/staff" ? "active" : ""}>
            Staff
          </Link>
        </li>
        <li>
          <Link
            href="services-offered"
            className={pathname === "/services-offered" ? "active" : ""}
          >
            Services Offered
          </Link>
        </li>
        <li>
          <Link
            href="buying-a-used-car"
            className={pathname === "/buying-a-used-car" ? "active" : ""}
          >
            Buying a Used Car?
          </Link>
        </li>
        <li>
          <Link
            href="vehicles-to-avoid"
            className={pathname === "/vehicles-to-avoid" ? "active" : ""}
          >
            Vehicles to Avoid
          </Link>
        </li>
        <li>
          <Link
            href="appointment-request"
            className={pathname === "/appointment-request" ? "active" : ""}
          >
            Appointment Request
          </Link>
        </li>
      </ul>
    </nav>
  )
}
