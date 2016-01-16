const shortid = require('shortid');
const moment = require('moment');
moment.locale('pl');


const decorateScheduledTime = (scheduledTime) => {
    scheduledTime.hour = Number(scheduledTime.hour);
    scheduledTime.minute = Number(scheduledTime.minute);
    scheduledTime.checkedDays = scheduledTime.checkedDays.map(day => Number(day));

    scheduledTime.id = shortid.generate();
    scheduledTime.addedDate = Date.now();

    return scheduledTime;
};

const addLeadingZeroToTime = (time) => {
    return ('0' + time).slice(-2);
};

const removeLeadingZeroInTime = (time) => {
    return parseInt(time, 10).toString();
};

const convertTimestamp = (timestamp) => {
    return moment(timestamp).format('ll, HH:mm');
};

module.exports = {
    decorateScheduledTime,
    addLeadingZeroToTime,
    removeLeadingZeroInTime,
    convertTimestamp
};