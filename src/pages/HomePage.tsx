import React, {useContext} from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import {AuthContext, AuthContextPropsType, useAuth} from "../context/auth-context";

const HomePage = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const {user} = useContext<AuthContextPropsType>(AuthContext);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log("signout");
                navigate("/sign-in");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleToDocumentPage = () => {
        navigate('/document-converter');
        window.location.reload();
    }

    return (
        <div>
            <div className="p-4 flex flex-col gap-5">
                <button
                    onClick={handleToDocumentPage}
                    className="inline-block p-3 ml-auto text-white bg-red-500 rounded-md">
                    To document converter
                </button>
                <button
                    onClick={handleSignOut}
                    className="inline-block p-3 ml-auto text-white bg-red-500 rounded-md">
                    Sign out with account {user?.email}
                </button>
            </div>
        </div>
    );
};

export default HomePage;
