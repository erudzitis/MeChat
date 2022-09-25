// Requirements
import React from "react";

// Card component
import Card from "./Card";
import InputFloatLabel from "../Main/InputFloatLabel";
import PasswordFloatLabel from "../Main/PasswordFloatLabel";

// Actions
import { loginAction } from "../../actions/auth";

const Login = () => {
    return (
        <Card type="Login" fn={loginAction}>
            <InputFloatLabel id="username" label="Username" size="sm" />
            <PasswordFloatLabel id="Password" label="Password" size="sm" />
        </Card>
    )
}

export default Login;