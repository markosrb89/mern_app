import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";

import { onLogin } from "../redux/modules/user";
import Page from "./common/page";
import Input from "./common/input";
import Button from "./common/button";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailValue: "",
            passwordValue: "",
            warning: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(event) {
        const { value } = event.target;
        this.setState({ emailValue: value });
    }

    onPasswordChange(event) {
        const { value } = event.target;
        this.setState({ passwordValue: value });
    }

    onSubmit(event) {
        const { dispatch } = this.props;
        const { emailValue, passwordValue } = this.state;
        event.preventDefault();

        if (emailValue && passwordValue) {
            dispatch(onLogin(emailValue, passwordValue))
                .then(() => history.push("/products"))
                .catch(error => {
                    const title = "Error";
                    const message = "Couldn't login";

                    toastr.error(title, message);
                    throw error;
                });
        }
    }

    render() {
        const { user } = this.props;
        const { loading, data, isLoggedIn } = user;
        const { emailValue, passwordValue } = this.state;

        return (
            <Page>
                <section className="login">
                    <form className="form" onSubmit={this.onSubmit}>
                        <div className="form__input-wrapper">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={emailValue}
                                label={"Email"}
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="form__input-wrapper">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={passwordValue}
                                label={"Password"}
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        <div className="form__input-wrapper">
                            <Button
                                value="Login"
                                primary={true}
                                loading={loading}
                                disabled={emailValue && passwordValue ? false : true}
                            />
                        </div>
                    </form>
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