import { beforeEach, describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { fillOutForm, expectError, submit, renderPage, user } from "./utils"

describe("Invalid vehicle information", () => {
  beforeEach(async () => {
    renderPage()
    await screen.findByText("Submit")
  })

  describe("Invalid year", () => {
    let yearInput

    beforeEach(async () => {
      yearInput = screen.getByLabelText("Year:")
      await fillOutForm("Year:")
    })

    it("should display required error on blank year", async () => {
      await submit()
      await expectError(yearInput, "Please enter a year.")
    })

    it("should display only numeric error on non-numeric year", async () => {
      await user.type(yearInput, "2.718281828459")
      await submit()
      await expectError(yearInput, "Please enter a numeric year.")
    })

    it("should display under minimum error on year below 1900", async () => {
      await user.type(yearInput, "1800")
      await submit()
      await expectError(yearInput, "Please enter a year after 1900.")
    })

    it("should display over maximum error on year in the future", async () => {
      await user.type(yearInput, "10000")
      await submit()
      await expectError(yearInput, "Please enter a year in the past.")
    })
  })

  describe("Invalid make", () => {
    it("should display required error on unselected make", async () => {
      await fillOutForm("Make:")
      await submit()
      await expectError(screen.getByLabelText("Make:"), "Please select a make.")
    })
  })

  describe("Invalid model", () => {
    it("should display required error on blank model", async () => {
      await fillOutForm("Model:")
      await submit()
      await expectError(
        screen.getByLabelText("Model:"),
        "Please enter a model."
      )
    })
  })
})
