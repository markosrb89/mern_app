import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";

import { onCreateUser } from "../../redux/modules/user";
import { validateCreateUser } from "../../libs/resources/user";
import Page from "../common/page";
import Form from "./form";
import RegistrationSuccessful from "./registration-successful";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                name: "",
                email: "",
                password: "",
                passwordRepeat: "",
            },
            warning: "",
            errors: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.areFieldsFilled = this.areFieldsFilled.bind(this);
        this.validator = this.validator.bind(this);
    }

    updateValue(key, value) {
        this.setState({ credentials: { ...this.state.credentials, [key]: value } });
    }

    onSubmit(event) {
        const { dispatch } = this.props;
        event.preventDefault();

        if (this.areFieldsFilled()) {
            dispatch(onCreateUser({ ...this.state.credentials }))
                .then(() => {
                    const title = "Success";
                    const message = "You have successfully register";
                    toastr.success(title, message);
                })
                .catch(error => {
                    const title = "Error";
                    const message = "Registration failed";
                    toastr.success(title, message);
                    throw error;
                });
        } else {
            this.setState({ warning: "All fields are required" });
        }
    }

    validator(id, value, validateAll) {
        const { credentials } = this.state;
        const { name, password, passwordRepeat, email } = credentials;
        let errors;

        if (
            !id && !value &&
            validateAll &&
            name && email &&
            password && passwordRepeat
        ) {
            let errors = validateCreateUser({ name, email, password, passwordRepeat });
            return errors && errors.length ? true : false;
        }

        if (id === 'passwordRepeat') {
            errors = validateCreateUser({ password, passwordRepeat: value })
        } else {
            errors = validateCreateUser({ [id]: value });
        }

        return errors[id] ? errors[id] : [];
    }

    areFieldsFilled() {
        const { credentials } = this.state;
        const {
            name,
            email,
            password,
            passwordRepeat
        } = credentials;

        if (
            name && email &&
            password && passwordRepeat
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { user } = this.props;
        const { warning } = this.state;
        const formProps = {
            onSubmit: this.onSubmit,
            validator: this.validator,
            updateValue: this.updateValue,
            loading: user.loading,
            warning
        };
        return (
            <Page>
                <section className="register">
                    <h1 className="register__header">{"<Register />"}</h1>
                    <div className="form-wrapper">
                        {user.isLoggedIn ? (<RegistrationSuccessful user={user.data} />) : (<Form formProps={formProps} />)}
                    </div>
                </section>
            </Page>
        );
    }
}

Register.propTyopes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Register);