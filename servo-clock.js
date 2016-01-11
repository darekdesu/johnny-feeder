const five = require("johnny-five");
const board = new five.Board();

board.on("ready", () => {
    const servo = five.Servo({
        pin: 9,
        center: true
    });

    const FIRST_SECOND = 1;
    const ONE_SECOND = 1;
    let second = 0;
    let angle = 0;
    let clockDirection = true;

    setInterval(() => {
        second = new Date().getSeconds() + ONE_SECOND;
        angle = second * 3;

        if (second === FIRST_SECOND) {
            clockDirection = !clockDirection;
        }

        if (!clockDirection) {
            angle = 180 - second * 3;
        }

        servo.to(angle);

        console.log('second: ', second, 'angle: ', angle, 'clockDirection: ', clockDirection);
    }, 1000);
});

board.on("message", (event) => {
    console.log("Received a %s message, from %s, reporting: %s", event.type, event.class, event.message);
});