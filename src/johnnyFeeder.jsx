import React, { Component, PropTypes } from 'react';
import Navigation from './components/navigation.jsx';
import InstantFeeding from './components/instantFeeding.jsx';
import ScheduledFeeding from './components/scheduledFeeding.jsx';
import { ALERT_DANGER, ALERT_INFO, ALERT_SUCCESS, ALERT_WARNING} from './consts/alert.jsx';

const socket = io();
const styles = {
    body: {
        background: 'url(images/wood-background.jpg)',
        paddingTop: '50px'
    }
};

class JohhnyFeeder extends Component {
    constructor() {
        super();
        this.handleInstantFeedingClick = this.handleInstantFeedingClick.bind(this);
        this._handledInstantFeedingClick = this._handledInstantFeedingClick.bind(this);

        this.state = {
            instantFeeding: {
                isButtonActive: true,
                showAlert: false
            }
        };
    }

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
    }

    _handledInstantFeedingClick(result) {
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
    }

    handleInstantFeedingClick() {
        const instantFeeding = this.state.instantFeeding;

        socket.emit('handleInstantFeedingClick');
        this.setState({
            instantFeeding: {
                ...instantFeeding,
                isButtonActive: false,
                showAlert: false
            }
        });

    }

    handleInstantFeedingAlert() {
        return false;

    }

    render() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <InstantFeeding
                        data={this.state.instantFeeding}
                        onInstantFeedingClick={this.handleInstantFeedingClick}/>
                    <ScheduledFeeding/>
                </div>
            </div>
        );
    }
}

export default JohhnyFeeder;