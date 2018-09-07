import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toastr } from "react-redux-toastr";

import history from "../../shared/history";
import {
    onGetProducts,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct
} from "../redux/modules/products";
import { onLogout } from "../redux/modules/user";
import { renderModal } from "../redux/modules/modal";
import { MODAL_TYPES } from "./modals/modals";
import Page from "./common/page";

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };

        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.onRenderModal = this.onRenderModal.bind(this);
        this.getProducts();
    }

    getProducts() {
        const { dispatch } = this.props;
        dispatch(onGetProducts())
            .catch(error => {
                this.checkIsTokenExpired(error);
                toastr.error("Error", "Couldn't fetch products");
                throw error;
            });
    }

    deleteProduct(productId) {
        return (event) => {
            event.preventDefault();
            const { dispatch } = this.props;
            event.stopPropagation();
            dispatch(onDeleteProduct(productId))
                .catch(error => {
                    this.checkIsTokenExpired(error);
                    toastr.error("Error", "Couldn't delete product");
                    throw error;
                });
        };
    }

    updateProduct(productId, name, price) {
        const { dispatch } = this.props;
        event.stopPropagation();

        return dispatch(onUpdateProduct(productId, name, price))
            .then(dispatch(renderModal(false)))
            .catch(error => {
                this.checkIsTokenExpired(error);
                toastr.error("Error", "Couldn't update product");
                throw error;
            });
    }

    createProduct(name, price) {
        const { dispatch } = this.props;

        return dispatch(onCreateProduct(name, price))
            .then(dispatch(renderModal(false)))
            .catch(error => {
                this.checkIsTokenExpired(error);
                toastr.error("Error", "Couldn't create product");
                throw error;
            });
    }

    onRenderModal(isModalOpen, component) {
        return () => {
            const { dispatch } = this.props;
            dispatch(renderModal(isModalOpen, component));
        }
    }

    checkIsTokenExpired(error) {
        const { dispatch } = this.props;
        if (error.message === "Error: token_expired") {
            toastr.info("Info", "Token expired, please login again");
            dispatch(onLogout())
                .then(history.push("/login"));
        }
    }

    render() {
        const { loading } = this.state;
        const { products } = this.props;

        if (products.loading) {
            return (
                <div className="spinner">
                    <i className="fa fa-spinner fa-spin spinner-icon" />
                </div>
            );
        }

        return (
            <Page>
                <section className="products">
                    <div
                        className="products__btn"
                        onClick={this.onRenderModal(
                            true,
                            {
                                type: MODAL_TYPES.CREATE_PRODUCT_SETTINGS,
                                props: { loading, onClick: this.createProduct }
                            }
                        )}
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className="products__wrapper">
                        {
                            products.data.map((product, index) =>
                                <div
                                    key={index}
                                    className="product"
                                >
                                    <div
                                        className="product__btn-delete"
                                        onClick={this.deleteProduct(product._id)}
                                    >
                                        <i className="far fa-times-circle"></i>
                                    </div>
                                    <div
                                        className="product__btn-edit"
                                        onClick={this.onRenderModal(
                                            true,
                                            {
                                                type: MODAL_TYPES.UPDATE_PRODUCT_SETTINGS,
                                                props: {
                                                    product,
                                                    loading,
                                                    onClick: this.updateProduct
                                                }
                                            }
                                        )}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </div>
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
    products: state.products,
    user: state.user
});

export default connect(mapStateToProps)(Products);