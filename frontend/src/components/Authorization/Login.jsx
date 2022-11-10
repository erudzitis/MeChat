// Requirements
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Card component
import Card from "./Card";
import InputFloatLabel from "../Main/InputFloatLabel";
import PasswordFloatLabel from "../Main/PasswordFloatLabel";
import Center from "../Custom/Center";

// Actions
import { loginAction } from "../../actions/auth";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSuccessfulSubmit = (data) => {
        dispatch(loginAction(data, navigate));
    }

    return (
        <Center className="surface-card" expand>
            <Card type="LOGIN" onSuccessfulSubmit={onSuccessfulSubmit}>
                <InputFloatLabel id="username" label="Username" size="sm" />
                <PasswordFloatLabel id="password" label="Password" size="sm" />
            </Card>
        </Center>
    )
}

export default Login;