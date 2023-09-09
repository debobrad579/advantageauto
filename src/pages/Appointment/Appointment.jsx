import "./assets/appointment.css"
import { Form, useActionData, useNavigation } from "react-router-dom"
import { Select } from "./components/Select"
import { Input } from "./components/Input"
import { Modal } from "./components/Modal"
import { MAKES, SERVICES } from "./constants"

export function Appointment() {
  const error = useActionData()
  const { state } = useNavigation()

  return (
    <>
      <h1>Appointment Request</h1>
      <Form method="post" autoComplete="off" noValidate>
        <div className="grid-container">
          <div>
            <h3>Client Information</h3>
            <div className="form-grid">
              <Input label="Name:" name="name" error={error?.name} />
              <Input
                label="Phone:"
                name="phone"
                type="tel"
                error={error?.phone}
              />
              <Input
                label="Email:"
                name="email"
                type="email"
                error={error?.email}
              />
            </div>
          </div>
          <div>
            <h3>Vehicle Information</h3>
            <div className="form-grid">
              <Input
                label="Year:"
                name="year"
                type="number"
                error={error?.year}
              />
              <Select
                label="Make:"
                defaultValue="Select a Make"
                name="make"
                options={MAKES}
                error={error?.make}
              />
              <Input label="Model:" name="model" error={error?.model} />
            </div>
          </div>
          <div>
            <h3>Service Information</h3>
            <div className="form-grid">
              <Select
                label="Requested Service:"
                defaultValue="Select a Service"
                name="service1"
                options={SERVICES}
                error={error?.service}
              />
              <Select
                label=""
                defaultValue="Select a Service"
                name="service2"
                options={SERVICES}
              />
              <Select
                label=""
                defaultValue="Select a Service"
                name="service3"
                options={SERVICES}
              />
              <Input
                label="Requested Date:"
                name="date"
                type="date"
                error={error?.date}
              />
              <Input
                label="Requested Time:"
                name="time"
                type="time"
                error={error?.time}
              />
            </div>
          </div>
          <div>
            <h3>Additional Information</h3>
            <textarea name="additional" className="input-field textarea" />
          </div>
        </div>
        <div className="form-buttons">
          <input
            type="submit"
            value={state === "submitting" ? "Submitting..." : "Submit"}
            disabled={state === "submitting"}
          />
          <input type="reset" value="Reset" disabled={state === "submitting"} />
        </div>
      </Form>
      <Modal error={error} />
    </>
  )
}
