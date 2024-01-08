import React from "react";
import {BanknotesIcon} from "@heroicons/react/24/outline";

const AccountBillingHistory = () => {
    return <div className={`w-full bg-white`}>
        <div className="h-fit w-4/5 bg-white p-10">
            <div className="flex gap-5 items-center mb-5">
                <BanknotesIcon className="w-9 h-9"></BanknotesIcon>
                <h2 className="text-2xl font-semibold">Billing History</h2>
            </div>
            <div>
                <table>
                    <tr className={`bg-purple-50`}>
                        <th className={`w-64 text-left text-sm px-4 py-2 border-r-2 border-gray-300`}>
                            Date
                        </th>
                        <th className={`w-44 text-left text-sm px-4 py-2 border-r-2 border-gray-300`}>Amount</th>
                        <th className={`w-80 text-left text-sm px-4 py-2`}>Description</th>
                    </tr>
                    <tr>
                        <td className={`w-64 text-left px-4 py-2`}>January 1, 2023</td>
                        <td className={`w-64 text-left px-4 py-2`}>$30.00 USD</td>
                        <td className={`w-64 text-left px-4 py-2`}>1-month subscription</td>
                    </tr>
                    <tr>
                        <td className={`w-64 text-left px-4 py-2`}>January 1, 2023</td>
                        <td className={`w-64 text-left px-4 py-2`}>$30.00 USD</td>
                        <td className={`w-64 text-left px-4 py-2`}>1-month subscription</td>
                    </tr>
                    <tr>
                        <td className={`w-64 text-left px-4 py-2`}>January 1, 2023</td>
                        <td className={`w-64 text-left px-4 py-2`}>$30.00 USD</td>
                        <td className={`w-64 text-left px-4 py-2`}>1-month subscription</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

}

export default AccountBillingHistory;
