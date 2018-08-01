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
        <input
            className={buttonClasses}
            type="submit"
            value={value}
            disabled={disabled}
            onClick={onClick}
        />
    );
};

export default Button;