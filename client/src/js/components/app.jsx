import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import history from "../../shared/history";
import Header from "./header";
import LandingPage from "./landing-page";
import Products from "./products";
import About from "./about";
import Contact from "./contact";
import Login from "./login";
import Register from "./register/register";
import NotFoundPage from "./not-found";


class App extends Component {
    render() {
        const { user } = this.props;
        return (
            <Router history={history}>
                <React.Fragment>
                    <Header />
                    { user.isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes /> }
                    <ReduxToastr
                        timeOut={2500}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-left"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                    />
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
    user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(App);