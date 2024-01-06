import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuth } from "../context/auth-context";
import useFirestore, { Condition } from "../hooks/useFileStore";
const ChatPage = () => {
    const [message, setMessage] = useState<string>("");
    //@ts-ignore
    const { user } = useAuth();
    const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };
    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { displayName, uid } = user;
        if (message === "" || message.length === 0) return;
        const colRef = collection(db, "messages");

        const createdAt = serverTimestamp();
        try {
            await addDoc(colRef, {
                uid,
                displayName,
                message,
                createdAt,
            });
            setMessage("");
        } catch (err) {
            console.log("Have Error");
        }
    };
    const condition = React.useMemo<Condition | null>(() => {
        return {
            fieldName: "uid",
            operator: "==",
            compareValue: user?.uid,
        };
    }, [user]);

    const messages = useFirestore("messages", condition);
    console.log("🚀 ~ file: ChatPage.tsx:50 ~ ChatPage ~ messages:", messages);

    return (
        <div className="flex flex-col h-full p-10">
            <div className="flex-1 overflow-y-auto chat-screen"></div>
            <form
                onSubmit={handleSendMessage}
                className="flex items-center p-2 border-2 rounded-md chat-box border-primary">
                <input
                    value={message}
                    onChange={handleChangeMessage}
                    placeholder="Send a message"
                    className="flex-1 w-full border-none focus:outline-none"
                    type="text"
                />
                <button type="submit">
                    <PaperAirplaneIcon className="w-8 h-8 text-green-500"></PaperAirplaneIcon>
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
