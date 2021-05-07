import { v4 as uuidv4 } from "uuid"

/**
 * Note: uuid cannot be used from react native app without polyfill
 * See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
 */ 
export function generateCode() {
  return uuidv4()
}

export function generateHello() {
  return Math.random() > 0.5 ? "Hello" : "Hi! 👋"
}
