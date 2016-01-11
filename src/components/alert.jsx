import React, { Component } from 'react';
import { ALERT_SUCCESS, ALERT_INFO } from '../consts/alert';

class Alert extends Component {
    render() {
        const { alertType } = this.props;
        const alertClassName = 'alert ' + alertType;

        let alertMessage;
        switch (alertType) {
            case ALERT_SUCCESS:
                alertMessage = '<strong>Sypanie karmy zakończone sukcesem.</strong> Twój zwierzak będzie szczęśliwy! ^_^';
                break;
            case ALERT_INFO:
                alertMessage = 'DUPAA';
                break;
        }

        return (
            <div className={alertClassName} role="alert">
                <strong>Sypanie karmy zakończone sukcesem.</strong> Twój zwierzak będzie szczęśliwy! ^_^
            </div>
        );
    }
}

export default Alert;