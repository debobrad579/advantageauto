import { Navigate, createBrowserRouter } from "react-router-dom"
import { Home } from "pages/Home/Home"
import { WhoWeAre } from "pages/WhoWeAre/WhoWeAre"
import { Staff } from "pages/Staff/Staff"
import { ServicesOffered } from "pages/ServicesOffered/ServicesOffered"
import { UsedCar } from "pages/UsedCar/UsedCar"
import { VehiclesToAvoid } from "pages/VehiclesToAvoid/VehiclesToAvoid"
import { Appointment } from "pages/Appointment/Appointment"
import { Layout } from "pages/layout/Layout"
import emailjs from "@emailjs/browser"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: "*", element: <h1>404 - Page not found</h1> },
      { path: "home", element: <Home /> },
      { path: "who-we-are", element: <WhoWeAre /> },
      { path: "staff", element: <Staff /> },
      { path: "services-offered", element: <ServicesOffered /> },
      { path: "buying-a-used-car", element: <UsedCar /> },
      { path: "vehicles-to-avoid", element: <VehiclesToAvoid /> },
      {
        path: "appointment-request",
        element: <Appointment />,
        action: async ({ request }) => {
          const formData = await request.formData()

          const name = formData.get("name")
          const phone = formData.get("phone")
          const email = formData.get("email")
          const year = formData.get("year")
          const make = formData.get("make")
          const model = formData.get("model")
          const service1 = formData.get("service1")
          const service2 = formData.get("service2")
          const service3 = formData.get("service3")
          const date = formData.get("date")
          const time = formData.get("time")
          const additional = formData.get("additional")

          if (name === "") return { name: "Please enter a name." }
          if (phone === "") return { phone: "Please enter a phone number." }
          if (email === "") return { email: "Please enter an email address." }
          if (
            !email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          )
            return { email: "Please enter a valid email address. " }
          if (year === "") return { year: "Please enter a year." }
          if (make == null) return { make: "Please select a make." }
          if (model === "") return { model: "Please enter a model." }
          if (service1 == null && service2 == null && service3 == null)
            return { service: "Please select at least 1 service." }
          if (date === "") return { date: "Please select a date." }

          const [selectedYear, selectedMonth, selectedDay] = date
            .split("-")
            .map(Number)
          const dayOfWeek =
            (selectedDay +
              Math.floor((13 * (selectedMonth + 1)) / 5) +
              selectedYear +
              Math.floor(selectedYear / 4) -
              Math.floor(selectedYear / 100) +
              Math.floor(selectedYear / 400)) %
            7

          if ([0, 1].includes(dayOfWeek))
            return { date: "Please select a weekday." }

          if (time === "") return { time: "Please select a time." }

          const numericTime =
            Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60

          if (dayOfWeek === 6 && (numericTime < 8 || numericTime > 13.5))
            return { time: "Please select a time between 8:00 AM and 1:30 PM." }
          if (numericTime < 8 || numericTime > 17)
            return { time: "Please select a time between 8:00 AM and 5:00 PM." }

          return await emailjs
            .send(
              "service_ernk545",
              "template_n738fta",
              {
                name,
                phone,
                email,
                year,
                make: make.replace("+", " "),
                model,
                services: formatServices(service1, service2, service3),
                date: formatDate(date),
                time: formatTime(time),
                additional,
              },
              "z9wM1wbI41kkRotot"
            )
            .then(
              () => ({ success: true }),
              () => ({ success: false })
            )
        },
      },
    ],
  },
])

function formatServices(service1, service2, service3) {
  return [service1, service2, service3]
    .filter(i => i !== null)
    .map(i => i.replace("+", " "))
    .join(", ")
}

function formatDate(date) {
  try {
    const [year, month, day] = date.split("-").map(Number)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return `${monthNames[month - 1]} ${day}, ${year}`
  } catch (error) {
    return date
  }
}

function formatTime(time) {
  try {
    const [hour, minute] = time.split(":").map(Number)
    return `${hour % 12 !== 0 ? hour % 12 : 12}:${minute
      .toString()
      .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`
  } catch (error) {
    return time
  }
}