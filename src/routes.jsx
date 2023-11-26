import { lazy } from "react"
import { Navigate } from "react-router-dom"
import { Layout } from "layout/index"
const Home = lazy(() => import("pages/Home/index.jsx"))
const WhoWeAre = lazy(() => import("pages/WhoWeAre/index.jsx"))
const Staff = lazy(() => import("pages/Staff/index.jsx"))
const ServicesOffered = lazy(() => import("pages/ServicesOffered/index.jsx"))
const UsedCar = lazy(() => import("pages/UsedCar/index.jsx"))
const VehiclesToAvoid = lazy(() => import("pages/VehiclesToAvoid/index.jsx"))
const Appointment = lazy(() => import("pages/Appointment/index.jsx"))

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "*", element: <h1>404 - Page not found.</h1> },
      {
        path: "/",
        errorElement: <h1>500 - Internal server error.</h1>,
        children: [
          { index: true, element: <Navigate to="home" /> },
          { path: "home", element: <Home /> },
          { path: "who-we-are", element: <WhoWeAre /> },
          { path: "staff", element: <Staff /> },
          { path: "services-offered", element: <ServicesOffered /> },
          { path: "buying-a-used-car", element: <UsedCar /> },
          { path: "vehicles-to-avoid", element: <VehiclesToAvoid /> },
          {
            path: "appointment-request",
            element: <Appointment />,
            action: async ({ request }) =>
              await import("pages/Appointment/handleSubmit").then(module =>
                module.handleSubmit(request)
              ),
          },
        ],
      },
    ],
  },
]
