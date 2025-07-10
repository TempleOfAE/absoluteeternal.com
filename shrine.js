var mother //stores shrine image\
var jackal

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

// night/sunrise, day, sunset/night
const divisions = [
 '☉', '♀', '⚸' // Day, Sunset, Sunrise
]

const zerohour = Date.UTC(2012, 10, 13, 22, 12, 55) //exact time of total eclyps UTC
//const zerohour = Date.UTC(2012, 10, 14, 0, 0, 0) //new day mark
const date = new Date();
const offset = (date.getTimezoneOffset() * 60000);
var dateTemple = Date.now() - zerohour + offset

//const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//temple bsae 64 time units
const year = 31557600000
const LAM = 27.55454977 * 86400000 // lunar anomalistic month
const day = 86400000
const week = day * 9
const month = week * 3
const division = day / 3
const hr = division / 8
const minute = hr / 64
const second = minute / 64
const moment = second / 64

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
var mondays = []

const measuresPerUnit = [64, 64, 64, 8, 3,27,14,64*8]
const msPerUnit = [moment, second, minute, hr, division, day, month, year]

const timeDiv = [64, 64, 64, 8, 3, 27,14,64*8]
const timeUnitsMoment = [1, 64, 64 ** 2, 64 ** 2 * 8, 64 ** 3 * 8 * 3]

// kali variables
var timeUnitsMax = [];
var timeUnitsHalf = [];
var timeUnitsQuarter = [];
for (let i = 0; i < timeDiv.length; i++) {
    timeUnitsMax[i] = timeDiv[i] * timeUnitsMoment[i] - 1
    timeUnitsHalf[i] = timeUnitsMax[i] * .5
    timeUnitsQuarter[i] = timeUnitsMax[i] * .25
}

//time and timing variables
var currentTime = [0, 0, 0, 0, 0,0,0] // time as human readable units
var timeO = []
var timeMoment = [0, 0, 0, 0, 0] // time as 0 - maxunit in moments
var timeScale = [0, 0, 0, 0, 0] // time as 0 - 1
var timeScaleCycle = [0, 0, 0, 0, 0] // time as 0 - 1
var LunarCalandarCycleValue = [0, 0, 0, 0, 0, 0, 0, 0, 0] // 0-255-0
var LunarCalandarCycleValueDouble = [0, 0, 0, 0, 0, 0, 0, 0, 0] // 0-255-0-255-0

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

// P5 main functions
function preload() {
    mother = loadImage('mother.png');
    jackal = loadImage('jackal.png')
}
function setup() {
    //set image sizes
    mother.width = windowHeight * motherSizeMod;
    mother.height = mother.width
    jackal.width = mother.width *2
    jackal.height = mother.height

    //CANVAS SETTINGS
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);

    //STROKE SETTINGS
    strokeCap(SQUARE)

    //FONT SETTINGS
    textFont('Times New Roman')
    textSize(mother.width * .023);
    textStyle(NORMAL);
    textStyle(BOLD);

    //TIMING SETTINGS
    frameRate(fR) // set frame rate
    kali(); // sets initial time
    calandarSetup() // sets initial date

    //INITIAL ORACLE
    timeStamp = Array.from(currentTime)
    oracleGenerator() // loads oracle system
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

    if (windowHeight < windowWidth) {
        mother.width = windowHeight*motherSizeMod;
        mother.height = mother.width
        jackal.width = mother.width *2
        jackal.height = mother.height
    } else {
        mother.height = windowHeight *motherSizeMod;
        mother.width = mother.height
        // jackal.width = mother.width *2
        // jackal.height = mother.height
    }

    middle = createVector(window.width * .5, window.height * .5) // defines center of circle

    clear();

    kali()

    background(0);

    translate(middle.x - mother.width / 2, (middle.y - mother.height / 2));

    circleWidth = mother.width * .725
    idol(mother.width * .5, mother.height * .5, circleWidth, true, false, mother.width*.003, 255)
    clock(0)

    if (!circleHover && !menuHover) {
        myriad()
        emination(13, 1)
    }

    displays(6 - oracleDisplayCounter)
    push()

    textStyle(NORMAL)
    if (titleHover) {
        textStyle(BOLD)
    }

    fill(255)
    textAlign(CENTER, CENTER)
    textSize(mother.width * .1)

    noStroke()

    text('About ToÆ',    
    mother.width * .5, -mother.height * .1333)

    textSize(mother.width * .022)

    text("EST. 13 NOV 2012 CE IN HONOR OF " + motherNames[Math.floor(map(currentTime[1], 0, 64, 0, motherNames.length))],    
    mother.width * .5, -mother.height * .0444)

    pop()
    pop()
    pop()
    pop()

    //JACKAL DISPLAY LOGIC
   // if (windowHeight < windowWidth * .85) 
   // {
    //    jackals = true
   //         push()
   //         imageMode(CENTER)
          //  image(jackal, windowWidth * .5, windowHeight * .5)
   //         pop()
  //  }else {
  //      jackals = false
  //  }

    //disables UI if overlay 1 is active
    if (!overlays[1]) {
        UI() // checks location of mouse and updates variables to controll zoom and select functions  
    }
}
function windowResized() {
    mother.width = windowHeight * motherSizeMod
    mother.height = mother.width
    jackal.width = mother.width *2
    jackal.height = mother.height
    resizeCanvas(windowWidth, windowHeight);
    // menuBar(principles,(windowHeight*menuYMod))
}

// P5 user input functions
function keyTyped() {
    // timeStamp = Array.from(time)
    if (keyCode == ENTER) {
        if (timeOracleHover) {
            timeStamp = Array.from(currentTime)
            oracleGenerator("TIME ONLY")
        } else {
            timeStamp = Array.from(currentTime)
            oracleGenerator()
        }
    }
}
function mousePressed() {
    if (timeOracleHover) {
        timeStamp = Array.from(currentTime)
    } else if (circleHover) {
        timeStamp = Array.from(currentTime)
        oracleGenerator()
    } else {
        return false
    }

    if (titleHover) {
        on(1)
    }
}
function mouseheld() {
    if (mouseIsPressed) {
        return true
    } else {
        return false
    }
}
function mouseReleased() {
    if (timeOracleHover) {
        if (!overlays[2]) { //prevents new oracle if overlay 2 is active
            oracleGenerator("TIME ONLY")
            oracleDisplayCounter = 6
        }
    } else if (circleHover) {

    } else {
        return false
    }

}

// converts ms time to base 64 temple time and controlls animation timing variables
function kali() {
    dateTemple = Date.now() - zerohour + offset; //temple date adjusted for viewers timezone
    templeDateDMY[0] =
        Math.floor((dateTemple % year) / 86400000) // day of year for callandar setup
    templeDateDMY[2] = Math.floor((dateTemple / year))-1 // year of era for calandar
    for (let i = 0; i < msPerUnit.length; i++) {
        currentTime[i] = Math.floor((dateTemple / msPerUnit[i]) % measuresPerUnit[i])
    }
    currentTime[5] = templeDayOfMonth
    currentTime[6] = templeDateDMY[1]
    currentTime[7] = templeDateDMY[2]
    //digital clock generator
    for (let i = 0; i < currentTime.length; i++) {
        currentTime[5] = templeDayOfMonth
        currentTime[6] = templeDateDMY[1] 
        currentTime[7] = templeDateDMY[2] 
        // time as ms
        currentTime[i] = Math.floor((dateTemple / msPerUnit[i]) % timeDiv[i])
        if (i == 1) {
            timeO[3] = "00".substr(str(currentTime[i]).length) + str(currentTime[i])
        }

        timeO[1] = "00".substr(str(currentTime[3]).length) + str(currentTime[3]) // 0 - 23
        timeO[2] = "00".substr(str(currentTime[2]).length) + str(currentTime[2]) // 0 - 63
        timeO[3] = "00".substr(str(currentTime[1]).length) + str(currentTime[1]) // 0 - 63
        timeO[4] = divisions[currentTime[4]] // 0 - 2
        timeO[5] = "00".substr(str(currentTime[5]).length) + str(currentTime[5]+1) // 1 - 27
        timeO[6] = "00".substr(str(currentTime[6]).length) + str(currentTime[6]+1) // 1 - 13
        timeO[7] = "000".substr(str(currentTime[7]).length) + str(currentTime[7]+1) // 1 - x

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
// calculates the temple calandar for current year starting from beginging of temple era
function calandarSetup() {

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


    function DOYtoGregMD(dayOfYear) {
        const shiftedDay = ((dayOfYear -1 + 14) % 365 + 365) % 365 + 1;
    
        const monthNames = ["NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"];
        const monthLengths = [30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31];
    
        let day = shiftedDay;
    
        for (let i = 0; i < 13; i++) {
            if (day <= monthLengths[i]) {
                return `${monthNames[i]}${day}`;
            }
            day -= monthLengths[i];
        }
    }

    let D = ((templeDateDMY[0] - 1) % 365 + 365) % 365;
    let M = 0
    let Y = templeDateDMY[2]

    //initialize calandar calculation
    calandarCount()

    //iterate calandar to current year
    for (i = 0; i < Y; i++) {
        calandarCount(calandar[i][14])
    }
    for (i = 0; i < Y + 1; i++) {
        calandar[i].pop()
        calandarByMonth.push([])
        for (ii = 0; ii < 14; ii++) {
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
                            if(dayCount == 48){
                                wom.push('g') // mark gregorian new year
                            } else if (dayCount != D) {
                                wom.push(String(dow))
                             // wom.push(String(DOYtoGregMD(dayCount)))
                            }  else {
                                wom.push('T')
                                M = i
                                dayOfMonth = dayOfMonthCount
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
                            mondays.push(DOYtoGregMD(dayCount))
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
                let greg = DOYtoGregMD(dayCount)
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
        
        

    templeDateDMY[1] = M
    templeDayOfMonth = dayOfMonth
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
            width / 2, height * .71,
            mother.width * .5, mother.width * .1],
        [true, width / 2, height / 2, mother.width * .72, 0]
        ],
        UIShow)    

    if (titleHover && mouseIsPressed) {
        on(1)
    }
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

    function timeOracleBreakdownDisplay() {
        push()

        let timeOracleBreakdownSize = mother.width * .2

        let timeOracleNameBreakdownSize = timeOracleBreakdownSize * .18

        let timeOracleCharacterBreakdownSize = timeOracleBreakdownSize *.5

        let timeOracleBreakdownY = mother.height * .43

        let binaryY = timeOracleBreakdownY 
        let quaternaryY = binaryY + (timeOracleBreakdownSize * .5)
        let octalY = quaternaryY + (timeOracleBreakdownSize * .5)

        textAlign(CENTER, CENTER)

        for (let i = 0; i < 2; i++){

            printOracle(str(timeOracle[1][0]), timeOracleCharacterBreakdownSize, timeOracleCharacterBreakdownSize * 1.61803398875,  mother.width / 2 - timeOracleBreakdownSize + (timeOracleBreakdownSize * 2 * i), binaryY, 1, 0)


            printOracle(str(timeOracle[1][1]), timeOracleCharacterBreakdownSize, timeOracleCharacterBreakdownSize * 1.61803398875, mother.width / 2 - timeOracleBreakdownSize + (timeOracleBreakdownSize * 2 * i), quaternaryY, 2, 0)


            printOracle(str(timeOracle[1][2]), timeOracleCharacterBreakdownSize, timeOracleCharacterBreakdownSize * 1.61803398875,  mother.width / 2 - timeOracleBreakdownSize + (timeOracleBreakdownSize * 2 * i), octalY, 3, 0)


            textSize(timeOracleNameBreakdownSize)
            text(binaryName[timeOracle[0][0]], mother.width / 2, binaryY)
            text(quaternaryName[timeOracle[0][1]], mother.width / 2, quaternaryY)
            text(octalName[timeOracle[0][2]], mother.width / 2, octalY)
        }

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


            let changingLineYPos = mother.height * .777
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
                textSize(changingLineTextSize)
                // text(changesText, mother.width / 2, changingLineYPos)
                // textSize(changingLineTextSize)
                // text(changingLinesText, mother.width / 2, changingLineYPos + changingLineTextSize * 1.3)

                text("INTERPRETATION", mother.width / 2, changingLineYPos)

                // name and number
                let nameNumberYPos = mother.height * .57
                for (i = 0; i < 2; i++) {
                    textSize(os * .25);
                    if (c = 6)
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

        // textStyle(CENTER, CENTER)
        push()
        noStroke()
        textSize(TempleCalandartextSize)
        let y = mother.height * .333
        textAlign(CENTER, CENTER)
        text('YEAR ' + str(currentTime[7]+1) + " (Temple Era)", mother.width * .5, y - (TempleCalandartextSize * 2))
        textAlign(LEFT,CENTER)
        for (let i = 0; i < templeCalandar.length; i++){
            if (i == templeCalandar.length-1) {
                textAlign(CENTER, CENTER)
                text(templeCalandar[i].join(" "), mother.width * .5, y + (TempleCalandartextSize * i * 1.333))
            } else {
                text(templeCalandar[i].join(" "), mother.width * .222, y + (TempleCalandartextSize * i * 1.333))

            }
        }

        textAlign(CENTER, CENTER)
        text("LUNISOLAR TEMPLE CALANDAR", mother.width * .5, y - (TempleCalandartextSize *3* 1.333))
        text("Temple Meeting Days (Gregorian)", mother.width * .5, y + (TempleCalandartextSize * 14.5 * 1.333))
        text(mondays.slice(0, 6).join(" "), mother.width * .5, y + (TempleCalandartextSize * 15.5 * 1.333))
        text(mondays.slice(6, 11).join(" "), mother.width * .5, y + (TempleCalandartextSize * 16.5 * 1.333))
        text(mondays.slice(11).join(" "), mother.width * .5, y + (TempleCalandartextSize * 17.5 * 1.333))


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

    if (changeHover) {
        on(2)
    } else {
        off(2)
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
        + str(timeO[6]) //month
        + ' / ' + str(timeO[5]) //day
        + ' / ' + str(timeO[7]) //year

        , mother.width * .59, mother.height * .2 //location
    )

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

    text(
        str(timeO[4]) //day section
        , mother.width * .5, mother.height * .185 //location
    )

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

    for (let i = 0; i < 8; i++) {
        push()
        rotate((TWO_PI / 8) * i)
        stroke(255)
        strokeWeight(ts * .75)
        line(0, rim, 0, rim - (smhTs * 3))
        stroke(0)
        strokeWeight(ts * .5)
        line(0, rim, 0, rim - (smhTs * 3))
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

    push()
    tint(
        255
        - 255 * timeScaleCycle[1]
        , // black tint
        255
        - (255 * timeScaleCycle[1])
    ); // transperancy

    image(mother, 0, 0)
    pop()

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
    let changingLinesList = ""
    let intTimeStamp = str(timeO[6]) + ' / ' + str(timeO[5]) + ' / ' + str(timeO[7]) + " - " +str(timeStamp[3]) + '(' + str(divisions[timeStamp[4]]) + ')' + ':' + str(timeStamp[2]) + ':' + str(timeStamp[1]) + ' [' + str(timeStamp[0]) + ']' + oracles[timeStamp[0]]
    let intTimeOracle =
        "In matters of action: " + iching.binary[timeOracle[0][0]].judgement+ " ["+ iching.binary[timeOracle[0][0]].sign + "]<br>"
        + "In matters of communication: " + iching.quaternary[timeOracle[0][1]].judgement + " ["+ iching.quaternary[timeOracle[0][1]].sign + "]<br>"
        + "In matters of thought: Be like " + iching.octal[timeOracle[0][2]].judgement + " ["+ iching.octal[timeOracle[0][2]].sign + "]<br>"

    // let tantra = Math.floor(Math.random() * VBT112.length)
    for (item of changingLines) {
        changingLinesList += "<p>"
        changingLinesList += "Change in line "+item+" means: "+str(iching.gua[oracleD[0]].changes[item-1])
        changingLinesList+="</p>"
    }

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
        document.getElementById("isChanging").innerHTML = "Changing Lines"
        document.getElementById("images").innerHTML = "<tr><th style=\"width: 50%;\">Symbolic Interpretation: "+sequence[oracleD[0]] + "[" + oracles[oracleD[0]]+ "] \"" +names[oracleD[0]]+ "\"</th><th style=\"width: 50%;\">Symbolic Interpretation: "+sequence[oracleD[1]] +"["+ oracles[oracleD[1]]+ "] "+ "\"" +names[oracleD[1]]+"\"</th></tr><tr><td>" + iching.gua[oracleD[0]].image + "</td><td>" + iching.gua[oracleD[1]].image + "</td></tr>"
        document.getElementById("intChangingLines").innerHTML = changingLinesList
        // document.getElementById("ifate").innerHTML = "<a href=\"https://www.ifate.com/i-ching-changes/iching-hexagram-" + sequence[oracleD[0]] + "-changing-to-" + sequence[oracleD[1]] + ".html\"target=\"_blank\">interpretation by ifate.com</a>"
        // document.getElementById("divinationcom").innerHTML = "<a href=\"https://divination.com/iching/lookup/" + sequence[oracleD[0]] + "-2/\"" + "target=\"_blank\">interpretation by divination.com</a>"
    }

    // document.getElementById("VBT").innerHTML = VBT112[tantra]
}

// controlls myriad animation
function myriad() {
    var h = mother.height;
    var wdt = mother.width;
    y = h * 0.53;
    x = wdt * 0.5;

    push();
    
    if (mouseY < windowHeight * 0.7 ) {
        var w = wdt * 0.0063; // scale
        var n = 13.5;         // line density
        var sw = wdt * 0.0005; // line width
        var ts1 = timeScale[0];
        var tsc1 = timeScaleCycle[1];
        var alpha1 = 1 - tsc1;
        var baseHue = 360 * ts1;
    
        noFill();
        colorMode(HSB);
        strokeWeight(sw * 0.6);
    
        var baseColor = color(100, 0, 100);
        baseColor.setAlpha(alpha1);
        stroke(baseColor);
    
        for (var i = 0; i < n; i++) {
            var t = i / n;
            var ww = w * (1 - t);
            var hue = (360 * t + baseHue) % 361;
    
            var c = color(hue, 100, 100, alpha1);
            stroke(c);
            strokeWeight(sw);
    
            var ww2 = ww / 2;
            ellipse(x - ww2, y, ww, ww * 1.5);
            ellipse(x + ww2, y, ww, ww * 1.5);
    
            c.setAlpha(0.2 - 0.2 * tsc1);
            stroke(c);
            ellipse(x - ww2, y, ww, w * 1.5);
            ellipse(x + ww2, y, ww, w * 1.5);
        }
    
        colorMode(RGB);
        pop();
    } else {
        var w = h * 0.999;     // scale
        var n = 13.5;          // line density
        var sw = wdt * 0.0666;   // line width
       // y = h * 0.5;
        var ts1 = timeScale[0];
        var tsc1 = timeScaleCycle[1];
        var alpha1 = 1 - tsc1;
        var baseHue = 360 * ts1;
    
        noFill();
        colorMode(HSB);
        strokeWeight(sw * 0.6);
    
        var baseColor = color(100, 0, 100);
        baseColor.setAlpha(alpha1);
        stroke(baseColor);
    
        for (var i = 0; i < n; i++) {
            var t = i / n;
            var ww = w * (1 - t);
            var hue = (360 * t + baseHue) % 361;
    
            var c = color(hue, 100, 100, alpha1);
            stroke(c);
            strokeWeight(sw);
            //inner glow
            var ww2 = ww / 2;
            c.setAlpha(0.15 - 0.15 * tsc1);
            stroke(c);
            ellipse(x - ww2, y, ww, ww * 1.5);
            ellipse(x + ww2, y, ww, ww * 1.5);
    
            //owter glow
            c.setAlpha(0.07 - 0.07 * tsc1);
            stroke(c);
            ellipse(x - ww2, y, ww, w * 1.5);
            ellipse(x + ww2, y, ww, w * 1.5);

            //rings
            strokeWeight(sw * 0.05);
            c.setAlpha(1 - 1 * tsc1);
            stroke(c);
            ellipse(x - ww2, y, ww, ww * 1.5);
            ellipse(x + ww2, y, ww, ww * 1.5);
        }

    
    
        colorMode(RGB);
        pop();
    }
}

// controlls emianation animation
function emination(count) {
    push()
    cx = mother.width / 2
    cy = mother.height / 2
        + (mother.height * .0021)
    clockCenter = createVector(cx, cy)

    colorMode(HSB)

    let length = windowHeight * .5
    let eminationPoint = createVector(x, y)// + mother.height * .01)
    let clockPoint = createVector(mother.width * .5, mother.height * .5)
    let direction = p5.Vector.sub(clockCenter, clockPoint)

    //rainbow size
    let backgroundDensity = 8
    let maxspacing = ((PI * 2) / (count * backgroundDensity * 20))
    let rays = count * backgroundDensity

    // rainbow timing 
    let spacing = maxspacing - maxspacing * timeScaleCycle[1]
    rotation = PI * 2 - spacing * (count * backgroundDensity - 1) / 2 // aligns emination to center 
    for (let i = 0; i < count * backgroundDensity; i++) {
        push()
        direction.setMag(length * 1.2)
        direction.rotate(rotation)
        let hand = p5.Vector.add(clockCenter, direction)
        let c = color(map(i, 0, count * backgroundDensity, -80, 260), 100 - 100 * timeScaleCycle[1], 100)
        strokeWeight(1)
        c.setAlpha(.5);
        stroke(c)

        line(eminationPoint.x, eminationPoint.y, hand.x, hand.y) // draws emination
        pop()

        rotation = spacing
    }

    direction = p5.Vector.sub(eminationPoint, clockPoint)
    maxspacing = ((PI * 2) / (count * 20))
    rays = count
    spacing = maxspacing - maxspacing * timeScaleCycle[1]
    rotation = PI * 2 - spacing * (count - 1) / 2 // aligns emination to center 

    for (let i = 0; i < count; i++) {
        push()
        direction.setMag(length * 1.2)
        direction.rotate(rotation)
        let hand = p5.Vector.add(clockCenter, direction)
        let c = color(map(i, 0, count, -80, 260), 100 - 100 * timeScaleCycle[1], 100)
        if (i < count * .5) {
            strokeWeight(log(nf(map(i, -1, count, 1, count * 2))))
        } else {
            strokeWeight(log(nf(map(i, -1, count, count * 2, 1))))
        }
        // c.setAlpha(timeScaleCycle[1]);
        stroke(c);

        line(eminationPoint.x, eminationPoint.y, hand.x, hand.y) // draws emination
        pop()

        rotation = spacing
    }

    stroke(100, 100) //white emination
    strokeWeight(mother.width * .005)
    stroke(100, 100) //white emination
    strokeWeight(mother.width * (.01 - .01 * timeScaleCycle[1]));



    //lens
    let n = noise(dateTemple / 1000)
    let ncycle = noise(dateTemple / 1000)
    if (n > .5) {
        ncycle = map(n, 0, 1, 0, 1)
    } else {
        ncycle = map(n, 0, 1, 1, 0)
    }
    let fade = map(timeScaleCycle[1], 0, 1, 0, 3)
    let ccycle = color(map(n, 0, 1, -80, 260), 100, 70, fade)

    // lense fill
    fill(100, fade) // lense fade in and out
    // fill(0, 0, 100, fade)
    // nofill()

    stroke(ccycle)

    let scan
    // extents of horizontal lens scan
    // scan = Math.floor(map(n, 0, 1, -rays*.5, rays*.5)) //line by line
    scan = Math.round(map(n, 0, 1, -rays*.5, rays*.5)) // line by line
    // scan = map(n, 0, 1, -rays*.5, rays*.5) // smooth

    direction = p5.Vector.sub(eminationPoint, clockPoint);
    direction.setMag(length - length * timeScale[1]) // vertical scan of lens
    direction.rotate(spacing * scan); // horizontal scan of lens
    hand = p5.Vector.add(eminationPoint, direction)

    // lens
    strokeWeight(mother.width * .0055 * ncycle);
    ellipse(hand.x, hand.y, log(nf(mother.width * .1 * (1 - ncycle))) * 5 * (.6 - (.6 * timeScale[1])), log(nf(mother.width * .2 * (ncycle))) * 5 * (.6 - .6 * timeScale[1]));
    point(hand.x, hand.y);

    // line from eye of eternity to lens
    stroke(ccycle);
    strokeWeight(mother.width * .001);
    line(cx, cy, hand.x, hand.y);
    stroke(100, 100)

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

    //jackal eyes
    // if (jackals) {
    //     let leftEyeX = cx - mother.width * .575
    //     let rightEyeX = cx + mother.width * .575
    //     let eyesY = cy + mother.height * .0666
    //     let corniaSize = mother.width * .0222
    //     let pupilSize = corniaSize * .5
    //     //cornia
    //     strokeWeight(corniaSize);
    //     point(leftEyeX, eyesY);
    //     point(rightEyeX, eyesY);
    //     //pupils
    //     stroke(0)
    //     strokeWeight(pupilSize);
    //     point(leftEyeX, eyesY);
    //     point(rightEyeX, eyesY);
    // }
    pop()
}


// function aboutTheTemple(s, x, y, r, spacing, ts) {

//     // let center = createVector(center.x,center.y)
//     //convert string to array
//     push()
//     // colorMode(RGB)
//     // font()
//     // rectMode(CENTER)
//     s = s.split("")

//     fill(255)
//     stroke(0)
//     textSize(ts)
//     textAlign(CENTER, CENTER)
//     textStyle(BOLD)
//     noStroke()
//     if (middle.dist(createVector(mouseX, mouseY)) > r-(ts*.75) & middle.dist(createVector(mouseX, mouseY)) < r+(ts*.75)) {
//         stroke(0)
//         // menuHover = true
//         if (mouseIsPressed) {
//             on(1)    
//         }

//         strokeWeight(ts*.0666)

//         textStyle(NORMAL)

//     } else {
//         // menuHover = false
//     }

//     push()
//     noFill()
//     stroke(255)
//     strokeWeight(ts*.1)
//     circle(x,y,r*1.94)
//     pop()

//     for (let i = 0; i < s.length; i++){
//         push()
//         stroke(255)
//         // strokeWeight(ts*.5)

//         translate(x, y)
//         rotate(spacing*-(s.length*.5)+(spacing*.5))
//         rotate(spacing * i)
//         text(s[i], 0,r*-1)
//         pop()
//     }
//     pop()
// }
