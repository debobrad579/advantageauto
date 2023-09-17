import { afterEach, beforeAll, expect } from "vitest"
import matchers from "@testing-library/jest-dom/matchers"
import { cleanup } from "@testing-library/react"

expect.extend(matchers)

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true })
})

afterEach(() => {
  cleanup()
})
