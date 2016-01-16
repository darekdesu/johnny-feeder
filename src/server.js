const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const five = require("johnny-five");
const favicon = require('serve-favicon');
const scheduleUtil = require('./utils/scheduleUtil');

// Initialize appication with route / (that means root of the application)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(express.static(path.join(__dirname + '/../public')));
app.use('/static/bootstrap', express.static(path.join(__dirname + '/../node_modules/bootstrap/dist/')));
app.use('/static/react', express.static(path.join(__dirname + '/../node_modules/react/dist/')));
app.use(favicon(path.join(__dirname + '/../public/favicon.ico')));

const SERVO_TIMEOUT_IN_MS = 3000;

/*const board = new five.Board();
board.on("ready", () => {
    const servo = new five.Servo({
        pin: 9
    });
    servo.stop();*/

    // Register events on socket connection
    io.on('connection', (client) => {
        scheduleUtil.getScheduledTimes().then((result) => [
            scheduleUtil.sendScheduledTimes(client, result)
        ]);

        client.on('handleInstantFeedingClick', () => {
            let randomInteger = (max, min) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            //servo.to(randomInteger(180,0));
            //

            setTimeout(() => {
                client.emit('handledInstantFeedingClick', {
                    instantFeedingStatus: true
                });
            }, SERVO_TIMEOUT_IN_MS);
        });

        client.on('handleSaveScheduledFeedingClick', (scheduledTime) => {
            scheduleUtil.addScheduledTime(scheduledTime).then((scheduledTimes) => {
                scheduleUtil.sendScheduledTimes(client, scheduledTimes);
            });
        });

        client.on('handleRemoveScheduledFeedingClick', (removeScheduleId) => {
            scheduleUtil.removeScheduledTime(removeScheduleId).then((scheduledTimes) => {
                scheduleUtil.sendScheduledTimes(client, scheduledTimes);
            });
        });

    });

/*    board.repl.inject({
        servo: servo
    });
});*/
// Listen application request on port 3000
server.listen(3000, () => {
    const address = server.address();
    console.log('listening on *:', address.port);
});