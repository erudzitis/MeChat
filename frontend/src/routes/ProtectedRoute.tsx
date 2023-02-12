import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Services
import { getAccessToken } from "../common/services";

interface IProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const token = getAccessToken();

    return (token) ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    )
};