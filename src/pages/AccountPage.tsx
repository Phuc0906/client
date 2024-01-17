import React, {useState} from "react";
import Profile from "./Profile";
import {PaymentModal, PlanModal} from "../components/modal";
import {useAccountPageMode} from "../context/account-page-context";
import {AccountSubscription, AccountPayment, AccountBillingHistory, CancelSubscription} from "../components/account";

const AccountPage = () => {
    const {planVisibility, paymentModal} = useAccountPageMode();

    return <div className={`overflow-scroll `}>
        <div className={`text-3xl font-bold bg-white pl-5 pt-12 border-b-2 border-gray-300 pb-6 ${(planVisibility || paymentModal) ? 'filter brightness-75' : ''}`}>
            <label>Account Settings</label>
        </div>
        <div className={`${(planVisibility || paymentModal) ? 'filter brightness-75' : ''}`}>
            <div className={`w-full`}>
                <Profile/>
            </div>
            <div className={`w-full`}>
                <AccountSubscription/>
            </div>
            {/*<div className={`w-full`}>*/}
            {/*    <AccountPayment/>*/}
            {/*</div>*/}
            {/*<div className={`w-full`}>*/}
            {/*    <AccountBillingHistory/>*/}
            {/*</div>*/}

            <div className={``}>
                <CancelSubscription/>
            </div>
        </div>

        {planVisibility ? <div className={` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit rounded-xl bg-green-950 `}>
            <PlanModal/>
        </div> : null}

        {paymentModal ? <div className={` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit rounded-xl bg-green-950 `}>
            <PaymentModal/>
        </div> : null}


    </div>
}

export default AccountPage;
