import React, { Component } from 'react';

class ScheduledFeeding extends Component {
    render() {
        const divStyles = {
            paddingBottom: '9px',
            margin: '40px 0 20px',
            borderBottom: '1px solid #000'
        };

        return (
            <div className="row">
                <div style={divStyles}>
                    <h1>Zaplanowanie karmienie</h1>
                </div>
                <button type="button" className="btn btn-lg btn-primary">Primary</button>
            </div>
        );
    }
}

export default ScheduledFeeding;