import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Constants
import { ACCESS_TOKEN_PATTERN } from "../common/contants";

// Services
import { getAccessToken } from "../common/services";

interface IProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const token = getAccessToken();

    // TODO: The regexp check does not seem to work??

    return (token /* && ACCESS_TOKEN_PATTERN.test(token) */) ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    )
};