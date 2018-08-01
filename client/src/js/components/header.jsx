import React from "react";
import { Link } from 'react-router-dom'

import history from "../../shared/history";

const Header = props => {
    const navItems = [
        <Link to="/">Home</Link>,
        <Link to="/about">About</Link>,
        <Link to="/contact">Contact</Link>
    ];

    return (
        <header className="header">
            <img 
                src="/src/shared/assets/img/logo.png" 
                alt="logo" 
                className="header__logo"
                onClick={onLogoClick}
            />
            <nav className="header__navigation">
                <ul className="header-menu-links">
                    {navItems.map((item, i) => <li key={i}>{item}</li>)}
                    {
                        props.isLoggedIn ?
                            (<React.Fragment>
                                <li><Link to="/list">List</Link></li>
                                <li><Link to="/logout" onLogoutClick={onLogoutClick}>Logout</Link></li>
                            </React.Fragment>) : 
                            (<React.Fragment>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </React.Fragment>)
                    }
                </ul>
            </nav>
        </header>
    );

    function onLogoClick() {
        history.push('/')
    }
}

export default Header;