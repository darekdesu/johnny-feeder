import React, { Component, PropTypes } from 'react';
import Header from './header.jsx';
import AddNewSchedule from './addNewSchedule.jsx';
import ListOfSchedules from './listOfSchedules.jsx';

class ScheduledFeeding extends Component {
    static propTypes = {
        scheduledFeeding: PropTypes.object.isRequired,
        scheduledTimes: PropTypes.array.isRequired,
        onAddScheduledFeedingClick: PropTypes.func.isRequired,
        onSaveScheduledFeedingClick: PropTypes.func.isRequired,
        onCancelScheduledFeedingClick: PropTypes.func.isRequired,
        onRemoveScheduledFeedingClick: PropTypes.func.isRequired
    };

    render() {

        return (
            <div className="row">
                <div className="col-xs-12">
                    <Header title="Zaplanowanie karmienie"/>

                    <AddNewSchedule
                        scheduledFeeding={this.props.scheduledFeeding}
                        onAddScheduledFeedingClick={this.props.onAddScheduledFeedingClick}
                        onSaveScheduledFeedingClick={this.props.onSaveScheduledFeedingClick}
                        onCancelScheduledFeedingClick={this.props.onCancelScheduledFeedingClick}/>

                    { /* TODO: Unlock this later - Boolean(this.props.scheduledTimes.length) &&*/
                    <ListOfSchedules
                        scheduledTimes={this.props.scheduledTimes}
                        onRemoveScheduledFeedingClick={this.props.onRemoveScheduledFeedingClick}/>
                    }
                </div>
            </div>
        );
    }
}

export default ScheduledFeeding;