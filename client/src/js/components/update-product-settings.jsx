import React, { Component } from "react";

import Button from "./common/button";

class UpdateProductSettings extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            name: props.product.name, 
            price: props.product.price
        };

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
        const { product, onClick } = this.props;
        
        if (name && price) {
            onClick(product._id, name, price);
        }
    }

    render() {
        const { product } = this.props;
        const { name, price, warning } = this.state;
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
                            placeholder="Price"
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

export default UpdateProductSettings;