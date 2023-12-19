import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import DocumentConverterPage from "./pages/DocumentConverterPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/auth-context";
import HomePage from "./pages/HomePage";
import NavBar from "./components/nav/NavBar";
import { ModeProvider } from "./context/mode-context";

const App = () => {
    return (
        <AuthProvider>
            <ModeProvider>
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<SignUpPage></SignUpPage>}
                    />
                    <Route
                        path="/sign-in"
                        element={<SignInPage></SignInPage>}
                    />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </ModeProvider>
        </AuthProvider>
    );
};

export default App;
