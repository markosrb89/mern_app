import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import history from "../../shared/history";
import { onLogout } from "../redux/modules/user";

class Header extends Component {
    constructor(props) {
        super(props);

        this.onLogoutBtnClick = this.onLogoutBtnClick.bind(this);    
    }

    onLogoutBtnClick(event) {
        const { dispatch } = this.props;
        dispatch(onLogout());
        history.push('/');
    }

    onLogoClick() {
        history.push('/')
    }

    render() {
        const { user } = this.props;
        const publicLinks = [
            <li><Link to="/">Home</Link></li>,
            <li><Link to="/about">About</Link></li>,
            <li><Link to="/contact">Contact</Link></li>
        ];

        const authenticatedLinks = [
            <li><Link to="/products">Products</Link></li>,
            <li><Link onClick={this.onLogoutBtnClick} to="#">Logout</Link></li>
        ];

        const unauthenticatedLinks = [
            <li><Link to="/login">Login</Link></li>,
            <li><Link to="/register">Register</Link></li>
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
                            user.isLoggedIn ? 
                            (publicLinks.concat(authenticatedLinks)) : (publicLinks.concat(unauthenticatedLinks)) 
                        }
                    </ul>
                </nav>
            </header>
        )
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Header);