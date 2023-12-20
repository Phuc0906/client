import React from "react";

import HeaderUserInput from "../module/HeaderUserInput";
import { Button } from "../components/button";
import UserTextInput from "../module/UserTextInput";
import { useMode } from "../context/mode-context";
import UserFileInput from "../module/UserFileInput";

const HomePage: React.FC = () => {
    // @ts-ignore
    const { mode, onFileUploadHandle, appearance } = useMode();

    //Functions
    const hanldeTextUpload = () => {
        console.log("hello");
    };

    return (
        <div className="flex flex-col w-full h-full gap-4 px-4 py-10 mx-auto overflow-hidden">
            <div className="w-full max-w-3xl mx-auto">
                <HeaderUserInput
                    className={`mb-4 ${
                        appearance === "dark" ? "text-white" : ""
                    }`}></HeaderUserInput>
                {!mode && (
                    <UserTextInput
                        className={`h-full min-h-[250px] ${
                            appearance === "dark" ? "bg-[#202020]" : ""
                        }`}></UserTextInput>
                )}
                {mode && (
                    <UserFileInput className={`${appearance}`}></UserFileInput>
                )}
            </div>
            <Button
                className="mt-auto"
                onClick={mode ? onFileUploadHandle : hanldeTextUpload}>
                Correct
            </Button>
        </div>
    );
};

export default HomePage;
