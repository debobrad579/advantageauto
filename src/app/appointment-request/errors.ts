import { addYears, isAfter, isBefore, isWeekend, parse } from "date-fns"
import type { FormInput } from "./types"

export const ERROR_PREDICATES = {
  required: (value: string) => value === "" || value === "0",
  validEmail: (value: string) =>
    !value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  integer: (value: string) => !/^[0-9]*$/.test(value),
  after1900: (value: string) => parseInt(value) < 1900,
  inThePast: (value: string) => parseInt(value) > new Date().getFullYear(),
  inTheFuture: (value: string) =>
    isBefore(parse(value, "yyyy-MM-dd", new Date()), new Date()),
  withinAYear: (value: string) =>
    isAfter(parse(value, "yyyy-MM-dd", new Date()), addYears(new Date(), 1)),
  weekday: (value: string) => isWeekend(parse(value, "yyyy-MM-dd", new Date())),
  duringBusinessHours: (value: string) => {
    const numericTime =
      Number(value.slice(0, 2)) + Number(value.slice(3, 5)) / 60
    return numericTime < 8 || numericTime > 17
  },
}

export const POSSIBLE_ERRORS: {
  [Name in FormInput]: {
    message: string
    predicate: keyof typeof ERROR_PREDICATES
  }[]
} = {
  name: [
    {
      message: "Please enter a name.",
      predicate: "required",
    },
  ],
  phone: [
    {
      message: "Please enter a phone number.",
      predicate: "required",
    },
  ],
  email: [
    {
      message: "Please enter an email address.",
      predicate: "required",
    },
    {
      message: "Please enter a valid email address.",
      predicate: "validEmail",
    },
  ],
  year: [
    {
      message: "Please enter a year.",
      predicate: "required",
    },
    {
      message: "Please enter an integer year.",
      predicate: "integer",
    },
    {
      message: "Please enter a year after 1900.",
      predicate: "after1900",
    },
    {
      message: "Please enter a year in the past.",
      predicate: "inThePast",
    },
  ],
  make: [
    {
      message: "Please select a make.",
      predicate: "required",
    },
  ],
  model: [
    {
      message: "Please enter a model.",
      predicate: "required",
    },
  ],
  service1: [
    {
      message: "Please select a service.",
      predicate: "required",
    },
  ],
  date: [
    {
      message: "Please select a date.",
      predicate: "required",
    },
    {
      message: "Please select a date in the future.",
      predicate: "inTheFuture",
    },
    {
      message: "Please select a date within a year.",
      predicate: "withinAYear",
    },
    {
      message: "Please select a weekday.",
      predicate: "weekday",
    },
  ],
  time: [
    {
      message: "Please select a time.",
      predicate: "required",
    },
    {
      message: "Please select a time between 8:00 AM and 5:00 PM.",
      predicate: "duringBusinessHours",
    },
  ],
}

export function checkForError(formData: FormData) {
  let key: FormInput

  for (key in POSSIBLE_ERRORS) {
    const value = formData.get(key)
    for (let i = 0; i < POSSIBLE_ERRORS[key].length; i++) {
      if (value == null) continue
      if (ERROR_PREDICATES[POSSIBLE_ERRORS[key][i].predicate](value.toString()))
        return {
          input: key,
          message: POSSIBLE_ERRORS[key][i].message,
          predicate: POSSIBLE_ERRORS[key][i].predicate,
        }
    }
  }
}
