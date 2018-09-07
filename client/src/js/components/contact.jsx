import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";

import Page from "./common/page";
import Button from "./common/button";
import { sendEmail } from "../redux/modules/contact"; 

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            message: "",
            loading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit(event) {
        const { dispatch } = this.props;
        const { name, email, message } = this.state;
        event.preventDefault();
        
        this.setState({ loading: true });
        
        dispatch(sendEmail(name, email, message))
            .then(() => {
                this.setState({ 
                    name: "", 
                    email: "", 
                    message: "", 
                    loading: false 
                });
                toastr.success("Success", "Your message is successfully sent!");
            })
            .catch(error => {
                toastr.error("Error", "Something went wrong!");
                throw error;
            });
    }

    render() {
        const { name, email, message, loading } = this.state;
        return (
            <Page>
                <section className="contact">
                    <h1 className="contact__header">{"<ContactUs />"}</h1>
                    <div className="form-wrapper">
                        <form className="form" onSubmit={this.onSubmit}>
                            <div className="form__field-wrapper">
                                <input
                                    className="form__input"
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={this.onChange}
                                />
                                <span className="form__field-highlight">
                                    {name.replace(/ /g, "\u00a0")}
                                </span>
                            </div>
                            <div className="form__field-wrapper">
                                <input
                                    className="form__input"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />
                                <span className="form__field-highlight">
                                    {email.replace(/ /g, "\u00a0")}
                                </span>
                            </div>
                            <div className="form__field-wrapper">
                                <textarea
                                    className="form__textarea"
                                    id="textarea"
                                    name="message"
                                    cols="30"
                                    rows="10"
                                    value={message}
                                    onChange={this.onChange}
                                >
                                </textarea>
                            </div>
                            <div className="form__field-wrapper">
                                <Button
                                    value="Submit"
                                    primary={true}
                                    loading={loading}
                                    disabled={name && email && message ? false: true}
                                />
                            </div>
                        </form>
                    </div>
                </section>
            </Page>
        );
    }
}

Contact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    contact: PropTypes.object
};

export default connect()(Contact);