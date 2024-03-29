import "./assets/appointment.css"
import { Form, useActionData, useNavigation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Select } from "./Select"
import { Input } from "./Input"
import { Modal } from "./Modal"
import { MAKES, SERVICES } from "./constants"

export default function Appointment() {
  const error = useActionData()
  const { state } = useNavigation()

  return (
    <>
      <Helmet>
        <title>Appointment Request | Advantage Auto</title>
        <meta
          name="description"
          content="Book an appointment online here to get any auto service your vehicle may need."
        />
      </Helmet>
      <h1>Appointment Request</h1>
      <Form method="post" autoComplete="off" noValidate>
        <div className="grid-container">
          <div>
            <h3>Client Information</h3>
            <div className="form-group">
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
            <div className="form-group">
              <Input
                label="Year:"
                name="year"
                inputProps={{ inputMode: "numeric" }}
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
            <div className="form-group">
              <Select
                label="Services:"
                defaultValue="Select a Service"
                name="service1"
                options={SERVICES}
                error={error?.service1}
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
                label="Date:"
                name="date"
                type="date"
                error={error?.date}
              />
              <Input
                label="Time:"
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
            className="button"
            type="submit"
            value={state === "submitting" ? "Submitting..." : "Submit"}
            disabled={state === "submitting"}
          />
          <input
            className="button"
            type="reset"
            value="Reset"
            disabled={state === "submitting"}
          />
        </div>
      </Form>
      <Modal error={error} />
    </>
  )
}
