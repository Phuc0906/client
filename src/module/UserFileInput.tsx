import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useMode } from "../context/mode-context";

const UserFileInput: React.FC<userInputProp> = ({ className }) => {
    // @ts-ignore
    const { selectedFile, setSelectedFile } = useMode();
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        console.log("File: ", file);
        setSelectedFile(file);
    };

    return (
        <label>
            <input
                onChange={onInputChange}
                type="file"
                className="hidden-input"
            />
            <div
                className={`flex items-center justify-center w-full p-4 rounded-lg min-h-[300px] relative overflow-hidden ${
                    className === "dark" ? "bg-[#202020]" : "bg-gray-100"
                }`}>
                {!selectedFile && (
                    <CloudArrowUpIcon className="w-12 h-12 text-gray-300 "></CloudArrowUpIcon>
                )}
                {selectedFile && (
                    <div className="flex flex-col items-center">
                        <DocumentIcon className="w-12 h-12 text-gray-300"></DocumentIcon>
                        <span>{selectedFile.name}</span>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary"></div>
            </div>
        </label>
    );
};

export default UserFileInput;
