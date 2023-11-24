import { beforeEach, describe, expect, it } from "vitest"
import { expectError, renderPage, submit, user } from "./utils"
import { screen, waitFor } from "@testing-library/react"

describe("Invalid form data popup", () => {
  beforeEach(async () => {
    renderPage()
    await screen.findByText("Submit")
  })

  it("should remove error on input change to valid", async () => {
    await submit()
    await user.type(screen.getByLabelText("Name:"), "Test Name")

    expect(
      await waitFor(() => screen.queryByText("Please enter a name."))
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText("Name:")).not.toHaveClass("error")
  })

  it("should rerender error on input change back to invalid", async () => {
    await submit()
    await user.type(screen.getByLabelText("Name:"), "Test Name")
    await user.clear(screen.getByLabelText("Name:"))
    await expectError(screen.getByLabelText("Name:"), "Please enter a name.")
  })

  it("should rerender error on second invalid submission", async () => {
    await submit()
    await user.type(screen.getByLabelText("Name:"), "Test Name")
    await user.clear(screen.getByLabelText("Name:"))
    await submit()
    await expectError(screen.getByLabelText("Name:"), "Please enter a name.")
  })

  it("should remove error popup on blur", async () => {
    await submit()
    await user.tab()

    expect(
      await waitFor(() => screen.queryByText("Please enter a name."))
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText("Name:")).toHaveClass("error")
  })
})
