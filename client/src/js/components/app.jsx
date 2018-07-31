import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import history from "../../shared/history";
import User from "../libs/resources/user";
import { onLogout } from "../redux/modules/user";
import Header from "./header";
import LandingPage from "./landing-page";
import Products from "./products";
import About from "./about";
import Contact from "./contact";
import Login from "./login";
import Register from "./register";
import NotFoundPage from "./not-found";


class App extends Component {
    constructor(props) {
        super(props);

        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    isUserLoggedIn() {
        if (User.isLoggedIn()) {
            return true;
        } else {
            return false;
        }
    };

    onLogoutClick() {
        User.logOut();
        dispatch(onLogout());
    };

    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <Header
                        isLoggedIn={this.isUserLoggedIn()}
                        onLogoutClick={this.onLogoutClick}
                    />
                    {this.isUserLoggedIn() ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
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


export default App;