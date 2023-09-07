import "./assets/appointment.css"
import { Form, useActionData, useNavigation } from "react-router-dom"
import { Select } from "./components/Select"
import { Input } from "./components/Input"
import { Group } from "./components/Group"
import { Textarea } from "./components/Textarea"
import { Modal } from "./components/Modal"
import { MAKES, SERVICES } from "./constants"

export function Appointment() {
  const error = useActionData()
  const { state } = useNavigation()
  const isSubmitting = state === "submitting"

  return (
    <>
      <h1>Appointment Request</h1>
      <Form method="post" autoComplete="off" noValidate>
        <div className="grid-container">
          <Group title="Client Information">
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
          </Group>
          <Group title="Vehicle Information">
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
          </Group>
          <Group title="Requested Service Information">
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
          </Group>
          <Group title="Additional Information">
            <Textarea name="additional" />
          </Group>
        </div>
        <br />
        <div className="form-buttons">
          <input
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
          />
          <input type="reset" value="Reset" disabled={isSubmitting} />
        </div>
      </Form>
      <Modal success={error?.success} />
    </>
  )
}
