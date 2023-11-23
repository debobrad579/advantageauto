import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import "assets/styles.css"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </HelmetProvider>
  </React.StrictMode>
)
