import React, {FormEvent, useEffect, useMemo, useState} from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {StripePaymentElementOptions} from "@stripe/stripe-js";
import {useAccountPageMode} from "../context/account-page-context";
import {useAuth} from "../context/auth-context";
import useFirestore, {Condition} from "../hooks/useFiresStore";
import {getDocs, setDoc, doc} from "firebase/firestore";
import {db} from "../firebase/firebase-config"
import {useMode} from "../context/mode-context";
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {setPaymentModal, chosenPlan} = useAccountPageMode();


    const [message, setMessage] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useAuth();
    const condition = useMemo<Condition>(() => {
        return {
            fieldName: "uid",
            operator: "==",
            compareValue: user?.uid,
        };
    }, [user]);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
            // @ts-ignore
            switch (paymentIntent.status) {
                case "succeeded":

                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `http://localhost:3000/payment_success/${chosenPlan}`,
            },
        });



        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs"
    }


    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <div className="w-full text-left break-words h-[50px] overflow-hidden">
                <label>Get premium for  ONLY: 1.99$</label>
            </div>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <div className={`flex items-center justify-center gap-5`}>
                <button onClick={() => {
                    setPaymentModal(false);
                }}>Cancel</button>
                <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
                </button>
            </div>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}

export default CheckoutForm;
