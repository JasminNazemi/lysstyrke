input.onButtonPressed(Button.A, function () {
    styrke += -1
    if (styrke < 0) {
        styrke = 0
    }
    basic.showNumber(styrke)
    pins.analogWritePin(AnalogPin.P0, Lyset)
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(input.lightLevel())
})
input.onButtonPressed(Button.B, function () {
    styrke += 1
    if (styrke > 9) {
        styrke = 9
    }
    basic.showNumber(styrke)
    pins.analogWritePin(AnalogPin.P0, Lyset)
})
let Lysnivea = 0
let temp = 0
let Lyset = 0
let styrke = 0
datalogger.setColumnTitles("Temp")
datalogger.setColumnTitles("Lys")
let lysmin = 100
let lysmax = 1023
let Skift = Math.idiv(lysmax - lysmin, 9)
styrke = 0
basic.forever(function () {
    temp = input.temperature()
    basic.showNumber(input.temperature())
    datalogger.log(datalogger.createCV("Temp", input.temperature()))
    datalogger.includeTimestamp(FlashLogTimeStampFormat.Hours)
    pins.analogWritePin(AnalogPin.P0, Lysnivea)
    pins.analogSetPeriod(AnalogPin.P0, 1000)
    datalogger.log(datalogger.createCV("Lys", input.lightLevel()))
    datalogger.includeTimestamp(FlashLogTimeStampFormat.Hours)
    if (styrke == 0) {
        Lyset = 0
    } else {
        Lyset = lysmin + styrke * Skift
    }
    Lysnivea = 500
})
