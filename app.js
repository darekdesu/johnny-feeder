var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var schedule = require('node-schedule');
const five = require("johnny-five");

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/static/react', express.static(__dirname + '/node_modules/react/dist/'));

const SERVO_TIMEOUT_IN_MS = 3000;
const board = new five.Board();
board.on("ready", () => {
    const servo = new five.Servo({
        pin: 9
    });
    servo.stop();

    var job = schedule.scheduleJob('15 * * * * *', function(){
        console.log('The answer to life, the universe, and everything!');
    });

    // Register events on socket connection
    io.on('connection', function(client){
        client.on('handleInstantFeedingClick', () => {
            let randomInteger = (max, min) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            servo.to(randomInteger(180,0));


            setTimeout(() => {
                client.emit('handledInstantFeedingClick', {
                    instantFeedingStatus: true
                });
            }, SERVO_TIMEOUT_IN_MS);
        });

        client.on('join', function(data){
            console.log(data);
        });

        client.on('click', function(data){

            console.log(data);


                //const servo = five.Servo({
                //    pin: 9
                //});
                //
                //servo.to(data);


            //client.emit('clicked', data + ' has been clicked!');
            //client.broadcast.emit('clicked', data + ' has been clicked!');
        });

    });

    board.repl.inject({
        servo: servo
    });
});
// Listen application request on port 3000
server.listen(3000, () => {
    const address = server.address();
    console.log('listening on *:', address.port);
});