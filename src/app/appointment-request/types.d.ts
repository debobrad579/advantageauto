import { ERROR_PREDICATES, checkForError } from "./errors"

export type FormInput =
  | "name"
  | "phone"
  | "email"
  | "year"
  | "make"
  | "model"
  | "service1"
  | "services"
  | "date"
  | "time"

export type FormError = {
  input: FormInput
  message: string
  predicate: keyof typeof ERROR_PREDICATES
}

export type FormState =
  | {
      status: "Client Error"
      error: FormError
    }
  | { status: "Not Submitted" | "Server Error" | "Success" }
