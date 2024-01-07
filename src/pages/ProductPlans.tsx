import React, {useState} from "react";
import ProductPlanContainer, {PlanProps} from "./ProductPlanContainer";

const plans: PlanProps[] = [
    {
        id: 0,
        plan: "Annual Plan",
        monthlyPrice: 12.00,
        onetimePayment: 144.00
    },
    {
        id: 1,
        plan: "Quarterly Plan",
        monthlyPrice: 20.00,
        onetimePayment: 60.00
    },
    {
        id: 2,
        plan: "Monthly Plan",
        monthlyPrice: 30.00,
        onetimePayment: 30.00
    }
]

const ProductPlans = () => {
    const [chosenPlan, setChosenPlan] = useState(0);

    return <div className={`flex flex-col gap-10`}>
        {plans.map((plan, index) => <ProductPlanContainer setChosenPlan={setChosenPlan} plan={plan} chosenPlan={chosenPlan} key={plan.id} />)}
    </div>
}

export default ProductPlans;
