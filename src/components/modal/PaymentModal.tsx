import React, {useEffect, useState} from "react";
import {Appearance, loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../form/CheckoutForm";
import './payment.css';
import {useAccountPageMode} from "../../context/account-page-context";

const stripePromise = loadStripe("pk_test_51OXKSzEP1gGhSTU9IBjjvSKHnLbvHLfP7VtvYjE6MA1KEVaWU9jvbTgFCdoHe85D2ddpHGi63E7mcjtTuUuG3EN500TXV8w8PW");

const PaymentModal = () => {


    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://poppoppayment-production.up.railway.app/payment", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance: Appearance = {
        theme: 'stripe',
    };

    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };

    return <div className={`h-full w-full bg-white rounded-xl p-5 `}>
        <div className="flex flex-col w-full h-full gap-4 px-4 py-10 mx-auto overflow-hidden">
            <div className="w-full max-w-3xl mx-auto">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    </div>
}

export default PaymentModal;
