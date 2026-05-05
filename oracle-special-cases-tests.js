const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const vm = require("node:vm")

const {
  templeChoiceForOptions,
  templeChoiceLadder,
  templeAllLinesChangingText,
  templeChangingLinesHtml,
  templeIsAllLinesChanging,
  templeOracleDirectionCompasses,
  templeOracleClockAngle,
  templeTrigramClockDirection
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

assert.equal(templeOracleClockAngle(0), 0, "oracle 0 is at top of the clock")
assert.equal(templeOracleClockAngle(16), Math.PI / 2, "oracle 16 is one quarter around the clock")
assert.equal(templeOracleClockAngle(64), 0, "oracle angle wraps at 64")
assert.equal(templeOracleClockAngle(-1), Math.PI * 2 * 63 / 64, "oracle angle wraps negative indexes")

assert.deepEqual(
  templeOracleDirectionCompasses(0),
  { x: 0, y: 0 },
  "first oracle maps to both compass origins"
)
assert.deepEqual(
  templeOracleDirectionCompasses(7),
  { x: 7, y: 0 },
  "low trigram drives the X compass"
)
assert.deepEqual(
  templeOracleDirectionCompasses(56),
  { x: 0, y: 7 },
  "high trigram drives the Y compass"
)
assert.deepEqual(
  templeOracleDirectionCompasses(63),
  { x: 7, y: 7 },
  "last oracle maps to the last state of both compasses"
)
assert.equal(templeTrigramClockDirection(7), 0, "heaven points up on the temple clock compass")
assert.equal(templeTrigramClockDirection(0), 4, "earth points down on the temple clock compass")
for (let trigram = 0; trigram < 8; trigram++) {
  assert.equal(
    templeTrigramClockDirection(7 - trigram),
    (templeTrigramClockDirection(trigram) + 4) % 8,
    "complementary trigrams remain opposite on the clock compass"
  )
}

assert.equal(templeChoiceForOptions(0, 2), 1, "first oracle maps to first of two")
assert.equal(templeChoiceForOptions(63, 2), 2, "last oracle maps to second of two")
assert.equal(templeChoiceForOptions(63, 64), 64, "last oracle maps to sixty-fourth option")

assert.deepEqual(
  templeChoiceLadder(43),
  [
    { optionCount: 2, choice: 2 },
    { optionCount: 4, choice: 3 },
    { optionCount: 8, choice: 6 },
    { optionCount: 16, choice: 11 },
    { optionCount: 32, choice: 22 },
    { optionCount: 64, choice: 44 }
  ],
  "choice ladder only includes evenly distributed option counts"
)

console.log("Oracle special-case tests passed")
