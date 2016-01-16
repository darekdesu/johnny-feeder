import React, { Component, PropTypes } from 'react';

class Header extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        const headerStyles = {
            paddingBottom: '9px',
            margin: '40px 0 20px',
            borderBottom: '1px solid #000'
        };

        return (
            <div style={headerStyles}>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default Header;