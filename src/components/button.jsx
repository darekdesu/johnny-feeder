import React, { Component, PropTypes } from 'react';

class Button extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        classNames: PropTypes.string.isRequired,
        onClickAction: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool
    };

    static defaultProps = {
        isDisabled: false
    };

    render() {
        return (
            <button
                onClick={this.props.onClickAction}
                type="button"
                className={'btn btn-lg ' + this.props.classNames}
                disabled={this.props.isDisabled}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;