const { pathsToModuleNameMapper } = require("ts-jest/utils")
const { compilerOptions } = require("./tsconfig.json")

const moduleNameMapper = pathsToModuleNameMapper(
  compilerOptions.paths,
  { prefix: "<rootDir>/" }
)

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "((src|test)/.*(\\.|/)(test|spec))\\.ts$",
  testURL: "http://localhost:11000",
  moduleNameMapper,
  moduleFileExtensions: ["ts", "tsx", "js", "json"]
}
