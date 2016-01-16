const schedule = require('node-schedule');

//const rule = new schedule.RecurrenceRule();
//rule.dayOfWeek = [0, new schedule.Range(4, 6)];
//rule.hour = 20;
//rule.second = [10, 20, 25, 30, 40, 50];

const obj = {hour: 20, second: [10, 20, 25, 30, 40, 50], dayOfWeek: [0, new schedule.Range(4, 6)] };

schedule.scheduleJob({ hour: 21, minute: 18, checkedDays: 7 }, () => {
    console.log('Today is recognized by Rebecca Black!');
});

//schedule.scheduleJob({second: [5,10,15,20,25,30,35,40,45,50,55], dayOfWeek: [1,2,3,5]}, function(){
//    console.log('Time for tea! 1,2,3,5');
//});
//
//
//schedule.scheduleJob({second: [5,10,15,20,25,30,35,40,45,50,55], dayOfWeek: 5}, function(){
//    console.log('Time for caffe! 5');
//});