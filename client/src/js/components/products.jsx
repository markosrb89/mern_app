import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";

import {
    onGetProducts,
    onCreateProduct,
    onDeleteProduct,
    onUpdateProduct
} from "../redux/modules/products";
import Page from "./common/page";

class Products extends Component {
    constructor(props) {
        super(props);

        this.getProducts();
    }

    getProducts() {
        const { dispatch } = this.props;
        dispatch(onGetProducts())
            .catch(error => {
                const title = "Error";
                const message = "Couldn't fetch products";
                toastr.error(title, message);
                throw error;
            });
    }

    render() {
        const { products } = this.props;
        return (
            <Page>
                <section className="products">
                    <div className="products__wrapper">
                        {
                            products.data.map((product, index) =>
                                <div key={index} className="product">
                                    <p>{product.name}</p>
                                    <p>{product.price} EUR</p>
                                </div>)
                        }
                    </div>
                </section>
            </Page>
        );
    }
}

Products.propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object
};

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps)(Products);