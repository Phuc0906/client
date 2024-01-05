import React, { useState, ChangeEvent, FormEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuth } from "../context/auth-context";
const ChatPage = () => {
    const [message, setMessage] = useState<string>("");
    //@ts-ignore
    const { user } = useAuth();
    const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message === "" || message.length === 0) return;
        const colRef = collection(db, "messages");
        const { displayName, uid } = user;
        try {
            await addDoc(colRef, {
                uid,
                displayName,
                message,
            });
            setMessage("");
        } catch (err) {
            console.log("Have Error");
        }
    };

    return (
        <div className="flex flex-col h-full p-10">
            <div className="flex-1 chat-screen"></div>
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
