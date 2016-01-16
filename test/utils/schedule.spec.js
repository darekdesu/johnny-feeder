import chai from 'chai';
const should = chai.should();
import {
    decorateScheduledTime,
    addLeadingZeroToTime,
    removeLeadingZeroInTime,
    convertTimestamp
} from '../../src/utils/schedule.js';


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

describe('Leading Zero', () => {
    it('should add leading zero to string number lower than 10  and output string', () => {
        const numbers = ['0','9'];

        const expectedNumbers = ['00', '09'];

        numbers.forEach((number, i) => {
            addLeadingZeroToTime(number).should.eql(expectedNumbers[i])
        });
    });

    it('should remove leading zero from string number lower than 10 and output string', () => {
        const numbers = ['00', '09'];

        const expectedNumbers = ['0', '9'];

        numbers.forEach((number, i) => {
            removeLeadingZeroInTime(number).should.eql(expectedNumbers[i])
        });
    });
});

describe('Timestamp', () => {
    it('should convert timestamp to human readable date and time', () => {
        const timestamp = 946728000000;

        const expectedDateTime = '1 sty 2000, 13:00';

        convertTimestamp(timestamp).should.eql(expectedDateTime)
    });
});