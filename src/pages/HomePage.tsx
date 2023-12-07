import React, {useContext} from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import {AuthContext, AuthContextPropsType, useAuth} from "../context/auth-context";
import DocumentCard from "../components/document/DocumentCard";

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
        <div className={`w-full`}>
            <div className="w-full pl-14 pt-10 flex flex-row flex-wrap gap-5">
                <DocumentCard/>
                <DocumentCard/>
            </div>
        </div>
    );
};

export default HomePage;
