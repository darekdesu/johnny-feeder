import chai from 'chai';
const should = chai.should();
import {
    addLeadingZeroToTime,
    removeLeadingZeroInTime,
    convertTimestamp
} from '../../src/utils/timeUtil.js';



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

        const expectedDateTime = '1 sty 2000, 12:00';

        convertTimestamp(timestamp).should.eql(expectedDateTime)
    });
});