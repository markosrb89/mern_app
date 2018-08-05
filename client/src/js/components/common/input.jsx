import React, { Component } from "react";

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [], value: "" };
        
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { value } = event.target;
        this.setState({ value });
    }

    onBlur() {
        const { updateValue, validator, id } = this.props;
        const { value } = this.state;
        const errors = validator(id, value);

        if (value) {
            if (!errors.length) {
                updateValue(id, value);
                this.state.errors.length = 0;
            } else {
                this.setState({ errors });
            }
        } else {
            this.setState({ errors: ["Field is required"] });
        }
    }

    render() {
        const {
            id,
            name,
            type,
            placeholder
        } = this.props;
        const { errors, value } = this.state;

        return (
            <React.Fragment>
                <input
                    className="form__input"
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                { errors.map((error, index) => <p key={index} className="form__register-error-message">{error}</p>) }
            </React.Fragment>
        );
    }
};

export default Input;