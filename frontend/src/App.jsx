// Requirements
import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Toast } from "primereact/toast";
import jwtDecode from "jwt-decode";

// Components
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import Home from "./components/Home/Home";
import Center from "./components/Custom/Center";

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
  const { userData } = useSelector(state => state.auth);

  // Toast reference
  const toast = useRef(null);

  // Toast trigger
  const showToast = (severity, contents) => {
    toast.current.show({
      severity: severity, life: 3000, content: (
        <Center className="w-full h-full">
          <h4 className="m-0 p-0 mt-2 font-normal">{contents}</h4>
        </Center>
      )
    });
  }

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

  // Rendering toast 
  useEffect(() => {
    if (!userData) return;

    showToast("info", `Welcome back, ${userData.username}`);
  }, [userData]);

  return (
    <>
      <Toast ref={toast} />

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