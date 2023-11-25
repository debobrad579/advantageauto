import { afterEach, beforeAll, afterAll, expect } from "vitest"
import matchers from "@testing-library/jest-dom/matchers"
import { cleanup } from "@testing-library/react"
import { mockServer } from "./mockServer"

expect.extend(matchers)

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true })

  mockServer.listen({ onUnhandledRequest: "error" })
})

afterAll(() => {
  cleanup()
  mockServer.resetHandlers()
})

afterEach(() => {
  cleanup()
})
