import debug from "debug"
import { generateCode } from "shared/code"
import express from "express"

const log = debug("server")

const port = 4500

log(`Starting server in port ${4500}`)

const api = express()

api.get("/status", (_req, res) => {
  log("Status requested")
  return res.json({ status: "OK" })
})
api.get("/code", (_req, res) => {
  const code = generateCode()
  log(`Generated code ${code}`)
  return res.json({ code })
})

process.on("SIGTERM", shutdownServer)

const server = api.listen(port, () => {
  log("Server stated")
})

function shutdownServer() {
  log("Shutting down server...")
  server.close()
  log("Server closed")
}
