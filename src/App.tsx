import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/auth-context";
import { ModeProvider } from "./context/mode-context";
import PageLayout from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import ChatPage from "./pages/ChatPage";

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
                    <Route element={<PageLayout />}>
                        <Route element={<HomePage></HomePage>} path="/" />
                        <Route element={<PaymentPage />} path="/payment" />
                        <Route element={<ChatPage />} path="/chat" />
                    </Route>
                </Routes>
            </ModeProvider>
        </AuthProvider>
    );
};

export default App;
