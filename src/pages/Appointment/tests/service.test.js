import { beforeEach, describe, it } from "vitest"
import { screen } from "@testing-library/react"
import {
  fillOutForm,
  expectError,
  submit,
  renderPage,
  user,
  getCloseDay,
} from "./utils"

describe("Invalid service information", () => {
  beforeEach(async () => {
    renderPage()
  })

  describe("Invalid services", () => {
    it("should display 'Please select a service.' on unselected first service", async () => {
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
      await fillOutForm("Date:")
      dateInput = screen.getByLabelText("Date:")
    })

    it("should display 'Please select a date.' on blank date", async () => {
      await submit()
      await expectError(dateInput, "Please select a date.")
    })

    it("should display 'Please select a date in the future.' on past date", async () => {
      await user.type(dateInput, "2022-11-23")
      await submit()
      await expectError(dateInput, "Please select a date in the future.")
    })

    it("should display 'Please select a date within a year.' on date more than a year in the future", async () => {
      await user.type(dateInput, "2123-09-16")
      await submit()
      await expectError(dateInput, "Please select a date within a year.")
    })

    describe("should display 'Please select a weekday.' on...", () => {
      it("Saturday", async () => {
        await user.type(dateInput, getCloseDay("Saturday"))
        await submit()
        await expectError(dateInput, "Please select a weekday.")
      })

      it("Sunday", async () => {
        await user.type(dateInput, getCloseDay("Sunday"))
        await submit()
        await expectError(dateInput, "Please select a weekday.")
      })
    })
  })

  describe("Invalid time", () => {
    let timeInput

    beforeEach(async () => {
      await fillOutForm("Time:")
      timeInput = screen.getByLabelText("Time:")
    })

    it("should display 'Please select a time.' on blank time", async () => {
      await submit()
      await expectError(timeInput, "Please select a time.")
    })

    describe("should display 'Please select a time between 8:00 AM and 5:00 PM.' on time...", () => {
      it("before 8:00 AM", async () => {
        await user.type(timeInput, "07:30")
        await submit()
        await expectError(
          timeInput,
          "Please select a time between 8:00 AM and 5:00 PM."
        )
      })

      it("after 5:00 PM", async () => {
        await user.type(timeInput, "17:30")
        await submit()
        await expectError(
          timeInput,
          "Please select a time between 8:00 AM and 5:00 PM."
        )
      })
    })

    it("should display 'Please select a time before 1:30 PM on Fridays.' on time after 1:30 PM on a Friday", async () => {
      await user.clear(screen.getByLabelText("Date:"))
      await user.type(screen.getByLabelText("Date:"), getCloseDay("Friday"))
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
