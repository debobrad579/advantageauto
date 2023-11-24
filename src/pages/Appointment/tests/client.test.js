import { beforeEach, describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { fillOutForm, expectError, submit, renderPage, user } from "./utils"

describe("Invalid client information", () => {
  beforeEach(async () => {
    renderPage()
    await screen.findByText("Submit")
  })

  describe("Invalid name", () => {
    it("should display required error on blank name", async () => {
      await fillOutForm("Name:")
      await submit()
      await expectError(screen.getByLabelText("Name:"), "Please enter a name.")
    })
  })

  describe("Invalid phone", () => {
    it("should display required error on blank phone", async () => {
      await fillOutForm("Phone:")
      await submit()
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
      await submit()
      await expectError(emailInput, "Please enter an email address.")
    })

    it("should display invalid email error on invalid email", async () => {
      await user.type(emailInput, "test")
      await submit()
      await expectError(emailInput, "Please enter a valid email address.")

      await user.type(emailInput, "@example")
      await expectError(emailInput, "Please enter a valid email address.")

      await user.type(emailInput, ".c")
      await expectError(emailInput, "Please enter a valid email address.")
    })
  })
})
