import chai from 'chai';
const should = chai.should();
import {
    decorateScheduledTime,
} from '../../src/utils/scheduleUtil.js';


describe('Test decorate scheduled time', () => {
    it('should change strings hour, minute and checked days to numbers', ()  => {
        const scheduledTime = {
            hour: '11',
            minute: '13',
            checkedDays: ['1', '2', '3']
        };

        const expectedResult = {
            hour: 11,
            minute: 13,
            checkedDays: [1, 2, 3]
        };

        const result = decorateScheduledTime(scheduledTime);

        result.hour.should.be.eql(expectedResult.hour);
        result.minute.should.be.eql(expectedResult.minute);
        result.checkedDays.should.be.eql(expectedResult.checkedDays);
   });

    it('should attach id and added date property to scheduled time object', ()  => {
        const scheduledTime = {
            hour: '11',
            minute: '13',
            checkedDays: ['1', '2', '3']
        };

        const result = decorateScheduledTime(scheduledTime);

        result.should.have.property('id');
        result.id.should.not.be.empty;
        result.should.have.property('addedDate');
        result.addedDate.should.not.be.empty;
    });
});