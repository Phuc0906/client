import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/auth-context";
import { ModeProvider } from "./context/mode-context";
import PageLayout from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import {AccountPageModeProvider} from "./context/account-page-context";

const App = () => {
  return (
    <AuthProvider>
      <ModeProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>} />
          <Route path="/sign-in" element={<SignInPage></SignInPage>} />
          <Route element={<PageLayout />}>
            <Route element={<HomePage></HomePage>} path="/" />
          </Route>
          <Route element={<PageLayout />}>
            <Route element={<AccountPageModeProvider><AccountPage></AccountPage></AccountPageModeProvider>} path="/profile" />
          </Route>
        </Routes>
      </ModeProvider>
    </AuthProvider>
  );
};

export default App;
