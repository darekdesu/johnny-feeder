const shortid = require('shortid');
const schedule = require('node-schedule');
const q = require('q');

let scheduledTimes = [];

const getScheduledTimes = () => {
    const deferred = q.defer();
    deferred.resolve(scheduledTimes);
    return deferred.promise;
};

const decorateScheduledTime = (scheduledTime) => {
    scheduledTime.hour = Number(scheduledTime.hour);
    scheduledTime.minute = Number(scheduledTime.minute);
    scheduledTime.checkedDays = scheduledTime.checkedDays.map(day => Number(day));

    scheduledTime.id = shortid.generate();
    scheduledTime.addedDate = Date.now();

    return scheduledTime;
};

const removeScheduledTime = (removeScheduleId) => {
    const deferred = q.defer();

    try {
        removeScheduledTimePromise(removeScheduleId).then(() => {
            deferred.resolve(scheduledTimes);
        });
    } catch (ex) {
        console.error('removeScheduledTime outer', ex.message);

        deferred.reject();
    }

    return deferred.promise;
};

const removeScheduledTimePromise = (removeScheduleId) => {
    const deferred = q.defer();

    scheduledTimes = scheduledTimes.filter((item) => (item.id !== removeScheduleId.toString()));
    schedule.scheduledJobs[removeScheduleId].cancel();

    deferred.resolve();
    return deferred.promise;
};

const addScheduledTime = (scheduledTime) => {
    const deferred = q.defer();

    try {
        scheduledTimes.push(decorateScheduledTime(scheduledTime));

        scheduledTimes.forEach((scheduledTime) => {
            const scheduledTimeCronTab = {
                hour: scheduledTime.hour,
                minute: scheduledTime.minute,
                checkedDays: scheduledTime.checkedDays
            };

            schedule.scheduleJob(scheduledTime.id, scheduledTimeCronTab, () => {
                // TODO: Add magic to run servo on cheduled time here
                console.log('Run servo!! ', Date.now());
            });
        });

        deferred.resolve(scheduledTimes);
    } catch (ex) {
        console.error('addScheduledTime outer', ex.message);

        deferred.reject();
    }

    return deferred.promise;
};

const sendScheduledTimes = (client, scheduledTimes) => {
    client.emit('sendScheduledTimes', scheduledTimes);
    client.broadcast.emit('sendScheduledTimes', scheduledTimes);
};

module.exports = {
    getScheduledTimes,
    decorateScheduledTime,
    removeScheduledTime,
    addScheduledTime,
    sendScheduledTimes
};