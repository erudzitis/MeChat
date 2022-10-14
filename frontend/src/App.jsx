// Requirements
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"
import jwtDecode from "jwt-decode";

// Components
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import Home from "./components/Home/Home";

// Actions
import { userDataAction } from "./actions/auth";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";

// CSS styles
import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();

  // Handling user fetching
  const fetchUser = () => {
      // Retrieving jwt token from localstorage
      const jwtToken = localStorage.getItem("chatApplicationToken");
      // Token exists
      if (jwtToken) {
        dispatch(userDataAction(jwtDecode(jwtToken)));
      }    
  }

  // Updating user state
  useEffect(() => {
    // Fetching user
    fetchUser();

    // Adding event listener for localstorage changes
    window.addEventListener("storage", () => {
      fetchUser();
    });

    // When the component unmounts remove the event listener
    return () => {
      window.removeEventListener("storage", null);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;