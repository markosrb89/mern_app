import React from "react";

const Input = props => {
    const {
        id,
        name,
        type,
        value,
        placeholder,
        onChange,
        label
    } = props;

    return (
        <React.Fragment>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default Input;