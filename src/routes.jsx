import { Navigate } from "react-router-dom"
import { Home } from "pages/Home/index"
import { WhoWeAre } from "pages/WhoWeAre/index"
import { Staff } from "pages/Staff/index"
import { ServicesOffered } from "pages/ServicesOffered/index"
import { UsedCar } from "pages/UsedCar/index"
import { VehiclesToAvoid } from "pages/VehiclesToAvoid/index"
import { Appointment } from "pages/Appointment/index"
import { Layout } from "pages/layout/index"
import { handleSubmit } from "pages/Appointment/handleSubmit"

export const routes = [
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
]
