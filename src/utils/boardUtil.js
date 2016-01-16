const five = require("johnny-five");
const q = require('q');

const board = new five.Board();
const SERVO_HALF_ROTATE_TIME_IN_MS = 1500;
const SERVO_FULL_ROTATE_TIME_IN_MS = 3000;

const rotateServo = () => {
    const deferred = q.defer();

    try {
        const servoContinuous = new five.Servo({
            pin: 10,
            type: "continuous"
        });

        servoContinuous.stop();
        servoContinuous.ccw(1);

        setTimeout(() => {
            servoContinuous.stop();
            servoContinuous.cw(1);
        },SERVO_HALF_ROTATE_TIME_IN_MS);

        setTimeout(() => {
            servoContinuous.stop();
        },SERVO_FULL_ROTATE_TIME_IN_MS);
    } catch (ex) {
        console.error('rotateServo outer', ex.message);
        deferred.reject();
    }

    return deferred.promise;
};

const onBoardReady = () => {
    const deferred = q.defer();

    try {
        board.on("ready", () => {
            deferred.resolve(board);
        });
    } catch(ex) {
        console.error('onArduinoBoardReady outer', ex.message);
        deferred.reject();
    }

    return deferred.promise;
};

module.exports = { rotateServo, onBoardReady, SERVO_FULL_ROTATE_TIME_IN_MS };