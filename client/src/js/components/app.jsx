import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";

import User from "../libs/resources/user";
import history from "../../shared/history";
import { getModalComponent } from "./modals/modals";
import { renderModal  } from "../redux/modules/modal";
import Header from "./header";
import LandingPage from "./landing-page";
import Products from "./products";
import About from "./about";
import Contact from "./contact";
import Login from "./login";
import Register from "./register/register";
import NotFoundPage from "./not-found";

const MODAL_OVERLAY_CLASSNAME = {
    base: "modal-overlay",
    afterOpen: "modal-overlay--after-open",
    beforeClose: "modal-overlay--before-close"
};
const MODAL_CONTENT_CLASSNAME = {
    base: "modal-content",
    afterOpen: "modal-content--after-open",
    beforeClose: "modal-content--before-close"
};

const defaultModalProps = {
    shouldCloseOnOverlayClick: true,
    overlayClassName: MODAL_OVERLAY_CLASSNAME,
    className: MODAL_CONTENT_CLASSNAME
};

class App extends Component {
    constructor(props) {
        super(props);
    
        this.onRequestCloseModal = this.onRequestCloseModal.bind(this);
    }

    onRequestCloseModal() {
        const { dispatch } = this.props;
        dispatch(renderModal(false));
    }

    render() {
        const { modal } = this.props;
        const { component, isModalOpen, props: modalProps } = modal;
        const ModalComponent = getModalComponent(component);
        const propsForModal = {
            ...defaultModalProps,
            ...modalProps
        };

        const isLoggedIn = User.isLoggedIn() ? true : false;

        return (
            <Router history={history}>
                <React.Fragment>
                    <Header isLoggedIn={isLoggedIn} />
                    {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
                    <ReduxToastr
                        timeOut={2500}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-left"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                    />
                    <Modal
                        {...propsForModal}
                        isOpen={isModalOpen}
                        contentLabel={"Modal"}
                        onRequestClose={this.onRequestCloseModal}
                        closeTimeoutMS={300}
                    >
                        {ModalComponent ? <ModalComponent {...component.props} /> : null}
                    </Modal>
                </React.Fragment>
            </Router>
        );
    }
}

/**
 * Routes for authenticated and non authenticated users.
 */
const PublicRoutes = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route component={NotFoundPage} />
    </Switch>
);

/**
 * Routes unauthenticated users
 */
const UnauthenticatedRoutes = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PublicRoutes />
    </Switch>
);

/**
 * Routes for authenticated users
 */
const AuthenticatedRoutes = () => (
    <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/contact" component={Contact} />
        <PublicRoutes />
    </Switch>
);

App.proptypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
    modal: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user,
    modal: state.modal
});

export default connect(mapStateToProps)(App);