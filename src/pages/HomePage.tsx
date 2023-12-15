import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import DocumentCard from "../components/document/DocumentCard";
import axios from "axios";
import { FileProps } from "../typing/File";
import PageLayout from "../components/layout/PageLayout";

const HomePage = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const { user } = useAuth();
    console.log("🚀 ~ file: HomePage.tsx:14 ~ HomePage ~ user:", user);
    const [userFiles, setUserFiles] = useState<FileProps[]>([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/file?uid=${user?.uid}`)
            .then((res) => {
                console.log(res.data);
                setUserFiles(res.data);
            })
            .catch((err) => {});
    }, [user]);

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
        navigate("/document-converter");
        window.location.reload();
    };

    return <PageLayout>Hello</PageLayout>;
};

export default HomePage;
