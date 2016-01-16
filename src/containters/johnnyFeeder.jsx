import React, { Component, PropTypes } from 'react';
import Navigation from '../components/navigation.jsx';
import InstantFeeding from '../components/instantFeeding.jsx';
import ScheduledFeeding from '../components/scheduledFeeding.jsx';
import { ALERT_DANGER, ALERT_INFO, ALERT_SUCCESS, ALERT_WARNING } from '../consts/alertTypes.jsx';

const socket = io();
const styles = {
    body: {
        background: 'url(images/linedpaper.png)',
        paddingTop: '50px'
    }
};

class JohhnyFeeder extends Component {
    state = {
        instantFeeding: {
            isButtonActive: true,
            showAlert: false
        },
        scheduledFeeding: {
            isAddButtonActive: true,
            isEditMode: true
        },
        scheduledTimes: []
    };

    componentWillMount() {
        let i;
        for(i in styles.body){
            document.body.style[i] = styles.body[i];
        }
    }

    componentWillUnmount() {
        let i;
        for(i in styles.body){
            document.body.style[i] = null;
        }
    }

    componentDidMount() {
        socket.on('handledInstantFeedingClick', this._updateInstantFeedingSection);
        socket.on('sendScheduledTimes', this._updateScheduledTimes);
    }

    _updateScheduledTimes = (scheduledTimes) => {
        this.setState({
            scheduledTimes: scheduledTimes
        });
    };

    _updateInstantFeedingSection = (result) => {
        if (!result.instantFeedingStatus) {
            this.setState({
                instantFeeding: {
                    isButtonActive: true,
                    showAlert: true,
                    alertStatus: ALERT_DANGER,
                    alertMessage: 'Nie udało się ;<'
                }
            });
            return;
        }

        this.setState({
            instantFeeding: {
                isButtonActive: true,
                showAlert: true,
                alertStatus: ALERT_SUCCESS,
                alertMessage: 'Udało się!'
            }
        });
    };

    // Instant Feeding Actions
    handleInstantFeedingClick = () => {
        const instantFeeding = this.state.instantFeeding;

        socket.emit('handleInstantFeedingClick');
        this.setState({
            instantFeeding: {
                ...instantFeeding,
                isButtonActive: false,
                showAlert: false
            }
        });
    };

    // Scheduled Feeding Actions
    handleAddScheduledFeedingClick = () => {
        const scheduledFeeding = this.state.scheduledFeeding;

        this.setState({
            scheduledFeeding: {
                ...scheduledFeeding,
                isAddButtonActive: false
            }
        });
    };

    handleSaveScheduledFeedingClick = (scheduledForm) => {
        const scheduledFeeding = this.state.scheduledFeeding;

        if (scheduledForm.checkedDays.length === 0) {
            this.setState({
                scheduledFeeding: {
                    ...scheduledFeeding,
                    showInvalidScheduledFormAlert: true
                }
            });
            return;
        }

        this.setState({
            scheduledFeeding: {
                ...scheduledFeeding,
                isAddButtonActive: true,
                showInvalidScheduledFormAlert: false
            }
        });
        socket.emit('handleSaveScheduledFeedingClick', scheduledForm);
    };

    handleCancelScheduledFeedingClick = () => {
        const scheduledFeeding = this.state.scheduledFeeding;

        this.setState({
            scheduledFeeding: {
                ...scheduledFeeding,
                isAddButtonActive: true,
                showInvalidScheduledFormAlert: false
            }
        });
    };

    handleRemoveScheduledFeedingClick = (removeScheduleId) => {
        socket.emit('handleRemoveScheduledFeedingClick', removeScheduleId);
    };

    render() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <InstantFeeding
                        data={this.state.instantFeeding}
                        onInstantFeedingClick={this.handleInstantFeedingClick}
                    />
                    <ScheduledFeeding
                        scheduledFeeding={this.state.scheduledFeeding}
                        scheduledTimes={this.state.scheduledTimes}
                        onAddScheduledFeedingClick={this.handleAddScheduledFeedingClick}
                        onSaveScheduledFeedingClick={this.handleSaveScheduledFeedingClick}
                        onCancelScheduledFeedingClick={this.handleCancelScheduledFeedingClick}
                        onRemoveScheduledFeedingClick={this.handleRemoveScheduledFeedingClick}/>
                </div>
            </div>
        );
    }
}

export default JohhnyFeeder;