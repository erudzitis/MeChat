import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
 * Components
*/
import { Login } from "./components/authentication/login/Login";
import { Register } from "./components/authentication/register/Register";
import { Home } from "./components/authentication/home/Home";

// Routes
import { ProtectedRoute } from "./routes/ProtectedRoute";

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
                    <Route 
                        path="" 
                        element={
                            <ProtectedRoute children={<Home />} />
                        } 
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    )
}