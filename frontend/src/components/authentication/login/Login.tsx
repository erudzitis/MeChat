import React from "react";
import { LoginPage } from "./LoginPage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../common/hooks";

// Types
import { ILoginFormData } from "../../../common/types";

// Actions
import { loginAction } from "../../../actions/authentication";

/**
 * Component that is wrapper for LoginPage, handles functionality and renders
 * @returns React.FC
 */
export const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    /**
     * Handles login logic and redirects the user to the homepage
     * @param formData ILoginFormData
     */
    const handleSubmit = (formData: ILoginFormData) => { 
        dispatch(loginAction(formData, navigate));
    };

    const navigateRegister = () => navigate("/register");

    return (
        <LoginPage navigateRegister={navigateRegister} handleSubmit={handleSubmit} />
    )
};