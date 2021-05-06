import "jest"
import { generateCode } from "shared/code"

describe("Code generation", () => {
  it("should generate codes", () => {
    expect(generateCode()).toHaveLength(36)
    expect(generateCode()).toHaveLength(36)
  })

  it("should generate unique codes", () => {
    expect(generateCode()).not.toEqual(generateCode())
  })
})
