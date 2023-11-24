import { beforeEach, describe, expect, it } from "vitest"
import { fillOutForm, renderPage, submit, user } from "./utils"
import { screen } from "@testing-library/react"

describe("Valid form data", () => {
  beforeEach(async () => {
    renderPage()
    await screen.findByText("Submit")
    await fillOutForm()
    await submit()
  })

  it("should submit form on valid form data", async () => {
    expect(
      await screen.findByText("Request Submitted Successfully")
    ).toBeInTheDocument()
  })

  describe("Success modal", () => {
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
