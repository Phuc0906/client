import React, {useEffect, useState} from "react";
import axios from "axios";
import styled, { keyframes } from 'styled-components';


const DocumentConverterPage = () => {
    const [file, setFile] = useState(null);
    const [percentage, setPercentage] = useState<string>('0.0');

    const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        console.log(e.target.files[0]);
        // @ts-ignore
        setFile(e.target.files[0]);

    }

    const onFileUploadHandle = () => {
        console.log(file);

        const formData = new FormData();
        // @ts-ignore
        formData.append("file", file);

        axios.post('http://localhost:8080/api/file', formData, {
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

    const testEventHandle = () => {
        axios.get('http://localhost:8080/api/file', {
            onDownloadProgress: progressEvent => {
                const testing = progressEvent.event.target.responseText;


                // setPercentage()
            },
            onUploadProgress: progressEvent => {
                console.log("")
            }
        }).then(res => {
            console.log("Done")
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return <div className="">
        <div>
            <label>Please insert file</label>

            <input onChange={onFileInput} type={"file"}  />
        </div>
        <div>
            <button onClick={onFileUploadHandle}>Upload</button>
        </div>
        <div>
            <button onClick={testEventHandle}>Test Evenet</button>
        </div>
        <div className="text-3xl">
            <label>Loading {percentage} %</label>
        </div>
    </div>
}

export default DocumentConverterPage;
