import { Navigate, createBrowserRouter, redirect } from "react-router-dom"
import { Home } from "pages/Home/Home"
import { WhoWeAre } from "pages/WhoWeAre/WhoWeAre"
import { Staff } from "pages/Staff/Staff"
import { ServicesOffered } from "pages/ServicesOffered/ServicesOffered"
import { UsedCar } from "pages/UsedCar/UsedCar"
import { VehiclesToAvoid } from "pages/VehiclesToAvoid/VehiclesToAvoid"
import { Appointment } from "pages/Appointment/Appointment"
import { Layout } from "pages/layout/Layout"

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

          if (name === "") return { name: "Required" }
          if (phone === "") return { phone: "Required" }
          if (email === "") return { email: "Required" }
          if (year === "") return { year: "Required" }
          if (make === "0") return { make: "Required" }
          if (model === "") return { model: "Required" }
          if (service1 + service2 + service3 === "000")
            return { service: "At least 1 is required" }
          if (date === "") return { date: "Required" }
          if (time === "") return { time: "Required" }

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

          const numericTime =
            Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60

          if (dayOfWeek === 6 && (numericTime < 8 || numericTime > 13.5))
            return { time: "Please select a time between 8:00 AM and 1:30 PM." }
          if (numericTime < 8 || numericTime > 17)
            return { time: "Please select a time between 8:00 AM and 5 PM." }

          const response = await fetch("http://127.0.0.1:5000/api", {
            method: "POST",
            signal: request.signal,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              phone,
              email,
              year,
              make,
              model,
              service1,
              service2,
              service3,
              date,
              time,
              additional,
            }),
          }).then(res => res.json())

          return { success: response.success }
        },
      },
    ],
  },
])
