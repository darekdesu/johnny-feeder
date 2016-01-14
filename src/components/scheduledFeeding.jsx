import React, { Component, PropTypes } from 'react';
import AddNewSchedule from './addNewSchedule.jsx';

class ScheduledFeeding extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onAddScheduledFeedingClick: PropTypes.func.isRequired,
        onSaveScheduledFeedingClick: PropTypes.func.isRequired,
        onCancelScheduledFeedingClick: PropTypes.func.isRequired
    };

    render() {
        const divStyles = {
            paddingBottom: '9px',
            margin: '40px 0 20px',
            borderBottom: '1px solid #000'
        };

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div style={divStyles}>
                        <h1>Zaplanowanie karmienie</h1>
                    </div>

                    <AddNewSchedule
                        data={this.props.data}
                        onAddScheduledFeedingClick={this.props.onAddScheduledFeedingClick}
                        onSaveScheduledFeedingClick={this.props.onSaveScheduledFeedingClick}
                        onCancelScheduledFeedingClick={this.props.onCancelScheduledFeedingClick}
                    />

                    {/* TODO: List of schedules */}
                </div>
            </div>
        );
    }
}

export default ScheduledFeeding;