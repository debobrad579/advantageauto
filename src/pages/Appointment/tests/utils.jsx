import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { addDays, format, getDay } from "date-fns"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "routes"
import { expect } from "vitest"

export const user = userEvent.setup()

export function getCloseDay(dayOfWeek) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  return format(
    addDays(
      new Date(),
      ((daysOfWeek.indexOf(dayOfWeek) - getDay(new Date()) + 7) % 7) + 7
    ),
    "yyyy-MM-dd"
  )
}

export async function fillOutForm(excludeInput = null) {
  await screen.findByText("Submit")

  const inputs = {
    "Name:": "Test Name",
    "Phone:": "1-800-TEST",
    "Email:": "test@example.com",
    "Year:": "2000",
    "Make:": "Ford",
    "Model:": "F 150",
    "Services:": "Brakes",
    "Date:": getCloseDay("Wednesday"),
    "Time:": "10:30",
  }

  for (const label of Object.keys(inputs)) {
    if (label !== excludeInput) {
      if (label === "Make:" || label === "Services:") {
        await user.selectOptions(screen.getByLabelText(label), inputs[label])
      } else {
        await user.type(screen.getByLabelText(label), inputs[label])
      }
    }
  }
}

export async function expectError(input, message) {
  expect(await screen.findByText(message)).toBeInTheDocument()
  expect(input).toHaveClass("error")
}

export async function submit() {
  const user = userEvent.setup()
  await user.click(await screen.findByText("Submit"))
}

export async function renderPage() {
  render(<div id="modal-container" />)
  render(
    <>
      <RouterProvider
        router={createMemoryRouter(routes, {
          initialEntries: [{ pathname: "/appointment-request" }],
        })}
      />
    </>
  )
}
