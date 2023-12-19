import React, { useEffect, useRef, useState } from "react";
import Line from "../components/portal/Line";
import { useMode } from "../context/mode-context";

const HeaderUserInput: React.FC<userInputProp> = ({ className }) => {
    const myRef = useRef<HTMLInputElement | null>(null);
    const functionRef = useRef<(() => void) | null>(null);
    const [coordinate, setCoordinate] = useState<Coordinate>({
        width: 0,
    });
    //@ts-ignore
    const { setMode } = useMode();

    // Functions
    const focusInput = () => {
        if (myRef.current) {
            myRef.current.focus();
        }
    };
    const init = () => {
        focusInput();
        if (myRef.current) {
            const { bottom, left, width } =
                myRef.current.getBoundingClientRect();
            setCoordinate({ bottom, left, width });
        }
    };

    functionRef.current = init;

    useEffect(() => {
        if (functionRef && functionRef.current) {
            functionRef.current();
            const handleResize = () => {
                if (functionRef.current) {
                    functionRef.current();
                }
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [myRef]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const targetElement = e.currentTarget;
        const { bottom, left, width } = targetElement.getBoundingClientRect();
        setCoordinate({ bottom, left, width });
    };

    return (
        <div
            className={`flex text-xl font-semibold select-none item-center gap-x-6 ${className}`}>
            <span
                ref={myRef}
                className="cursor-pointer"
                onClick={(e) => {
                    handleClick(e);
                    setMode(false);
                }}>
                Text
            </span>
            <span
                className="cursor-pointer"
                onClick={(e) => {
                    handleClick(e);
                    setMode(true);
                }}>
                File
            </span>
            <Line {...coordinate}></Line>
        </div>
    );
};

export default HeaderUserInput;
