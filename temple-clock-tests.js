const assert = require("node:assert/strict")

const divisions = ["⚸", "☉", "♀"]

const templeEpoch = Date.UTC(2012, 10, 14, 10, 21, 32, 641)
const day = 86400000
const anomalisticYearDays = 365.259636
const year = anomalisticYearDays * day
const ordinaryYear = 365 * day
const templeDateLineLongitude = -159.270875
const templeZoneCount = 24
const templeZoneWidth = 360 / templeZoneCount
const lunarAnomalisticMonthDays = 27.55454977
const lunarMonthDrift = lunarAnomalisticMonthDays - 27
const driftThreshold = 1 - lunarMonthDrift
const division = day / 3
const hr = division / 8
const minute = hr / 64
const second = minute / 64
const moment = second / 64
const timeDiv = [64, 64, 64, 8, 3]

function wrap360(degrees) {
  return ((degrees % 360) + 360) % 360
}

function templeZoneFromLongitude(longitude) {
  return Math.floor(wrap360(longitude - templeDateLineLongitude) / templeZoneWidth)
}

function templeState(elapsed) {
  const yearIndex = Math.floor(elapsed / year)
  const yearElapsed = ((elapsed % year) + year) % year
  const inAnnualApsisInterval = yearElapsed >= ordinaryYear
  const ordinaryDayIndex = inAnnualApsisInterval ? 365 : Math.floor(yearElapsed / day)
  const ordinaryClockElapsed = ((elapsed % day) + day) % day
  const dayElapsed = inAnnualApsisInterval ? yearElapsed - ordinaryYear : ordinaryClockElapsed
  const apsisElapsed = inAnnualApsisInterval ? dayElapsed : 0

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

function clockFromElapsed(elapsed) {
  const state = templeState(elapsed)
  const divisionIndex = Math.floor((state.dayElapsed / division) % timeDiv[4])

  return {
    year: state.yearIndex + 1,
    ordinaryDay: state.ordinaryDayIndex + 1,
    inAnnualApsisInterval: state.inAnnualApsisInterval,
    divisionIndex,
    divisionSymbol: divisions[divisionIndex],
    hour: Math.floor((state.dayElapsed / hr) % timeDiv[3]),
    minute: Math.floor((state.dayElapsed / minute) % timeDiv[2]),
    second: Math.floor((state.dayElapsed / second) % timeDiv[1]),
    moment: Math.floor((state.dayElapsed / moment) % timeDiv[0]),
    dayElapsedHours: state.dayElapsed / hr,
    apsisElapsedHours: state.apsisElapsed / hr
  }
}

function calendarYearFromSeed(seed = [27.55454977, 27, 0.55454977, 27, 27, 1]) {
  const calendarYear = [Array.from(seed)]
  calendarYear[0][4] = calendarYear[0][3]

  for (let i = 0; i < 15; i++) {
    let monthLength = 0

    if (i > 0) {
      if (i % 13 == 0) {
        monthLength = 365 - calendarYear[i - 1][4]
      } else if (calendarYear[i - 1][2] > driftThreshold) {
        monthLength = 28
      } else {
        monthLength = 27
      }

      calendarYear.push([0, 0, 0, 0, calendarYear[i - 1][4] + monthLength, 0])
      calendarYear[i][3] = monthLength

      if (i % 13 == 0) {
        calendarYear[i][0] = calendarYear[i - 1][0] + calendarYear[i][3]
      } else {
        calendarYear[i][0] = calendarYear[i - 1][0] + lunarAnomalisticMonthDays
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

function monthLengthsForYear(yearIndex) {
  let years = []
  calendarYearFromSeed()
  years.push(calendarYearFromSeed())

  for (let i = 1; i <= yearIndex; i++) {
    years.push(calendarYearFromSeed(years[i - 1][14]))
  }

  return years[yearIndex].slice(0, 14).map(month => month[3])
}

function assertClock(label, actual, expected) {
  for (const [key, value] of Object.entries(expected)) {
    assert.equal(actual[key], value, `${label}: ${key}`)
  }
}

assert.equal(year, 31558432550.4, "anomalistic year milliseconds")
assert.equal(ordinaryYear, 31536000000, "ordinary year milliseconds")
assert.equal(year - ordinaryYear, 22432550.400001526, "annual apsis interval milliseconds")

assertClock("epoch", clockFromElapsed(0), {
  year: 1,
  ordinaryDay: 1,
  inAnnualApsisInterval: false,
  divisionSymbol: "⚸",
  hour: 0,
  minute: 0,
  second: 0,
  moment: 0
})

assert.equal(templeState(ordinaryYear - 1).inAnnualApsisInterval, false, "last ordinary millisecond is ordinary")
assert.equal(templeState(ordinaryYear).inAnnualApsisInterval, true, "ordinary year boundary starts apsis")
assert.equal(templeState(ordinaryYear).ordinaryDayIndex, 365, "apsis has separate day index")
assert.equal(templeState(year).yearIndex, 1, "anomalistic year rolls to next year")
assert.equal(templeState(year).ordinaryDayIndex, 0, "new anomalistic year returns to first ordinary day")

const portlandZone = templeZoneFromLongitude(-122.6765)
assert.equal(portlandZone, 2, "Portland Temple Earth Zone")

const portlandSample = new Date("2026-05-04T17:41:00.000Z")
const portlandClock = clockFromElapsed(portlandSample.getTime() - templeEpoch + portlandZone * hr)
assertClock("Portland 2026-05-04 10:41 PDT sample", portlandClock, {
  year: 14,
  ordinaryDay: 172,
  inAnnualApsisInterval: false,
  divisionSymbol: "☉",
  hour: 1,
  minute: 20,
  second: 48
})

for (let yearIndex = 0; yearIndex < 64; yearIndex++) {
  const lengths = monthLengthsForYear(yearIndex)
  const lunarMonths = lengths.slice(0, 13)
  const sunDays = lengths[13]

  assert.equal(lengths.reduce((sum, length) => sum + length, 0), 365, `year ${yearIndex + 1}: ordinary days sum`)
  assert.ok(lunarMonths.every(length => length == 27 || length == 28), `year ${yearIndex + 1}: lunar months are 27/28 days`)
  assert.ok(sunDays >= 6 && sunDays <= 13, `year ${yearIndex + 1}: Sun-day block is bounded`)
}

console.log("Temple clock/calendar tests passed")
