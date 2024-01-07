import React from "react";
import {UserIcon} from "@heroicons/react/24/outline";
import {ClipboardDocumentListIcon} from "@heroicons/react/24/outline";
import {useAccountPageMode} from "../context/account-page-context";

const AccountSubscription = () => {
    const {enablePlanModal} = useAccountPageMode();

    return <div className={`w-full bg-white`}>
        <div className="h-fit w-4/5 bg-white p-10">
            <div className="flex gap-5 items-center mb-5">
                <ClipboardDocumentListIcon className="w-9 h-9"></ClipboardDocumentListIcon>
                <h2 className="text-2xl font-semibold">Subscription details</h2>
            </div>

            {/*Showing Current Plan*/}
            <div className={`mt-5 `}>
                <div className={`text-gray-400 text-lg` }>
                    <label>Your current Plan</label>
                </div>
                <div className={`mt-2 flex items-center justify-start gap-12`}>
                    <div className={`text-lg `}>
                        <label>Monthly</label>
                    </div>
                    <button onClick={() => {
                        enablePlanModal();
                    }} className={`text-blue-400`}>Change</button>
                </div>
            </div>
            {/*    Showing announcement on auto-charge*/}
            <div className={`text-sm w-[600px] bg-purple-50 px-4 py-3 rounded-xl mt-3`}>
                <label>Your plan will automatically renew on January 13, 2024. The amount of payment will be 30$</label>
            </div>
        </div>
    </div>


}

export default AccountSubscription;
