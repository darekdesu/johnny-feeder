const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const favicon = require('serve-favicon');

const scheduleUtil = require('./utils/scheduleUtil');
const boardUtil = require('./utils/boardUtil');
const socketioUtil = require('./utils/socketioUtil');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(express.static(path.join(__dirname + '/../public')));
app.use('/static/bootstrap', express.static(path.join(__dirname + '/../node_modules/bootstrap/dist/')));
app.use('/static/react', express.static(path.join(__dirname + '/../node_modules/react/dist/')));
app.use(favicon(path.join(__dirname + '/../public/favicon.ico')));


boardUtil.onBoardReady().then(() => {
    io.on('connection', (client) => {
        scheduleUtil.getScheduledTimes().then((scheduledTimes) => {
            socketioUtil.sendScheduledTimes(client, scheduledTimes);
        });

        client.on('handleInstantFeedingClick', () => {
            boardUtil.rotateServo();

            setTimeout(() => {
                client.emit('handledInstantFeedingClick', {
                    instantFeedingStatus: true
                });
            }, boardUtil.SERVO_FULL_ROTATE_TIME_IN_MS);
        });

        client.on('handleSaveScheduledFeedingClick', (scheduledTime) => {
            scheduleUtil.addScheduledTime(scheduledTime).then((scheduledTimes) => {
                socketioUtil.sendScheduledTimes(client, scheduledTimes);
            });
        });

        client.on('handleRemoveScheduledFeedingClick', (removeScheduleId) => {
            scheduleUtil.removeScheduledTime(removeScheduleId).then((scheduledTimes) => {
                socketioUtil.sendScheduledTimes(client, scheduledTimes);
            });
        });
    });
});

// Listen application request on port 3000
server.listen(3000, () => {
    const address = server.address();
    console.log('listening on *:' + address.port);
});