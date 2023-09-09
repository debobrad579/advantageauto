import { Navigate, createBrowserRouter } from "react-router-dom"
import { Home } from "pages/Home/Home"
import { WhoWeAre } from "pages/WhoWeAre/WhoWeAre"
import { Staff } from "pages/Staff/Staff"
import { ServicesOffered } from "pages/ServicesOffered/ServicesOffered"
import { UsedCar } from "pages/UsedCar/UsedCar"
import { VehiclesToAvoid } from "pages/VehiclesToAvoid/VehiclesToAvoid"
import { Appointment } from "pages/Appointment/Appointment"
import { Layout } from "pages/layout/Layout"
import { handleSubmit } from "pages/Appointment/handleSubmit"

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
        action: handleSubmit,
      },
    ],
  },
])
