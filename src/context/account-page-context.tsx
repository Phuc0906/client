import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import AccountPage from "../pages/AccountPage";
import {PlanProps} from "../pages/ProductPlanContainer";
import {set} from "react-hook-form";

type AccountPageContextProps = {
    planVisibility: boolean,
    enablePlanModal: () => void,
    disablePlanModal: () => void,
    chosenPlan: number,
    setChosenPlan: Dispatch<SetStateAction<number>>,
    plans: PlanProps[],
    paymentModal: boolean,
    setPaymentModal: Dispatch<SetStateAction<boolean>>;
}

type AccountContextProps = {
    children: ReactNode;
}

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

const AccountPageContext = createContext<AccountPageContextProps | undefined>(undefined);

function AccountPageModeProvider(props: AccountContextProps) {
    const [planModalVisibility, setPlanVisibility] = useState<boolean>(false);
    const [chosenPlan, setChosenPlan] = useState(-1);
    const [paymentModal, setPaymentModal] = useState(false);

    const enablePlanModal = () => {
        setPlanVisibility(true);
    }

    const disablePlanModal = () => {
        setPlanVisibility(false);
    }

    const value: AccountPageContextProps = {
        planVisibility: planModalVisibility,
        enablePlanModal : enablePlanModal,
        disablePlanModal : disablePlanModal,
        chosenPlan: chosenPlan,
        setChosenPlan: setChosenPlan,
        plans: plans,
        paymentModal: paymentModal,
        setPaymentModal: setPaymentModal
    }

    return <AccountPageContext.Provider {...props} value={value}></AccountPageContext.Provider>
}

const useAccountPageMode = () => {
    const context = useContext(AccountPageContext);
    if (typeof context === "undefined") {
        throw new Error("useMode must be used within AuthProvider");
    }
    return context;
}

export {AccountPageModeProvider, useAccountPageMode}
