import React, {useContext, useEffect, useState} from "react";

import HeaderUserInput from "../module/HeaderUserInput";
import { Button } from "../components/button";
import UserTextInput from "../module/UserTextInput";
import { useMode } from "../context/mode-context";
import UserFileInput from "../module/UserFileInput";
import axios from "axios";
import {AuthContext, AuthContextPropsType} from "../context/auth-context";

const HomePage: React.FC = () => {
    // @ts-ignore
    const { mode, onFileUploadHandle, appearance, percentage, slidingWidth, userText, setUserText } = useMode();
    // @ts-ignore
    const { user } = useContext<AuthContextPropsType>(AuthContext);

    //Functions
    const hanldeTextUpload = () => {
        // console.log("USER TEXT: " + userText);
        axios.post(`http://localhost:8080/api/file/paragraph`, {
            paragraph: userText
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
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
                        setText={setUserText}
                        className={`h-full min-h-[250px] ${
                            appearance === "dark" ? "bg-[#202020]" : ""
                        }`}></UserTextInput>
                )}
                {mode && (
                    <UserFileInput  className={`${appearance}`}></UserFileInput>
                )}
            </div>
            {mode ? <div className="w-[450px] h-10 mx-auto rounded-xl border-2 border-green-600">
                <div style={{ width: `${slidingWidth}px` }} className={` h-full bg-green-400  rounded-xl transition-all duration-300`}>

                </div>
                <div className="w-[120px] mx-auto text-lg">
                    <label className="">Loading {percentage}%</label>
                </div>
            </div> : null}
            <Button
                className="mt-auto"
                onClick={mode ? onFileUploadHandle : hanldeTextUpload}>
                Correct
            </Button>
        </div>
    );
};

export default HomePage;
