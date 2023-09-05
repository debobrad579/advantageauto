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
      <Form method="post">
        <div className="grid-container">
          <Group title="Client Information">
            <Input label="Name:" name="name" />
            <Input label="Phone:" name="phone" type="tel" />
            <Input label="Email:" name="email" type="email" />
          </Group>
          <Group title="Vehicle Information">
            <Input label="Year:" name="year" type="number" />
            <Select label="Make:" name="make" options={MAKES} />
            <Input label="Model:" name="model" />
          </Group>
          <Group title="Requested Service Information">
            <Select
              label="Requested Service:"
              name="service1"
              options={SERVICES}
            />
            <Select label="" name="service2" options={SERVICES} />
            <Select label="" name="service3" options={SERVICES} />
            <Input label="Requested Date:" name="date" type="date" />
            <Input label="Requested Time:" name="time" type="time" />
          </Group>
          <Group title="Additional Information">
            <Textarea name="additional" />
          </Group>
        </div>
        <br />
        <div id="form-buttons">
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
