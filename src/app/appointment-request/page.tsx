import type { Metadata } from "next"
import { Form } from "./Form"
import "@/css/appointment.css"

export const metadata: Metadata = {
  title: "Appointment Request",
  description:
    "Request an appointment online here for any of our services your car may need.",
}

export default function AppointmentRequest() {
  return (
    <>
      <h1>Appointment Request</h1>
      <Form />
    </>
  )
}
