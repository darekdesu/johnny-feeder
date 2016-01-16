import React, { Component } from 'react';
import { ALERT_SUCCESS, ALERT_SCHEDULED_FORM_INVALID } from '../consts/alertTypes.jsx';
import moment from 'moment';
moment.locale('pl');

class Alert extends Component {
    render() {
        const { type } = this.props;
        const alertClassName = 'alert alert-' + type;

        let alertMessage;
        switch (type) {
            case ALERT_SUCCESS:
                alertMessage = '<strong>Sypanie karmy zakończone sukcesem (' + moment().format('ll, HH:mm') + ').</strong> Twój zwierzak będzie szczęśliwy! ^_^';
                break;
            case ALERT_SCHEDULED_FORM_INVALID:
                alertMessage = '<strong>Nie wybrano żadnych dni tygodnia.</strong> Wybierz, któryś i spróbuj ponownie lub anuluj.';
                break;
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className={alertClassName}
                         role="alert"
                         dangerouslySetInnerHTML={{__html: alertMessage}}/>
                </div>
            </div>
        );
    }
}

export default Alert;