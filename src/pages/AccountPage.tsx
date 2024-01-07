import React from "react";
import Profile from "./Profile";
import AccountSubscription from "./AccountSubscription";
import AccountPayment from "./AccountPayment";
import AccountBillingHistory from "./AccountBillingHistory";

const AccountPage = () => {
    return <div className={`overflow-scroll`}>
        <div className={`text-3xl font-bold ml-5 mt-12 border-b-2 border-gray-300 pb-6`}>
            <label>Account Settings</label>
        </div>
        <div>
            <Profile/>
        </div>
        <div>
            <AccountSubscription/>
        </div>
        <div>
            <AccountPayment/>
        </div>
        <div>
            <AccountBillingHistory/>
        </div>
    </div>
}

export default AccountPage;
