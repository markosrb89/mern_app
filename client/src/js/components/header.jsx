import React from "react";

import history from "../../shared/history";

const Header = props => {
    const navItems = [
        <a href="/">Home</a>,
        <a href="/about">About</a>,
        <a href="/contact">Contact</a>
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
                                <li><a href="/list">List</a></li>
                                <li><a href="/logout" onLogoutClick={onLogoutClick}>Logout</a></li>
                            </React.Fragment>) : 
                            (<li><a href="/login">Login</a></li>)
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