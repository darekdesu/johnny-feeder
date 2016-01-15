const shortid = require('shortid');

const decorateScheduledTime = (scheduledTime) => {
    scheduledTime.hour = Number(scheduledTime.hour);
    scheduledTime.minute = Number(scheduledTime.minute);
    scheduledTime.checkedDays = scheduledTime.checkedDays.map(day => Number(day));

    scheduledTime.id = shortid.generate();
    scheduledTime.addedDate = Date.now();

    return scheduledTime;
};

module.exports = { decorateScheduledTime };