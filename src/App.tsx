import React, {useEffect, useState} from 'react';
import axios from "axios";
import mammoth from "mammoth";

function App() {

    const [file, setFile] = useState(null);
    const [xmlContent, setXmlContent] = useState('');

    const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        console.log(e.target.files[0]);
        // @ts-ignore
        setFile(e.target.files[0]);

    }

    useEffect(() => {
        console.log(xmlContent);
    }, [xmlContent])

    const onFileUploadHandle = () => {
        console.log(file);

        const formData = new FormData();
        // @ts-ignore
        formData.append("file", file);

        axios.post('http://localhost:8080/api/file', formData).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <div className="">
            <div>
                <label>Please insert file</label>

                <input onChange={onFileInput} type={"file"}  />
            </div>
            <div>
                <button onClick={onFileUploadHandle}>Upload</button>
            </div>

        </div>
    );
}

export default App;
