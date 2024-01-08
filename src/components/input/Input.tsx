import React, { InputHTMLAttributes } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {FormValues} from "../../react-app-env";

type InputProps = UseControllerProps<FormValues> &
    InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
    name,
    children,
    onClick,
    control,
    ...props
}) => {
    const { field } = useController({
        name,
        control,
    });
    return (
        <div className="relative w-full">
            <input
                {...props}
                {...field}
                className={`w-full ${
                    !!children ? "pl-5 pr-14 py-4" : "px-5 py-4"
                } transition-all border-2 border-transparent rounded outline-none bg-lightgray focus:bg-white focus:border-primary`}
                {...props}
                id={name}
            />
            {!!children && (
                <div
                    className={`absolute top-0 w-6 h-6 mt-1.5 translate-y-1/2 cursor-pointer right-5 text-gray-500`}
                    onClick={onClick}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Input;
