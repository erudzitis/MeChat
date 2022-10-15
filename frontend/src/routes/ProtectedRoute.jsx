// Requirements
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { userData } = useSelector(state => state.auth);
    const location = useLocation();

    return (userData || localStorage.getItem("chatApplicationToken")) ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    )
}

export default ProtectedRoute;