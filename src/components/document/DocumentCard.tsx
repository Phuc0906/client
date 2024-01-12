import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FileProps} from "../../typing/File";
import {useMode} from "../../context/mode-context";

type DocumentCardProps = {
    file: FileProps | null
}

const DocumentCard = ({file}: DocumentCardProps) => {
    const navigate = useNavigate();
    // @ts-ignore
    const {downloadRequest, setDownloadRequest, setDocumentId, setDownloadFileName} = useMode();


    return <div onClick={() => {
        if (file === null) {
            navigate('/grammar');
            window.location.reload();
        }
    }} className={`flex flex-col w-[195px] h-[180px]  justify-start shadow-xl transition-all duration-300 rounded-xl hover:shadow-2xl`}>

        {(file !== null) ? <div className={`border-2 hover:text-blue-500 transition-all duration-300 border-gray-300 w-full h-2/3 pl-3 py-2 rounded-t-xl flex flex-col items-center gap-4 justify-start`}>
            <div className="w-full text-left break-words h-[100px] overflow-hidden">
                <label>{file.fileName}</label>
            </div>
        </div> : <div className={`border-2 hover:text-blue-500 transition-all duration-300 border-gray-300 w-full h-2/3 px-14 py-2 rounded-t-xl flex flex-col items-center gap-4 justify-start`}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div>
            <div>
                <label>New</label>
            </div>
        </div>}
        <div className={` h-1/3 transition-all duration-300 w-full rounded-b-xl  flex  items-center ${file !== null ? 'justify-between px-3' : 'justify-center hover:text-blue-500'} gap-3 text-center py-2.5 border-b-2 border-l-2 border-r-2 border-gray-300 text-[#355E3B]`}>
            {(file === null) ? <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div> : null}
            <div className={`text-sm`}>
                <label>{(file !== null) ? file.dateUpload : 'Upload'}</label>
            </div>
            {file !== null ? <div className={`flex justify-center items-center gap-1`}>
                <div onClick={() => {
                    console.log("Download click")
                    setDocumentId(file?.document_id);
                    setDownloadFileName(file?.fileName)
                    setDownloadRequest(!downloadRequest);
                }} className={`hover:text-blue-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </div>
                <div className={`hover:text-red-500`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </div> : null}
        </div>
    </div>
}

export default DocumentCard;
