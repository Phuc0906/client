import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
    WhereFilterOp,
} from "firebase/firestore";

export interface Condition {
    fieldName: string;
    operator: WhereFilterOp;
    compareValue: any;
}

interface Document {
    id: string;
    createdAt: string;
    uid: string;
    displayName: string;
}

const useFirestore = (name: string, condition?: Condition | null) => {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const collectionRef = query(collection(db, name), orderBy("createdAt"));
        const documentData: Document[] = [];
        let q = collectionRef;
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            q = query(
                collectionRef,
                where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue
                )
            );
        }
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                documentData.push({
                    id: doc.id,
                    createdAt: doc.data().createdAt, // Adjust this based on your actual field names
                    uid: doc.data().uid, // Adjust this based on your actual field names
                    displayName: doc.data().displayName,
                });
            });
            setDocuments(documentData);
        });

        return () => unsubscribe();
    }, [name, condition]);

    return documents;
};

export default useFirestore;
