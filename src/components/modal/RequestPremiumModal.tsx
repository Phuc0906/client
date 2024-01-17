import React from "react";
import {useMode} from "../../context/mode-context";
import {useNavigate} from "react-router-dom";

const RequestPremiumModal = () => {
    const {setPremiumRequest, premiumRequest} = useMode();
    const navigate = useNavigate();

    return <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 download-modal ${premiumRequest ? 'request' : ''} bg-green-950`}>
        <div className={`w-full h-full flex flex-col items-center justify-between pb-10`}>
            <div className={`text-3xl text-white mt-5  w-full mx-auto text-center`}>
                <label className={`w-fit mx-auto`}>Upgrade to Premium for downloading</label>
            </div>
            <div className={`flex w-full items-center justify-between px-14`}>
                <button onClick={() => {
                    setPremiumRequest(false);
                }} className={`bg-gray-50 px-4 py-1 rounded-xl text-xl text-black w-fit px-20`}>Cancel</button>
                <button onClick={() => {
                    navigate('/profile');
                    window.location.reload();
                }} className={`bg-orange-500 px-4 py-1 rounded-xl text-xl w-fit px-20`}>Upgrade to Premium</button>
            </div>
        </div>
    </div>
}

export default RequestPremiumModal;
