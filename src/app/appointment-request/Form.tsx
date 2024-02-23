"use client"

import { useFormState } from "react-dom"
import { Input } from "./_components/Input"
import { Select } from "./_components/Select"
import { MAKE_OPTIONS, SERVICE_OPTIONS } from "./constants"
import { sendEmail } from "./sendEmail"
import { Modal } from "./_components/Modal"
import { ButtonGroup } from "./_components/ButtonGroup"
import { checkForError } from "./errors"
import { useState } from "react"
import type { FormError, FormInput } from "./types"
import { FormGroup } from "./_components/FormGroup"
import { track } from "@vercel/analytics"
import { MakeSelect } from "./_components/MakeSelect"
import { ServicesSelect } from "./_components/ServicesSelect"

export function Form() {
  const [state, action] = useFormState(sendEmail, { status: "Not Submitted" })
  const [error, setError] = useState<FormError>()

  function getError(name: FormInput) {
    if (error?.input === name) return error
    if (state.status === "Client Error" && state.error.input === name)
      return state.error
  }

  return (
    <>
      <form
        className="form"
        autoComplete="off"
        noValidate
        action={async (formData) => {
          const error = checkForError(formData)
          if (error) return setError(error)
          track("Submit Appointment Request")
          setError(undefined)
          action(formData)
        }}
      >
        <div className="form-grid">
          <FormGroup title="Client Information">
            <Input labelText="Name:" name="name" error={getError("name")} />
            <Input labelText="Phone:" name="phone" error={getError("phone")} />
            <Input
              labelText="Email:"
              name="email"
              type="email"
              error={getError("email")}
            />
          </FormGroup>
          <FormGroup title="Vehicle Information">
            <Input labelText="Year:" name="year" error={getError("year")} />
            <MakeSelect error={getError("make")} />
            <Input labelText="Model:" name="model" error={getError("model")} />
          </FormGroup>
          <FormGroup title="Requested Service Information">
            <ServicesSelect error={getError("services")} />
            <Input
              labelText="Date:"
              name="date"
              type="date"
              error={getError("date")}
            />
            <Input
              labelText="Time:"
              name="time"
              type="time"
              error={getError("time")}
            />
          </FormGroup>
          <FormGroup title="Additional Information">
            <textarea name="additional" className="input textarea" />
          </FormGroup>
        </div>
        <ButtonGroup />
      </form>
      <Modal formState={state} />
    </>
  )
}
