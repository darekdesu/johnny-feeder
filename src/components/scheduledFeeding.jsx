import React, { Component, PropTypes } from 'react';
import Alert from './alert.jsx';
import { ALERT_SCHEDULED_FORM_INVALID } from '../consts/alertTypes.jsx';

class ScheduledFeeding extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onAddScheduledFeedingClick: PropTypes.func.isRequired,
        onSaveScheduledFeedingClick: PropTypes.func.isRequired,
        onCancelScheduledFeedingClick: PropTypes.func.isRequired
    };

    constructor() {
        super();
    }

    handleSaveScheduledFeedingClick = () => {
        const checkedDays = this.checkboxList
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        this.props.onSaveScheduledFeedingClick({
            hour: this.refs.hour.value,
            minute: this.refs.minute.value,
            checkedDays: checkedDays
        });
    };

    render() {
        const { onAddScheduledFeedingClick, onCancelScheduledFeedingClick } = this.props;
        const { isAddButtonActive, showInvalidScheduledFormAlert } = this.props.data;
        const isEditMode = !isAddButtonActive;
        const daysOfWeekShort = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
        const divStyles = {
            paddingBottom: '9px',
            margin: '40px 0 20px',
            borderBottom: '1px solid #000'
        };
        this.checkboxList = [];

        return (
            <div className="row">
                <div style={divStyles}>
                    <h1>Zaplanowanie karmienie</h1>
                </div>
                <button
                    onClick={onAddScheduledFeedingClick}
                    disabled={!isAddButtonActive}
                    type="button"
                    className="btn btn-lg btn-primary">
                    Dodaj nowy
                </button>

                {isEditMode &&
                <div>
                    { showInvalidScheduledFormAlert && <Alert type={ALERT_SCHEDULED_FORM_INVALID}/>}

                    <select ref="hour" className="form-control">
                        {[...Array(24)].map((element, i) =>
                            <option key={i + 1}>{i}</option>
                        )}
                    </select>

                    <select ref="minute" className="form-control">
                        {[...Array(60)].map((element, i) =>
                                <option key={i + 1}>{i}</option>
                        )}
                    </select>

                    {daysOfWeekShort.map((day, index) =>
                        <label key={index} htmlFor={`${day}_${index}`}>
                            <input type="checkbox"
                                   value={index}
                                   id={`${day}_${index}`}
                                   ref={ref => !!ref && this.checkboxList.push(ref)}/>

                            {day}
                        </label>
                    )}

                    <button
                        onClick={this.handleSaveScheduledFeedingClick}
                        type="button"
                        className="btn btn-lg btn-primary">
                        Zapisz
                    </button>

                    <button
                        onClick={onCancelScheduledFeedingClick}
                        type="button"
                        className="btn btn-lg btn-primary">
                        Anuluj
                    </button>
                </div>
                }
            </div>
        );
    }
}

export default ScheduledFeeding;