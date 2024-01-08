import React, {useContext} from "react";
import {CheckBox} from "../components/checkbox";
import ProductPlans from "./ProductPlans";
import {useAccountPageMode} from "../context/account-page-context";

type PlanModalProps = {
    className?: string
}

const PlanModal = ({className}: PlanModalProps) => {
    const {disablePlanModal} = useAccountPageMode();

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
        <div className={`mt-6 flex items-center justify-end gap-5`}>
            <button onClick={() => {
                disablePlanModal()
            }} className={`text-blue-500 bg-white w-fit shadow-none`}>Cancel</button>
            <button className={`text-white bg-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-900 w-fit shadow-none`}>Update</button>
        </div>
    </div>
}

export default PlanModal;
