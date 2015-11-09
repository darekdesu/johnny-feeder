var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var button = new five.Button(2);
    var led = new five.Led(13);
    var state = true;

    button.on("press", function() {
        if (state) {
            led.on();
        } else {
            led.off();
        }

        state =! state;
    });
});