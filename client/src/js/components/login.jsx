import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";

import history from "../../shared/history";
import { onLogin } from "../redux/modules/user";
import { validateCreateUser } from "../libs/resources/user";
import Page from "./common/page";
import Input from "./common/input";
import Button from "./common/button";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            warning: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validator = this.validator.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(key, value) {
        this.setState({ [key]: value });
    }

    onSubmit(event) {
        const { dispatch, user } = this.props;
        const { email, password } = this.state;
        event.preventDefault();

        if (email && password) {
            dispatch(onLogin(email, password))
                .then(() => history.push("/"))
                .catch(error => {
                    const title = "Error";
                    const message = "Authentication failed";

                    this.setState({ warning: "Wrong username or password" });

                    toastr.error(title, message);
                    throw error;
                });
        }
    }

    validator(id, value) {
        const { email, password } = this.state;
        let errors;

        if (email && password) {
            let errors = validateCreateUser({ email, password });
            return errors && errors.length ? true : false;
        } else {
            errors = validateCreateUser({ [id]: value });
        }

        return errors[id] ? errors[id] : [];
    }

    render() {
        const { user } = this.props;
        const { loading } = user;
        const { email, password, warning } = this.state;

        return (
            <Page>
                <section className="login">
                    <h1 className="login__header">{"<Login />"}</h1>
                    <div className="form-wrapper">
                        <form className="form" onSubmit={this.onSubmit}>
                            <div className="form__field-wrapper">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    validator={this.validator}
                                    updateValue={this.updateValue}
                                />
                            </div>
                            <div className="form__field-wrapper">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    validator={this.validator}
                                    updateValue={this.updateValue}
                                />
                            </div>
                            <div className="form__field-wrapper">
                                <Button
                                    value="Login"
                                    primary={true}
                                    loading={loading}
                                    disabled={email && password ? false : true}
                                />
                            </div>
                            {warning ? (<div className="form__error-message">{warning}</div>) : undefined}
                        </form>
                        <div className="create-account"><Link to="/register">Create account</Link></div>
                    </div>
                </section>
            </Page>
        );
    }
}

Login.propTyopes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Login);