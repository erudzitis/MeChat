// Requirements
import React from "react";

// Card component
import Card from "./Card";
import InputFloatLabel from "../Main/InputFloatLabel";
import PasswordFloatLabel from "../Main/PasswordFloatLabel";

const Login = () => {
    return (
        <Card type="Login">
            <InputFloatLabel id="username" label="Username" size="sm" />
            <PasswordFloatLabel id="Password" label="Password" size="sm" />
        </Card>
    )
}

export default Login;