import { beforeEach, describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { fillOutForm, expectError, submit, renderPage, user } from "./utils"

describe("Invalid service information", () => {
  beforeEach(async () => {
    renderPage()
    await screen.findByText("Submit")
  })

  describe("Invalid services", () => {
    it("should display required error on no selected services", async () => {
      await fillOutForm("Services:")
      await submit()
      await expectError(
        screen.getByLabelText("Services:"),
        "Please select a service."
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
      await submit()
      await expectError(dateInput, "Please select a date.")
    })

    it("should display only weekdays error on weekend date", async () => {
      await user.type(dateInput, "2023-09-17")
      await submit()
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
      await submit()
      await expectError(timeInput, "Please select a time.")
    })

    it("should display only open hours error on time during closed hours (Mon - Thu)", async () => {
      await user.type(timeInput, "07:30")
      await submit()
      await expectError(
        timeInput,
        "Please select a time between 8:00 AM and 5:00 PM."
      )

      await user.clear(timeInput)
      await user.type(timeInput, "17:30")
      await expectError(
        timeInput,
        "Please select a time between 8:00 AM and 5:00 PM."
      )
    })

    it("should display only open hours error on time during closed hours (Fri)", async () => {
      await user.clear(screen.getByLabelText("Date:"))
      await user.type(screen.getByLabelText("Date:"), "2023-11-24")
      await user.clear(timeInput)
      await user.type(timeInput, "14:00")
      await submit()
      await expectError(
        timeInput,
        "Please select a time before 1:30 PM on Fridays."
      )
    })
  })
})
