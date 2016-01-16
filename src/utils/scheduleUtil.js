const shortid = require('shortid');
const schedule = require('node-schedule');
const q = require('q');
const boardUtil = require('./boardUtil');

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

const removeScheduledTimePromise = (removeScheduleId) => {
    const deferred = q.defer();

    scheduledTimes = scheduledTimes.filter((item) => (item.id !== removeScheduleId.toString()));
    schedule.scheduledJobs[removeScheduleId].cancel();

    deferred.resolve();
    return deferred.promise;
};

const removeScheduledTime = (removeScheduleId) => {
    const deferred = q.defer();

    removeScheduledTimePromise(removeScheduleId)
        .catch(() => {
            console.error('removeScheduledTime outer', ex.message);
            deferred.reject();
        })
        .then(() => (deferred.resolve(scheduledTimes)));

    return deferred.promise;
};

const pushToScheduledTimes = (scheduledTimes, scheduledTime) => {
    const deferred = q.defer();
    scheduledTimes.push(decorateScheduledTime(scheduledTime));
    deferred.resolve();
    return deferred.promise;
};

const createCronTabForEachScheduledTime = (scheduledTime) => {
    const deferred = q.defer();
    const scheduledTimeCronTab = {
        hour: scheduledTime.hour,
        minute: scheduledTime.minute,
        dayOfWeek: scheduledTime.checkedDays
    };

    deferred.resolve(scheduledTimeCronTab);
    return deferred.promise;
};

const addScheduledJobForEachScheduledTime = (scheduledTime, scheduledTimeCronTab) => {
    const deferred = q.defer();

    schedule.scheduleJob(scheduledTime.id, scheduledTimeCronTab, () => {
        boardUtil.rotateServo();
        console.log('Rotating servo ', Date.now());
    });

    deferred.resolve();
    return deferred.promise;
};

const addScheduledTime = (scheduledTime) => {
    const deferred = q.defer();

    pushToScheduledTimes(scheduledTimes, scheduledTime)
        .then(() => (createCronTabForEachScheduledTime(scheduledTime)))
        .then((scheduledTimeCronTab) => (addScheduledJobForEachScheduledTime(scheduledTime, scheduledTimeCronTab)))
        .catch((ex) => {
            console.error('addScheduledTime outer', ex.message);
            deferred.reject();
        })
        .then(() => (deferred.resolve(scheduledTimes)));

    return deferred.promise;
};

module.exports = {
    getScheduledTimes,
    decorateScheduledTime,
    removeScheduledTime,
    addScheduledTime
};