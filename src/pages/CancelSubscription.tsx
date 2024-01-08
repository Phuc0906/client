import React from "react";

const CancelSubscription = () => {
    return <div className={`w-full bg-white pl-5`}>
        <div className={`text-lg w-full py-12 border-t-2 border-gray-400`}>
            <div className={`text-red-700 mb-5`}>
                <button className={`bg-white w-fit shadow-none text-red-700`}>Cancel Subscription</button>
            </div>
            <div className={`text-sm text-gray-500 `}>
                <label>All future payment will be canceled and your plan will be downgraded to free plan</label>
            </div>
        </div>
    </div>
}

export default CancelSubscription;
