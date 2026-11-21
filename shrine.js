var mother //stores shrine image\
var jackal
var arkInstructionFont
let motherFadeContext
let motherFadeShade = -1
let arkInscriptionLayer
let oracleSpectrumLayer
let oracleSpectra

const motherNames = [
    "THE ABSOLUTE ETERNAL",
    "THE GREAT MOTHER",
    "THE WOMB",
    "THE WAY",
    "THE ROD",
    "THE SWORD",
    "THE CUP",
    "THE PRYSM",
]

const arkInstructionCuneiform = [
    "𒂍𒁉𒌅𒈠 𒂊𒇷𒉿 𒂊𒉺𒁺",
    "𒈠𒆪𒌑𒊒 𒊭𒋗 𒀀𒈾 𒉆𒉿𒋾 𒁍𒇻𒁺",
    "𒍣𒂊𒊑 𒉆𒉿𒋾 𒆳𒈠 𒀀𒈾 𒅗𒁀 𒂊𒇷𒉿 𒌑𒊺𒇻",
]

// hidden/womb, Mother center, evening return
const divisions = [
 '⚸', '☩', '♀'
]

const eclipseEpoch = Date.UTC(2012, 10, 13, 22, 12, 55) // exact time of total eclyps UTC
const templeEpoch = Date.UTC(2012, 10, 14, 10, 21, 32, 641) // lunar perigee after eclyps UTC
var dateTemple = Date.now() - templeEpoch

//const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//temple bsae 64 time units
const day = 86400000
const anomalisticYearDays = 365.259636
const year = anomalisticYearDays * day
const ordinaryYear = 365 * day
const annualApsisInterval = year - ordinaryYear
const aphelionDayIndex = Math.floor(anomalisticYearDays / 2)
const templeDateLineLongitude = -159.270875
const templeZoneCount = 24
const templeZoneWidth = 360 / templeZoneCount
const LAM = 27.55454977 * day // lunar anomalistic month
const week = day * 9
const month = week * 3
const division = day / 3
const hr = division / 8
const minute = hr / 64
const second = minute / 64
const moment = second / 64
const submoment = moment / 64

//temple month length structure
//const months = [
  //  year - (LAM * 13), // calandar correction holiday to unite solar and lunar year
    //LAM, LAM, LAM, LAM, LAM, LAM, LAM, LAM, LAM, LAM, LAM, LAM, LAM] // 13 lunar months

//Calandar variables and data
var calandar = []
var calandarByMonth = []
var calandarThisYear = []
var templeCalandar = []
var templeDateDMY = []
var templeDayOfMonth
var templeInAnnualApsisInterval = false
var templeApsisElapsed = 0
var templeCalendarKey = ""
var templeEarthZone = 0
var templeEarthZoneSource = "TIMEZONE"
var templeZonedDateTemple = dateTemple
var mondays = []
var templeFieldCompassPermission = "unrequested"
var templeFieldCompassHeading = null
var templeFieldCompassLastAcceptedTick = null
var templeFieldCompassListening = false
var templeFieldCompassInteractionListening = false
var templeLocationPermissionRequested = false

function wrap360(degrees) {
    return ((degrees % 360) + 360) % 360
}

function templeZoneFromLongitude(longitude) {
    return Math.floor(wrap360(longitude - templeDateLineLongitude) / templeZoneWidth)
}

function templeZoneFromCivilTimezone() {
    let civilYear = new Date().getFullYear()
    let january = new Date(civilYear, 0, 1)
    let july = new Date(civilYear, 6, 1)
    let standardOffsetMinutes = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset())
    let standardOffsetHours = -standardOffsetMinutes / 60
    return templeZoneFromLongitude(standardOffsetHours * 15)
}

function setTempleEarthZone(zone, source = "TIMEZONE") {
    templeEarthZone = ((Math.floor(zone) % templeZoneCount) + templeZoneCount) % templeZoneCount
    templeEarthZoneSource = source
    templeCalendarKey = ""
}

function templeEarthZoneLabel() {
    return "TEZ-" + "00".substr(str(templeEarthZone).length) + str(templeEarthZone)
}

function initializeTempleEarthZone() {
    setTempleEarthZone(templeZoneFromCivilTimezone(), "TIMEZONE")
    templeRequestLocationForCalendarAndCompass()
}

function templeRequestLocationForCalendarAndCompass(force = false) {
    if (templeLocationPermissionRequested && !force) {
        return
    }

    templeLocationPermissionRequested = true

    if (typeof navigator == "undefined" || !navigator.geolocation) {
        return
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            setTempleEarthZone(templeZoneFromLongitude(position.coords.longitude), "LOCATION")
        },
        function() {
            setTempleEarthZone(templeZoneFromCivilTimezone(), "TIMEZONE")
            templeLocationPermissionRequested = false
        },
        {
            enableHighAccuracy: false,
            timeout: 7000,
            maximumAge: 86400000
        }
    )
}

function templeCurrentSecondTick() {
    return Math.floor((Date.now() - templeEpoch + (templeEarthZone * hr)) / second)
}

function templeExtractCompassHeading(event) {
    if (!event) {
        return null
    }

    if (typeof event.webkitCompassHeading == "number") {
        return wrap360(event.webkitCompassHeading)
    }

    if (event.absolute === true && typeof event.alpha == "number") {
        return wrap360(360 - event.alpha)
    }

    return null
}

function templeHandleCompassOrientation(event) {
    let heading = templeExtractCompassHeading(event)

    if (heading == null) {
        return
    }

    let currentTick = templeCurrentSecondTick()

    if (currentTick == templeFieldCompassLastAcceptedTick) {
        return
    }

    templeFieldCompassLastAcceptedTick = currentTick
    templeFieldCompassHeading = heading
}

function templeAddFieldCompassListeners() {
    if (typeof window == "undefined" || templeFieldCompassListening) {
        return
    }

    window.addEventListener("deviceorientationabsolute", templeHandleCompassOrientation, true)
    window.addEventListener("deviceorientation", templeHandleCompassOrientation, true)
    templeFieldCompassListening = true
}

function templeRemoveFieldCompassListeners() {
    if (typeof window == "undefined" || !templeFieldCompassListening) {
        return
    }

    window.removeEventListener("deviceorientationabsolute", templeHandleCompassOrientation, true)
    window.removeEventListener("deviceorientation", templeHandleCompassOrientation, true)
    templeFieldCompassListening = false
}

function templeSetFieldCompassActive(active) {
    if (active && templeFieldCompassPermission == "granted") {
        templeAddFieldCompassListeners()
    } else {
        templeRemoveFieldCompassListeners()
    }
}

function initializeTempleFieldCompassInteractionRequest() {
    if (typeof window == "undefined" || templeFieldCompassInteractionListening) {
        return
    }

    templeFieldCompassInteractionListening = true
    window.addEventListener("pointerdown", templeRequestFieldCompass, { passive: true })
    window.addEventListener("touchstart", templeRequestFieldCompass, { passive: true })
    window.addEventListener("mousedown", templeRequestFieldCompass, { passive: true })
}

function templeQueueSensorPermissionRequest(sensorEvent, requests) {
    if (sensorEvent && typeof sensorEvent.requestPermission == "function") {
        try {
            requests.push(sensorEvent.requestPermission())
        } catch (error) {
            requests.push(Promise.resolve("error"))
        }
    }
}

function templeRequestFieldCompass() {
    if (typeof window == "undefined") {
        return
    }

    if (templeFieldCompassPermission == "granted") {
        templeSetFieldCompassActive(true)
        return
    }

    if (templeFieldCompassPermission == "requesting" ||
        templeFieldCompassPermission == "denied" ||
        templeFieldCompassPermission == "unsupported") {
        return
    }

    let orientationEvent = window.DeviceOrientationEvent
    let motionEvent = window.DeviceMotionEvent

    if (typeof orientationEvent == "undefined" && typeof motionEvent == "undefined") {
        templeFieldCompassPermission = "unsupported"
        return
    }

    let permissionRequests = []
    templeQueueSensorPermissionRequest(motionEvent, permissionRequests)
    templeQueueSensorPermissionRequest(orientationEvent, permissionRequests)

    if (permissionRequests.length > 0) {
        templeFieldCompassPermission = "requesting"
        Promise.all(permissionRequests.map(function(request) {
            return request.catch(function() {
                return "error"
            })
        }))
            .then(function(permissionStates) {
                if (permissionStates.includes("granted")) {
                    templeFieldCompassPermission = "granted"
                } else if (permissionStates.includes("denied")) {
                    templeFieldCompassPermission = "denied"
                } else {
                    templeFieldCompassPermission = "unrequested"
                }
                templeSetFieldCompassActive(templeFieldCompassPermission == "granted" && timeOracleHover)
            })
            .catch(function() {
                templeFieldCompassPermission = "unrequested"
                templeSetFieldCompassActive(false)
            })
    } else {
        templeFieldCompassPermission = "granted"
        templeSetFieldCompassActive(true)
    }
}

const measuresPerUnit = [64, 64, 64, 8, 3,27,14,64*8]
const msPerUnit = [moment, second, minute, hr, division, day, month, year]

const timeDiv = [64, 64, 64, 8, 3, 27,14,64*8]
const timeUnitsMoment = [1, 64, 64 ** 2, 64 ** 2 * 8, 64 ** 3 * 8 * 3]

// kali variables
var timeUnitsMax = [];
var timeUnitsHalf = [];
var timeUnitsQuarter = [];
for (let i = 0; i < timeUnitsMoment.length; i++) {
    timeUnitsMax[i] = timeDiv[i] * timeUnitsMoment[i] - 1
    timeUnitsHalf[i] = timeUnitsMax[i] * .5
    timeUnitsQuarter[i] = timeUnitsMax[i] * .25
}

//time and timing variables
var currentTime = [0, 0, 0, 0, 0,0,0,0,0,0] // time as human readable units
var timeO = []
var timeMoment = [0, 0, 0, 0, 0] // time as 0 - maxunit in moments
var timeScale = [0, 0, 0, 0, 0] // time as 0 - 1
var timeScaleCycle = [0, 0, 0, 0, 0] // time as 0 - 1
var LunarCalandarCycleValue = [0, 0, 0, 0, 0, 0, 0, 0, 0] // 0-255-0
var LunarCalandarCycleValueDouble = [0, 0, 0, 0, 0, 0, 0, 0, 0] // 0-255-0-255-0
var templeCalendarDisplayYearIndex = 0

//oracle variables
var oracleA = [] // first set of 6 coin flips generating first oracle
var oracleB = [] // second set of coin flips to decide changing llines
var oracleC = [] // oracle pair encoded as 6 quaternary oracles
var oracleD = [] // oracle pair numeric values expresed in decimal
var changingLines = [] // list of changing lines in order from botom to top
var timeStamp = [] // time stamp of exact time the displaye oracle system was generated
var timeOracle = [] // oracle generated from the moment of last oracle split into binary (deeds) quaternary (words) and octal (actions)
var oracleDisplayCounter = 6 // oracle display timing
var oracleAutoDraw = false // if false oracle is automaticaly drawn at the begining of every minute

//UI variables
var middle // stores center of shrine circle
var circleWidth // stores width of shrine circle
var circleHover = false // is the mouse in the main circle
var timeOracleHover = false // is the mouse over the time oracle
var dateHover = false // is the mouse over the date display
var titleHover = false // is the mouse over title
var changeHover = false // is the mouse over changes
var squareWidth


var consoleDisplay = []

function templeIsAllLinesChanging(lines) {
    if (!Array.isArray(lines) || lines.length != 6) {
        return false
    }

    return lines.every(function(line, index) {
        return line == index + 1
    })
}

function templeAllLinesChangingText(primaryGua, lines) {
    if (!templeIsAllLinesChanging(lines) || !primaryGua || !primaryGua.changes || primaryGua.changes.length < 7) {
        return ""
    }

    return primaryGua.changes[6]
}

function templeChangingLinesHtml(primaryGua, lines) {
    if (!primaryGua || !primaryGua.changes || !Array.isArray(lines)) {
        return ""
    }

    let changingLinesList = ""
    let allLinesChangingText = templeAllLinesChangingText(primaryGua, lines)

    if (allLinesChangingText) {
        changingLinesList += "<p>All lines changing: " + String(allLinesChangingText) + "</p>"
    }

    for (let item of lines) {
        changingLinesList += "<p>"
        changingLinesList += "Change in line " + item + " means: " + String(primaryGua.changes[item - 1])
        changingLinesList += "</p>"
    }

    return changingLinesList
}

function templeNormalizeOracleIndex(index) {
    let normalizedIndex = Math.floor(Number(index))

    if (!Number.isFinite(normalizedIndex)) {
        return 0
    }

    return ((normalizedIndex % 64) + 64) % 64
}

function templeOracleClockAngle(index) {
    let normalizedIndex = templeNormalizeOracleIndex(index)
    return (Math.PI * 2 / 64) * normalizedIndex
}

function templeOracleTrigrams(index) {
    let oracleBinary = templeNormalizeOracleIndex(index).toString(2)
    oracleBinary = "000000".substr(oracleBinary.length) + oracleBinary

    return {
        upper: parseInt(oracleBinary.slice(0, 3), 2),
        lower: parseInt(oracleBinary.slice(3, 6), 2)
    }
}

function templeOracleDirectionCompasses(index) {
    let trigrams = templeOracleTrigrams(index)

    return {
        x: trigrams.lower,
        y: trigrams.upper
    }
}

function templeOracleHalfCompassDirection(index) {
    return Math.floor(templeNormalizeOracleIndex(index) / 2)
}

function templeOracleBandedHalfCompassDirection(index) {
    let normalizedDirection = templeOracleHalfCompassDirection(index)
    let band = normalizedDirection % 4
    let depth = Math.floor(normalizedDirection / 4)

    if (band == 0) {
        return depth
    }

    if (band == 1) {
        return 31 - depth
    }

    if (band == 2) {
        return 8 + depth
    }

    return 23 - depth
}

function templeOracleCompassDirections(xIndex, yIndex) {
    return {
        x: templeNormalizeOracleIndex(xIndex),
        y: templeOracleBandedHalfCompassDirection(yIndex)
    }
}

function templeTrigramClockDirection(trigram) {
    let normalizedTrigram = Math.floor(Number(trigram))

    if (!Number.isFinite(normalizedTrigram)) {
        normalizedTrigram = 0
    }

    normalizedTrigram = ((normalizedTrigram % 8) + 8) % 8

    return normalizedTrigram >= 4 ? 7 - normalizedTrigram : normalizedTrigram + 4
}

function templeChoiceForOptions(index, optionCount) {
    let normalizedIndex = templeNormalizeOracleIndex(index)
    let normalizedOptionCount = Math.max(1, Math.min(64, Math.floor(optionCount)))
    return Math.floor(normalizedIndex * normalizedOptionCount / 64) + 1
}

function templeChoiceLadder(index) {
    let optionCounts = [2, 4, 8, 16, 32, 64]
    return optionCounts.map(function(optionCount) {
        return {
            optionCount,
            choice: templeChoiceForOptions(index, optionCount)
        }
    })
}

function templeColorHex(red, green, blue) {
    return "#" + [red, green, blue].map(function(channel) {
        return channel.toString(16).padStart(2, "0")
    }).join("").toUpperCase()
}

const templeColorFamilyHues = [
    0,
    30,
    55,
    120,
    180,
    225,
    270,
    315
]
const templeMinimumDetectableSaturation = .18
const templeIntegratedSaturationSteps = 8
const templeColorFamilyHueInset = .08

function templeHueDistance(startHue, endHue) {
    return ((endHue - startHue) + 360) % 360
}

function templeHueBetween(startHue, endHue, fraction) {
    return (startHue + (templeHueDistance(startHue, endHue) * fraction)) % 360
}

function templeNormalizeColorFamily(value) {
    let normalizedValue = Math.floor(Number(value))

    if (!Number.isFinite(normalizedValue)) {
        normalizedValue = 0
    }

    return ((normalizedValue % templeColorFamilyHues.length) + templeColorFamilyHues.length) % templeColorFamilyHues.length
}

function templeColorFamilyBoundary(familyIndex, side) {
    let normalizedFamily = templeNormalizeColorFamily(familyIndex)
    let centerHue = templeColorFamilyHues[normalizedFamily]

    if (side == "start") {
        let previousHue = templeColorFamilyHues[templeNormalizeColorFamily(normalizedFamily - 1)]
        return templeHueBetween(previousHue, centerHue, .5)
    }

    let nextHue = templeColorFamilyHues[templeNormalizeColorFamily(normalizedFamily + 1)]
    return templeHueBetween(centerHue, nextHue, .5)
}

function templeColorFamilySlotHue(familyIndex, slot) {
    let centerHue = templeColorFamilyHues[templeNormalizeColorFamily(familyIndex)]
    let normalizedSlot = Math.max(0, Math.min(7, Math.floor(Number(slot))))

    if (!Number.isFinite(normalizedSlot)) {
        normalizedSlot = 0
    }

    function sidePosition(sideSlot) {
        return templeColorFamilyHueInset
            + ((sideSlot / 3) * (1 - (templeColorFamilyHueInset * 2)))
    }

    if (normalizedSlot < 4) {
        let startHue = templeColorFamilyBoundary(familyIndex, "start")
        return templeHueBetween(startHue, centerHue, sidePosition(normalizedSlot))
    }

    let endHue = templeColorFamilyBoundary(familyIndex, "end")
    return templeHueBetween(centerHue, endHue, sidePosition(normalizedSlot - 4))
}

function templeColorFamilySpectrumHue(familyIndex, slot) {
    let startHue = templeColorFamilyBoundary(familyIndex, "start")
    let endHue = templeColorFamilyBoundary(familyIndex, "end")
    let slotPosition = (Number(slot) + .5) / 8

    return templeHueBetween(startHue, endHue, slotPosition)
}

function templePerceptualColor(hue, saturation = 1) {
    let normalizedHue = ((Number(hue) % 360) + 360) % 360
    saturation = Number(saturation)

    if (!Number.isFinite(saturation)) {
        saturation = 1
    }

    saturation = Math.min(1, Math.max(0, saturation))
    let hueSector = normalizedHue / 60
    let chroma = saturation
    let secondChannel = chroma * (1 - Math.abs((hueSector % 2) - 1))
    let match = .5 - (chroma * .5)
    let red = 0
    let green = 0
    let blue = 0

    if (hueSector < 1) {
        red = chroma
        green = secondChannel
    } else if (hueSector < 2) {
        red = secondChannel
        green = chroma
    } else if (hueSector < 3) {
        green = chroma
        blue = secondChannel
    } else if (hueSector < 4) {
        green = secondChannel
        blue = chroma
    } else if (hueSector < 5) {
        red = secondChannel
        blue = chroma
    } else {
        red = chroma
        blue = secondChannel
    }

    red = Math.round((red + match) * 255)
    green = Math.round((green + match) * 255)
    blue = Math.round((blue + match) * 255)

    return {
        hue: normalizedHue,
        red,
        green,
        blue,
        hex: templeColorHex(red, green, blue)
    }
}

function templeOracleColorFamilyFromValue(value) {
    let normalizedValue = templeNormalizeColorFamily(value)
    let familyColor = templePerceptualColor(templeColorFamilyHues[normalizedValue])
    let binary = normalizedValue.toString(2)

    return {
        binary: "000".substr(binary.length) + binary,
        hue: familyColor.hue,
        red: familyColor.red,
        green: familyColor.green,
        blue: familyColor.blue,
        hex: familyColor.hex
    }
}

function templeOracleHue(index) {
    let normalizedIndex = templeNormalizeOracleIndex(index)
    let oracleBinary = normalizedIndex.toString(2)
    oracleBinary = "000000".substr(oracleBinary.length) + oracleBinary
    let familyIndex = Math.floor(normalizedIndex / 8)
    let familySlot = normalizedIndex % 8
    let oracleColor = templePerceptualColor(templeColorFamilySlotHue(familyIndex, familySlot))

    return {
        binary: oracleBinary,
        hue: oracleColor.hue,
        red: oracleColor.red,
        green: oracleColor.green,
        blue: oracleColor.blue,
        hex: oracleColor.hex
    }
}

function templeOracleColor(index) {
    return templeOracleHue(index)
}

function templeOracleColorFamily(index) {
    return templeOracleColorFamilyFromValue(Math.floor(templeNormalizeOracleIndex(index) / 8))
}

function templeOracleSaturation(index) {
    let normalizedIndex = templeNormalizeOracleIndex(index)

    return {
        index: normalizedIndex,
        value: templeMinimumDetectableSaturation
            + ((normalizedIndex / 63) * (1 - templeMinimumDetectableSaturation))
    }
}

function templeOracleAdjustedColor(index, saturationIndex) {
    let oracleColor = templeOracleHue(index)
    let oracleSaturation = templeOracleSaturation(saturationIndex)
    let adjustedColor = templePerceptualColor(oracleColor.hue, oracleSaturation.value)

    return {
        binary: oracleColor.binary,
        hue: oracleColor.hue,
        saturationIndex: oracleSaturation.index,
        red: adjustedColor.red,
        green: adjustedColor.green,
        blue: adjustedColor.blue,
        hex: adjustedColor.hex
    }
}

function templeOracleIntegratedColorColumn(index, steps = templeIntegratedSaturationSteps) {
    let normalizedSteps = Math.max(1, Math.floor(Number(steps)) || 1)

    return Array.from({ length: normalizedSteps }, function(item, step) {
        let saturationIndex = normalizedSteps == 1
            ? 63
            : Math.round(step * 63 / (normalizedSteps - 1))
        return templeOracleAdjustedColor(index, saturationIndex)
    })
}

function templeOraclePolarity(index) {
    let value = templeNormalizeOracleIndex(index) < 32 ? 0 : 255

    return {
        binary: value > 0 ? "1" : "0",
        value,
        red: value,
        green: value,
        blue: value,
        hex: templeColorHex(value, value, value)
    }
}

function templeOracleBlackWhite(index) {
    return templeOraclePolarity(index)
}

function templeOracleValue(index) {
    let value = Math.round(templeNormalizeOracleIndex(index) * 255 / 63)

    return {
        value,
        red: value,
        green: value,
        blue: value,
        hex: templeColorHex(value, value, value)
    }
}

function templeOracleGrayscale(index) {
    return templeOracleValue(index)
}

function templeOracleHueSpectrumColor(index, steps) {
    let normalizedSteps = Math.max(1, Math.floor(Number(steps)) || 1)
    let normalizedIndex = ((index % normalizedSteps) + normalizedSteps) % normalizedSteps
    let selectorIndex = Math.floor(normalizedIndex / normalizedSteps * 64)

    return templeOracleHue(selectorIndex)
}

function templeRainbowColor(index, steps) {
    return templeOracleHueSpectrumColor(index, steps)
}

// image size settings
motherSizeMod = .666; // controlls size of shrine
jackalSizeMod = .2; // controlls size of shrine

//frame rate setting
fR = 16 // frame rate

jackals = false //are jackals displayed

var valeData = []
for (let row = 0; row < 64; row++) {
    valeData.push([])
    for (let column = 0; column < 64; column++) {
        valeData[row].push([0])
    }
}

var menuHover = false
var menuSelectTitle = ''
var menuSelectDescription = ""

var mobile = false
var shrineViewportWidth = 0
var shrineViewportHeight = 0
var shrinePixelDensity = 0
var templeAnimationPaused = false

// Snap the offscreen origin to a backing pixel so fine strokes stay sharp after compositing.
function createShrineLayer(left, top, right, bottom) {
    const transform = drawingContext.getTransform()
    const x = (Math.floor(left * transform.a + transform.e) - transform.e) / transform.a
    const y = (Math.floor(top * transform.d + transform.f) - transform.f) / transform.d
    const graphics = createGraphics(Math.ceil(right - x), Math.ceil(bottom - y))
    graphics.translate(-x, -y)
    return { graphics, x, y }
}

function drawShrineLayer(layer) {
    const { graphics, x, y } = layer
    drawingContext.drawImage(graphics.canvas, x, y, graphics.width, graphics.height)
}

function updateShrineImageSizes(force = false) {
    const density = pixelDensity()
    if (!force && shrineViewportWidth == windowWidth && shrineViewportHeight == windowHeight && shrinePixelDensity == density) {
        return
    }

    if (arkInscriptionLayer) arkInscriptionLayer.graphics.remove()
    if (oracleSpectrumLayer) oracleSpectrumLayer.graphics.remove()
    arkInscriptionLayer = null
    oracleSpectrumLayer = null
    shrineViewportWidth = windowWidth
    shrineViewportHeight = windowHeight
    shrinePixelDensity = density

    if (windowHeight < windowWidth) {
        mother.width = windowHeight * motherSizeMod
        mother.height = mother.width
        jackal.width = mother.width * 2
        jackal.height = mother.height
    } else {
        mother.height = windowHeight * motherSizeMod
        mother.width = mother.height
    }
}

function setTempleAnimationPaused(paused) {
    templeAnimationPaused = paused

    if (typeof noLoop != "function" || typeof loop != "function") {
        return
    }

    if (templeAnimationPaused || document.hidden) {
        noLoop()
    } else {
        loop()
    }
}

function templeApplyHoverGlow(active, blur = mother.width * .012) {
    if (active) {
        fill(255)
        drawingContext.shadowColor = 'rgba(255, 255, 255, 0.45)'
        drawingContext.shadowBlur = blur
    } else {
        fill(230)
        drawingContext.shadowColor = 'transparent'
        drawingContext.shadowBlur = 0
    }
}

function templeClearHoverGlow() {
    drawingContext.shadowColor = 'transparent'
    drawingContext.shadowBlur = 0
}

if (typeof window != "undefined") {
    window.setTempleAnimationPaused = setTempleAnimationPaused
}

if (typeof document != "undefined") {
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            templeSetFieldCompassActive(false)
        }
        setTempleAnimationPaused(templeAnimationPaused)
    })
}

// P5 main functions
function preload() {
    mother = loadImage('mother.png');
    jackal = loadImage('jackal.png')
    // Supply the inscription's glyphs instead of relying on installed system fonts.
    arkInstructionFont = loadFont('fonts/NotoSansCuneiform-Inscription.ttf')
}
function setup() {
    //set image sizes
    updateShrineImageSizes(true)

    //CANVAS SETTINGS
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.attribute('aria-hidden', 'true')
    cnv.attribute('role', 'presentation')
    cnv.elt.tabIndex = -1
    cnv.elt.style.touchAction = 'none'
    cnv.elt.style.userSelect = 'none'
    cnv.elt.style.webkitUserSelect = 'none'

    //STROKE SETTINGS
    strokeCap(SQUARE)

    //FONT SETTINGS
    textFont('Times New Roman')
    textSize(mother.width * .023);
    textStyle(NORMAL);
    textStyle(BOLD);

    //TIMING SETTINGS
    frameRate(fR) // set frame rate
    initializeTempleEarthZone()
    initializeTempleFieldCompassInteractionRequest()
    kali(); // sets initial time and date

    //INITIAL ORACLE
    timeStamp = Array.from(currentTime)
    oracleGenerator() // loads oracle system
    if (templeDebugEnabled()) {
        setTimeout(function() {
            enableTempleDebug(true)
        }, 250)
    }
}
function draw() {
    mobile = (windowWidth < windowHeight)

    push()
    push()

    if (mouseheld()) {
        if (timeOracleHover) {
            timeStamp = Array.from(currentTime)
        } else if (circleHover) {
            timeStamp = Array.from(currentTime)
        }
    }

    //autodraw oracle every minute if not being examined by hover
    if (currentTime[1] == 0 && !circleHover && !oracleAutoDraw) {
        oracleAutoDraw = true
        oracleGenerator()
    } else if (currentTime[1] > 0) {
        oracleAutoDraw = false
    }

    push()

    if (oracleDisplayCounter > 0 && !mouseIsPressed) { // controlls step by step loading of the oracle and prevents it if mouse is held
        oracleDisplayCounter -= 1
        userInterface = false
    } else {
        userInterface = true
    }

    updateShrineImageSizes()

    middle = createVector(window.width * .5, window.height * .5) // defines center of circle

    clear();

    kali()

    background(0);

    translate(middle.x - mother.width / 2, (middle.y - mother.height / 2));

    circleWidth = mother.width * .725
    idol(mother.width * .5, mother.height * .5, circleWidth, true, false, mother.width*.003, 255)
    const clockBottom = clock()

    if (!circleHover && !menuHover) {
        const largeMyriadActive = mouseY >= windowHeight * 0.7
        const sourceX = mother.width * .5
        const sourceY = mother.height * .53
        myriad(sourceX, sourceY, largeMyriadActive)
        if (largeMyriadActive) {
            drawMotherImageLayer()
        }
        emination(sourceX, sourceY, clockBottom)
    }

    displays(6 - oracleDisplayCounter)
    push()

    textStyle(NORMAL)
    textAlign(CENTER, CENTER)
    textSize(mother.width * .1)

    noStroke()

    if (titleHover) {
        fill(255)
        drawingContext.shadowColor = 'rgba(255, 255, 255, 0.45)'
        drawingContext.shadowBlur = mother.width * .018
    } else {
        fill(230)
        drawingContext.shadowColor = 'transparent'
        drawingContext.shadowBlur = 0
    }

    text('ToÆ',
    mother.width * .5, -mother.height * .1333)

    drawingContext.shadowColor = 'transparent'
    drawingContext.shadowBlur = 0
    fill(255)
    textSize(mother.width * .022)

    text("EST. 13 NOV 2012 CE IN HONOR OF " + motherNames[Math.floor(map(currentTime[1], 0, 64, 0, motherNames.length))],    
    mother.width * .5, -mother.height * .0444)

    pop()
    pop()
    pop()
    pop()

    //JACKAL DISPLAY LOGIC
    if (windowHeight < windowWidth * .85) 
    {
        jackals = true
    }else {
        jackals = false
    }

    //disables UI while overlays are active
    if (!templeOverlayActive()) {
        UI() // checks location of mouse and updates variables to controll zoom and select functions  
    }

    templeSetFieldCompassActive(!templeOverlayActive() && timeOracleHover && templeFieldCompassPermission == "granted")
}
function windowResized() {
    updateShrineImageSizes(true)
    resizeCanvas(windowWidth, windowHeight);
    // menuBar(principles,(windowHeight*menuYMod))
}

function templeOverlayActive() {
    return typeof overlays != "undefined" && overlays.some(function(isOpen) {
        return isOpen
    })
}

// P5 user input functions
function keyTyped() {
    if (templeOverlayActive()) {
        return false
    }

    // timeStamp = Array.from(time)
    if (keyCode == ENTER) {
        if (dateHover) {
            openTempleCalendarOverlay()
        } else if (changeHover) {
            interpretation()
            on(2)
        } else if (timeOracleHover) {
            timeStamp = Array.from(currentTime)
            templeRequestFieldCompass()
            oracleGenerator("TIME ONLY")
        } else {
            timeStamp = Array.from(currentTime)
            oracleGenerator()
        }
    }
}
function templePressInteraction() {
    if (templeOverlayActive()) {
        return true
    }

    templeRequestFieldCompass()
    UI()

    if (titleHover) {
        on(1)
    } else if (dateHover) {
        openTempleCalendarOverlay()
    } else if (changeHover) {
        interpretation()
        on(2)
    } else if (timeOracleHover) {
        timeStamp = Array.from(currentTime)
        templeRequestFieldCompass()
    } else if (circleHover) {
        timeStamp = Array.from(currentTime)
        oracleGenerator()
    } else {
        return false
    }

    return false
}
function mousePressed() {
    return templePressInteraction()
}
function touchStarted() {
    return templePressInteraction()
}
function mouseheld() {
    if (!templeOverlayActive() && mouseIsPressed) {
        return true
    } else {
        return false
    }
}
function templeReleaseInteraction() {
    if (templeOverlayActive()) {
        return true
    }

    UI()

    if (timeOracleHover) {
        if (!overlays[2]) { //prevents new oracle if overlay 2 is active
            templeRequestFieldCompass()
            oracleGenerator("TIME ONLY")
            oracleDisplayCounter = 6
        }
    } else if (circleHover) {

    } else {
        return false
    }

    return false
}
function mouseReleased() {
    return templeReleaseInteraction()
}
function touchEnded() {
    return templeReleaseInteraction()
}
function touchMoved() {
    if (templeOverlayActive()) {
        return true
    }

    UI()
    return false
}

function templeState(elapsed = Date.now() - templeEpoch) {
    let yearIndex = Math.floor(elapsed / year)
    let yearElapsed = ((elapsed % year) + year) % year
    let inAnnualApsisInterval = yearElapsed >= ordinaryYear
    let ordinaryDayIndex = inAnnualApsisInterval ? 365 : Math.floor(yearElapsed / day)
    let ordinaryClockElapsed = ((elapsed % day) + day) % day
    let dayElapsed = inAnnualApsisInterval ? yearElapsed - ordinaryYear : ordinaryClockElapsed
    let apsisElapsed = inAnnualApsisInterval ? dayElapsed : 0

    return {
        elapsed,
        yearIndex,
        yearElapsed,
        ordinaryDayIndex,
        ordinaryClockElapsed,
        dayElapsed,
        inAnnualApsisInterval,
        apsisElapsed
    }
}

// converts ms time to base 64 temple time and controlls animation timing variables
function kali() {
    dateTemple = Date.now() - templeEpoch
    templeZonedDateTemple = dateTemple + (templeEarthZone * hr)
    let state = templeState(templeZonedDateTemple)
    templeDateDMY[0] = state.ordinaryDayIndex
    templeDateDMY[2] = state.yearIndex
    templeInAnnualApsisInterval = state.inAnnualApsisInterval
    templeApsisElapsed = state.apsisElapsed

    let calendarKey = [
        templeDateDMY[2],
        templeDateDMY[0],
        templeInAnnualApsisInterval,
        templeEarthZone
    ].join(":")

    if (calendarKey != templeCalendarKey) {
        calandarSetup()
        templeCalendarKey = calendarKey
    }

    currentTime[0] = Math.floor((state.dayElapsed / moment) % timeDiv[0])
    currentTime[1] = Math.floor((state.dayElapsed / second) % timeDiv[1])
    currentTime[2] = Math.floor((state.dayElapsed / minute) % timeDiv[2])
    currentTime[3] = Math.floor((state.dayElapsed / hr) % timeDiv[3])
    currentTime[4] = Math.floor((state.dayElapsed / division) % timeDiv[4])
    currentTime[5] = templeInAnnualApsisInterval ? 0 : templeDayOfMonth
    currentTime[6] = templeInAnnualApsisInterval ? 13 : templeDateDMY[1]
    currentTime[7] = templeDateDMY[2]
    currentTime[8] = state.ordinaryDayIndex
    currentTime[9] = Math.floor((state.dayElapsed / submoment) % timeDiv[0])

    //digital clock generator
    timeO[1] = "00".substr(str(currentTime[3]).length) + str(currentTime[3]) // 0 - 7
    timeO[2] = "00".substr(str(currentTime[2]).length) + str(currentTime[2]) // 0 - 63
    timeO[3] = "00".substr(str(currentTime[1]).length) + str(currentTime[1]) // 0 - 63
    timeO[4] = divisions[currentTime[4]] // 0 - 2
    timeO[5] = templeInAnnualApsisInterval ? "AI" : "00".substr(str(currentTime[5]).length) + str(currentTime[5] + 1) // 1 - 28
    timeO[6] = templeInAnnualApsisInterval ? "AP" : "00".substr(str(currentTime[6]).length) + str(currentTime[6] + 1) // 1 - 14
    timeO[7] = "000".substr(str(currentTime[7]).length) + str(currentTime[7] + 1) // 1 - x

    for (let i = 0; i < timeUnitsMoment.length; i++) {
        // timing
        // time expressed as moments
        timeMoment[i] = currentTime[i] * timeUnitsMoment[i]
        if (i > 0) {
            timeMoment[i] += currentTime[0]
        }

        // Time as decimal
        timeScale[i] = map(timeMoment[i], 0, timeUnitsMax[i], 0, 1)

        // Time as decimal cycle
        if (timeMoment[i] < timeUnitsMax[i] * .5) {
            timeScaleCycle[i] = map(timeMoment[i], 0, timeUnitsMax[i] * .5, 0, 1)
        }
        else {
            timeScaleCycle[i] = map(timeMoment[i], timeUnitsMax[i] * .5, timeUnitsMax[i], 1, 0)
        }
    }
} 
function templeDOYtoGregMD(dayOfYear) {
    const shiftedDay = ((dayOfYear - 1 + 14) % 365 + 365) % 365 + 1
    const monthNames = ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"]
    const monthLengths = [30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31]

    let day = shiftedDay

    for (let i = 0; i < monthLengths.length; i++) {
        if (day <= monthLengths[i]) {
            return monthNames[i] + day
        }
        day -= monthLengths[i]
    }

    return ""
}

function templePad(value, width = 2) {
    return String(value).padStart(width, "0")
}

function templeOrdinaryDayFromTimeParts(timeParts) {
    if (Number.isInteger(timeParts[8])) {
        return timeParts[8]
    }

    let monthIndex = timeParts[6]
    let dayOfMonth = timeParts[5]
    let ordinaryDayIndex = 0
    for (let i = 0; i < monthIndex && i < calandarThisYear.length; i++) {
        ordinaryDayIndex += calandarThisYear[i]
    }

    return ordinaryDayIndex + dayOfMonth
}

function templeDateFields(timeParts = currentTime) {
    let yearNumber = (timeParts[7] || 0) + 1
    let ordinaryDayIndex = templeOrdinaryDayFromTimeParts(timeParts)
    let ordinaryDayNumber = ordinaryDayIndex + 1
    let monthDays = 0

    for (let i = 0; i < 13 && i < calandarThisYear.length; i++) {
        let monthLength = calandarThisYear[i]

        if (ordinaryDayIndex < monthDays + monthLength) {
            let dayInMonth = ordinaryDayIndex - monthDays
            let weekNumber = Math.floor(dayInMonth / 9) + 1
            let dayNumber = (dayInMonth % 9) + 1
            let kind = dayInMonth >= 27 ? "Moonday" : "Month Day"

            return {
                yearNumber,
                monthNumber: i + 1,
                weekNumber,
                dayNumber,
                ordinaryDayNumber,
                kind
            }
        }

        monthDays += monthLength
    }

    if (ordinaryDayIndex < 365) {
        let sunDayIndex = ordinaryDayIndex - monthDays
        return {
            yearNumber,
            monthNumber: 14,
            weekNumber: Math.floor(sunDayIndex / 9) + 1,
            dayNumber: (sunDayIndex % 9) + 1,
            ordinaryDayNumber,
            kind: "Sun Day " + (sunDayIndex + 1)
        }
    }

    return {
        yearNumber,
        monthNumber: "AP",
        weekNumber: "AI",
        dayNumber: "AI",
        ordinaryDayNumber,
        kind: "Apsis"
    }
}

function templeDateDisplay(timeParts = currentTime) {
    let fields = templeDateFields(timeParts)
    let month = typeof fields.monthNumber == "number" ? templePad(fields.monthNumber) : fields.monthNumber
    let week = typeof fields.weekNumber == "number" ? templePad(fields.weekNumber) : fields.weekNumber
    let day = typeof fields.dayNumber == "number" ? templePad(fields.dayNumber) : fields.dayNumber
    let ordinaryDay = templePad(fields.ordinaryDayNumber, 3)
    let date = "Year " + templePad(fields.yearNumber, 3) + " - Month " + month + " / Week " + week + " / Day " + day + " / Ordinary Day " + ordinaryDay

    if (fields.kind != "Month Day") {
        date += " (" + fields.kind + ")"
    }

    return date
}

function templeClockDisplay(timeParts = currentTime) {
    return str(timeParts[3]) + "(" + str(divisions[timeParts[4]]) + "):" + str(timeParts[2]) + ":" + str(timeParts[1]) + " [" + str(timeParts[0]) + "]"
}

function templeCalendarYearFromSeed(seed = [27.55454977, 27, 0.55454977, 27, 27, 1]) {
    let calendarYear = [Array.from(seed)]
    calendarYear[0][4] = calendarYear[0][3]

    for (let i = 0; i < 15; i++) {
        let monthLength = 0
        if (i > 0) {
            if (i % 13 == 0) {
                monthLength = 365 - calendarYear[i - 1][4]
            } else if (calendarYear[i - 1][2] > 0.44545023) {
                monthLength = 28
            } else {
                monthLength = 27
            }

            calendarYear.push([0, 0, 0, 0, calendarYear[i - 1][4] + monthLength, 0])
            calendarYear[i][3] = monthLength

            if (i % 13 == 0) {
                calendarYear[i][0] = calendarYear[i - 1][0] + calendarYear[i][3]
            } else {
                calendarYear[i][0] = calendarYear[i - 1][0] + 27.55454977
            }

            calendarYear[i][1] = calendarYear[i - 1][1] + calendarYear[i][3]
            calendarYear[i][2] = calendarYear[i][0] - calendarYear[i][1]
        }

        if (i == 14) {
            if (calendarYear[13][3] > calendarYear[13][5]) {
                calendarYear[14][5] = 27 + calendarYear[13][5] - calendarYear[13][3]
            } else {
                calendarYear[14][5] = calendarYear[13][5] - calendarYear[13][3]
            }
        } else {
            calendarYear[i][5] = calendarYear[0][5]
        }
    }

    return calendarYear
}

function templeMonthLengthsForYear(yearIndex) {
    let calendarYear = templeCalendarYearFromSeed()
    for (let i = 0; i < yearIndex; i++) {
        calendarYear = templeCalendarYearFromSeed(calendarYear[14])
    }

    return calendarYear.slice(0, 14).map(function(monthData) {
        return monthData[3]
    })
}

function templeGregorianDateForYearElapsed(yearIndex, yearElapsed) {
    return new Date(templeEpoch + (yearIndex * year) + yearElapsed - (templeEarthZone * hr))
}

function templeGregorianDateForCalendarDay(yearIndex, ordinaryDayIndex) {
    return templeGregorianDateForYearElapsed(yearIndex, ordinaryDayIndex * day)
}

function templeGregorianDateLabel(yearIndex, ordinaryDayIndex, includeYear = false) {
    let date = templeGregorianDateForCalendarDay(yearIndex, ordinaryDayIndex)
    if (Number.isNaN(date.getTime())) {
        return ""
    }

    let month = date.getMonth() + 1
    let dayOfMonth = date.getDate()
    if (!includeYear) {
        return month + "/" + dayOfMonth
    }

    let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    return monthNames[date.getMonth()] + " " + dayOfMonth + ", " + date.getFullYear()
}

function templeGregorianDateTimeLabel(date) {
    if (Number.isNaN(date.getTime())) {
        return ""
    }

    let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + templePad(date.getHours()) + ":" + templePad(date.getMinutes()) + ":" + templePad(date.getSeconds())
}

function templeDurationLabel(duration) {
    let totalSeconds = Math.round(duration / 1000)
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds % 3600) / 60)
    let seconds = totalSeconds % 60

    return templePad(hours) + ":" + templePad(minutes) + ":" + templePad(seconds)
}

function templeGregorianNewYearDayIndex(yearIndex) {
    for (let dayIndex = 0; dayIndex < 365; dayIndex++) {
        let date = templeGregorianDateForCalendarDay(yearIndex, dayIndex)
        if (date.getMonth() == 0 && date.getDate() == 1) {
            return dayIndex
        }
    }

    return -1
}

// calculates the temple calandar for current year starting from beginging of temple era
function calandarSetup() {
    calandar = []
    calandarByMonth = []
    calandarThisYear = []
    templeCalandar = []
    mondays = []

    function calandarCount(x = [27.55454977, 27, 0.55454977, 27, 27, 1]) {
        let calandarYear = [x]
        x[4] = x[3]

        for (let i = 0; i < 15; i++) {
            let monthLength = 0
            if (i > 0) {
                if (i % 13 == 0) {
                    monthLength = 365 - calandarYear[i - 1][4]
                } else if (calandarYear[i - 1][2] > 0.44545023) {
                    monthLength = 28
                    // total += 28
                } else {
                    monthLength = 27
                    // total += 27
                }

                calandarYear.push([0, 0, 0, 0, calandarYear[i - 1][4] + monthLength, 0])

                calandarYear[i][3] = monthLength

                if (i % 13 == 0) {
                    calandarYear[i][0] = calandarYear[i - 1][0] + calandarYear[i][3]
                } else {
                    calandarYear[i][0] = calandarYear[i - 1][0] + 27.55454977
                }

                calandarYear[i][1] = calandarYear[i - 1][1] + calandarYear[i][3]
                calandarYear[i][2] = calandarYear[i][0] - calandarYear[i][1]
            }


            if (i == 14) {
                if (calandarYear[13][3] > calandarYear[13][5]) {
                    calandarYear[14][5] = 27 + calandarYear[13][5] - calandarYear[13][3]
                } else {
                    calandarYear[14][5] = (calandarYear[13][5] - calandarYear[13][3])
                }
            } else {
                calandarYear[i][5] = calandarYear[0][5]
            }
        }
        calandar.push(calandarYear)
    }

    let D = templeDateDMY[0]
    let M = 0
    let Y = templeDateDMY[2]

    //initialize calandar calculation
    calandarCount()

    //iterate calandar to current year
    for (let i = 0; i < Y; i++) {
        calandarCount(calandar[i][14])
    }
    for (let i = 0; i < Y + 1; i++) {
        calandar[i].pop()
        calandarByMonth.push([])
        for (let ii = 0; ii < 14; ii++) {
            calandarByMonth[i].push(calandar[i][ii][3])
        }
    }
    calandarThisYear = calandarByMonth[Y]

    let dayCount = 0
    let dayOfMonthCount = 0
    let dayOfMonth = 0

        for (let i = 0; i < 13; i++) {
            let s
            dayOfMonthCount = 0
                //write month number
                if (i < 9) {
                    s = 0 + String(i+1)
                } else {
                    s = String(i+1)
                }

                templeCalandar.push([s, '   ',])

                for (let ii = 0; ii < calandarThisYear[i] / 9; ii++) {
                    if (ii < 3) {
                        let wom = []
                        //write days of week
                        for (let dow = 1; dow < 10; dow++){
                            if(dayCount == D) {
                                wom.push('T')
                                M = i
                                dayOfMonth = dayOfMonthCount
                            } else if (dayCount == 48){
                                wom.push('g') // mark gregorian new year
                            } else if (dayCount == aphelionDayIndex) {
                                wom.push('a') // mark aphelion
                            } else {
                                wom.push(String(dow))
                             // wom.push(String(templeDOYtoGregMD(dayCount)))
                            }
                            dayCount++


                            dayOfMonthCount++
                        }
                        wom.push('   ')
                        templeCalandar[i].push(wom)
                    } else {
                        if (D != dayCount) {
                            //replace with X if day of year
                            templeCalandar[i].push(['M'])
                            mondays.push(templeDOYtoGregMD(dayCount))
                            dayCount++
                            dayOfMonthCount += 1

                        } else {
                            templeCalandar[i].push(['X'])
                            dayOfMonth = dayOfMonthCount
                            dayCount += 1
                            dayOfMonthCount += 1
                            M = i                        }
                    }
                }
        }

        templeCalandar.push([]) // Sundays
        let sundayLength = calandarThisYear[13]
        
        for (let i = 0; i < sundayLength; i++) {
            if (D != dayCount) {
                // compute Gregorian date
                let greg = templeDOYtoGregMD(dayCount)
                let label = 'S-' + String(i + 1)
        
                if (i === 0) {
                    label = `(${greg}) ` + label
                } else if (i === sundayLength - 1) {
                    label += ` (${greg})`
                }
        
                templeCalandar[13].push([label])
            } else {
                templeCalandar[13].push('X ')
                M = 13
                dayOfMonth = dayOfMonthCount
            }
            dayCount += 1
            dayOfMonthCount += 1
        }

        if (templeInAnnualApsisInterval) {
            M = 13
            dayOfMonth = 0
        }
        
        

    templeDateDMY[1] = M
    templeDayOfMonth = dayOfMonth
}

function appendTempleCalendarText(parent, text, className = "calendar-heading") {
    let element = document.createElement("div")
    element.className = className
    element.textContent = text
    parent.appendChild(element)
    return element
}

function templeCalendarMarker(dayOfYear, label, currentLabel = "T", context = {}) {
    let marker = {
        label,
        className: "",
        title: ""
    }

    if (dayOfYear == context.gregorianNewYearDayIndex) {
        marker.label = "g"
        marker.className += " calendar-gregorian"
        marker.title = "Gregorian new year"
    }

    if (dayOfYear == aphelionDayIndex) {
        marker.label = "a"
        marker.className += " calendar-aphelion"
        marker.title = marker.title ? marker.title + "; aphelion" : "Aphelion"
    }

    if (context.isCurrentYear && dayOfYear == context.currentDayIndex) {
        marker.label = currentLabel
        marker.className += " calendar-current"
        marker.title = marker.title ? marker.title + "; current Temple day" : "Current Temple day"
    }

    return marker
}

function applyTempleCalendarMarker(element, dayOfYear, label, currentLabel = "T", context = {}) {
    let marker = templeCalendarMarker(dayOfYear, label, currentLabel, context)
    let markerText = document.createElement("span")
    markerText.className = "calendar-day-marker"
    markerText.textContent = marker.label
    element.appendChild(markerText)

    let count = document.createElement("span")
    count.className = "calendar-day-count"
    count.textContent = templePad(dayOfYear + 1, 3)
    element.appendChild(count)

    let gregorianDate = document.createElement("span")
    gregorianDate.className = "calendar-gregorian-date"
    gregorianDate.textContent = templeGregorianDateLabel(context.yearIndex, dayOfYear)
    element.appendChild(gregorianDate)
    element.className += marker.className
    if (marker.title) {
        element.title = marker.title
        element.setAttribute("aria-label", marker.title + ": " + marker.label)
    }
    if (context.isCurrentYear && dayOfYear == context.currentDayIndex) {
        element.setAttribute("aria-current", "date")
    }
}

function appendTempleCalendarMonth(parent, context, monthIndex, startDayOfYear, monthLength) {
    let monthElement = document.createElement("section")
    monthElement.className = "calendar-month"
    if (context.isCurrentYear && monthIndex == context.currentMonthIndex) {
        monthElement.className += " calendar-active-month"
    }

    let heading = document.createElement("h2")
    heading.textContent = "Month " + String(monthIndex + 1).padStart(2, "0")
    monthElement.appendChild(heading)

    let table = document.createElement("table")
    table.setAttribute("aria-label", "Temple month " + String(monthIndex + 1))

    let body = document.createElement("tbody")
    let dayOffset = 0
    let activeWeekIndex = context.isCurrentYear && monthIndex == context.currentMonthIndex && context.currentDayOfMonth < 27 ? Math.floor(context.currentDayOfMonth / 9) : -1
    for (let weekIndex = 0; weekIndex < 3; weekIndex++) {
        let row = document.createElement("tr")
        if (weekIndex == activeWeekIndex) {
            row.className = "calendar-active-week"
        }
        for (let dayOfWeek = 1; dayOfWeek <= 9; dayOfWeek++) {
            let cell = document.createElement("td")
            cell.className = "calendar-day"
            let dayOfYear = startDayOfYear + dayOffset
            applyTempleCalendarMarker(cell, dayOfYear, String(dayOfWeek), String(dayOfWeek), context)
            row.appendChild(cell)
            dayOffset++
        }
        body.appendChild(row)
    }
    table.appendChild(body)
    monthElement.appendChild(table)

    if (monthLength > 27) {
        let moondayDayOfYear = startDayOfYear + 27
        let moonday = document.createElement("div")
        moonday.className = "calendar-special-day"
        if (context.isCurrentYear && moondayDayOfYear == context.currentDayIndex) {
            moonday.className += " calendar-active-week"
        }

        let moondayMarker = document.createElement("span")
        moondayMarker.className = "calendar-special-marker"
        applyTempleCalendarMarker(moondayMarker, moondayDayOfYear, "M", "M", context)
        moonday.appendChild(moondayMarker)

        let moondayLabel = document.createElement("span")
        moondayLabel.textContent = "Moonday " + templeGregorianDateLabel(context.yearIndex, moondayDayOfYear, true)
        moonday.appendChild(moondayLabel)
        monthElement.appendChild(moonday)
    }

    parent.appendChild(monthElement)
}

function appendTempleSunDays(parent, context, startDayOfYear, sunDayLength) {
    let section = document.createElement("section")
    section.className = "calendar-section"
    appendTempleCalendarText(section, "Sun Days", "calendar-heading")

    let sunGrid = document.createElement("div")
    sunGrid.className = "calendar-sun-grid"
    for (let i = 0; i < sunDayLength; i++) {
        let sunDay = document.createElement("div")
        sunDay.className = "calendar-sun-day"
        let dayOfYear = startDayOfYear + i
        applyTempleCalendarMarker(sunDay, dayOfYear, "S-" + String(i + 1), "S-" + String(i + 1), context)
        sunGrid.appendChild(sunDay)
    }

    section.appendChild(sunGrid)
    parent.appendChild(section)
}

function appendTempleApsisInterval(parent, context) {
    let section = document.createElement("section")
    section.className = "calendar-section calendar-apsis"
    appendTempleCalendarText(section, "Annual Apsis Interval", "calendar-heading")

    let status = document.createElement("div")
    status.className = templeInAnnualApsisInterval ? "calendar-center calendar-current-text" : "calendar-center"
    status.className += " calendar-apsis-status"

    let apsisMarker = document.createElement("span")
    apsisMarker.className = "calendar-apsis-marker"

    let markerText = document.createElement("span")
    markerText.className = "calendar-day-marker"
    markerText.textContent = "APSIS"
    apsisMarker.appendChild(markerText)

    let count = document.createElement("span")
    count.className = "calendar-day-count"
    count.textContent = templePad(366, 3)
    apsisMarker.appendChild(count)

    let apsisDate = document.createElement("span")
    apsisDate.className = "calendar-gregorian-date"
    apsisDate.textContent = templeGregorianDateLabel(context.yearIndex, 365)
    apsisMarker.appendChild(apsisDate)

    status.appendChild(apsisMarker)

    let statusText = document.createElement("span")
    let apsisStart = templeGregorianDateTimeLabel(templeGregorianDateForYearElapsed(context.yearIndex, ordinaryYear))
    let nextYearStart = templeGregorianDateTimeLabel(templeGregorianDateForYearElapsed(context.yearIndex, year))
    let apsisDuration = templeDurationLabel(annualApsisInterval)
    let apsisStatus = templeInAnnualApsisInterval && context.isCurrentYear ? "Active now" : "After the Sun days"
    statusText.textContent = apsisStatus + " - " + apsisStart + " to " + nextYearStart + " - Duration " + apsisDuration
    status.appendChild(statusText)
    section.appendChild(status)

    parent.appendChild(section)
}

function appendTempleCalendarKey(parent) {
    let section = document.createElement("section")
    section.className = "calendar-section calendar-key"
    appendTempleCalendarText(section, "Key", "calendar-heading")

    let keyGrid = document.createElement("div")
    keyGrid.className = "calendar-key-grid"
    let keyItems = [
        ["T", "Current Temple day"],
        ["g", "Gregorian new year"],
        ["a", "Aphelion"],
        ["M", "Moonday"],
        ["S", "Sun day"],
        ["APSIS", "Annual apsis interval"],
        ["1/1", "Gregorian equivalent"],
        ["001", "Ordinary day count"]
    ]

    keyItems.forEach(function(item) {
        let keyItem = document.createElement("div")
        keyItem.className = "calendar-key-item"

        let symbol = document.createElement("span")
        symbol.className = "calendar-key-symbol"
        symbol.textContent = item[0]
        keyItem.appendChild(symbol)

        let label = document.createElement("span")
        label.textContent = item[1]
        keyItem.appendChild(label)

        keyGrid.appendChild(keyItem)
    })

    section.appendChild(keyGrid)
    parent.appendChild(section)
}

function templeCalendarDisplayContext() {
    let yearIndex = Math.max(0, Math.floor(templeCalendarDisplayYearIndex || 0))
    let monthLengths = templeMonthLengthsForYear(yearIndex)
    let isCurrentYear = yearIndex == currentTime[7]

    return {
        yearIndex,
        monthLengths,
        isCurrentYear,
        currentDayIndex: isCurrentYear ? templeDateDMY[0] : -1,
        currentMonthIndex: isCurrentYear ? templeDateDMY[1] : -1,
        currentDayOfMonth: isCurrentYear ? templeDayOfMonth : -1,
        gregorianNewYearDayIndex: templeGregorianNewYearDayIndex(yearIndex)
    }
}

function templeCalendarYearMeta(context) {
    let yearLabel = "Year " + templePad(context.yearIndex + 1, 3)
    if (context.isCurrentYear) {
        return yearLabel + " - Current Temple Year"
    }

    return yearLabel
}

function setTempleCalendarDisplayYear(yearIndex) {
    templeCalendarDisplayYearIndex = Math.max(0, Math.floor(Number(yearIndex) || 0))
    renderTempleCalendarOverlay()
}

function changeTempleCalendarDisplayYear(delta) {
    setTempleCalendarDisplayYear(templeCalendarDisplayYearIndex + delta)
}

function setTempleCalendarDisplayYearFromInput(value) {
    setTempleCalendarDisplayYear(Math.max(1, Number(value) || 1) - 1)
}

function appendTempleCalendarControls(parent, context) {
    let controls = document.createElement("div")
    controls.className = "calendar-controls"

    let previousButton = document.createElement("button")
    previousButton.className = "calendar-control"
    previousButton.type = "button"
    previousButton.textContent = "Previous Year"
    previousButton.disabled = context.yearIndex <= 0
    previousButton.addEventListener("click", function() {
        changeTempleCalendarDisplayYear(-1)
    })
    controls.appendChild(previousButton)

    let currentButton = document.createElement("button")
    currentButton.className = "calendar-control"
    currentButton.type = "button"
    currentButton.textContent = "Current Year"
    currentButton.addEventListener("click", function() {
        setTempleCalendarDisplayYear(currentTime[7])
    })
    controls.appendChild(currentButton)

    let nextButton = document.createElement("button")
    nextButton.className = "calendar-control"
    nextButton.type = "button"
    nextButton.textContent = "Next Year"
    nextButton.addEventListener("click", function() {
        changeTempleCalendarDisplayYear(1)
    })
    controls.appendChild(nextButton)

    let yearLabel = document.createElement("label")
    yearLabel.className = "calendar-year-control"
    yearLabel.textContent = "Year "
    let yearInput = document.createElement("input")
    yearInput.type = "number"
    yearInput.min = "1"
    yearInput.step = "1"
    yearInput.value = String(context.yearIndex + 1)
    yearInput.addEventListener("change", function() {
        setTempleCalendarDisplayYearFromInput(yearInput.value)
    })
    yearLabel.appendChild(yearInput)
    controls.appendChild(yearLabel)

    parent.appendChild(controls)
}

function renderTempleCalendarOverlay() {
    kali()

    let calendarMeta = document.getElementById("calendar-meta")
    let calendarBody = document.getElementById("calendar-body")
    if (!calendarMeta || !calendarBody) {
        return
    }

    let context = templeCalendarDisplayContext()
    calendarMeta.textContent = templeCalendarYearMeta(context)
    calendarBody.textContent = ""
    calendarBody.className = "calendar-page"

    appendTempleCalendarControls(calendarBody, context)
    appendTempleCalendarText(calendarBody, "LUNISOLAR TEMPLE CALENDAR")

    let yearGrid = document.createElement("div")
    yearGrid.className = "calendar-year-grid"
    let dayOfYear = 0
    for (let i = 0; i < 13; i++) {
        appendTempleCalendarMonth(yearGrid, context, i, dayOfYear, context.monthLengths[i])
        dayOfYear += context.monthLengths[i]
    }
    calendarBody.appendChild(yearGrid)

    appendTempleSunDays(calendarBody, context, dayOfYear, context.monthLengths[13])
    appendTempleApsisInterval(calendarBody, context)
    appendTempleCalendarKey(calendarBody)
}

function openTempleCalendarOverlay() {
    kali()
    templeCalendarDisplayYearIndex = currentTime[7]
    renderTempleCalendarOverlay()
    on(3)
}

// detects if mouse is hovering over trigger areas
function UI(UIShow = false) {

    function boolHover(shapes = [[0, 0, 0, 0, 0]], show) {
        push()
        logic = []
        mouse = createVector(mouseX,mouseY)


            push()
            if (show) {
                stroke(255,0,0)
                strokeWeight(5)
                point(mouseX, mouseY)
            }
        pop()

        let hover = true

        for (shape of shapes) {
            push()
                noFill()
                strokeWeight(5)
                stroke(255,0,0)
                rectMode(CENTER)

            //circle
            if (shape[4] == 0) {
                if (show) {
                    circle(shape[1], shape[2], shape[3])
                    point(shape[1],shape[2])
                }

                let center = createVector(shape[1], shape[2])

                    if (shape[0] && center.dist(mouse) > (shape[3]) * .5 && shape[0] == true) {
                        hover = false
                    }

                    if (!shape[0] && center.dist(mouse) < (shape[3]) * .5 && shape[0] == true) {
                        hover = false
                    }



            } else {
                if (show) {
                    rect(shape[1], shape[2], shape[3], shape[4])
                    point(shape[1],shape[2])
                }

                let leftBoundry = mouse.x < (shape[1] - (shape[3] * .5))
                let rightBoundry = mouse.x > (shape[1] + (shape[3] * .5))
                let topBoundry = mouse.y < (shape[2] - (shape[4] * .5))
                let botomBoundry = mouse.y > (shape[2] + (shape[4] * .5))

                if  (shape[0] && (leftBoundry || rightBoundry || topBoundry || botomBoundry)) { hover = false }


                if (!shape[0] &&(!leftBoundry && !rightBoundry && !topBoundry && !botomBoundry)) { hover = false }

            }
            pop()
        }

        pop()
        return hover
    }
    circleHover = boolHover([
            [true, width / 2, height / 2, mother.width * .72, 0]
        ],
        UIShow)

    dateHover = boolHover([
        [true,
            width / 2, height * .287,
            mother.width * .5, mother.width * .08],
        [true, width / 2, height / 2, mother.width * .72, 0]
        ],
        UIShow)

    timeOracleHover = boolHover([
            [true, width / 2, height *.376, mother.width * .07, mother.width * .075],
        ],
        UIShow)

    titleHover = boolHover([
        [true, width / 2, height * .0976,
            mother.width * .5, mother.width * .15]
    ],
        UIShow)

    changeHover = boolHover([
        [true,
            width / 2, height * .705,
            mother.width * .5, mother.width * .09],
        [true, width / 2, height / 2, mother.width * .72, 0]
        ],
        UIShow)    

}
const oracleBarPositions = [.773, .786, .799, .812, .825]

function getOracleSpectra() {
    if (!oracleSpectra) {
        oracleSpectra = [
            [templeOraclePolarity(0), templeOraclePolarity(32)],
            Array.from({ length: 64 }, (_, i) => templeOracleValue(i)),
            Array.from({ length: 8 }, (_, i) => templeOracleColorFamilyFromValue(i)),
            Array.from({ length: 64 }, (_, i) => templeOracleHue(i)),
            Array.from({ length: 64 }, (_, i) => templeOracleIntegratedColorColumn(i))
        ]
    }
    return oracleSpectra
}

function paintOracleSpectrum(graphics, columns, x, y, width, height) {
    const columnWidth = width / columns.length
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const centerX = x - width / 2 + columnWidth * (i + .5)
        if (Array.isArray(column)) {
            const rowHeight = height / column.length
            for (let row = 0; row < column.length; row++) {
                const color = column[row]
                graphics.fill(color.red, color.green, color.blue)
                graphics.rect(centerX, y - height / 2 + rowHeight * (row + .5), columnWidth + 1, rowHeight + 1)
            }
        } else {
            graphics.fill(column.red, column.green, column.blue)
            graphics.rect(centerX, y, columnWidth + 1, height)
        }
    }
}

function drawOracleSelectionBars(showDecisionOutput) {
    if (!showDecisionOutput && oracleSpectrumLayer) {
        drawShrineLayer(oracleSpectrumLayer)
        return
    }
    const x = mother.width / 2
    const width = mother.width * .2 * 1.08
    const height = mother.height * .0075
    let graphics = window
    let selectedColors
    let spectra
    if (showDecisionOutput) {
        const index = timeStamp[0]
        selectedColors = [
            templeOraclePolarity(index), templeOracleValue(index), templeOracleColorFamily(index),
            templeOracleHue(index), templeOracleAdjustedColor(index, timeStamp[9])
        ]
    } else {
        spectra = getOracleSpectra()
        const margin = height / 2 + 2
        const top = mother.height * oracleBarPositions[0] - margin
        const bottom = mother.height * oracleBarPositions[oracleBarPositions.length - 1] + margin
        oracleSpectrumLayer = createShrineLayer(x - width / 2 - margin, top, x + width / 2 + margin, bottom)
        graphics = oracleSpectrumLayer.graphics
    }

    graphics.push()
    graphics.rectMode(CENTER)
    for (let i = 0; i < oracleBarPositions.length; i++) {
        const y = mother.height * oracleBarPositions[i]
        graphics.noStroke()
        graphics.fill(0)
        graphics.rect(x, y, width, height)
        if (showDecisionOutput) {
            const color = selectedColors[i]
            graphics.fill(color.red, color.green, color.blue)
            graphics.rect(x, y, width, height)
        } else {
            paintOracleSpectrum(graphics, spectra[i], x, y, width, height)
        }
        graphics.noFill()
        graphics.stroke(112)
        graphics.strokeWeight(height * .08)
        graphics.rect(x, y, width, height)
    }
    graphics.pop()

    if (!showDecisionOutput) drawShrineLayer(oracleSpectrumLayer)
}

//displays oracle
function displays(c) {
    push()

    // get iching oracles as string
    let iChingOracleStrings = ['', ''] // ["101010", "011010"]
    for (i = 0; i < 6; i++) {
        for (ii = 0; ii < 2; ii++) {
            iChingOracleStrings[ii] += str(oracleC[i][ii])
        }
    }

    function printOracle(
        S ,
        W = windowHeight * .1,
        H = W * 1.61803398875,
        X = windowWidth * .5,
        Y = windowHeight * .5,
        B = 6,
        CONSTRUCTION = 0,
        strokeC = 255,
        strokeW = H / 11,
        highlight = true) {
        push()

        H = W * 1.61803398875
        strokeW = H / 11

        function yMap(V,Y,H,sw) {
            return map(V, Y - (H * .5), Y + (H * .5), Y - (H * .5) + (sw * .5), Y + (H * .5) - (sw * .5))
        }

        function printYinYang(YY, sw, W, X1, Y1, X2, Y2) {
            if (highlight) {
                push()
                stroke(255 - strokeC)
                strokeWeight(strokeW * 1.666)
                strokeCap(PROJECT)
            if (YY==1) {
                line(X1, Y1, X2, Y2)   
            } else {
                line(X1, Y1, X1+(W*.5) - (sw*.5), Y2) 
                line(X1+(W*.5) + (sw*.5), Y2,X2, Y1) 
            }
                pop()

            }

            if (YY == 1) {
                line(X1, Y1, X2, Y2)   
            } else {
                line(X1, Y1, X1+(W*.5) - (sw*.5), Y2) 
                line(X1+(W*.5) + (sw*.5), Y2,X2, Y1) 
            }



        }
        push()
        rectMode(CENTER)
        strokeWeight(strokeW)
        stroke(strokeC)

        let incriment = (H - strokeW) / (B * 2 - 1)

        if (B == 1) {
            printYinYang(
                S[0], strokeW, W, X - (W * .5), Y, X + (W * .5), Y
            )
        }

        if (B == 2) {

            push()
            incriment = (H - strokeW) / (B)
            translate(0,strokeW*.5)
            for (let i = 0; i < B; i++) {
                if (i>=CONSTRUCTION) { 
                    printYinYang(
                        S[B - i -1],
                        strokeW, W,
                        X - (W * .5), Y - strokeW + (strokeW * 2 * i),
                        X + (W * .5), Y - strokeW + (strokeW * 2 * i)
                    )
            }
            }

            pop()



        }

        if (B == 3) {
            push()
            translate(0, strokeW * .5)
            incriment = (H - strokeW) / (B*2 - 1)

            // for (let i = 0; i < B; i++){
            //     printYinYang(S[B-1 - i],strokeW,X - (W * .5), strokeW+ (Y - (H * .5)) +  (incriment * i*2), X + (W * .5), strokeW+Y - (H * .5) +  (incriment * i*2))
            // }

            for (let i = 0; i < B; i++) {
                if (i >= CONSTRUCTION) {
                    printYinYang(
                        S[B - i - 1],
                        strokeW, W,
                        X - (W * .5), Y - (strokeW*2) + (strokeW * 2 * i),
                        X + (W * .5), Y - (strokeW*2) + (strokeW * 2 * i)
                    )
                }
            }

            pop()

        }

        if (B == 6) {
            push()
            incriment = (H - strokeW) / (B - 1)
            translate(0,strokeW*.5)
            for (let i = 0; i < B; i++) {
                if (i>=CONSTRUCTION) { 
                    printYinYang(S[B-1 - i], strokeW, W, X - (W * .5), (Y - (H * .5)) + (incriment * i), X + (W * .5), Y - (H * .5) + (incriment * i))
            }
            }

            pop()

        }        
        pop()
        pop()
    }

    function timeOracleDisplay(textStroke = 0) {
        let timeOracleSize = mother.width * .1
        let timeOracleY = mother.height * .314
        let timeOracleNameY = timeOracleY * .777

        stroke(0)
        strokeWeight(textStroke * .0666 * timeOracleSize)

        textAlign(CENTER,CENTER)

        textSize(timeOracleSize)
        text(oracles[timeStamp[0]], mother.width / 2, timeOracleY)
        textSize(timeOracleSize * .2)

        //display oracle name
        // text(names[timeStamp[0]], mother.width / 2, timeOracleNameY)

        let stamp = str(timeStamp[3]) +'('+str(divisions[timeStamp[4]])+')'+ ':' + str(timeStamp[2])+ ':' +str(timeStamp[1]) + ' [' + str(timeStamp[0]) + ']'

        text(stamp, mother.width / 2, timeOracleNameY)
    }

    function timeOracleCompass(x, y, radius, directionIndex, label, marks, showPointer = true, options = {}) {
        let compassSteps = options.steps || 8
        let normalizedDirection = compassSteps == 64 ? templeNormalizeOracleIndex(directionIndex) : templeTrigramClockDirection(directionIndex)
        let headingDegrees = Number(options.headingDegrees)
        let referenceRotation = Number.isFinite(headingDegrees) ? -(TWO_PI * wrap360(headingDegrees) / 360) : 0
        let angle = referenceRotation - HALF_PI + (TWO_PI / compassSteps) * normalizedDirection
        let pointerBase = radius * .18
        let pointerTip = radius * .82
        let pointerHeadLength = radius * .24
        let pointerHeadWidth = radius * .16
        let referenceMarks = marks || {}
        let directionX = cos(angle)
        let directionY = sin(angle)
        let tangentX = -directionY
        let tangentY = directionX

        push()
        translate(x, y)
        noFill()
        stroke(255)
        strokeWeight(radius * .045)
        circle(0, 0, radius * 2)

        for (let i = 0; i < compassSteps; i++) {
            let spokeAngle = referenceRotation - HALF_PI + (TWO_PI / compassSteps) * i
            let majorSpoke = compassSteps == 64 ? i % 8 == 0 : i % 2 == 0
            let innerRadius = majorSpoke ? radius * .72 : radius * .86
            let outerRadius = radius * .98
            strokeWeight(majorSpoke ? radius * .05 : radius * .018)
            line(
                cos(spokeAngle) * innerRadius,
                sin(spokeAngle) * innerRadius,
                cos(spokeAngle) * outerRadius,
                sin(spokeAngle) * outerRadius
            )
        }

        let compassMarks = [
            { label: referenceMarks.top, direction: 0 },
            { label: referenceMarks.right, direction: compassSteps / 4 },
            { label: referenceMarks.bottom, direction: compassSteps / 2 },
            { label: referenceMarks.left, direction: compassSteps * .75 }
        ].map(function(mark) {
            let markAngle = referenceRotation - HALF_PI + (TWO_PI / compassSteps) * mark.direction
            return {
                label: mark.label,
                x: cos(markAngle) * radius * 1.34,
                y: sin(markAngle) * radius * 1.34
            }
        })

        fill(255)
        stroke(0)
        strokeWeight(radius * .08)
        textSize(radius * .32)
        compassMarks.forEach(function(mark) {
            if (mark.label) {
                text(mark.label, mark.x, mark.y)
            }
        })

        if (showPointer) {
            stroke(0)
            strokeWeight(radius * .2)
            line(directionX * pointerBase, directionY * pointerBase, directionX * pointerTip, directionY * pointerTip)
            stroke(255)
            strokeWeight(radius * .09)
            line(directionX * pointerBase, directionY * pointerBase, directionX * pointerTip, directionY * pointerTip)
            noStroke()
            fill(255)
            triangle(
                directionX * pointerTip,
                directionY * pointerTip,
                directionX * (pointerTip - pointerHeadLength) + tangentX * pointerHeadWidth,
                directionY * (pointerTip - pointerHeadLength) + tangentY * pointerHeadWidth,
                directionX * (pointerTip - pointerHeadLength) - tangentX * pointerHeadWidth,
                directionY * (pointerTip - pointerHeadLength) - tangentY * pointerHeadWidth
            )
        }

        if (label) {
            fill(255)
            stroke(0)
            strokeWeight(radius * .08)
            textSize(radius * .42)
            text(label, 0, 0)
        }
        pop()
    }

    function timeOracleHalfCompass(x, y, radius, directionIndex, label, showPointer = true) {
        let compassSteps = 32
        let normalizedDirection = templeOracleBandedHalfCompassDirection(directionIndex)
        let startAngle = -HALF_PI
        let endAngle = HALF_PI
        let angle = startAngle + ((endAngle - startAngle) / compassSteps) * (normalizedDirection + .5)
        let pointerBase = radius * .12
        let pointerTip = radius * .82
        let pointerHeadLength = radius * .24
        let pointerHeadWidth = radius * .16
        let directionX = cos(angle)
        let directionY = sin(angle)
        let tangentX = -directionY
        let tangentY = directionX

        push()
        translate(x, y)
        noFill()
        stroke(255)
        strokeWeight(radius * .045)
        arc(0, 0, radius * 2, radius * 2, startAngle, endAngle)
        line(0, -radius, 0, radius)

        for (let i = 0; i <= compassSteps; i++) {
            let tickAngle = startAngle + ((endAngle - startAngle) / compassSteps) * i
            let majorTick = i % 8 == 0 || i == compassSteps
            let innerRadius = majorTick ? radius * .72 : radius * .86
            let outerRadius = radius * .98
            strokeWeight(majorTick ? radius * .05 : radius * .018)
            line(
                cos(tickAngle) * innerRadius,
                sin(tickAngle) * innerRadius,
                cos(tickAngle) * outerRadius,
                sin(tickAngle) * outerRadius
            )
        }

        fill(255)
        stroke(0)
        strokeWeight(radius * .08)
        textSize(radius * .32)
        text("U", 0, -radius * 1.34)
        text("F", radius * 1.34, 0)
        text("D", 0, radius * 1.34)

        if (showPointer) {
            stroke(0)
            strokeWeight(radius * .2)
            line(directionX * pointerBase, directionY * pointerBase, directionX * pointerTip, directionY * pointerTip)
            stroke(255)
            strokeWeight(radius * .09)
            line(directionX * pointerBase, directionY * pointerBase, directionX * pointerTip, directionY * pointerTip)
            noStroke()
            fill(255)
            triangle(
                directionX * pointerTip,
                directionY * pointerTip,
                directionX * (pointerTip - pointerHeadLength) + tangentX * pointerHeadWidth,
                directionY * (pointerTip - pointerHeadLength) + tangentY * pointerHeadWidth,
                directionX * (pointerTip - pointerHeadLength) - tangentX * pointerHeadWidth,
                directionY * (pointerTip - pointerHeadLength) - tangentY * pointerHeadWidth
            )
        }

        if (label) {
            fill(255)
            stroke(0)
            strokeWeight(radius * .08)
            textSize(radius * .42)
            text(label, radius * .36, 0)
        }
        pop()
    }

    function timeOracleModeTextSize(labels, maxSize, maxWidth) {
        let size = maxSize
        textSize(size)

        while (labels.some(function(label) { return textWidth(label) > maxWidth }) && size > maxSize * .42) {
            size *= .92
            textSize(size)
        }

        return size
    }

    function timeOracleModeText(label, y, size) {
        textSize(size)
        text(label, mother.width / 2, y)
    }

    function timeOracleBreakdownDisplay() {
        push()

        let timeOracleBreakdownSize = mother.width * .2

        let timeOracleNameBreakdownSize = timeOracleBreakdownSize * .18

        let timeOracleCharacterBreakdownSize = timeOracleBreakdownSize *.5

        let timeOracleBreakdownY = mother.height * .43

        let binaryY = timeOracleBreakdownY 
        let quaternaryY = binaryY + (timeOracleBreakdownSize * .5)
        let octalY = quaternaryY + (timeOracleBreakdownSize * .5)
        let oracleStrokeW = (timeOracleCharacterBreakdownSize * 1.61803398875) / 11
        let binaryLabelY = binaryY
        let quaternaryLabelY = quaternaryY + (oracleStrokeW * .5)
        let octalLabelY = octalY + (oracleStrokeW * .5)
        let modeTextWidth = timeOracleBreakdownSize * 1.08
        let modeTextSize = timeOracleModeTextSize(
            binaryName.concat(quaternaryName, octalName),
            timeOracleNameBreakdownSize,
            modeTextWidth
        )

        textAlign(CENTER, CENTER)
        let showDecisionOutput = !(timeOracleHover && mouseheld())
        let binaryOracleString = showDecisionOutput ? str(timeOracle[1][0]) : "0"
        let quaternaryOracleString = showDecisionOutput ? str(timeOracle[1][1]) : "00"
        let octalOracleString = showDecisionOutput ? str(timeOracle[1][2]) : "000"
        let binaryModeLabel = showDecisionOutput ? binaryName[timeOracle[0][0]] : "ACTION"
        let quaternaryModeLabel = showDecisionOutput ? quaternaryName[timeOracle[0][1]] : "INTERACTION"
        let octalModeLabel = showDecisionOutput ? octalName[timeOracle[0][2]] : "MIND"

        let directions = templeOracleCompassDirections(timeStamp[9], timeStamp[0])
        let compassRadius = mother.width * .038
        let squareEdgeX = squareWidth ? mother.width * .5 - squareWidth * .5 : mother.width * .25
        textSize(mother.width * .1)
        let hexagramEdgeX = mother.width * .5 - textWidth(oracles[timeStamp[0]]) * .5
        let compassX = (squareEdgeX + hexagramEdgeX) * .5

        timeOracleCompass(compassX, mother.height * .315, compassRadius, directions.x, "", {
            top: "N",
            right: "E",
            bottom: "S",
            left: "W"
        }, showDecisionOutput, {
            steps: 64,
            headingDegrees: templeFieldCompassHeading
        })
        timeOracleHalfCompass(mother.width - compassX, mother.height * .315, compassRadius, timeStamp[0], "", showDecisionOutput)

        for (let i = 0; i < 2; i++){

            printOracle(binaryOracleString, timeOracleCharacterBreakdownSize, timeOracleCharacterBreakdownSize * 1.61803398875,  mother.width / 2 - timeOracleBreakdownSize + (timeOracleBreakdownSize * 2 * i), binaryY, 1, 0)


            printOracle(quaternaryOracleString, timeOracleCharacterBreakdownSize, timeOracleCharacterBreakdownSize * 1.61803398875, mother.width / 2 - timeOracleBreakdownSize + (timeOracleBreakdownSize * 2 * i), quaternaryY, 2, 0)


            printOracle(octalOracleString, timeOracleCharacterBreakdownSize, timeOracleCharacterBreakdownSize * 1.61803398875,  mother.width / 2 - timeOracleBreakdownSize + (timeOracleBreakdownSize * 2 * i), octalY, 3, 0)

        }

        timeOracleModeText(binaryModeLabel, binaryLabelY, modeTextSize)
        timeOracleModeText(quaternaryModeLabel, quaternaryLabelY, modeTextSize)
        timeOracleModeText(octalModeLabel, octalLabelY, modeTextSize)

        push()
        noStroke()
        fill(255)
        textSize(modeTextSize)
        text("SELECTION", mother.width / 2, mother.height * .705)

        let choices = templeChoiceLadder(timeStamp[0])
        let selectionValue = function(choice) {
            let value = showDecisionOutput ? choice.choice : 0
            return String(value).padStart(String(choice.optionCount).length, "0")
        }
        let firstChoiceRow = choices.slice(0, 3).map(function(choice) {
            return choice.optionCount + ":" + selectionValue(choice)
        }).join("   ")
        let secondChoiceRow = choices.slice(3).map(function(choice) {
            return choice.optionCount + ":" + selectionValue(choice)
        }).join("   ")

        if (showDecisionOutput) {
            fill(255)
        }
        text(firstChoiceRow, mother.width / 2, mother.height * .726)
        text(secondChoiceRow, mother.width / 2, mother.height * .749)
        drawOracleSelectionBars(showDecisionOutput)
        pop()

    pop()
    }

    function ichingBreakdownDisplay() {
        let y = mother.height *.6262
        let os = mother.width * .3
        let oss = os / 6
        let osss = os / 3.5

        push()
        stroke(255,0,0,255)
        strokeWeight(30)
        pop()

        push()
        stroke(255)

            // left oracle
        printOracle(iChingOracleStrings[0], mother.width * .13, mother.width * .2, mother.width * .3632, mother.width* .5+(circleWidth*.5) -squareWidth*.5,6, 6 - c)

            // right oracle 
        printOracle(iChingOracleStrings[1], mother.width * .13, mother.width * .2, mother.width * .6368, mother.width* .5+(circleWidth*.5) -squareWidth*.5,6, 6 - c)

        pop()



        // changes
        textSize(oss);

        let iChingOracleChangeStringsY = mother.width* .5+(circleWidth*.5) -squareWidth*.5
        let iChingOracleChangeStringsWidth = mother.width *.039


        for (i = 0; i < 6; i++) {
            if (i < c) {
                printOracle(oracleC[i], iChingOracleChangeStringsWidth, iChingOracleChangeStringsWidth * 1.61803398875,  mother.width / 2, iChingOracleChangeStringsY*.995 + (iChingOracleChangeStringsWidth*2.5) - ((iChingOracleChangeStringsWidth) * i), 2, 0)
            }
        }


        // coin flips
        let coinFlipsTextSize = osss*.71
        textSize(coinFlipsTextSize);
        for (i = 0; i < 6; i++) {
            let leftPos = mother.width / 2 - coinFlipsTextSize * 3 + (coinFlipsTextSize * (i * 1.2))

            if (i < c) {

                printOracle(oracleB[i], iChingOracleChangeStringsWidth, iChingOracleChangeStringsWidth * 1.61803398875,  leftPos, y*1.12, 3, 0)

                printOracle(oracleA[i], iChingOracleChangeStringsWidth, iChingOracleChangeStringsWidth * 1.61803398875,  leftPos, y*1.18, 1, 0)
            } else {

                printOracle(str(Math.round(random()))+str(Math.round(random()))+str(Math.round(random())), iChingOracleChangeStringsWidth, iChingOracleChangeStringsWidth * 1.61803398875,  leftPos, y*1.12, 3, 0,0)

                printOracle(str(Math.round(random())), iChingOracleChangeStringsWidth, iChingOracleChangeStringsWidth * 1.61803398875, leftPos, y * 1.18, 1, 0,0)
            }
        }


            let changingLineYPos = mother.height * .804
            let changingLineTextSize = osss * .3
            if (c == 6) {
                // let changesText = 'CHANGING LINES'
                // let changingLinesText = changingLines
                // if (changingLines.length > 0) {
                //     if (changingLines.length == 1) {
                //         changesText = 'CHANGING LINE'
                //     }
                // } else {
                //     changesText = "NO CHANGE"
                // }
                push()
                textSize(changingLineTextSize)
                if (changeHover) {
                    fill(255)
                    drawingContext.shadowColor = 'rgba(255, 255, 255, 0.45)'
                    drawingContext.shadowBlur = mother.width * .012
                } else {
                    fill(230)
                    drawingContext.shadowColor = 'transparent'
                    drawingContext.shadowBlur = 0
                }
                // text(changesText, mother.width / 2, changingLineYPos)
                // textSize(changingLineTextSize)
                // text(changingLinesText, mother.width / 2, changingLineYPos + changingLineTextSize * 1.3)

                text("INTERPRETATION", mother.width / 2, changingLineYPos)
                drawingContext.shadowColor = 'transparent'
                drawingContext.shadowBlur = 0
                pop()

                // name and number
                let nameNumberYPos = mother.height * .57
                for (i = 0; i < 2; i++) {
                    textSize(os * .25);
                    if (c == 6)
                    text(sequence[oracleD[i]], mother.width * .3632  +((mother.width * .3632*.75)*i), mother.width * .365)
                    push()
                    textSize(os * .08)
                    text(names[oracleD[i]], mother.width * .3632  +((mother.width * .3632*.75)*i), mother.width * .415)
                    pop()
                }
            }
    }

    function basicDisplay() {
        let y = mother.height * .458
        let os = mother.width * .14777
        let verticalSpace = os / 6
        let quaternaryXSpread = os / 3.5


        timeOracleDisplay(1)

        // //i ching oracles
        push()
        stroke(255)

        // left oracle
        printOracle(iChingOracleStrings[0], mother.width * .0666, mother.width * .1, mother.width * .29, mother.width * .622, 6, 6 - c)

        // right oracle 
        printOracle(iChingOracleStrings[1], mother.width * .0666, mother.width * .1, mother.width * .71, mother.width * .622, 6, 6 - c)

        pop()

        // numbers
        push()
        let ts = os * .15
        textSize(ts)
        for (i = 0; i < 2; i++) {
            push()
            fill(255 - (255 * i - 1))
            stroke(255 * i - 1)
            //  numbers on orbs
            if (c > 5) {
                text(sequence[oracleD[i]], mother.width / 2 - os * 1.405 + ((os * 1.405) * 2 * i), y * 1.0666)
            }
            pop()
        }

        pop()

        //changes as quaternary symbols
        ts = os * .3
        textSize(ts)

        let iChingOracleChangeStringsY = mother.height * .5
        let iChingOracleChangeStringsWidth = mother.width *.0222
        let iChingOracleChangeStringsXoffset = iChingOracleChangeStringsWidth * 2 * 2.5

        for (i = 0; i < 6; i++) {
            if (i < c) {
                printOracle(oracleC[i], iChingOracleChangeStringsWidth, iChingOracleChangeStringsWidth * 1.61803398875, mother.width * .5 - iChingOracleChangeStringsXoffset + (iChingOracleChangeStringsWidth * 2 * i), iChingOracleChangeStringsY, 2, 0)
            }
        }

    }

    function templeCalandarDisplay() {
        TempleCalandartextSize = mother.width*.0211

        function calendarRowText(rowText, x, y) {
            fill(255)
            text(rowText, x, y)
            for (let i = 0; i < rowText.length; i++) {
                let char = rowText[i]
                if (char == 'g') {
                    fill(144)
                } else if (char == 'a') {
                    fill(144)
                } else if (char == 'T') {
                    fill(144)
                } else {
                    continue
                }
                text(char, x + textWidth(rowText.slice(0, i)), y)
            }
            fill(255)
        }

        // textStyle(CENTER, CENTER)
        push()
        noStroke()
        textSize(TempleCalandartextSize)
        let y = mother.height * .333
        textAlign(CENTER, CENTER)
        text('YEAR ' + str(currentTime[7]+1) + " (Temple Era)", mother.width * .5, y - (TempleCalandartextSize * 2))
        textAlign(LEFT,CENTER)
        for (let i = 0; i < templeCalandar.length; i++){
            if (i >= 13) {
                textAlign(CENTER, CENTER)
                text(templeCalandar[i].join(" "), mother.width * .5, y + (TempleCalandartextSize * i * 1.333))
                textAlign(LEFT, CENTER)
            } else {
                calendarRowText(templeCalandar[i].join(" "), mother.width * .222, y + (TempleCalandartextSize * i * 1.333))

            }
        }

        textAlign(CENTER, CENTER)
        text("LUNISOLAR TEMPLE CALANDAR", mother.width * .5, y - (TempleCalandartextSize *3* 1.333))
        text("Temple Meeting Days (Gregorian)", mother.width * .5, y + (TempleCalandartextSize * 14.5 * 1.333))
        text(mondays.slice(0, 6).join(" "), mother.width * .5, y + (TempleCalandartextSize * 15.5 * 1.333))
        text(mondays.slice(6, 11).join(" "), mother.width * .5, y + (TempleCalandartextSize * 16.5 * 1.333))
        text(mondays.slice(11).join(" "), mother.width * .5, y + (TempleCalandartextSize * 17.5 * 1.333))
        if (templeInAnnualApsisInterval) {
            calendarRowText("APSIS T", mother.width * .5 - textWidth("APSIS T") * .5, y + (TempleCalandartextSize * 17.5 * 1.333))
        } else {
            text("APSIS", mother.width * .5, y + (TempleCalandartextSize * 17.5 * 1.333))
        }


        // text(text(templeCalandar[i].join(" "), mother.width * .5, y + (TempleCalandartextSize * i * 1.333)))

        pop()
        noFill()
        stroke(255)
        strokeWeight(mother.width * .00333)



    }

    push()
    let strokeColor = color(0)
    let fillColor = color(255)

    fill(fillColor);
    stroke(strokeColor)
    strokeWeight(mother.width *.1)
    textAlign(CENTER)


    //time oracle indeapth display    
    if (timeOracleHover) {
        timeOracleDisplay()
        timeOracleBreakdownDisplay()  
    }  
    //iching in deapth display
    else if (circleHover) {

        //if hovering over date
        if (dateHover) {
            templeCalandarDisplay()
        }
        // normal circle hover
        else if(!menuHover) {
            timeOracleDisplay()
            ichingBreakdownDisplay()
        }
    }

    //basic oracle display
    else if(!menuHover){
        basicDisplay()
    }

    pop()

    pop()

    if (c == 5) {
        interpretation()
    }
}

// base 64 temple time clock display
function clock() {
    push()

    textAlign(CENTER, CENTER)
    colorMode(RGB)

    push()
    stroke(0)
    let ts = mother.width * .0333
    strokeWeight(ts*.2)
    fill(255)
    textSize(ts*.8)


    // digital clock
    text(
        str(timeO[1]) //hour
        + ' : '
        + str(timeO[2]) //minute
        + ' : ' + str(timeO[3]) //second
        , mother.width * .41, mother.height * .2 //location
    )

    text(
        str(timeO[6]) //month
        + ' / ' + str(timeO[5]) //day
        + ' / ' + str(timeO[7]) //year

        , mother.width * .59, mother.height * .2 //location
    )

    textSize(ts * .8)

    text(
            oracles[currentTime[1]]
            + oracles[currentTime[2]]
            + oracles[currentTime[3]]

            , mother.width * .435, mother.height * .17
        )

    text(
             oracles[currentTime[6]]
            + oracles[currentTime[5]]
            + oracles[currentTime[7]]

            , mother.width * .565, mother.height * .17
        )

    textSize(ts * 1.3)

    templeApplyHoverGlow(dateHover, mother.width * .012)
    text(
        str(timeO[4]) //day section
        , mother.width * .5, mother.height * .185 //location
    )

    templeClearHoverGlow()
    pop()

    //analogue clock
    push()
    noStroke()
    let smhTs = ts * .8
    fill(255)
    textSize(smhTs)
    translate(mother.width * .5, mother.height * .5)

    //background
    push()
    let rim = mother.height * -.365
    const outerRim = rim - smhTs * 3

    for (let i = 0; i < 8; i++) {
        push()
        rotate((TWO_PI / 8) * i)
        stroke(255)
        strokeWeight(ts * .75)
        line(0, rim, 0, outerRim)
        stroke(0)
        strokeWeight(ts * .5)
        line(0, rim, 0, outerRim)
        pop()
    }

    for (let i = 0; i < 64; i++) {
        push()
        rotate((TWO_PI / 64) * i)
        stroke(255)
        strokeWeight(ts * .75)
        line(0, rim, 0, rim - (smhTs * 2))
        stroke(0)
        strokeWeight(ts * .5)
        line(0, rim, 0, rim - (smhTs * 2))
        pop()
    }
    pop()

    fill(255)
    for (let t = 1; t <= 3; t++) {
        for (let i = 0; i < currentTime[t] + 1; i++) {
            push()

            rotate((TWO_PI / timeDiv[t]) * i)
            if (t == 3) {
                text(octal[i], 0, (rim + (smhTs * .5)) - (smhTs * t))
            } else {
                text(oracles[i], 0, (rim + (smhTs * .5)) - (smhTs * t))
            }
            pop()
        }
    }

    pop()
    pop()
    return mother.height * .5 - outerRim
}

function drawMotherImageLayer() {
    if (!motherFadeContext) {
        const canvas = document.createElement("canvas")
        canvas.width = mother.canvas.width
        canvas.height = mother.canvas.height
        motherFadeContext = canvas.getContext("2d")
    }

    const ctx = motherFadeContext
    const shade = Math.round(255 - 255 * timeScaleCycle[1])
    if (shade !== motherFadeShade) {
        // Darken the source while preserving its mask, then apply the matching opacity.
        const { width, height } = ctx.canvas
        ctx.globalCompositeOperation = "copy"
        ctx.drawImage(mother.canvas, 0, 0)
        ctx.globalCompositeOperation = "source-atop"
        ctx.fillStyle = "rgba(0, 0, 0, " + (1 - shade / 255) + ")"
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = "destination-in"
        ctx.fillStyle = "rgba(0, 0, 0, " + (shade / 255) + ")"
        ctx.fillRect(0, 0, width, height)
        motherFadeShade = shade
    }
    drawingContext.drawImage(ctx.canvas, 0, 0, mother.width, mother.height)
}

function idol(x,y, circleWidth,flowerVertical,flowerHorizontal,lineWeight, color) {

    function flower(x,y,circumradius){
        push()
        let fr = 5

        strokeWeight(lineWeight)

        // stroke(255*Math.random(),255*Math.random(),255*Math.random())
        circle(x, y, circumradius)
        for (let i = 1; i < fr; i++){
            // stroke(255*Math.random(),255*Math.random(),255*Math.random())
            circle(x, y-(circumradius*.5*i), circumradius)
            circle(x, y+(circumradius*.5*i), circumradius)
        }

        for (let i = 1; i < fr; i++){
            // stroke(255*Math.random(),255*Math.random(),255*Math.random())
            circle(x+circumradius*sqrt(3/4)*.5, (y+circumradius*.25)-(circumradius*.5*i), circumradius)
            circle(x+circumradius*sqrt(3/4)*.5, (y-circumradius*.25)+(circumradius*.5*i), circumradius)
            circle(x-circumradius*sqrt(3/4)*.5, (y+circumradius*.25)-(circumradius*.5*i), circumradius)
            circle(x-circumradius*sqrt(3/4)*.5, (y-circumradius*.25)+(circumradius*.5*i), circumradius)
        }

        // stroke(255*Math.random(),255*Math.random(),255*Math.random())
        circle(x + circumradius * sqrt(3 / 4), y, circumradius)
        // stroke(255*Math.random(),255*Math.random(),255*Math.random())
        circle(x-circumradius*sqrt(3/4), y, circumradius)
        for (let i = 1; i < fr - 1; i++){
            // stroke(255*Math.random(),255*Math.random(),255*Math.random())
            circle(x+circumradius*sqrt(3/4), y-(circumradius*.5*i), circumradius)
            circle(x+circumradius*sqrt(3/4), y+(circumradius*.5*i), circumradius)
            circle(x-circumradius*sqrt(3/4), y-(circumradius*.5*i), circumradius)
            circle(x-circumradius*sqrt(3/4), y+(circumradius*.5*i), circumradius)
        }

        // circle(x+(circumradius*1.5), y, circumradius)
        // circle(x-circumradius*sqrt(3/4)*1.5, y, circumradius)
        for (let i = 1; i < fr - 1; i++){
            // stroke(255*Math.random(),255*Math.random(),255*Math.random())
            circle(x+circumradius*sqrt(3/4)*.5*3, (y+circumradius*.25)-(circumradius*.5*i), circumradius)
            circle(x+circumradius*sqrt(3/4)*.5*3, (y-circumradius*.25)+(circumradius*.5*i), circumradius)
            circle(x-circumradius*sqrt(3/4)*.5*3, (y+circumradius*.25)-(circumradius*.5*i), circumradius)
            circle(x-circumradius*sqrt(3/4)*.5*3, (y-circumradius*.25)+(circumradius*.5*i), circumradius)
        }

        // stroke(255*Math.random(),255*Math.random(),255*Math.random())
        circle(x + (circumradius * sqrt(3 / 4) * 2), y, circumradius)
        // stroke(255*Math.random(),255*Math.random(),255*Math.random())
        circle(x-(circumradius*sqrt(3/4)*2), y, circumradius)
        for (let i = 1; i < fr - 2; i++){
            // stroke(255*Math.random(),255*Math.random(),255*Math.random())
            circle(x+(circumradius*sqrt(3/4)*2), y-(circumradius*.5*i), circumradius)
            circle(x+(circumradius*sqrt(3/4)*2), y+(circumradius*.5*i), circumradius)
            circle(x-(circumradius*sqrt(3/4)*2), y-(circumradius*.5*i), circumradius)
            circle(x-(circumradius*sqrt(3/4)*2), y+(circumradius*.5*i), circumradius)
        }
        pop()
    }

    function SquaredCircle(){

        push()
        // stroke(0)
        noFill()
        strokeWeight(lineWeight * 3)
        push()
        translate(x, y)
        rotate(PI)

        push()
        stroke(255-color)
        strokeWeight(circleWidth*.5)
        circle(0,0, circleWidth*1.5)
        pop()

        if (circleHover || menuHover) {
            fill(0)
        }

        rect(0 - (squareWidth * .5), 0 - r, squareWidth)
        push()
        squareWidthTwo = squareWidth * .618033
        squareCenter = 0-r +(squareWidth*.5)

        pop()
        pop()

        if (!circleHover && !menuHover && !mobile) {
        vale(1);
        }

        push()
        translate(x, y)
        rotate(PI)
        circle(0, 0, circleWidth)
        pop()

        pop()
    }

    function hexagram() {
        push()
        translate(x,y)
        // stroke(0)
        strokeWeight(lineWeight*2)
        let points = []

        for (let i = 0; i < 6; i++){
            push()
            let A = createVector(0, -circleWidth*.5)
            A.rotate(TWO_PI/6*i)
            points.push(A)
            pop()
        }

        // let order = [0, 1, 2, 3, 4, 5, 0] // hexagon
        let order = [0, 2, 5, 3, 1, 4, 0] // hexagram

        for (let i = 0; i < 6; i++){
            // stroke(255*Math.random())
            line(points[order[i]].x,points[order[i]].y,points[order[i+1]].x,points[order[i+1]].y)
        }
        pop()
    }

    function somaLeaf() {
        push()
        translate(x,y)
        // stroke(0)
        strokeWeight(lineWeight*2)
        let points = []
        translate(0, -circleWidth / 3)
        for (let i = 0; i < 7; i++){
            push()
            let A = createVector(0,circleWidth/3*.5)
            A.rotate(TWO_PI/6*i)
            points.push(A)
            pop()
        }

        let order = [0,1,2,3,4,5,6,0]

        for (let i = 0; i < 7; i++){
            line(0, 0, points[order[i + 1]].x, points[order[i + 1]].y)
        }

        pop()
    }

    //static that covers mother image
    function vale(t) {
        let len = valeData.length;
        let s = mother.width * 0.0098;
        let timeFactor = timeScaleCycle[t];
    
        let offsetX = (mother.height * 0.4855) - (s * len / 2) + (mother.width * 0.02);
        let offsetY = s / 2 + (mother.width / 2) - (s * len / 2) + (mother.width * 0.04);
    
        push();
        colorMode(RGB);
        strokeWeight(s * 0.333);
    
        for (let row = 0; row < len; row++) {
            for (let col = 0; col < len; col++) {
                let val = valeData[row][col];
                if (val > 0) {
                    stroke(255, val * timeFactor);
                    point(offsetX + row * s, offsetY + col * s);
                    valeData[row][col] = val - 8;
                }
            }
        }
    
        pop();
    
        for (let i = 0; i < 16; i++) {
            let r = (Math.random() * len) | 0;
            let c = (Math.random() * len) | 0;
            valeData[r][c] = 255;
        }
    }
    

    noFill()
    stroke(color)

    push()
    let r = circleWidth*.5
    squareWidth = sqrt((PI * r ** 2))

    translate(x, y)

    if(flowerVertical){
        flower(0, 0, circleWidth/3)
    }
    if (flowerHorizontal) {
        push()
        rotate(PI/2)
        flower(0, 0, circleWidth / 3)   
        pop()
    }
    pop()

    hexagram()
    somaLeaf()

    drawMotherImageLayer()

    SquaredCircle()
}

//generates new oracle
function oracleGenerator(option = false) {
    //returns series of coin flips for oracle generation
    function coin(flips = 1) {
        record = ''
        for (let i = 0; i < flips; i++) {
            record += Math.round(Math.random())
        }
        return record   
    }
    //returns quaternary change oracle from compairing a binary and octal input (4 coin iching meathod)
    function changes(binIn, octalIn) {
        if (binIn == '0') {
            if (octalIn == '111') {
                return '01'
            } else {
                return '00'
            }
        } else {
            if (octalIn == '110' || octalIn == '101' || octalIn == '011') {
                return '10'
            } else {
                return '11'
            }
        }
    }
    //splits quaternary changes data into two array of oracles as decimal value
    function splitChanges(quatIn) {
        let oraclePair = []
        for (let i = 0; i < 2; i++){
            oraclePair[i] = parseInt(quatIn.map(function(ii){return ii[i]}).join(''),2)
        }
        return oraclePair
    }
    //splits an iching oracle(int 0-63) into a binary quaternary and octal oracle from top to bottom respectivly
    function TWD(oracleIn) {
        oracleIn = parseInt((timeStamp[0]), 10).toString(2); // get int as binary value

        oracleIn = "000000".substr(oracleIn.length) + oracleIn // format binary value to reflect 6 digit format
        return [[
            parseInt(oracleIn.slice(5,6), 2), //deeds
            parseInt(oracleIn.slice(3,5),2), //words
            parseInt(oracleIn.slice(0, 3), 2) //thoughts
        ],

            [oracleIn.slice(5, 6),
                oracleIn.slice(3, 5),
            oracleIn.slice(0,3)]
        ]
    }

    // reset oracle display variables
    oracleDisplayCounter = 6
    // time oracle generation

    if (option == "TIME ONLY") {
        timeOracle = TWD(timeStamp[0]) //TWD oracle from the moment(smallest unit of time mesaurment)
        // }
    } else {

        timeOracle = TWD(timeStamp[0])

        // generate ICHING oracle pair using 4 coin meathod
        changingLines = []
        for (let i = 0; i < 6; i++) {
            oracleA[i] = coin() // flips a single coin
            oracleB[i] = coin(3) // flip 3 coins
            oracleC[i] = changes(oracleA[i], oracleB[i]) // genertae changing line

            // identify and record changin lines
            if (oracleC[i] == '01' | oracleC[i] == '10') {
                changingLines.push(i + 1)
            }
        }
        oracleD = splitChanges(oracleC)// generate oracle pair 

    }
}
function interpretation() {
    let oracle = sequence[oracleD[0]]
    let primaryGua = iching.gua[oracleD[0]]
    let changingLinesList = templeChangingLinesHtml(primaryGua, changingLines)
    let allLinesChangingText = templeAllLinesChangingText(primaryGua, changingLines)
    let directions = templeOracleCompassDirections(timeStamp[9], timeStamp[0])
    let intTimeStamp = templeDateDisplay(timeStamp) + " - " + templeClockDisplay(timeStamp) + " " + oracles[timeStamp[0]]
    let intTimeOracle =
        "Action: " + iching.binary[timeOracle[0][0]].judgement+ " ["+ iching.binary[timeOracle[0][0]].sign + "]<br>"
        + "Engagement: " + iching.quaternary[timeOracle[0][1]].judgement + " ["+ iching.quaternary[timeOracle[0][1]].sign + "]<br>"
        + "Mind: " + iching.octal[timeOracle[0][2]].judgement + " ["+ iching.octal[timeOracle[0][2]].sign + "]<br>"
        + "X compass: " + String(directions.x).padStart(2, "0") + " of 64 in N/E/S/W frame<br>"
        + "Y compass: " + String(directions.y).padStart(2, "0") + " of 32 in U/F/D half-circle<br>"

    // let tantra = Math.floor(Math.random() * VBT112.length)

    let intTitle
    if (oracleD[0] != oracleD[1]) {
        intTitle = "\""+names[oracleD[0]] + "\" [" + oracles[oracleD[0]]+ "]" +sequence[oracleD[0]]+ " ---changing to--> " + sequence[oracleD[1]] +"["+ oracles[oracleD[1]]+ "] "+ "\"" +names[oracleD[1]]+ "\""
    } else {
        intTitle = sequence[oracleD[0]] + "[" + oracles[oracleD[0]]+ "] \"" +names[oracleD[0]]+ "\" "
        intSubTitle = oracle
    }

    document.getElementById("timeStamp").innerHTML = intTimeStamp
    document.getElementById("timeOracle").innerHTML = intTimeOracle
    document.getElementById("intTitle").innerHTML = intTitle

    if (oracleD[0] == oracleD[1]) {
        document.getElementById("images").innerHTML = "<tr><th>Symbolic Interpretation: "+sequence[oracleD[0]] + "[" + oracles[oracleD[0]]+"] \""+names[oracleD[0]]+ "\"</th></tr><tr><td>" + iching.gua[oracleD[0]].image + "</td></tr>"
        document.getElementById("isChanging").innerHTML = "Oracle Judgement"
        document.getElementById("intChangingLines").innerHTML = iching.gua[oracleD[0]].judgement
        // document.getElementById("ifate").innerHTML = "<a href=\"https://www.ifate.com/iching-meanings.html\"target=\"_blank\">interpretation by ifate.com</a>"
        // document.getElementById("divinationcom").innerHTML = "<a href=\"https://divination.com/iching/lookup/" + sequence[oracleD[0]] + "-2/\"" + "target=\"_blank\">interpretation by divination.com</a>"
    } else {
        document.getElementById("isChanging").innerHTML = allLinesChangingText ? "All Lines Changing" : "Changing Lines"
        document.getElementById("images").innerHTML = "<tr><th style=\"width: 50%;\">Symbolic Interpretation: "+sequence[oracleD[0]] + "[" + oracles[oracleD[0]]+ "] \"" +names[oracleD[0]]+ "\"</th><th style=\"width: 50%;\">Symbolic Interpretation: "+sequence[oracleD[1]] +"["+ oracles[oracleD[1]]+ "] "+ "\"" +names[oracleD[1]]+"\"</th></tr><tr><td>" + iching.gua[oracleD[0]].image + "</td><td>" + iching.gua[oracleD[1]].image + "</td></tr>"
        document.getElementById("intChangingLines").innerHTML = changingLinesList
        // document.getElementById("ifate").innerHTML = "<a href=\"https://www.ifate.com/i-ching-changes/iching-hexagram-" + sequence[oracleD[0]] + "-changing-to-" + sequence[oracleD[1]] + ".html\"target=\"_blank\">interpretation by ifate.com</a>"
        // document.getElementById("divinationcom").innerHTML = "<a href=\"https://divination.com/iching/lookup/" + sequence[oracleD[0]] + "-2/\"" + "target=\"_blank\">interpretation by divination.com</a>"
    }

    setTempleOracleRecordStatus("")
    // document.getElementById("VBT").innerHTML = VBT112[tantra]
    updateTempleOracleRecordDisplay()
}

function debugCleanText(value) {
    if (value == null) {
        return ""
    }

    return String(value)
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/\n\s+/g, "\n")
        .replace(/[ \t]+/g, " ")
        .trim()
}

function debugPad(value, width = 2) {
    return String(value).padStart(width, "0")
}

function debugTempleClockFromElapsed(elapsed) {
    let state = templeState(elapsed)
    let clock = {
        divisionIndex: Math.floor((state.dayElapsed / division) % timeDiv[4]),
        hour: Math.floor((state.dayElapsed / hr) % timeDiv[3]),
        minute: Math.floor((state.dayElapsed / minute) % timeDiv[2]),
        second: Math.floor((state.dayElapsed / second) % timeDiv[1]),
        moment: Math.floor((state.dayElapsed / moment) % timeDiv[0]),
        submoment: Math.floor((state.dayElapsed / submoment) % timeDiv[0])
    }

    clock.divisionSymbol = divisions[clock.divisionIndex]
    clock.display = debugPad(clock.hour) + " : " + debugPad(clock.minute) + " : " + debugPad(clock.second) + " [" + debugPad(clock.moment) + "] " + clock.divisionSymbol

    return {
        elapsed,
        yearIndex: state.yearIndex,
        year: state.yearIndex + 1,
        yearElapsedDays: state.yearElapsed / day,
        ordinaryDayIndex: state.ordinaryDayIndex,
        ordinaryDay: state.ordinaryDayIndex + 1,
        dayElapsedHours: state.dayElapsed / hr,
        inAnnualApsisInterval: state.inAnnualApsisInterval,
        apsisElapsedHours: state.apsisElapsed / hr,
        clock
    }
}

function debugHexagram(index) {
    if (!Number.isInteger(index) || !iching.gua[index]) {
        return null
    }

    return {
        index,
        number: sequence[index],
        symbol: oracles[index],
        name: names[index],
        judgement: debugCleanText(iching.gua[index].judgement),
        image: debugCleanText(iching.gua[index].image)
    }
}

function debugAltarOracle(index, subIndex = 0) {
    if (!Number.isInteger(index)) {
        return null
    }

    let bin = index.toString(2).padStart(6, "0")
    let deedsIndex = parseInt(bin.slice(5, 6), 2)
    let wordsIndex = parseInt(bin.slice(3, 5), 2)
    let thoughtIndex = parseInt(bin.slice(0, 3), 2)
    let coordinates = templeOracleCompassDirections(subIndex, index)
    let bagua = {
        value: bin.slice(0, 3),
        sign: octal[thoughtIndex],
        name: octalName[thoughtIndex],
        interpretation: debugCleanText(iching.octal[thoughtIndex].judgement)
    }

    return {
        singleOracle: debugHexagram(index),
        binary: bin,
        coordinates: {
            x: {
                value: coordinates.x,
                increments: 64,
                anchor: "N",
                frame: "N/E/S/W",
                compassHeadingDegrees: templeFieldCompassHeading
            },
            y: {
                value: coordinates.y,
                increments: 32,
                anchor: "F",
                frame: "U/F/D half-circle"
            }
        },
        deeds: {
            value: bin.slice(5, 6),
            sign: binary[deedsIndex],
            name: binaryName[deedsIndex],
            interpretation: debugCleanText(iching.binary[deedsIndex].judgement)
        },
        words: {
            value: bin.slice(3, 5),
            sign: quaternary[wordsIndex],
            name: quaternaryName[wordsIndex],
            interpretation: debugCleanText(iching.quaternary[wordsIndex].judgement)
        },
        thought: bagua,
        bagua
    }
}

function buildTempleDebug() {
    kali()

    let now = new Date()
    let absoluteElapsed = now.getTime() - templeEpoch
    let zonedElapsed = absoluteElapsed + (templeEarthZone * hr)
    let primaryOracle = debugHexagram(oracleD[0])
    let changingOracle = debugHexagram(oracleD[1])
    let altarOracle = debugAltarOracle(timeStamp[0], timeStamp[9])
    let primaryGua = iching.gua[oracleD[0]]
    let allLinesChangingText = templeAllLinesChangingText(primaryGua, changingLines)
    let debug = {
        civil: {
            localTime: now.toLocaleString(),
            utcTime: now.toISOString(),
            browserTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            browserTimeZoneOffsetMinutes: now.getTimezoneOffset()
        },
        templeAbsolute: debugTempleClockFromElapsed(absoluteElapsed),
        templeLocal: {
            templeEarthZone,
            templeEarthZoneSource,
            templeEarthZoneLabel: templeEarthZoneLabel(),
            calendarDisplay: templeDateDisplay(currentTime),
            clock: debugTempleClockFromElapsed(zonedElapsed)
        },
        iChingPair: {
            primary: primaryOracle,
            changing: changingOracle,
            allLinesChanging: allLinesChangingText ? debugCleanText(allLinesChangingText) : "",
            changingLines: changingLines.map(function(line) {
                return {
                    line,
                    interpretation: primaryGua && primaryGua.changes ? debugCleanText(primaryGua.changes[line - 1]) : ""
                }
            }),
            raw: {
                oracleA: Array.from(oracleA),
                oracleB: Array.from(oracleB),
                oracleC: Array.from(oracleC),
                oracleD: Array.from(oracleD)
            }
        },
        altarOfTheWill: {
            timeStamp: Array.from(timeStamp),
            dateDisplay: templeDateDisplay(timeStamp),
            clockDisplay: templeClockDisplay(timeStamp),
            oracle: altarOracle,
            fieldCompass: {
                permission: templeFieldCompassPermission,
                listening: templeFieldCompassListening,
                headingDegrees: templeFieldCompassHeading,
                updateCadence: "one temple second"
            }
        }
    }

    return debug
}

function templeDebug() {
    let debug = buildTempleDebug()

    console.group("Temple Debug")
    console.group("Civil")
    console.table(debug.civil)
    console.groupEnd()

    console.group("Temple Absolute")
    console.table({
        year: debug.templeAbsolute.year,
        ordinaryDay: debug.templeAbsolute.ordinaryDay,
        clock: debug.templeAbsolute.clock.display,
        inAnnualApsisInterval: debug.templeAbsolute.inAnnualApsisInterval,
        apsisElapsedHours: debug.templeAbsolute.apsisElapsedHours
    })
    console.groupEnd()

    console.group("Temple Local")
    console.table({
        zone: debug.templeLocal.templeEarthZoneLabel,
        zoneSource: debug.templeLocal.templeEarthZoneSource,
        date: debug.templeLocal.calendarDisplay,
        clock: debug.templeLocal.clock.clock.display,
        division: debug.templeLocal.clock.clock.divisionSymbol
    })
    console.groupEnd()

    console.group("I Ching Pair")
    console.log("Primary", debug.iChingPair.primary)
    console.log("Changing", debug.iChingPair.changing)
    if (debug.iChingPair.allLinesChanging) {
        console.log("All Lines Changing", debug.iChingPair.allLinesChanging)
    }
    console.table(debug.iChingPair.changingLines)
    console.log("Raw", debug.iChingPair.raw)
    console.groupEnd()

    console.group("Alter Of The Will")
    if (debug.altarOfTheWill.oracle) {
        console.log("Temple Time", debug.altarOfTheWill.dateDisplay + " - " + debug.altarOfTheWill.clockDisplay)
        console.log("Single Oracle", debug.altarOfTheWill.oracle.singleOracle)
        let oracleColor = debugOracleColor(debug.altarOfTheWill.timeStamp[0], debug.altarOfTheWill.timeStamp[9])
        console.table({
            blackWhite: oracleColor.blackWhiteHex,
            grayscale: oracleColor.grayscaleHex,
            colorFamily: oracleColor.familyHex,
            color: oracleColor.hex,
            adjustedColor: oracleColor.adjustedHex
        })
        console.table({
            action: debug.altarOfTheWill.oracle.deeds,
            engagement: debug.altarOfTheWill.oracle.words,
            mind: debug.altarOfTheWill.oracle.bagua,
            x: debug.altarOfTheWill.oracle.coordinates.x,
            y: debug.altarOfTheWill.oracle.coordinates.y,
            fieldCompass: debug.altarOfTheWill.fieldCompass
        })
    } else {
        console.warn("Alter oracle is not initialized yet.")
    }
    console.groupEnd()
    console.groupEnd()

    return debug
}

function debugOracleColor(index, saturationIndex) {
    let polarity = templeOraclePolarity(index)
    let value = templeOracleValue(index)
    let oracleColor = templeOracleHue(index)
    let colorFamily = templeOracleColorFamily(index)
    let adjustedColor = templeOracleAdjustedColor(index, saturationIndex)

    return {
        blackWhiteHex: polarity.hex,
        blackWhiteBinary: polarity.binary,
        grayscaleHex: value.hex,
        grayscaleValue: value.value,
        hex: oracleColor.hex,
        hue: oracleColor.hue,
        rgb: oracleColor.red + ", " + oracleColor.green + ", " + oracleColor.blue,
        binary: oracleColor.binary,
        familyHex: colorFamily.hex,
        familyHue: colorFamily.hue,
        familyRgb: colorFamily.red + ", " + colorFamily.green + ", " + colorFamily.blue,
        familyBinary: colorFamily.binary,
        adjustedHex: adjustedColor.hex,
        adjustedHue: adjustedColor.hue,
        adjustedRgb: adjustedColor.red + ", " + adjustedColor.green + ", " + adjustedColor.blue
    }
}

function templeOracleRecord() {
    let debug = buildTempleDebug()
    let primary = debug.iChingPair.primary
    let changing = debug.iChingPair.changing
    let altar = debug.altarOfTheWill.oracle
    let lines = []

    function section(title) {
        lines.push("")
        lines.push("== " + title + " ==")
    }

    function item(label, value) {
        lines.push(label + ": " + (value == null ? "" : value))
    }

    lines.push("ORACLE RECORD")
    item("Record Created", debug.civil.localTime)

    section("Civil")
    item("Local", debug.civil.localTime)
    item("UTC", debug.civil.utcTime)
    item("Browser Zone", debug.civil.browserTimeZone)
    item("UTC Offset Minutes", debug.civil.browserTimeZoneOffsetMinutes)

    section("Temple Absolute")
    item("Year", debug.templeAbsolute.year)
    item("Ordinary Day", debug.templeAbsolute.ordinaryDay)
    item("Clock", debug.templeAbsolute.clock.display)
    item("Apsis Interval", debug.templeAbsolute.inAnnualApsisInterval)
    item("Apsis Elapsed Hours", debug.templeAbsolute.apsisElapsedHours)

    section("Temple Local")
    item("Temple Earth Zone", debug.templeLocal.templeEarthZoneLabel)
    item("Zone Source", debug.templeLocal.templeEarthZoneSource)
    item("Date", debug.templeLocal.calendarDisplay)
    item("Clock", debug.templeLocal.clock.clock.display)
    item("Division", debug.templeLocal.clock.clock.divisionSymbol)

    section("I Ching Pair")
    if (primary) {
        item("Primary", primary.number + " " + primary.symbol + " " + primary.name)
        item("Primary Judgement", primary.judgement)
        item("Primary Image", primary.image)
    }
    if (changing) {
        item("Changing", changing.number + " " + changing.symbol + " " + changing.name)
        item("Changing Judgement", changing.judgement)
        item("Changing Image", changing.image)
    }
    if (debug.iChingPair.changingLines.length > 0) {
        if (debug.iChingPair.allLinesChanging) {
            item("All Lines Changing", debug.iChingPair.allLinesChanging)
        }
        lines.push("Changing Lines:")
        debug.iChingPair.changingLines.forEach(function(change) {
            lines.push("  Line " + change.line + ": " + change.interpretation)
        })
    } else {
        item("Changing Lines", "none")
    }
    item("Raw A", debug.iChingPair.raw.oracleA.join(" "))
    item("Raw B", debug.iChingPair.raw.oracleB.join(" "))
    item("Raw C", debug.iChingPair.raw.oracleC.join(" "))
    item("Raw D", debug.iChingPair.raw.oracleD.join(" "))

    section("Alter Of The Will")
    item("Temple Time", debug.altarOfTheWill.dateDisplay + " - " + debug.altarOfTheWill.clockDisplay)
    if (altar) {
        item("Single Oracle", altar.singleOracle.number + " " + altar.singleOracle.symbol + " " + altar.singleOracle.name)
        item("Single Judgement", altar.singleOracle.judgement)
        item("Single Image", altar.singleOracle.image)
        item("X Compass", altar.coordinates.x.value + " of " + altar.coordinates.x.increments + " in " + altar.coordinates.x.frame + " frame")
        item("Y Compass", altar.coordinates.y.value + " of " + altar.coordinates.y.increments + " in " + altar.coordinates.y.frame + " frame")
        item("Field Compass", debug.altarOfTheWill.fieldCompass.permission + "; heading " + debug.altarOfTheWill.fieldCompass.headingDegrees + "; updates " + debug.altarOfTheWill.fieldCompass.updateCadence)
        item("Selection Ladder", templeChoiceLadder(timeStamp[0]).map(function(choice) {
            return choice.optionCount + " options -> " + choice.choice
        }).join("; "))
        let oracleColor = debugOracleColor(timeStamp[0], timeStamp[9])
        item("Black/White", oracleColor.blackWhiteHex + " bit(" + oracleColor.blackWhiteBinary + ")")
        item("Grayscale", oracleColor.grayscaleHex + " value(" + oracleColor.grayscaleValue + ")")
        item("Color Family", oracleColor.familyHex + " hue(" + oracleColor.familyHue + ") rgb(" + oracleColor.familyRgb + ")")
        item("Color", oracleColor.hex + " hue(" + oracleColor.hue + ") rgb(" + oracleColor.rgb + ")")
        item("Adjusted Color", oracleColor.adjustedHex + " hue(" + oracleColor.adjustedHue + ") rgb(" + oracleColor.adjustedRgb + ")")
        item("Action", altar.deeds.sign + " " + altar.deeds.name + " - " + altar.deeds.interpretation)
        item("Engagement", altar.words.sign + " " + altar.words.name + " - " + altar.words.interpretation)
        item("Mind", altar.bagua.sign + " " + altar.bagua.name + " - " + altar.bagua.interpretation)
    } else {
        item("Single Oracle", "not initialized")
    }

    return lines.join("\n")
}

function templeReceipt() {
    return templeOracleRecord()
}

function setTempleOracleRecordStatus(message) {
    let status = document.getElementById("oracle-record-status")
    if (status) {
        status.textContent = message
    }
}

function updateTempleOracleRecordDisplay() {
    let record = templeOracleRecord()
    let recordElement = document.getElementById("oracle-record")
    if (recordElement) {
        recordElement.textContent = record
    }

    return record
}

function copyTempleTextFallback(text) {
    let textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.left = "-9999px"
    textarea.style.position = "fixed"
    textarea.style.top = "0"
    document.body.appendChild(textarea)
    textarea.select()

    try {
        return document.execCommand("copy")
    } finally {
        document.body.removeChild(textarea)
    }
}

function copyTempleOracleRecord() {
    let record = updateTempleOracleRecordDisplay()
    window.TEMPLE_ORACLE_RECORD = record
    window.TEMPLE_RECEIPT = record

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(record).then(function() {
            setTempleOracleRecordStatus("Oracle Record copied.")
        }).catch(function() {
            if (copyTempleTextFallback(record)) {
                setTempleOracleRecordStatus("Oracle Record copied.")
            } else {
                setTempleOracleRecordStatus("Copy failed.")
            }
        })
    } else if (copyTempleTextFallback(record)) {
        setTempleOracleRecordStatus("Oracle Record copied.")
    } else {
        setTempleOracleRecordStatus("Copy failed.")
    }

    return record
}

function clearTempleOraclePrintMode() {
    if (document.body) {
        document.body.classList.remove("printing-oracle-record")
    }
}

function printTempleOracleRecord() {
    let record = updateTempleOracleRecordDisplay()
    window.TEMPLE_ORACLE_RECORD = record
    window.TEMPLE_RECEIPT = record
    console.log(record)

    if (document.body) {
        document.body.classList.add("printing-oracle-record")
    }

    window.addEventListener("afterprint", clearTempleOraclePrintMode, { once: true })
    window.print()
    return record
}

function logTempleOracleRecord() {
    let record = updateTempleOracleRecordDisplay()
    window.TEMPLE_ORACLE_RECORD = record
    window.TEMPLE_RECEIPT = record
    console.log(record)
    return record
}

function printTempleReceipt() {
    return logTempleOracleRecord()
}

function templeDebugEnabled() {
    if (typeof window == "undefined") {
        return false
    }

    let search = window.location && window.location.search ? window.location.search : ""
    let hash = window.location && window.location.hash ? window.location.hash : ""
    let params = new URLSearchParams(search)
    return params.get("debug") == "1" || params.get("templeDebug") == "1" || hash == "#debug"
}

function registerTempleDebugGlobals() {
    window.templeDebug = templeDebug
    window.templeOracleRecord = templeOracleRecord
    window.logTempleOracleRecord = logTempleOracleRecord
    window.copyTempleOracleRecord = copyTempleOracleRecord
    window.printTempleOracleRecord = printTempleOracleRecord
    window.templeReceipt = templeReceipt
    window.printTempleReceipt = printTempleReceipt
}

function enableTempleDebug(printReceipt = true) {
    registerTempleDebugGlobals()
    if (printReceipt) {
        return printTempleReceipt()
    }

    return buildTempleDebug()
}

if (typeof window != "undefined") {
    window.enableTempleDebug = enableTempleDebug
    if (templeDebugEnabled()) {
        registerTempleDebugGlobals()
    }
}

function drawArkInscriptions(leftX, rightX, y) {
    if (!arkInscriptionLayer) {
        const size = mother.width * .016
        const leading = size * 1.35
        push()
        textFont(arkInstructionFont)
        textSize(size)
        const lineWidth = Math.max(...arkInstructionCuneiform.map(line => textWidth(line)))
        pop()

        const margin = lineWidth + size
        arkInscriptionLayer = createShrineLayer(leftX - margin, y - 3 * size, rightX + margin, y + 3 * size)
        const graphics = arkInscriptionLayer.graphics
        graphics.textFont(arkInstructionFont)
        graphics.textStyle(NORMAL)
        graphics.textSize(size)
        graphics.fill(255)
        graphics.stroke(0)
        graphics.strokeCap(SQUARE)
        graphics.strokeWeight(size * .14)
        for (let i = 0; i < arkInstructionCuneiform.length; i++) {
            const lineY = y + (i - 1) * leading
            graphics.textAlign(RIGHT, CENTER)
            graphics.text(arkInstructionCuneiform[i], leftX, lineY)
            graphics.textAlign(LEFT, CENTER)
            graphics.text(arkInstructionCuneiform[i], rightX, lineY)
        }
    }
    drawShrineLayer(arkInscriptionLayer)
}

if (typeof module != "undefined" && module.exports) {
    module.exports = {
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
        templeOracleBandedHalfCompassDirection,
        templeOracleCompassDirections,
        templeOracleDirectionCompasses,
        templeOracleHalfCompassDirection,
        templeOracleClockAngle,
        templeTrigramClockDirection
    }
}

// Left to right as seen by the observer. Six pairs share one yellow center string.
const emanationColors = [
    [32, 66, 255], [18, 118, 255], [0, 182, 255], [0, 226, 208],
    [65, 236, 118], [171, 246, 55], [255, 255, 0], [255, 214, 26],
    [255, 171, 24], [255, 127, 20], [255, 87, 20], [255, 47, 20], [255, 12, 12]
]
const stringsPerSide = (emanationColors.length - 1) / 2
const emanationTextureMargin = 1.10
const emanationHalfArc = Math.PI / 3
const emanationEdgeSine = Math.sin(emanationHalfArc)
const emanationEdgeCosine = Math.cos(emanationHalfArc)
const emanationViewElevation = Math.PI / 4
// Match the rise of a 105-degree screen arc while keeping the ribbon's 120-degree cross section.
const emanationApparentArc = 105 * Math.PI / 180
const emanationBowRise = Math.tan(emanationApparentArc / 4)
const emanationBowProjection = emanationBowRise / Math.tan(emanationHalfArc / 2)
const emanationBowDepth = Math.sqrt(1 - emanationBowProjection ** 2)
let emanationTexture
let emanationFlowTexture
let emanationLensSample

const myriadColors = emanationColors.map(rgb => `rgb(${rgb.join(",")})`)
const myriadLineCount = 64
// The two recessed openings sit just under halfway from the throat to the rim.
const myriadFocusX = .46
const myriadFocus = myriadFocusX / (1 + Math.sqrt(1 - myriadFocusX ** 2))
let myriadGrid

function myriadVertex(lane, orbit) {
    const sin = Math.sin(orbit)
    const depth = lane * .31 / (1 + .22 * sin)
    return { radial: 2 * myriadFocus * Math.sinh(depth), ring: Math.cosh(depth),
        sin, cos: Math.cos(orbit) }
}

function makeMyriadGrid() {
    const groups = []
    const limit = stringsPerSide + 4
    // Reserve one line for the circular rim and keep a meridian on the central axis.
    const transverse = myriadLineCount / 2
    const meridians = myriadLineCount - transverse - 1
    function add(lane, strength, strands) {
        const recession = Math.exp(-.42 * Math.max(0, Math.abs(lane) - stringsPerSide))
        groups.push({ opacity: strength * recession, strands })
    }

    // Each meridian is one closed strand that passes across both faces of the sphere.
    for (let i = 0; i < meridians; i++) {
        const lane = limit * (2 * i / (meridians - 1) - 1)
        const strand = Array.from({ length: 161 }, (_, j) => myriadVertex(lane, 2 * Math.PI * j / 160))
        add(lane, 1, [strand])
    }
    // Split each transverse line into sections so it dims as it recedes into either opening.
    for (let lane = -limit; lane < limit; lane++) {
        const strands = []
        for (let i = 0; i < transverse; i++) {
            const orbit = i * 2 * Math.PI / transverse
            strands.push(Array.from({ length: 7 }, (_, j) => myriadVertex(lane + j / 6, orbit)))
        }
        add(lane + .5, .65, strands)
    }
    return groups
}

function projectMyriadGroup(group, sinTurn, cosTurn) {
    const paths = [new Path2D(), new Path2D()]
    const a = myriadFocus
    for (const strand of group.strands) {
        let prevX, prevY, prevZ, prevSide
        for (const point of strand) {
            const sin = point.sin * cosTurn + point.cos * sinTurn
            const cos = point.cos * cosTurn - point.sin * sinTurn
            // Inverse stereographic projection of a bipolar grid. A strand turns onto
            // the far face when its Z coordinate crosses zero at the spherical rim.
            const denominator = (1 + a * a) * point.ring - (1 - a * a) * cos
            const x = point.radial / denominator
            const y = 2 * a * sin / denominator
            const z = ((1 - a * a) * point.ring - (1 + a * a) * cos) / denominator
            const side = z >= 0 ? 1 : 0
            if (prevSide === undefined) {
                paths[side].moveTo(x, y)
            } else {
                if (side !== prevSide) {
                    const t = prevZ / (prevZ - z)
                    const rimX = prevX + t * (x - prevX)
                    const rimY = prevY + t * (y - prevY)
                    paths[prevSide].lineTo(rimX, rimY)
                    paths[side].moveTo(rimX, rimY)
                }
                paths[side].lineTo(x, y)
            }
            prevX = x
            prevY = y
            prevZ = z
            prevSide = side
        }
    }
    return paths
}

function myriadSpectrum(ctx, halfWidth, phase) {
    const count = myriadColors.length
    const period = 2 * halfWidth * count / (count - 1)
    const left = -halfWidth + (phase - 1) * period
    const gradient = ctx.createLinearGradient(left, 0, left + 2 * period, 0)
    for (let i = 0; i <= 2 * count; i++) {
        gradient.addColorStop(i / (2 * count), myriadColors[i % count])
    }
    return gradient
}

function drawMyriadInterior(ctx, turn, colorPhase) {
    if (!myriadGrid) myriadGrid = makeMyriadGrid()
    const radius = Math.max(width, height) / 2
    const sinTurn = Math.sin(turn)
    const cosTurn = Math.cos(turn)
    const paths = myriadGrid.map(group => projectMyriadGroup(group, sinTurn, cosTurn))
    ctx.scale(radius, radius)
    ctx.strokeStyle = myriadSpectrum(ctx, width / (2 * radius), colorPhase)
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.arc(0, 0, 1, 0, 2 * Math.PI)
    ctx.globalAlpha = .32
    ctx.lineWidth = Math.max(1 / radius, .0027)
    ctx.stroke()
    for (let side = 0; side <= 1; side++) {
        const depthLight = side === 1 ? 1 : .36
        const core = Math.max(.75 / radius, side === 1 ? .004 : .0027)
        for (let i = 0; i < myriadGrid.length; i++) {
            const group = myriadGrid[i]
            const path = paths[i][side]
            const light = depthLight * group.opacity
            ctx.globalAlpha = .085 * light
            ctx.lineWidth = 4 * core
            ctx.stroke(path)
            ctx.globalAlpha = .21 * light
            ctx.lineWidth = 2.15 * core
            ctx.stroke(path)
            ctx.globalAlpha = .9 * light
            ctx.lineWidth = core
            ctx.stroke(path)
        }
    }
}

function myriad(x, y, expanded) {
    const ctx = drawingContext
    const turn = 2 * Math.PI * timeMoment[1] / timeUnitsMoment[2]
    const colorPeriod = 16 * timeUnitsMoment[1]
    const colorPhase = (timeMoment[1] % colorPeriod) / colorPeriod
    ctx.save()
    if (expanded) {
        // The shrine's local origin is the top left of the centered Mother image.
        ctx.translate(mother.width / 2, mother.height / 2)
        drawMyriadInterior(ctx, turn, colorPhase)
    } else {
        // At the Mother the whole field is only a few pixels wide.
        const size = mother.width * .0063
        ctx.translate(x, y)
        ctx.strokeStyle = myriadSpectrum(ctx, size, colorPhase)
        ctx.rotate(.25 * Math.sin(turn))
        ctx.lineWidth = mother.width * .0005
        for (let i = 0; i < myriadColors.length; i++) {
            const radius = size * (1 - i / myriadColors.length) / 2
            ctx.beginPath()
            ctx.ellipse(-radius, 0, radius, radius * 1.5, 0, 0, 2 * Math.PI)
            ctx.moveTo(2 * radius, 0)
            ctx.ellipse(radius, 0, radius, radius * 1.5, 0, 0, 2 * Math.PI)
            ctx.stroke()
        }
    }
    ctx.restore()
}

// Screen coordinates relative to the point on the Mother, in units of fan width and length.
function emanationSpread(y) {
    return y * (.72 + .28 * y)
}

// Rise above the red-to-blue chord, in units of the ribbon's cross-sectional radius.
function emanationArcHeight(lane) {
    const sine = Math.min(1, Math.abs(lane)) * emanationEdgeSine
    return Math.sqrt(1 - sine * sine) - emanationEdgeCosine
}

function emanationLensPose(phase, reach, spread, station) {
    const angle = -emanationHalfArc * Math.sin(2 * Math.PI * phase)
    const lane = Math.sin(angle) / emanationEdgeSine
    const arcHeight = emanationArcHeight(lane)
    const halfChord = spread * emanationSpread(station)
    const arcRadius = halfChord / emanationEdgeSine
    const x = halfChord * lane
    // Measure distance along yellow. The other rays bow down from that fixed center.
    const drop = (1 - emanationEdgeCosine - arcHeight) * emanationBowProjection
    const y = reach * station + arcRadius * drop

    // Two tangents define the surface under the glass. X/Y are screen coordinates,
    // and positive Z points toward the viewer. The first tangent follows the ray.
    const radiusSlope = spread / reach * (.72 + .56 * station) / emanationEdgeSine
    const rayX = radiusSlope * Math.sin(angle)
    const rayY = 1 + radiusSlope * drop
    const rayZ = 1 / Math.tan(emanationViewElevation) + radiusSlope * arcHeight * emanationBowDepth
    const visibility = Math.min(1, spread / 6)
    const bank = angle * visibility
    const crossX = Math.cos(bank)
    const crossY = Math.sin(bank) * emanationBowProjection
    const crossZ = -Math.sin(bank) * emanationBowDepth

    // A projected circle's minor/major axis ratio is the facing component of its unit normal.
    const nx = crossY * rayZ - crossZ * rayY
    const ny = crossZ * rayX - crossX * rayZ
    const nz = crossX * rayY - crossY * rayX
    const axisRatio = Math.abs(nz) / Math.hypot(nx, ny, nz)
    const tilt = Math.atan2(nx, -ny)
    const scale = (station / .70) / (1 - .6 * arcHeight * emanationBowDepth * visibility)
    return { x, y, scale, axisRatio, tilt }
}

function emanationColor(lane) {
    const index = Math.max(0, Math.min(stringsPerSide * 2, (lane + 1) * stringsPerSide))
    const left = Math.floor(index)
    const right = Math.min(left + 1, emanationColors.length - 1)
    return emanationColors[left].map((value, channel) =>
        value + (emanationColors[right][channel] - value) * (index - left))
}

function makeEmanationTexture() {
    const canvas = document.createElement("canvas")
    canvas.width = 640
    canvas.height = 1024
    const ctx = canvas.getContext("2d")
    const image = ctx.createImageData(canvas.width, canvas.height)

    // Sample the continuous spectrum once. Each string adds a broad halo and a narrow core.
    const profile = []
    for (let i = 0; i <= 1024; i++) {
        const lane = (2 * i / 1024 - 1) * emanationTextureMargin
        const crown = emanationArcHeight(lane) / (1 - emanationEdgeCosine)
        const position = lane * stringsPerSide
        const nearestString = Math.max(-stringsPerSide, Math.min(stringsPerSide, Math.round(position)))
        const distance = Math.abs(position - nearestString)
        // A short, steep shoulder defines the laser core within the softer halo.
        const core = Math.exp(-((distance / (.065 + .035 * crown)) ** 4))
        const halo = Math.exp(-((distance / .31) ** 2))
        const light = .49 + .12 * crown + .18 * halo + .42 * core
        const rgb = emanationColor(lane).map(value => value * light + (255 - value) * .16 * core)
        const outside = Math.max(0, Math.abs(lane) - 1)
        const alpha = Math.exp(-((outside / .036) ** 2))
        profile.push({ rgb, alpha })
    }

    const center = canvas.width / 2
    for (let row = 0; row < canvas.height; row++) {
        const y = (row + .5) / canvas.height
        const radius = center * emanationSpread(y)
        const light = .85 + .15 * y
        for (let col = Math.floor(center - radius); col < center + radius; col++) {
            const u = (col + .5 - center) / radius
            if (Math.abs(u) > 1) continue
            const sample = profile[Math.round((u + 1) * 512)]
            const offset = 4 * (row * canvas.width + col)
            image.data[offset] = sample.rgb[0] * light
            image.data[offset + 1] = sample.rgb[1] * light
            image.data[offset + 2] = sample.rgb[2] * light
            image.data[offset + 3] = 255 * sample.alpha
        }
    }
    ctx.putImageData(image, 0, 0)
    return canvas
}

// Paint one diffuse reflection across the bowed strings.
const emanationFlowBaseline = .875
function makeEmanationFlowTexture() {
    const canvas = document.createElement("canvas")
    canvas.width = 384
    const halfWidth = canvas.width / 2
    canvas.height = halfWidth
    const ctx = canvas.getContext("2d")
    const image = ctx.createImageData(canvas.width, canvas.height)
    for (let col = 0; col < canvas.width; col++) {
        const lane = (col + .5) / halfWidth - 1
        const crest = emanationFlowBaseline - emanationArcHeight(lane) * emanationBowProjection / emanationEdgeSine
        const rgb = emanationColor(lane).map(channel => .70 * channel + .30 * 255)
        const string = lane * stringsPerSide
        const core = Math.exp(-(((string - Math.round(string)) / .24) ** 2))
        const edgeFade = Math.min(1, (1 - Math.abs(lane)) / .10)
        const opacity = (.14 + .20 * core) * edgeFade
        for (let row = 0; row < canvas.height; row++) {
            const distance = (row + .5) / halfWidth - crest
            const glow = Math.exp(-((distance / (distance > 0 ? .095 : .18)) ** 2))
            const offset = 4 * (row * canvas.width + col)
            image.data[offset] = rgb[0]
            image.data[offset + 1] = rgb[1]
            image.data[offset + 2] = rgb[2]
            image.data[offset + 3] = 255 * opacity * glow
        }
    }
    ctx.putImageData(image, 0, 0)
    return canvas
}

function drawEmanationFlow(ctx, reach, spread, phase) {
    if (!emanationFlowTexture) emanationFlowTexture = makeEmanationFlowTexture()
    ctx.save()
    ctx.globalCompositeOperation = "screen"
    for (let i = 0; i < 4; i++) {
        const progress = (i + phase) / 4
        // Equal time steps cover more screen distance near the viewer. Let the trail clear the rim.
        const station = 1.16 * progress / (2 - progress)
        const halfWidth = spread * emanationSpread(station)
        const chordY = reach * station + halfWidth * emanationBowRise
        ctx.drawImage(emanationFlowTexture, -halfWidth, chordY - halfWidth * emanationFlowBaseline,
            2 * halfWidth, halfWidth)
    }
    ctx.restore()
}

function drawEmanationBeam(sourceX, sourceY, clockBottom) {
    if (!emanationTexture) emanationTexture = makeEmanationTexture()
    const screenBottom = (height + mother.height) / 2
    const reach = screenBottom - sourceY + 1
    const lensStation = ((clockBottom + screenBottom) / 2 - sourceY) / reach
    const halfWidth = Math.min(reach * .23, width * .38)
    // Launch a reflection at each of the clock's eight major divisions, as the lens returns to yellow.
    const beat = timeUnitsMoment[2] / 8
    const phase = (timeMoment[1] % beat) / beat
    // Leave a short white phase at the turn of the Temple clock.
    const opening = Math.max(0, (1 - timeScaleCycle[1] - .025) / .975)
    const aperture = opening * opening * (3 - 2 * opening)
    const spread = halfWidth * aperture
    const colorMix = Math.min(1, spread / 6)
    const ctx = drawingContext
    ctx.save()
    ctx.translate(sourceX, sourceY)
    ctx.save()
    if (spread > 0) {
        // Yellow reaches just past the viewport. Both outer tips are farther down the bow.
        const edgeReach = reach + spread * emanationBowRise
        const radius = spread * emanationTextureMargin
        ctx.globalAlpha = colorMix
        ctx.drawImage(emanationTexture, -radius, 0, radius * 2, edgeReach)
        drawEmanationFlow(ctx, reach, spread, phase)
    }
    if (colorMix < 1) {
        // Two tapered layers give the single white string a soft edge and a sharp tip.
        const core = Math.max(.8, reach * .0038)
        for (const [radius, opacity] of [[core * 2.8, .20], [core, 1]]) {
            ctx.globalAlpha = (1 - colorMix) * opacity
            ctx.fillStyle = "white"
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-radius, reach)
            ctx.lineTo(radius, reach)
            ctx.closePath()
            ctx.fill()
        }
    }
    ctx.restore()

    const pose = emanationLensPose(phase, reach, spread, lensStation)
    const sample = drawEmanationLens(ctx, pose, reach)
    ctx.restore()
    return sample
}

// Both the glass and the jackals' irises use the same pixel from the undisturbed beam.
function drawLensContactColor(ctx, sample, x, y, radius) {
    const middle = Math.floor(sample.width / 2)
    ctx.save()
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(sample, middle, middle, 1, 1, x - radius, y - radius, 2 * radius, 2 * radius)
    ctx.restore()
}

function drawEmanationLens(ctx, pose, reach) {
    const sizeScale = .375
    const radius = Math.max(9, reach * .038) * pose.scale * sizeScale
    const minorRadius = radius * pose.axisRatio
    if (!emanationLensSample) {
        const canvas = document.createElement("canvas")
        canvas.width = canvas.height = 65
        emanationLensSample = canvas.getContext("2d")
    }
    const sample = emanationLensSample.canvas
    ctx.save()
    ctx.translate(pose.x, pose.y)
    const zoom = 2.75
    const transform = ctx.getTransform()
    const sampleRadius = radius * transform.a / zoom
    emanationLensSample.drawImage(ctx.canvas, transform.e - sampleRadius, transform.f - sampleRadius,
        2 * sampleRadius, 2 * sampleRadius, 0, 0, sample.width, sample.height)

    ctx.beginPath()
    ctx.ellipse(0, 0, radius, minorRadius, pose.tilt, 0, 2 * Math.PI)
    ctx.save()
    ctx.clip()
    drawLensContactColor(ctx, sample, 0, 0, radius)
    ctx.imageSmoothingEnabled = true
    ctx.globalAlpha = .26
    ctx.drawImage(sample, -radius, -radius, 2 * radius, 2 * radius)
    ctx.globalAlpha = 1
    const glass = ctx.createLinearGradient(-radius, -radius, radius, radius)
    glass.addColorStop(0, "rgba(255, 255, 255, .14)")
    glass.addColorStop(.48, "rgba(255, 255, 255, 0)")
    glass.addColorStop(1, "rgba(0, 0, 0, .13)")
    ctx.fillStyle = glass
    ctx.fill()
    ctx.restore()

    // Narrow the neutral rim near the source so it leaves room for the colored glass.
    const rimScale = Math.min(sizeScale, minorRadius / 5)
    ctx.strokeStyle = "#313438"
    ctx.lineWidth = 2.2 * rimScale
    ctx.stroke()
    ctx.strokeStyle = "#c2c5c8"
    ctx.lineWidth = .85 * rimScale
    ctx.stroke()

    ctx.beginPath()
    ctx.ellipse(0, 0, radius * .84, minorRadius * .84, pose.tilt, Math.PI * 1.20, Math.PI * 1.40)
    ctx.strokeStyle = "rgba(255, 255, 255, .70)"
    ctx.stroke()
    ctx.restore()
    return sample
}

function emination(sourceX, sourceY, clockBottom) {
    push()
    const cx = mother.width / 2
    const cy = mother.height * .5021
    const n = noise(dateTemple / 1000)
    const lensSample = drawEmanationBeam(sourceX, sourceY, clockBottom)
    colorMode(HSB)
    fill(100, Math.min(1, timeScaleCycle[1] * 3))

    // eye of eternity
    let eyescale = .5
    stroke(0)
    strokeWeight(mother.width * .00333 *eyescale);
    ellipse(cx, cy, mother.width * .015, mother.width * .0025); //black background
    stroke(255)
    strokeWeight(mother.width * .00333*eyescale);
    ellipse(cx, cy, mother.width * .01, mother.width * .002); //whites
    stroke(map(n, 0, 1, -80, 260), 100, 70);
    strokeWeight(mother.width * .00444);
    point(cx, cy); //cornia
    stroke(0);
    strokeWeight(mother.width * .00222*eyescale);
    point(cx, cy); //pupil

    if (jackals) {
        push()
        imageMode(CENTER)
        const jackalCenterX = jackal.width * .25
        const jackalCenterY = windowHeight * .666
        image(jackal, jackalCenterX, jackalCenterY)
        const arkInstructionY = jackalCenterY - jackal.height * .47
        drawArkInscriptions(jackalCenterX - jackal.width * .233, jackalCenterX + jackal.width * .233, arkInstructionY)
        pop()

        const eyeY = cy + mother.height * .233
        const eyeOffset = mother.width * .435
        const irisRadius = mother.width * .00444 / 2
        const ctx = drawingContext
        stroke(0)
        strokeWeight(mother.width * .00222 * eyescale)
        for (const x of [cx - eyeOffset, cx + eyeOffset]) {
            ctx.save()
            ctx.beginPath()
            ctx.arc(x, eyeY, irisRadius, 0, 2 * Math.PI)
            ctx.clip()
            drawLensContactColor(ctx, lensSample, x, eyeY, irisRadius)
            ctx.restore()
            point(x, eyeY)
        }
    }
    pop()
}
