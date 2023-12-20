import React, { useLayoutEffect, useRef, useState } from "react";
import { useMode } from "../context/mode-context";

const UserTextInput: React.FC<userInputProp> = ({ className }) => {
    const texteraRef = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState<string>("");
    const [texteraHeight, setTexteraHeight] = useState("auto");
    //@ts-ignore
    const { mode } = useMode();
    //Function
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    useLayoutEffect(() => {
        if (text) {
            const scrollHeight = texteraRef.current?.scrollHeight;
            if (typeof scrollHeight !== "undefined" && scrollHeight != null) {
                if (scrollHeight <= 400) {
                    setTexteraHeight(`${texteraRef?.current?.scrollHeight}px`);
                } else {
                    setTexteraHeight(`400px`);
                }
            }
        } else {
            setTexteraHeight("auto");
        }
    }, [text]);

    console.log(mode);

    return (
        <>
            {!mode && (
                <div
                    className={`w-full p-4 border-2 rounded-md border-primary ${className}`}>
                    <textarea
                        onChange={onChange}
                        value={text}
                        style={{ height: texteraHeight }}
                        ref={texteraRef}
                        placeholder="To write text, enter or paste it here and press 'Correct' "
                        className="w-full mt-4 overflow-y-auto border-none resize-none max-h-[400px]focus:border-none focus:outline-none no-scrollbar flex-1 bg-inherit"></textarea>
                </div>
            )}
            {mode && <div>Hello</div>}
        </>
    );
};

export default UserTextInput;
