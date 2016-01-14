import React, { Component, PropTypes } from 'react';
import Alert from './alert.jsx';
import { ALERT_SUCCESS } from '../consts/alertTypes.jsx';

class InstantFeeding extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onInstantFeedingClick: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onInstantFeedingClick();
    }

    render() {
        const { isButtonActive, showAlert } = this.props.data;
        const divStyles = {
            paddingBottom: '9px',
            margin: '40px 0 20px',
            borderBottom: '1px solid #000'
        };

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div style={divStyles}>
                        <h1>Karmienie na żądanie!</h1>
                    </div>
                    { showAlert && <Alert type={ALERT_SUCCESS}/>}

                    <div className="row">
                        <div className="col-xs-12" style={{textAlign: 'center'}}>
                            <button
                                onClick={this.handleClick}
                                type="button"
                                className="btn btn-lg btn-primary"
                                disabled={!isButtonActive}>
                                Nakarm teraz!
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default InstantFeeding;