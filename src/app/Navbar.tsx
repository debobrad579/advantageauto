"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import logo from "@/img/logo.png"

export function Navbar() {
  const hamburgerRef = useRef<HTMLInputElement>(null)
  const [linkTabIndex, setLinkTabIndex] = useState<-1 | 0>(0)
  const pathname = usePathname()

  useEffect(() => {
    if (hamburgerRef.current != null) hamburgerRef.current.checked = false
  }, [pathname])

  useEffect(() => {
    determineLinkTabIndex()

    const handleResize = () => {
      determineLinkTabIndex()

      if (hamburgerRef.current != null && window.innerWidth > 1150)
        hamburgerRef.current.checked = false
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  function determineLinkTabIndex() {
    if (window.innerWidth > 1150 || hamburgerRef.current?.checked)
      setLinkTabIndex(0)
    else setLinkTabIndex(-1)
  }

  return (
    <nav>
      <Link href="/">
        <div className="logo-container">
          <Image src={logo} alt="Advantage Auto" sizes="190px" fill />
        </div>
      </Link>
      <label className="hamburger-menu">
        <input
          ref={hamburgerRef}
          type="checkbox"
          onClick={() => determineLinkTabIndex()}
        />
      </label>
      <ul>
        <li>
          <Link
            href="who-we-are"
            tabIndex={linkTabIndex}
            className={pathname === "/who-we-are" ? "active" : ""}
          >
            Who We Are
          </Link>
        </li>
        <li>
          <Link
            href="staff"
            tabIndex={linkTabIndex}
            className={pathname === "/staff" ? "active" : ""}
          >
            Staff
          </Link>
        </li>
        <li>
          <Link
            href="services-offered"
            tabIndex={linkTabIndex}
            className={pathname === "/services-offered" ? "active" : ""}
          >
            Services Offered
          </Link>
        </li>
        <li>
          <Link
            href="buying-a-used-car"
            tabIndex={linkTabIndex}
            className={pathname === "/buying-a-used-car" ? "active" : ""}
          >
            Buying a Used Car?
          </Link>
        </li>
        <li>
          <Link
            href="vehicles-to-avoid"
            tabIndex={linkTabIndex}
            className={pathname === "/vehicles-to-avoid" ? "active" : ""}
          >
            Vehicles to Avoid
          </Link>
        </li>
        <li>
          <Link
            href="appointment-request"
            tabIndex={linkTabIndex}
            className={pathname === "/appointment-request" ? "active" : ""}
          >
            Appointment Request
          </Link>
        </li>
      </ul>
    </nav>
  )
}
