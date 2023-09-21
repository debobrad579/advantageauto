import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import logo from "./assets/logo.png"

export function Navbar() {
  const [dropdown, setDropdown] = useState()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1180) setDropdown(undefined)
      else setDropdown(false)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth > 1180) setDropdown(undefined)
    else setDropdown(false)
  }, [location])

  return (
    <nav>
      <NavLink to="/home">
        <img src={logo} />
      </NavLink>
      <label
        tabIndex="0"
        className={dropdown ? "active" : ""}
        onClick={() => setDropdown(prevDropdown => !prevDropdown)}
      >
        <span />
      </label>
      <ul className={dropdown == null ? "initial" : ""}>
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
    </nav>
  )
}
