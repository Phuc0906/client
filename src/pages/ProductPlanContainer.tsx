import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {CheckBox} from "../components/checkbox";
import {useAccountPageMode} from "../context/account-page-context";
import {useMode} from "../context/mode-context";

export type PlanProps = {
    id: number,
    plan: string,
    monthlyPrice: number,
    onetimePayment: number
}

type ProductPlanContainerProps = {
    plan: PlanProps;
}

const ProductPlanContainer = ({plan}: ProductPlanContainerProps) => {
    const {setChosenPlan, chosenPlan} = useAccountPageMode();
    const [planSelected, setPlanSelected] = useState(false);

    useEffect(() => {
        if (chosenPlan === plan.id) {
            setPlanSelected(true);
        }else {
            setPlanSelected(false);
        }
    }, [chosenPlan])

    return <div onClick={() => {
        if (planSelected) {
            setChosenPlan(-1);
        }else {
            setChosenPlan(plan.id);
        }
        setPlanSelected(true);

    }} className={`flex items-start gap-4 hover:bg-gray-100 px-3 py-2 ${planSelected ? 'bg-gray-100' : ''}`}>
        <CheckBox onClick={(selected) => {
            setPlanSelected(selected);
        }} checked={planSelected}/>
        <div className={``}>
            <div className={`text-xl font-semibold mb-3`}>
                <label>{plan.plan}</label>
            </div>
            <div className={`text-lg font-light`}>
                <label>${plan.monthlyPrice} USD / Month</label>
            </div>
            <div className={`text-sm font-light text-gray-500`}>
                <label>Billed as one payment of ${plan.onetimePayment} USD</label>
            </div>
        </div>
    </div>
}

export default ProductPlanContainer;
