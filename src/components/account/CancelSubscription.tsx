import React from "react";
import {collection, doc as firestoreDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebase/firebase-config";
import {useAuth} from "../../context/auth-context";

const CancelSubscription = () => {
    const {user} = useAuth();

    return <div className={`w-full bg-white pl-5`}>
        <div className={`text-lg w-full py-12 border-t-2 border-gray-400`}>
            <div className={`text-red-700 mb-5`}>
                <button onClick={async () => {
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
                            activate: "-1"
                        });
                        window.location.reload();
                    });
                }} className={`bg-white w-fit shadow-none text-red-700`}>Cancel Subscription</button>
            </div>
            <div className={`text-sm text-gray-500 `}>
                <label>All future payment will be canceled and your plan will be downgraded to free plan</label>
            </div>
        </div>
    </div>
}

export default CancelSubscription;
