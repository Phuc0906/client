import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import styled, { keyframes } from 'styled-components';
import {AuthContext, AuthContextPropsType} from "../context/auth-context";


const DocumentConverterPage = () => {
    const [file, setFile] = useState(null);
    const [percentage, setPercentage] = useState<string>('0.0');
    // @ts-ignore
    const {user} = useContext<AuthContextPropsType>(AuthContext);

    const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        console.log(e.target.files[0]);
        // @ts-ignore
        setFile(e.target.files[0]);

    }

    const handleDownloadFile = () => {

        //TODO: download by file id
        axios.get(`http://localhost:8080/api/file/single-file?file_id=907e0c3a-0420-494c-996d-ae848be64f3f`).then(res => {
            console.log(res.data)
            downloadFile(base64ToFile(res.data, "", ""), 'test.docx');
        }).catch(err => {
            console.log(err);
        })
    }

    const downloadFile = (file: File | null, fileName: string) => {
        // @ts-ignore
        const fileURL = URL.createObjectURL(file);
        // Create an anchor element
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = fileName;

        // Programmatically trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and remove the anchor element
        URL.revokeObjectURL(fileURL);
        document.body.removeChild(link);
    }

    function base64ToFile(base64String: string, fileName: string, fileType: string) {
        // Step 1: Decode the Base64 string
        const binaryString = atob(base64String);

        // Step 2: Create a Blob
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: fileType });

        // Step 3: Convert Blob to File
        const file = new File([blob], fileName, { type: fileType });
        return file;
    }

    const onFileUploadHandle = () => {
        console.log(file);

        const formData = new FormData();
        // @ts-ignore
        formData.append("file", file);


        //TODO:  Upload user File
        axios.post(`http://localhost:8080/api/file?uid=${user?.uid}`, formData, {
            onDownloadProgress: progressEvent => {
                const logVal: string = progressEvent.event.target.responseText.split('\n');
                let i = logVal.length - 1;
                for (let k = i; k >= 0; k--) {
                    if (logVal[k].includes("data")) {
                        const splittedCounting = logVal[k].split(':');
                        if (splittedCounting.length > 1) {
                            if (splittedCounting[splittedCounting.length - 1].length > 0) {
                                console.log("Has data");
                                i = k;
                                break;
                            }
                        }
                    }
                }
                console.log(logVal[i])
                const percentageData = logVal[i].split(":");
                const percentageNum: string = parseFloat(percentageData[percentageData.length - 1]).toFixed(2);
                setPercentage(percentageNum);
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        //TODO:  Query file by user id

        if (user !== null) {
            axios.get(`http://localhost:8080/api/file?uid=${user?.uid}`).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [user])

    return <div className="">
        <div>
            <label>Please insert file</label>

            <input onChange={onFileInput} type={"file"}  />
        </div>
        <div>
            <button onClick={onFileUploadHandle}>Upload</button>
        </div>
        <div>
            <button onClick={handleDownloadFile}>Download File</button>
        </div>
        <div className="text-3xl">
            <label>Loading {percentage} %</label>
        </div>
    </div>
}

export default DocumentConverterPage;
