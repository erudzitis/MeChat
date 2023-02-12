import React from "react";
import { RegisterPage } from "./RegisterPage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../common/hooks";

// Types
import { IRegisterFormData } from "../../../common/types";

// Actions
import { registerAction } from "../../../actions/authentication";

/**
 * Component that is wrapper for RegisterPage, handles functionality and renders
 * @returns React.FC
 */
export const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    /**
     * Handles login logic and redirects the user to the homepage
     * @param formData IRegisterFormData
     */
    const handleSubmit = (formData: IRegisterFormData) => { 
        dispatch(registerAction(formData, navigate));
    };

    const navigateLogin = () => navigate("/login");

    return (
        <RegisterPage navigateLogin={navigateLogin} handleSubmit={handleSubmit} />
    )
};