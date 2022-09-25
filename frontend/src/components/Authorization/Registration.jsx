// Requirements
import React from "react";

// Card component
import Card from "./Card";
import InputFloatLabel from "../Main/InputFloatLabel";
import PasswordFloatLabel from "../Main/PasswordFloatLabel";

// Actions
import registerAction from "..../actions/auth";

const Registration = () => {
    return (
        <Card type="Registration" fn={registerAction}>
            <InputFloatLabel id="email" label="Email" size="sm" />
            <InputFloatLabel id="username" label="Username" size="sm" />
            <PasswordFloatLabel id="password" label="Password" size="sm" />
        </Card>
    )
}

export default Registration;