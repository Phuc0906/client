import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import DocumentCard from "../components/document/DocumentCard";
import axios from "axios";
import { FileProps } from "../typing/File";
import PageLayout from "../components/layout/PageLayout";

const HomePage: React.FC = () => {
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

    // const onClickHandle = (e: React.MouseEvent<HTMLElement>) => {
    //     const targetElement = e.currentTarget;
    //     if (targetElement instanceof HTMLElement) {
    //         const {top, left, width} = targetElement.getBoundingClientRect();
    //     }
    // };

    return (
        <PageLayout>
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-2xl p-4 border-2 rounded-md border-primary">
                    <div className="relative flex text-xl font-semibold select-none item-center gap-x-6">
                        <span className="cursor-pointer">Text</span>
                        <span>File</span>
                        <div className="absolute"></div>
                    </div>
                    <textarea
                        placeholder="To write text, enter or paste it here and press 'Correct' "
                        className="w-full mt-4 border-none resize-none focus:border-none focus:outline-none"></textarea>
                </div>
            </div>
        </PageLayout>
    );
};

export default HomePage;
