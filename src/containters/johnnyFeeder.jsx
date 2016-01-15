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
        }
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
        socket.on('handledInstantFeedingClick', this._handledInstantFeedingClick);
        socket.on('handledSavedScheduledFeedingClick', this._saveSheduledTimes);
        socket.on('sendScheduledTimesInit', this._saveSheduledTimes);
    }

    // Instant Feeding Actions
    _handledInstantFeedingClick = (result) => {
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
    _saveSheduledTimes = (scheduledTimes) => {
        this.setState({
            scheduledTimes: scheduledTimes
        });
    };


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

        socket.emit('handleSaveScheduledFeedingClick', scheduledForm);
        this.setState({
            scheduledFeeding: {
                ...scheduledFeeding,
                isAddButtonActive: true,
                showInvalidScheduledFormAlert: false
            }
        });
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

    render() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <InstantFeeding
                        data={this.state.instantFeeding}
                        onInstantFeedingClick={this.handleInstantFeedingClick}/>
                    <ScheduledFeeding
                        data={this.state.scheduledFeeding}
                        onAddScheduledFeedingClick={this.handleAddScheduledFeedingClick}
                        onSaveScheduledFeedingClick={this.handleSaveScheduledFeedingClick}
                        onCancelScheduledFeedingClick={this.handleCancelScheduledFeedingClick}/>
                </div>
            </div>
        );
    }
}

export default JohhnyFeeder;