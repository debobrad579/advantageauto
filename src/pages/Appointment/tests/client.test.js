import { beforeEach, describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { fillOutForm, expectError, submit, renderPage, user } from "./utils"

describe("Invalid client information", () => {
  beforeEach(async () => {
    renderPage()
  })

  describe("Invalid name", () => {
    it("should display 'Please enter a name.' on blank name", async () => {
      await fillOutForm("Name:")
      await submit()
      await expectError(screen.getByLabelText("Name:"), "Please enter a name.")
    })
  })

  describe("Invalid phone", () => {
    it("should display 'Please enter a phone number.' on blank phone", async () => {
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
      await fillOutForm("Email:")
      emailInput = screen.getByLabelText("Email:")
    })

    it("should display 'Please enter an email address.' on blank email", async () => {
      await submit()
      await expectError(emailInput, "Please enter an email address.")
    })

    describe("should display 'Please enter a valid email address.' for...", () => {
      const emails = [
        "missing.domain",
        "missing.toplevel@domain",
        "space.in@ email.com",
        "missingatdomain.com",
        "@missingusername.com",
        "domain.too@short.c",
        "double..dot@example.com",
        "multiple@at@signs.com",
        "invalid@special^chars.com",
        "email@example. com",
      ]

      emails.forEach(email => {
        it(email, async () => {
          await user.type(emailInput, email)
          await submit()
          await expectError(emailInput, "Please enter a valid email address.")
        })
      })
    })
  })
})
