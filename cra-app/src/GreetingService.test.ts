import { getHi } from "./GreetingService"

it("should say hi", () => {
  expect(getHi()).toEqual("Hi! 👋")
})
