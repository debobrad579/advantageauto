"use client";

import { useFormState } from "react-dom";
import { Input } from "./_components/Input";
import { Select } from "./_components/Select";
import { MAKE_OPTIONS, SERVICE_OPTIONS } from "./constants";
import { sendEmail } from "./sendEmail";
import { Modal } from "./_components/Modal";
import { ButtonGroup } from "./_components/ButtonGroup";
import { checkForError } from "./errors";
import { useState } from "react";
import type { FormError, FormInput } from "./types";
import { InputGroup } from "./_components/InputGroup";
import { track } from "@vercel/analytics";

export function Form() {
  const [state, action] = useFormState(sendEmail, { status: "Not Submitted" });
  const [error, setError] = useState<FormError>();

  function getError(name: FormInput) {
    if (error?.input === name) return error;
    if (state.status === "Client Error" && state.error.input === name)
      return state.error;
  }

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        action={async (formData) => {
          const error = checkForError(formData);
          if (error) return setError(error);
          track("Submit Appointment Request");
          setError(undefined);
          action(formData);
        }}
      >
        <div className="grid-container">
          <InputGroup title="Client Information">
            <Input labelText="Name:" name="name" error={getError("name")} />
            <Input labelText="Phone:" name="phone" error={getError("phone")} />
            <Input
              labelText="Email:"
              name="email"
              type="email"
              error={getError("email")}
            />
          </InputGroup>
          <InputGroup title="Vehicle Information">
            <Input labelText="Year:" name="year" error={getError("year")} />
            <Select
              labelText="Make:"
              name="make"
              options={MAKE_OPTIONS}
              placeholder="Select a Make"
              error={getError("make")}
            />
            <Input labelText="Model:" name="model" error={getError("model")} />
          </InputGroup>
          <InputGroup title="Requested Service Information">
            <Select
              labelText="Services:"
              name="service1"
              options={SERVICE_OPTIONS}
              placeholder="Select a Service"
              error={getError("service1")}
            />
            <Select
              labelText=""
              name="service2"
              options={SERVICE_OPTIONS}
              placeholder="Select a Service"
            />
            <Select
              labelText=""
              name="service3"
              options={SERVICE_OPTIONS}
              placeholder="Select a Service"
            />
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
          </InputGroup>
          <InputGroup title="Additional Information">
            <textarea name="additional" className="input textarea" />
          </InputGroup>
        </div>
        <ButtonGroup />
      </form>
      <Modal formState={state} />
    </>
  );
}
