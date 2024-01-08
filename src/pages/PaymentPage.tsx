import React, {useEffect, useState} from "react";
import {Appearance, loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import './payment.css'

const stripePromise = loadStripe("pk_test_51OV4ZODWIjcWzX8v1BaoXK7gRh9EeM63Ogc6PJB1CQZW5rwcLBvDcJ0BQR2vM2XPAsQhZCXjQGV2zYfJ8e69QcuJ00jLJagLK0");

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:8080/api/file/payment", {
            method: "POST",
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

    return <div className="flex flex-col w-full h-full gap-4 px-4 py-10 mx-auto overflow-hidden">
        <div className="w-full max-w-3xl mx-auto">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    </div>
}

export default PaymentPage;
