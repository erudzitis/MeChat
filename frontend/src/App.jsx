// Requirements
import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"

// Components
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import Home from "./components/Home/Home";

// CSS styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "./index.css";

const App = () => {
  const { LOGIN, REGISTER } = useSelector(state => state.helper);

  const user = useMemo(() => {
    return localStorage.getItem("chatApplicationToken");
  }, [LOGIN, REGISTER])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;