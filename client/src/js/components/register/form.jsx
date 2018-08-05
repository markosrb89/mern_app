import React from "react";

import Input from "../common/input";
import Button from "../common/button";

const Form = props => {
    const { formProps } = props;
    const {
        onSubmit, 
        validator, 
        updateValue, 
        warning, 
        loading 
    } = formProps;
    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="form__field-wrapper">
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    validator={validator}
                    updateValue={updateValue}
                />
            </div>
            <div className="form__field-wrapper">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    validator={validator}
                    updateValue={updateValue}
                />
            </div>
            <div className="form__field-wrapper">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    validator={validator}
                    updateValue={updateValue}
                />
            </div>
            <div className="form__field-wrapper">
                <Input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Repeat Password"
                    validator={validator}
                    updateValue={updateValue}
                />
            </div>
            <div className="form__field-wrapper">
                <Button
                    value="Signup"
                    secondary={true}
                    loading={loading}
                    disabled={validator(undefined, undefined, true)}
                />
            </div>
            { warning ? (<div className="form__error-message">{warning}</div>) : undefined }
        </form>
    );
};

export default Form;