import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import DocumentConverterPage from "./pages/DocumentConverterPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/auth-context";
import HomePage from "./pages/HomePage";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<SignUpPage></SignUpPage>}
                    />
                    <Route
                        path="/sign-in"
                        element={<SignInPage></SignInPage>}
                    />
                    <Route
                        path="/document-converter"
                        element={<AuthProvider><DocumentConverterPage /></AuthProvider>}
                    />
                    <Route path="/" element={<AuthProvider><HomePage /></AuthProvider>} />
                </Routes>
            </AuthProvider>
        </>
    );
};

export default App;
