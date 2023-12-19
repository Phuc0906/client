import React from "react";

import PageLayout from "../components/layout/PageLayout";
import HeaderUserInput from "../module/HeaderUserInput";
import { Button } from "../components/button";
import UserTextInput from "../module/UserTextInput";
import { useMode } from "../context/mode-context";
import UserFileInput from "../module/UserFileInput";

const HomePage: React.FC = () => {
    // @ts-ignore
    const { mode, onFileUploadHandle } = useMode();

    //Functions
    const hanldeTextUpload = () => {
        console.log("hello");
    };

    return (
        <PageLayout>
            <div className="flex flex-col h-full max-w-3xl gap-4 py-10 mx-auto overflow-hidde page-content">
                <HeaderUserInput></HeaderUserInput>
                {!mode && <UserTextInput></UserTextInput>}
                {mode && <UserFileInput></UserFileInput>}
                <Button
                    className="mt-auto"
                    onClick={mode ? onFileUploadHandle : hanldeTextUpload}>
                    Correct
                </Button>
            </div>
        </PageLayout>
    );
};

export default HomePage;
