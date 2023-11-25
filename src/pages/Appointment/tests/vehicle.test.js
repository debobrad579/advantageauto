import { beforeEach, describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { fillOutForm, expectError, submit, renderPage, user } from "./utils"

describe("Invalid vehicle information", () => {
  beforeEach(async () => {
    renderPage()
  })

  describe("Invalid year", () => {
    let yearInput

    beforeEach(async () => {
      await fillOutForm("Year:")
      yearInput = screen.getByLabelText("Year:")
    })

    it("should display 'Please enter a year.' on blank year", async () => {
      await submit()
      await expectError(yearInput, "Please enter a year.")
    })

    describe("should display 'Please enter an integer year.' on...", () => {
      it("decimal year", async () => {
        await user.type(yearInput, "2.718281828459")
        await submit()
        await expectError(yearInput, "Please enter an integer year.")
      })

      it("letter year", async () => {
        await user.type(yearInput, "e")
        await submit()
        await expectError(yearInput, "Please enter an integer year.")
      })
    })

    it("should display 'Please enter a year after 1900.' on year below 1900", async () => {
      await user.type(yearInput, "1899")
      await submit()
      await expectError(yearInput, "Please enter a year after 1900.")
    })

    it("should display 'Please enter a year in the past.' on year in the future", async () => {
      await user.type(yearInput, (new Date().getFullYear() + 1).toString())
      await submit()
      await expectError(yearInput, "Please enter a year in the past.")
    })
  })

  describe("Invalid make", () => {
    it("should display 'Please select a make.' on unselected make", async () => {
      await fillOutForm("Make:")
      await submit()
      await expectError(screen.getByLabelText("Make:"), "Please select a make.")
    })
  })

  describe("Invalid model", () => {
    it("should display 'Please enter a model.' on blank model", async () => {
      await fillOutForm("Model:")
      await submit()
      await expectError(
        screen.getByLabelText("Model:"),
        "Please enter a model."
      )
    })
  })
})
