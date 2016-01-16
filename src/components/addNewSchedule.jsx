import React, { Component, PropTypes } from 'react';
import Alert from './alert.jsx';
import { addLeadingZeroToTime, removeLeadingZeroInTime} from '../utils/schedule';
import { ALERT_SCHEDULED_FORM_INVALID } from '../consts/alertTypes.jsx';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

class AddNewSchedule extends Component {
    static propTypes = {
        scheduledFeeding: PropTypes.object.isRequired,
        onAddScheduledFeedingClick: PropTypes.func.isRequired,
        onSaveScheduledFeedingClick: PropTypes.func.isRequired,
        onCancelScheduledFeedingClick: PropTypes.func.isRequired
    };

    handleSaveScheduledFeedingClick = () => {
        const checkedDays = this.checkboxList
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        this.props.onSaveScheduledFeedingClick({
            hour: removeLeadingZeroInTime(this.refs.hour.value),
            minute: removeLeadingZeroInTime(this.refs.minute.value),
            checkedDays: checkedDays
        });
    };

    render() {
        const { onAddScheduledFeedingClick, onCancelScheduledFeedingClick } = this.props;
        const { isAddButtonActive, showInvalidScheduledFormAlert } = this.props.scheduledFeeding;
        const isEditMode = !isAddButtonActive;
        const daysOfWeekLong = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        this.checkboxList = [];

        return (
            <div className="row">
                <div className="col-xs-12">
                    { showInvalidScheduledFormAlert && <Alert type={ALERT_SCHEDULED_FORM_INVALID}/>}

                    <div className="row">
                        <div className="col-xs-12" style={{textAlign: 'center'}}>
                            { isAddButtonActive &&
                            <button
                                onClick={onAddScheduledFeedingClick}
                                type="button"
                                className="btn btn-lg btn-primary">
                                Dodaj nowy zaplanowany termin
                            </button>
                            }
                        </div>
                    </div>

                    {isEditMode &&
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-xs-12 form-group">
                                    <label htmlFor="hour">Godzina:</label>
                                    <select ref="hour" className="form-control" id="hour">
                                        {[...Array(HOURS_IN_DAY)].map((element, i) =>
                                            <option key={i + 1}>{addLeadingZeroToTime(i)}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-xs-12 form-group">
                                    <label htmlFor="minut">Minuta:</label>
                                    <select ref="minute" className="form-control" id="minut">
                                        {[...Array(MINUTES_IN_HOUR)].map((element, i) =>
                                            <option key={i + 1}>{addLeadingZeroToTime(i)}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <span><strong>Dni tygodnia:</strong></span>
                            <div className="checkbox">
                                {daysOfWeekLong.map((day, index) =>
                                    <div className="checkbox" key={index}>
                                        <label htmlFor={`${day}_${index}`}>
                                            <input type="checkbox"
                                                   value={index}
                                                   id={`${day}_${index}`}
                                                   ref={ref => !!ref && this.checkboxList.push(ref)}/>
                                            {day}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-4" style={{textAlign: 'center'}}>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button
                                    onClick={this.handleSaveScheduledFeedingClick}
                                    type="button"
                                    className="btn btn-lg btn-success">
                                    Zapisz
                                </button>

                                <button
                                    onClick={onCancelScheduledFeedingClick}
                                    type="button"
                                    className="btn btn-lg btn-danger">
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default AddNewSchedule;