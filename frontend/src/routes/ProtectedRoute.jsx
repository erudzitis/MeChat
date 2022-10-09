// Requirements
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { userData } = useSelector(state => state.auth);
    const location = useLocation();

    if (!userData) {
        // Otherwise we prompt him to login page
        return <Navigate to="/login" state={{ from: location }} />
    }

    // If user is authenticated, we authorize him to access the route
    return children;
}

export default ProtectedRoute;