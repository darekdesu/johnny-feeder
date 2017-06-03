const moment = require('moment');
moment.locale('pl');

const addLeadingZeroToTime = (time) => {
    return ('0' + time).slice(-2);
};

const removeLeadingZeroInTime = (time) => {
    return parseInt(time, 10).toString();
};

const convertTimestamp = (timestamp) => {
    return moment(timestamp).utc().format('ll, HH:mm');
};

module.exports = {
    addLeadingZeroToTime,
    removeLeadingZeroInTime,
    convertTimestamp
};