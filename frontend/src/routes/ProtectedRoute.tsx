import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Services
import { getAccessToken } from "../common/services";

const ProtectedRoute= ({ children }: {children: React.ReactNode}) => {
    return (getAccessToken()) ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: useLocation() }} />
    )
}

export default ProtectedRoute;