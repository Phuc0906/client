import React from "react";
import {CurrencyDollarIcon} from "@heroicons/react/24/outline";

const AccountBillingHistory = () => {
    return <div className="h-fit w-4/5 bg-white p-10">
        <div className="flex gap-5 items-center mb-5">
            <CurrencyDollarIcon className="w-5 h-5"></CurrencyDollarIcon>
            <h2 className="text-2xl font-semibold">Billing History</h2>
        </div>
    </div>

}

export default AccountBillingHistory;
