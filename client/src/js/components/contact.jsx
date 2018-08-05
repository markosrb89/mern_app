import React, { Component } from "react";

import Page from "./common/page";
import Button from "./common/button";

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            text: "",
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
        event.preventDefault();
    }

    render() {
        const { name, email, text, loading } = this.state;
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
                                    name="textarea"
                                    cols="30"
                                    rows="10"
                                    defaultValue={text}
                                    onChange={this.onChange}
                                >
                                </textarea>
                            </div>
                            <div className="form__field-wrapper">
                                <Button
                                    value="Submit"
                                    primary={true}
                                    loading={loading}
                                    disabled={true}
                                />
                            </div>
                        </form>
                    </div>
                </section>
            </Page>
        );
    }
}

export default Contact;