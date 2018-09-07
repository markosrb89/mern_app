import React from "react";
import classNames from "classnames";

const Button = props => {
    const { 
        value, 
        onClick, 
        disabled, 
        loading, 
        primary, 
        secondary
    } = props;

    const buttonClasses = classNames({
        "btn": true,
        "btn--primary": primary,
        "btn--secondary": secondary,
        "btn--disabled": disabled
    });
    return (
        <button
            className={buttonClasses}
            type="submit"
            disabled={disabled}
            onClick={onClick}
        >
            { loading ? (<i className="fa fa-spinner fa-spin" />) : value }
        </button>
    );
};

export default Button;