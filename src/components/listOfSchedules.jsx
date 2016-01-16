import React, { Component, PropTypes } from 'react';
import Alert from './alert.jsx';
import { addLeadingZeroToTime, removeLeadingZeroInTime, convertTimestamp } from '../utils/timeUtil';
import { ALERT_SCHEDULED_FORM_INVALID } from '../consts/alertTypes.jsx';


class ListOfSchedules extends Component {
    static propTypes = {
        scheduledTimes: PropTypes.array.isRequired,
        onRemoveScheduledFeedingClick: PropTypes.func.isRequired
    };

    handleRemoveScheduledFeedingClick = (removeScheduleId) => {
        this.props.onRemoveScheduledFeedingClick(removeScheduleId);
    };

    render() {
        const { scheduledTimes } = this.props;
        const daysOfWeekLongWithCronIndex = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

        return (
            <div className="row" style={{marginTop: '50px'}}>
                <div className="col-xs-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Godzina</th>
                            <th>Dni tygodnia</th>
                            <th>Czas dodania</th>
                            <th>Akcja</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            scheduledTimes.map((item, key) => (
                                <tr key={key}>
                                    <td>{addLeadingZeroToTime(item.hour)}:{addLeadingZeroToTime(item.minute)}</td>
                                    <td>{item.checkedDays.map((dayIndex) => (daysOfWeekLongWithCronIndex[dayIndex])).join(", ")}</td>
                                    <td>{convertTimestamp(item.addedDate)}</td>
                                    <td>
                                        <button
                                            onClick={() => {this.handleRemoveScheduledFeedingClick(item.id)}}
                                            type="button"
                                            className='btn btn-danger'>
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListOfSchedules;