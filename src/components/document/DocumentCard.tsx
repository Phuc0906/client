import React from "react";
import {useNavigate} from "react-router-dom";

const DocumentCard = () => {
    const navigate = useNavigate();

    return <div onClick={() => {
        navigate('/document-converter');
        window.location.reload();
    }} className={`flex flex-col w-fit justify-start shadow-xl transition-all duration-300 rounded-xl hover:shadow-2xl`}>
        <div className={`border-2 hover:text-blue-500 transition-all duration-300 border-gray-300 w-fit px-14 py-2 rounded-t-xl flex flex-col items-center gap-4 justify-start`}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div>
            <div>
                <label>New</label>
            </div>
        </div>
        <div className={`hover:text-blue-500 transition-all duration-300 w-full rounded-b-xl  flex  items-center justify-center gap-3 text-center py-2.5 border-b-2 border-l-2 border-r-2 border-gray-300 text-[#355E3B]`}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div>
            <div className={`text-lg`}>
                <label>Upload</label>
            </div>
        </div>
    </div>
}

export default DocumentCard;
