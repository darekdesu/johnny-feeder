const sendScheduledTimes = (client, scheduledTimes) => {
    client.emit('sendScheduledTimes', scheduledTimes);
    client.broadcast.emit('sendScheduledTimes', scheduledTimes);
};

module.exports = { sendScheduledTimes };