// Requirements
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import Home from "./components/Home/Home";

// CSS styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";    
import "primeicons/primeicons.css";                                
import "/node_modules/primeflex/primeflex.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;