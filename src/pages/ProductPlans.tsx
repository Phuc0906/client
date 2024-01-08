import React, {useState} from "react";
import ProductPlanContainer, {PlanProps} from "./ProductPlanContainer";
import {useAccountPageMode} from "../context/account-page-context";

const ProductPlans = () => {
    const {plans} = useAccountPageMode();

    return <div className={`flex flex-col gap-10`}>
        {plans.map((plan, index) => <ProductPlanContainer plan={plan} key={plan.id} />)}
    </div>
}

export default ProductPlans;
