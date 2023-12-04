import React from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
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
    return (
        <div>
            <div className="p-4">
                <button
                    onClick={handleSignOut}
                    className="inline-block p-3 ml-auto text-white bg-red-500 rounded-md">
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default HomePage;
