import React from "react";
import { Link } from "react-router-dom";

const RegistrationSuccessful = props => (
    <div className="form__submission-successful">
        Hello {props.user.name}, you have successfully create an account.
        Please <Link to="/login">Login</Link>
    </div>
);

export default RegistrationSuccessful;