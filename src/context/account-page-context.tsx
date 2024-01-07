import React, {createContext, ReactNode, useContext, useState} from "react";
import AccountPage from "../pages/AccountPage";

type AccountPageContextProps = {
    planVisibility: boolean,
    enablePlanModal: () => void,
    disablePlanModal: () => void
}

type AccountContextProps = {
    children: ReactNode;
}

const AccountPageContext = createContext<AccountPageContextProps | undefined>(undefined);

function AccountPageModeProvider(props: AccountContextProps) {
    const [planModalVisibility, setPlanVisibility] = useState<boolean>(false);

    const enablePlanModal = () => {
        setPlanVisibility(true);
    }

    const disablePlanModal = () => {
        setPlanVisibility(false);
    }

    const value: AccountPageContextProps = {
        planVisibility: planModalVisibility,
        enablePlanModal : enablePlanModal,
        disablePlanModal : disablePlanModal
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
