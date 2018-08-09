
import React, { Component } from "react";

import Button from "./common/button";

class CreateProductSettings extends Component {
    constructor(props) {
        super(props);

        this.state = { name: "", price: "" };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit() {
        event.preventDefault();
        const { name, price } = this.state;
        const { onClick } = this.props;
        
        if (name && price) {
            onClick(name, price);
        }
    }

    render() {
        const { name, price, warning } = this.state;
        console.log(this.props);
        return (
            <div className="form-wrapper">
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form__field-wrapper">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            placeholder="Name"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form__field-wrapper">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={price}
                            placeholder="price"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form__field-wrapper">
                        <Button
                            value="Ok"
                            primary={true}
                            loading={false}
                            disabled={name && price ? false : true}
                        />
                    </div>
                </form>
            </div>
        );
    }
};

export default CreateProductSettings;