import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/sign-up"
                    element={<SignUpPage></SignUpPage>}></Route>
                <Route
                    path="/sign-in"
                    element={<SignInPage></SignInPage>}></Route>
            </Routes>
        </div>
    );
};

export default App;
