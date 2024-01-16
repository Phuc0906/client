import React, {useEffect, useMemo} from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {collection, doc as firestoreDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase/firebase-config";
import {useAuth} from "../context/auth-context";
import useFirestore, {Condition} from "../hooks/useFiresStore";
import {useParams} from "react-router-dom";
import {useMode} from "../context/mode-context";

const PaymentSuccessPage = () => {
    const {user} = useAuth();
    const { plan_id } = useParams();


    useEffect(() => {
        const update = async () => {

            if (!user) return;

            const { uid } = user;
            const colRef = collection(db, 'users');

            // Specify the conditions for the query
            const q = query(colRef, where('uid', '==', uid));

            // Execute the query
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
                const docId = doc.id;

                const docRef = firestoreDoc(db, 'users', docId); // Use firestoreDoc instead of doc
                const currentDate = new Date();

                // Update the document
                await updateDoc(docRef, {
                    activate: plan_id
                });
            });
        }

        update().then(res => console.log(res)).catch(err => console.log(err));
    }, [user])

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
