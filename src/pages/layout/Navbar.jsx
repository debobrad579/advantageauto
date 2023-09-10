import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import logo from "./assets/logo.png"

export function Navbar() {
  const [dropdown, setDropdown] = useState()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setDropdown(undefined)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setDropdown(undefined)
  }, [location])

  return (
    <nav className={dropdown == null ? undefined : dropdown ? "down" : "up"}>
      <div>
        <NavLink id="navbar-logo" to="/home">
          <img id="navbar-logo-image" src={logo} />
        </NavLink>
        <div
          id="navbar-toggle"
          className={dropdown ? "active" : undefined}
          onClick={() => setDropdown(currentDropdown => !currentDropdown)}
        >
          <span />
          <span />
          <span />
        </div>
        <ul
          id="navbar-links"
          className={dropdown == null ? "initial" : dropdown ? "down" : "up"}
        >
          <li>
            <NavLink to="who-we-are">Who We Are</NavLink>
          </li>
          <li>
            <NavLink to="staff">Staff</NavLink>
          </li>
          <li>
            <NavLink to="services-offered">Services Offered</NavLink>
          </li>
          <li>
            <NavLink to="buying-a-used-car">Buying a Used Car?</NavLink>
          </li>
          <li>
            <NavLink to="vehicles-to-avoid">Vehicles to Avoid</NavLink>
          </li>
          <li>
            <NavLink to="appointment-request">Appointment Request</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
