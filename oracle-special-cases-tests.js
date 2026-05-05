const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const vm = require("node:vm")

const {
  templeAllLinesChangingText,
  templeChangingLinesHtml,
  templeIsAllLinesChanging
} = require("./shrine.js")

const context = {}
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "iching.js"), "utf8") + "\nthis.iching = iching;",
  context
)

const allLines = [1, 2, 3, 4, 5, 6]
const field = context.iching.gua[0]
const force = context.iching.gua[63]
const stripping = context.iching.gua[1]

assert.equal(templeIsAllLinesChanging(allLines), true, "all six lines are recognized")
assert.equal(templeIsAllLinesChanging([1, 2, 3, 4, 5]), false, "five lines are not all lines")
assert.equal(templeIsAllLinesChanging([1, 2, 3, 4, 6, 5]), false, "line order must stay bottom-to-top")

assert.match(
  templeAllLinesChangingText(field, allLines),
  /Lasting perseverance furthers/,
  "Hexagram 2 all-lines text is used"
)

assert.match(
  templeAllLinesChangingText(force, allLines),
  /flight of dragons without heads/,
  "Hexagram 1 all-lines text is used"
)

assert.equal(
  templeAllLinesChangingText(field, [1, 2, 3, 4, 5]),
  "",
  "special text is not used unless all six lines change"
)

assert.equal(
  templeAllLinesChangingText(stripping, allLines),
  "",
  "ordinary hexagrams without a seventh line do not create special text"
)

const fieldHtml = templeChangingLinesHtml(field, allLines)
assert.ok(
  fieldHtml.indexOf("All lines changing") < fieldHtml.indexOf("Change in line 1"),
  "all-lines text is shown before individual lines"
)
assert.ok(fieldHtml.includes("Change in line 6 means"), "individual line record is preserved")

console.log("Oracle special-case tests passed")
