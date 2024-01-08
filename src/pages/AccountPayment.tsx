import React  from "react";
import {CurrencyDollarIcon} from "@heroicons/react/24/outline";
import visaLogo from '../assests/visa.png';

const AccountPayment = () => {
    return <div className={`bg-white w-full`}>
        <div className="h-fit w-4/5 bg-white p-10">
            <div className="flex gap-5 items-center mb-5">
                <CurrencyDollarIcon className="w-9 h-9"></CurrencyDollarIcon>
                <h2 className="text-2xl font-semibold">Your Payment</h2>
            </div>
            <div className={`flex items-center justify-start gap-14`}>
                <div className={`flex items-center justify-start gap-4  h-fit w-fit`}>
                    <div className={`w-28 h-20 `}>
                        <img className={`w-full h-full`} src={visaLogo} />
                    </div>
                    <div>
                        <label>Credit Card</label>
                    </div>
                </div>
                <button className={`text-blue-400 font-semibold bg-white w-fit shadow-none`}>Update</button>
            </div>
        </div>
    </div>

}

export default AccountPayment;
