import "jest"
import fetch from "node-fetch"

const serverUrl = "http://localhost:4500"

describe("Running server", () => {
  it("should give OK status", async () => {
    const res = await fetch(`${serverUrl}/status`)
    expect(res).toMatchObject({ status: 200 })
    await expect(res.json()).resolves.toMatchObject({ status: "OK" })
  })

  it("should give new code", async () => {
    const res = await fetch(`${serverUrl}/code`)
    expect(res).toMatchObject({ status: 200 })
    await expect(res.json()).resolves.toMatchObject({ code: expect.stringMatching(/[a-f0-9-]{36}/i) })
  })
})
