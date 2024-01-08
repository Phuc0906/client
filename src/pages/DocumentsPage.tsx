import React from "react";
import DocumentCard from "../components/document/DocumentCard";
import {useMode} from "../context/mode-context";
import {FileProps} from "../typing/File";

const DocumentsPage = () => {
    // @ts-ignore
    const {userFiles} = useMode();

    return <div className={`w-full`}>
        <div className="w-full pl-14 pt-10 flex flex-row flex-wrap gap-5">
            <DocumentCard file={null}/>
            {userFiles.map((file: FileProps, index: number) => <DocumentCard file={file} key={index}/>)}
        </div>
    </div>
}

export default DocumentsPage;
