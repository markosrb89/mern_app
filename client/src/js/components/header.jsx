import React, { Component } from "react";
import { NavLink  } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import history from "../../shared/history";
import { onLogout } from "../redux/modules/user";

class Header extends Component {
    constructor(props) {
        super(props);

        this.onLogoutBtnClick = this.onLogoutBtnClick.bind(this);
    }

    onLogoutBtnClick() {
        const { dispatch } = this.props;
        dispatch(onLogout());
        history.push('/');
    }

    onLogoClick() {
        history.push('/')
    }

    render() {
        const { isLoggedIn } = this.props;
        const publicLinks = [
            <li><NavLink to="/">Home</NavLink ></li>,
            <li><NavLink to="/about">About</NavLink ></li>,
            <li><NavLink to="/contact">Contact</NavLink ></li>
        ];

        const authenticatedLinks = [
            <li><NavLink to="/products">Products</NavLink ></li>,
            <li><NavLink onClick={this.onLogoutBtnClick} to="#">Logout</NavLink ></li>
        ];

        const unauthenticatedLinks = [
            <li><NavLink to="/login">Login</NavLink ></li>,
            <li><NavLink to="/register">Register</NavLink ></li>
        ];

        return (
            <header className="header">
                <div className="header__logo">
                    <img
                        src="/src/shared/assets/img/logo.png"
                        alt="logo"
                        onClick={this.onLogoClick}
                    />
                </div>
                <nav className="header__navigation">
                    <ul className="header-menu-links">
                        {
                            isLoggedIn ?
                                (publicLinks.concat(authenticatedLinks)) : (publicLinks.concat(unauthenticatedLinks))
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Header);