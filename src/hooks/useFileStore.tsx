import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
    WhereFilterOp,
    DocumentData,
} from "firebase/firestore";

export interface Condition {
    fieldName: string;
    operator: WhereFilterOp;
    compareValue: any;
}

const useFirestore = (name: string, condition?: Condition | null) => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);

    useEffect(() => {
        const collectionRef = query(collection(db, name), orderBy("createdAt"));
        const documentData: DocumentData[] = [];
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
                    ...doc.data(),
                });
            });
            setDocuments(documentData);
        });

        return () => unsubscribe();
    }, [name, condition]);

    return documents;
};

export default useFirestore;
