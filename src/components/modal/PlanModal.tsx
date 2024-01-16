import React, {useContext, useEffect, useState} from "react";
import {CheckBox} from "../checkbox";
import ProductPlans from "../../pages/ProductPlans";
import {useAccountPageMode} from "../../context/account-page-context";
import {useMode} from "../../context/mode-context";

type PlanModalProps = {
    className?: string
}

const PlanModal = ({className}: PlanModalProps) => {
    const {disablePlanModal, chosenPlan, setChosenPlan, setPaymentModal} = useAccountPageMode();
    const [missingPlan, setMissingPLan] = useState(false);

    const handleChoosingPlan = () => {
        if (chosenPlan === -1) {
            setMissingPLan(true);
        }else {
            setMissingPLan(false);
            disablePlanModal();
        //     Process to payment
            setPaymentModal(true);
        }
    }

    const handleCancelModal = () => {
        setChosenPlan(-1);

        disablePlanModal();
    }

    useEffect(() => {
        if (chosenPlan !== -1) {
            setMissingPLan(false);
        }
    }, [chosenPlan])

    return <div className={`h-fit w-[500px] bg-white rounded-xl p-5 `}>
        <div className={`text-2xl font-semibold`}>
            <label>Change your plan</label>
        </div>
        <div className={`mt-5 text-sm text-gray-700`}>
            <label>Please Select Your Plan</label>
        </div>
        <div className={`mt-5`}>
            <ProductPlans/>
        </div>
        {missingPlan ? <div className={`text-sm text-red-700 pl-5`}>
            <label>Please select your subscription plan</label>
        </div> : null}
        <div className={`mt-6 flex items-center justify-end gap-5`}>
            <button onClick={handleCancelModal} className={`text-blue-500 bg-white w-fit shadow-none`}>Cancel</button>
            <button onClick={handleChoosingPlan} className={`text-white bg-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-900 w-fit shadow-none`}>Update</button>
        </div>


    </div>
}

export default PlanModal;
