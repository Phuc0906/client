import React, {useContext, useEffect, useState} from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import {AuthContext, AuthContextPropsType, useAuth} from "../context/auth-context";
import DocumentCard from "../components/document/DocumentCard";
import axios from "axios";
import {FileProps} from "../typing/File";

const HomePage = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const {user} = useContext<AuthContextPropsType>(AuthContext);
    const [userFiles, setUserFiles] = useState<FileProps[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/file?uid=${user?.uid}`).then(res => {
            console.log(res.data);
            setUserFiles(res.data);
        }).catch(err => {

        })
    }, [user])

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
                <DocumentCard file={null}/>
                {userFiles.map((file, index) => <DocumentCard file={file} key={index}/>)}
            </div>
        </div>
    );
};

export default HomePage;
