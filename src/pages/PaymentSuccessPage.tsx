import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const PaymentSuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <CheckCircleIcon style={{ fontSize: 60 }} />
                <h1 className="text-3xl font-bold my-4">Payment Successful!</h1>
                <p className="text-lg">
                    Thank you for your purchase. Your payment has been successfully processed.
                </p>
            </div>
        </div>
    );
};


export default PaymentSuccessPage;