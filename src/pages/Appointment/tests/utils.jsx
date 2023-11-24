import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "routes"
import { expect } from "vitest"

export const user = userEvent.setup()

export async function fillOutForm(excludeInput = null) {
  const inputs = {
    "Name:": "Test Name",
    "Phone:": "1-800-TEST",
    "Email:": "test@example.com",
    "Year:": "2000",
    "Make:": "Ford",
    "Model:": "F 150",
    "Services:": "Brakes",
    "Date:": "2023-09-14",
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
  expect(
    screen.queryByText("Request Submitted Successfully")
  ).not.toBeInTheDocument()
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
