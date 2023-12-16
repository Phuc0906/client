import React, { useEffect, useRef, useState } from "react";
import Line from "../components/portal/Line";

const HeaderUserInput = () => {
    const myRef = useRef<HTMLInputElement | null>(null);
    const [coordinate, setCoordinate] = useState<Coordinate>({
        width: 0,
    });
    const focusInput = () => {
        if (myRef.current) {
            myRef.current.focus();
        }
    };
    useEffect(() => {
        focusInput();
        if (myRef.current) {
            const { bottom, left, width } =
                myRef.current.getBoundingClientRect();
            setCoordinate({ bottom, left, width });
        }

        return () => {
            focusInput();
        };
    }, []);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const targetElement = e.currentTarget;
        const { bottom, left, width } = targetElement.getBoundingClientRect();
        setCoordinate({ bottom, left, width });
    };

    return (
        <div className="flex text-xl font-semibold select-none item-center gap-x-6">
            <span ref={myRef} className="cursor-pointer" onClick={handleClick}>
                Text
            </span>
            <span className="cursor-pointer" onClick={handleClick}>
                File
            </span>
            <Line {...coordinate}></Line>
        </div>
    );
};

export default HeaderUserInput;
