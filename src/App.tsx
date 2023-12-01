import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import DocumentConverterPage from "./pages/DocumentConverterPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/sign-up"
                    element={<SignUpPage></SignUpPage>}/>
                <Route
                    path="/document-converter"
                    element={<DocumentConverterPage/>}
                />
            </Routes>

        </div>
    );
};

export default App;
