import React, { Component, PropTypes } from 'react';
import Alert from './alert.jsx';
import Button from './button.jsx';
import { addLeadingZeroToTime, removeLeadingZeroInTime, convertTimestamp } from '../utils/schedule';
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
        const { scheduledTimes, onRemoveScheduledFeedingClick } = this.props;
        const daysOfWeekShort = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
        const daysOfWeekLong = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

        const deleteButton = (removeScheduleId) => {
            return(
                <button
                    onClick={onRemoveScheduledFeedingClick(removeScheduleId)}
                    type="button"
                    className='btn btn-danger'>
                    Usuń
                </button>
            )
        };

        const rows = (list) => list.map((item, key) => (
            <tr key={key}>
                <td>{addLeadingZeroToTime(item.hour)}:{addLeadingZeroToTime(item.minute)}</td>
                <td>{item.id}</td>
                <td>{convertTimestamp(item.addedDate)}</td>
                <td>
                    {deleteButton(item.id)}
                </td>
            </tr>
        ));

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
                            {rows(scheduledTimes)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListOfSchedules;