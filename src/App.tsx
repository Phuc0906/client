import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/sign-up"
                    element={<SignUpPage></SignUpPage>}></Route>
            </Routes>
        </div>
    );
};

export default App;
