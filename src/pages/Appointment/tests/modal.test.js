import { beforeEach, describe, expect, it } from "vitest"
import { fillOutForm, renderPage, submit, user } from "./utils"
import { screen } from "@testing-library/react"
import { mockServer } from "../../../../test-setup/mockServer"
import { HttpResponse, http } from "msw"

describe("Submission succeeded (happy path)", () => {
  beforeEach(async () => {
    mockServer.use(
      http.post(import.meta.env.VITE_API_URL, () => {
        return HttpResponse.json({ message: "Successful submission." })
      })
    )
    renderPage()
    await fillOutForm()
    await submit()
  })

  it("should display 'Request Submitted Successfully' in modal on successful form submission", async () => {
    expect(
      await screen.findByText("Request Submitted Successfully")
    ).toBeInTheDocument()
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

describe("Submission failed", () => {
  it("should display 'Request Submission Failed' in modal on failed form submission", async () => {
    mockServer.use(
      http.post(import.meta.env.VITE_API_URL, () => {
        return HttpResponse.json(
          { message: "Internal server error." },
          { status: 500 }
        )
      })
    )
    renderPage()
    await fillOutForm()
    await submit()
    expect(
      await screen.findByText("Request Submission Failed")
    ).toBeInTheDocument()
  })
})
