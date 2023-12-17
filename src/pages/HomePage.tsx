import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { FileProps } from "../typing/File";
import PageLayout from "../components/layout/PageLayout";
import HeaderUserInput from "../module/HeaderUserInput";
import { Button } from "../components/button";
import UserTextInput from "../module/UserTextInput";
import { ModeProvider } from "../context/mode-context";

const HomePage: React.FC = () => {
    // @ts-ignore
    const { user } = useAuth();
    const [, setUserFiles] = useState<FileProps[]>([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/file?uid=${user?.uid}`)
            .then((res) => {
                console.log(res.data);
                setUserFiles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    return (
        <PageLayout>
            <ModeProvider>
                <div className="flex flex-col max-w-3xl gap-4 py-10 mx-auto overflow-hidden page-content">
                    <HeaderUserInput></HeaderUserInput>
                    <UserTextInput></UserTextInput>
                    <Button>Correct</Button>
                </div>
            </ModeProvider>
        </PageLayout>
    );
};

export default HomePage;
