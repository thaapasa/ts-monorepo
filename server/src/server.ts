import debug from "debug"
import { generateCode } from "shared/code"

const log = debug("server")

const code = generateCode()
log(`Starting server with code ${code}`)
