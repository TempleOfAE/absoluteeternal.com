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
  templeOracleAdjustedColor,
  templeOracleBlackWhite,
  templeOracleColor,
  templeOracleColorFamily,
  templeOracleColorFamilyFromValue,
  templeOracleGrayscale,
  templeOracleHue,
  templeOracleHueSpectrumColor,
  templeOracleIntegratedColorColumn,
  templeOraclePolarity,
  templeOracleSaturation,
  templeOracleValue,
  templeRainbowColor,
  templeOracleCompassDirections,
  templeOracleDirectionCompasses,
  templeOracleHalfCompassDirection,
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
assert.deepEqual(
  templeOracleCompassDirections(12, 34),
  { x: 12, y: 17 },
  "Y compass compresses the submoment to a thirty-two-step half-circle"
)
assert.deepEqual(
  templeOracleCompassDirections(64, -1),
  { x: 0, y: 31 },
  "independent compass inputs wrap before the Y half-circle compression"
)
assert.equal(templeOracleHalfCompassDirection(0), 0, "first submoment maps to first half-circle bin")
assert.equal(templeOracleHalfCompassDirection(1), 0, "two submoments share each half-circle bin")
assert.equal(templeOracleHalfCompassDirection(63), 31, "last submoment maps to last half-circle bin")
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

assert.deepEqual(
  templeOracleColor(0),
  { binary: "000000", hue: 339.29999999999995, red: 255, green: 0, blue: 88, hex: "#FF0058" },
  "first oracle maps to the first perceptual hue"
)
assert.deepEqual(
  templeOracleColor(63),
  { binary: "111111", hue: 335.70000000000005, red: 255, green: 0, blue: 103, hex: "#FF0067" },
  "last oracle wraps near the first perceptual hue"
)
assert.deepEqual(
  templeOracleColor(39),
  { binary: "100111", hue: 200.70000000000005, red: 0, green: 167, blue: 255, hex: "#00A7FF" },
  "six oracle bits map to one of sixty-four perceptual hues"
)
assert.deepEqual(
  Array.from({ length: 8 }, function(item, index) {
    return templeOracleColor(index).hue
  }),
  [
    339.29999999999995,
    345.6,
    351.9,
    358.20000000000005,
    1.1999999999999886,
    5.399999999999977,
    9.600000000000023,
    13.800000000000011
  ],
  "each color family gives four hue choices below and four above its center"
)
assert.deepEqual(
  templeOracleHue(39),
  templeOracleColor(39),
  "hue layer keeps the older color helper as an alias"
)
assert.deepEqual(
  templeOracleColorFamily(39),
  { binary: "100", hue: 180, red: 0, green: 255, blue: 255, hex: "#00FFFF" },
  "oracle color family maps to the matching eight-hue sector"
)
assert.deepEqual(
  templeOracleColorFamily(0),
  { binary: "000", hue: 0, red: 255, green: 0, blue: 0, hex: "#FF0000" },
  "first color family is chromatic"
)
assert.deepEqual(
  templeOracleColorFamily(1),
  { binary: "000", hue: 0, red: 255, green: 0, blue: 0, hex: "#FF0000" },
  "first eight hues share the first color family"
)
assert.deepEqual(
  templeOracleColorFamily(8),
  { binary: "001", hue: 30, red: 255, green: 128, blue: 0, hex: "#FF8000" },
  "ninth hue begins the second color family"
)
assert.deepEqual(
  templeOracleColorFamily(16),
  { binary: "010", hue: 55, red: 255, green: 234, blue: 0, hex: "#FFEA00" },
  "sixteenth hue begins the third color family"
)
assert.deepEqual(
  templeOracleColorFamily(63),
  { binary: "111", hue: 315, red: 255, green: 0, blue: 191, hex: "#FF00BF" },
  "last color family remains chromatic"
)
assert.deepEqual(
  templeOracleBlackWhite(0),
  { binary: "0", value: 0, red: 0, green: 0, blue: 0, hex: "#000000" },
  "first half maps to black in the binary color bar"
)
assert.deepEqual(
  templeOracleBlackWhite(31),
  { binary: "0", value: 0, red: 0, green: 0, blue: 0, hex: "#000000" },
  "black occupies exactly the first thirty-two oracle values"
)
assert.deepEqual(
  templeOracleBlackWhite(32),
  { binary: "1", value: 255, red: 255, green: 255, blue: 255, hex: "#FFFFFF" },
  "white begins at the thirty-third oracle value"
)
assert.deepEqual(
  templeOraclePolarity(32),
  templeOracleBlackWhite(32),
  "polarity layer keeps the older black/white helper as an alias"
)
assert.deepEqual(
  Array.from({ length: 8 }, function(item, index) {
    return templeOracleColorFamilyFromValue(index).hex
  }),
  [
    "#FF0000",
    "#FF8000",
    "#FFEA00",
    "#00FF00",
    "#00FFFF",
    "#0040FF",
    "#8000FF",
    "#FF00BF"
  ],
  "held color family bar shows eight tuned fully saturated hue families"
)
assert.equal(
  Array.from({ length: 8 }, function(item, index) {
    return templeOracleColorFamilyFromValue(index).hex
  }).includes("#000000"),
  false,
  "color family bar excludes black"
)
assert.equal(
  Array.from({ length: 8 }, function(item, index) {
    return templeOracleColorFamilyFromValue(index).hex
  }).includes("#FFFFFF"),
  false,
  "color family bar excludes white"
)
assert.deepEqual(
  templeOracleGrayscale(0),
  { value: 0, red: 0, green: 0, blue: 0, hex: "#000000" },
  "first grayscale value is black"
)
assert.deepEqual(
  templeOracleGrayscale(63),
  { value: 255, red: 255, green: 255, blue: 255, hex: "#FFFFFF" },
  "last grayscale value is white"
)
assert.deepEqual(
  templeOracleValue(63),
  templeOracleGrayscale(63),
  "value layer keeps the older grayscale helper as an alias"
)
assert.deepEqual(
  [0, 16, 32, 48].map(function(index) {
    return templeOracleHueSpectrumColor(index, 64).hex
  }),
  ["#FF0058", "#FFB900", "#00FF8A", "#2800FF"],
  "held RGB color bar renders the exact selectable hue swatches"
)
assert.deepEqual(
  [0, 16, 32, 48].map(function(index) {
    return templeRainbowColor(index, 64).hex
  }),
  [0, 16, 32, 48].map(function(index) {
    return templeOracleHueSpectrumColor(index, 64).hex
  }),
  "legacy rainbow helper follows the exact selector swatches"
)
assert.deepEqual(
  templeOracleSaturation(0),
  { index: 0, value: 0.18 },
  "first next-depth value keeps the adjusted color visibly chromatic"
)
assert.deepEqual(
  templeOracleSaturation(63),
  { index: 63, value: 1 },
  "last next-depth value leaves the adjusted color fully saturated"
)
assert.deepEqual(
  templeOracleAdjustedColor(39, 0),
  { binary: "100111", hue: 200.70000000000005, saturationIndex: 0, red: 105, green: 135, blue: 150, hex: "#698796" },
  "adjusted color remains visibly chromatic at minimum saturation"
)
assert.deepEqual(
  templeOracleAdjustedColor(39, 31),
  { binary: "100111", hue: 200.70000000000005, saturationIndex: 31, red: 53, green: 151, blue: 202, hex: "#3597CA" },
  "adjusted color uses the next-depth saturation level"
)
assert.deepEqual(
  templeOracleAdjustedColor(39, 63),
  { binary: "100111", hue: 200.70000000000005, saturationIndex: 63, red: 0, green: 167, blue: 255, hex: "#00A7FF" },
  "adjusted color matches the detailed hue at full saturation"
)
assert.deepEqual(
  templeOracleIntegratedColorColumn(39).map(function(color) {
    return color.hex
  }),
  [
    "#698796",
    "#5A8BA5",
    "#4B90B4",
    "#3C95C3",
    "#2D99D2",
    "#1E9EE1",
    "#0FA2F0",
    "#00A7FF"
  ],
  "integrated color column statically combines hue with saturation range"
)

console.log("Oracle special-case tests passed")
