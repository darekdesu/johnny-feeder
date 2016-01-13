import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">Johnny Feeder</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a>System wspomagający karmienie Twojego zwierzaka</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;