import { beforeEach, describe, expect, it } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { routes } from "routes"

describe("Appointment page", () => {
  const user = userEvent.setup()

  async function fillOutForm(excludeInput = null) {
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

  let submitButton

  beforeEach(async () => {
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

    submitButton = await screen.findByText("Submit")
  })

  describe("Valid form data", () => {
    it("should submit form on valid form data", async () => {
      await fillOutForm()
      await user.click(submitButton)

      expect(
        await screen.findByText("Request Submitted Successfully")
      ).toBeInTheDocument()
    })

    describe("Success modal", () => {
      beforeEach(async () => {
        await fillOutForm()
        await user.click(submitButton)
      })
      it("should autofocus on close button", async () => {
        expect(await screen.findByText("Close")).toHaveFocus()
      })

      it("should close on close button click", async () => {
        await user.click(await screen.findByText("Close"))
        expect(
          screen.queryByText("Request Submitted Successfully")
        ).not.toBeInTheDocument()
      })

      it("should close on escape", async () => {
        await user.keyboard("{Escape}")
        expect(
          screen.queryByText("Request Submitted Successfully")
        ).not.toBeInTheDocument()
      })

      it("should close on click outside modal", async () => {
        await user.click(document.getElementsByClassName("modal")[0])
        expect(
          screen.queryByText("Request Submitted Successfully")
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("Invalid form data", () => {
    async function expectError(input, message) {
      expect(await screen.findByText(message)).toBeInTheDocument()
      expect(input).toHaveClass("error")
      expect(
        screen.queryByText("Request Submitted Successfully")
      ).not.toBeInTheDocument()
    }

    describe("Error popup", () => {
      it("should remove error on input change", async () => {
        await user.click(submitButton)
        await user.type(screen.getByLabelText("Name:"), "Test Name")

        expect(
          await waitFor(() => screen.queryByText("Please enter a name."))
        ).not.toBeInTheDocument()
        expect(screen.getByLabelText("Name:")).not.toHaveClass("error")
      })

      it("should rerender error on second invalid form submission", async () => {
        await user.click(submitButton)
        await user.type(screen.getByLabelText("Name:"), "Test Name")
        await user.clear(screen.getByLabelText("Name:"))
        await user.click(submitButton)
        await expectError(
          screen.getByLabelText("Name:"),
          "Please enter a name."
        )
      })

      it("should remove error popup on blur", async () => {
        await user.click(submitButton)
        await user.tab()

        expect(
          await waitFor(() => screen.queryByText("Please enter a name."))
        ).not.toBeInTheDocument()
        expect(screen.getByLabelText("Name:")).toHaveClass("error")
      })
    })

    describe("Invalid name", () => {
      it("should display required error on blank name", async () => {
        await fillOutForm("Name:")
        await user.click(submitButton)
        await expectError(
          screen.getByLabelText("Name:"),
          "Please enter a name."
        )
      })
    })

    describe("Invalid phone", () => {
      it("should display required error on blank phone", async () => {
        await fillOutForm("Phone:")
        await user.click(submitButton)
        await expectError(
          screen.getByLabelText("Phone:"),
          "Please enter a phone number."
        )
      })
    })

    describe("Invalid email", () => {
      let emailInput

      beforeEach(async () => {
        emailInput = screen.getByLabelText("Email:")
        await fillOutForm("Email:")
      })

      it("should display required error on blank email", async () => {
        await user.click(submitButton)
        await expectError(emailInput, "Please enter an email address.")
      })

      it("should display invalid email error on invalid email", async () => {
        await user.type(emailInput, "test")
        await user.click(submitButton)
        await expectError(emailInput, "Please enter a valid email address.")

        await user.clear(emailInput)
        await user.type(emailInput, "test@example")
        await user.click(submitButton)
        await expectError(emailInput, "Please enter a valid email address.")

        await user.clear(emailInput)
        await user.type(emailInput, "test@example.")
        await user.click(submitButton)
        await expectError(emailInput, "Please enter a valid email address.")
      })
    })

    describe("Invalid year", () => {
      let yearInput

      beforeEach(async () => {
        yearInput = screen.getByLabelText("Year:")
        await fillOutForm("Year:")
      })

      it("should display required error on blank year", async () => {
        await user.click(submitButton)
        await expectError(yearInput, "Please enter a year.")
      })

      it("should display only numeric error on non-numeric year", async () => {
        await user.type(yearInput, "2.718281828459")
        await user.click(submitButton)
        await expectError(yearInput, "Please enter a numeric year.")
      })

      it("should display under minimum error on year below 1900", async () => {
        await user.type(yearInput, "1800")
        await user.click(submitButton)
        await expectError(yearInput, "Please enter a year after 1900.")
      })

      it("should display over maximum error on year in the future", async () => {
        await user.type(yearInput, "10000")
        await user.click(submitButton)
        await expectError(yearInput, "Please enter a year in the past.")
      })
    })

    describe("Invalid make", () => {
      it("should display required error on unselected make", async () => {
        await fillOutForm("Make:")
        await user.click(submitButton)
        await expectError(
          screen.getByLabelText("Make:"),
          "Please select a make."
        )
      })
    })

    describe("Invalid model", () => {
      it("should display required error on blank model", async () => {
        await fillOutForm("Model:")
        await user.click(submitButton)
        await expectError(
          screen.getByLabelText("Model:"),
          "Please enter a model."
        )
      })
    })

    describe("Invalid services", () => {
      it("should display required error on no selected services", async () => {
        await fillOutForm("Services:")
        await user.click(submitButton)
        await expectError(
          screen.getByLabelText("Services:"),
          "Please select at least one service."
        )
      })
    })

    describe("Invalid date", () => {
      let dateInput

      beforeEach(async () => {
        dateInput = screen.getByLabelText("Date:")
        await fillOutForm("Date:")
      })

      it("should display required error on blank date", async () => {
        await user.click(submitButton)
        await expectError(dateInput, "Please select a date.")
      })

      it("should display only weekdays error on weekend date", async () => {
        await user.type(dateInput, "2023-09-17")
        await user.click(submitButton)
        await expectError(dateInput, "Please select a weekday.")
      })
    })

    describe("Invalid time", () => {
      let timeInput

      beforeEach(async () => {
        timeInput = screen.getByLabelText("Time:")
        await fillOutForm("Time:")
      })

      it("should display required error on blank time", async () => {
        await user.click(submitButton)
        await expectError(timeInput, "Please select a time.")
      })

      it("should display only open hours error on time during closed hours (Mon - Thu)", async () => {
        await user.type(timeInput, "07:30")
        await user.click(submitButton)
        await expectError(
          timeInput,
          "Please select a time between 8:00 AM and 5:00 PM."
        )

        await user.clear(timeInput)
        await user.type(timeInput, "17:30")
        await user.click(submitButton)
        await expectError(
          timeInput,
          "Please select a time between 8:00 AM and 5:00 PM."
        )
      })

      it("should display only open hours error on time during closed hours (Fri)", async () => {
        await user.clear(screen.getByLabelText("Date:"))
        await user.type(screen.getByLabelText("Date:"), "2023-09-15")

        await user.type(timeInput, "07:30")
        await user.click(submitButton)
        await expectError(
          timeInput,
          "Please select a time between 8:00 AM and 1:30 PM."
        )

        await user.clear(timeInput)
        await user.type(timeInput, "14:00")
        await user.click(submitButton)
        await expectError(
          timeInput,
          "Please select a time between 8:00 AM and 1:30 PM."
        )
      })
    })
  })
})
