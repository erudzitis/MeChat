import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
 * Components
*/
import { Login } from "./components/authentication/login/Login";
import { Register } from "./components/authentication/register/Register";
import { Home } from "./components/authentication/home/Home";

export const App: React.FC = () => {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: "dark"
            }}>

            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    )
}