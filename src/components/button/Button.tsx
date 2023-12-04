import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    disabled,
    isLoading,
    type = "button",
    onClick = () => {},
    ...props
}) => {
    return (
        <button
            disabled={disabled}
            type={type}
            {...props}
            className={`h-14 cursor-pointer bg-gradient-to-br from-primary to-secondary rounded text-white font-semibold p-4 text-md flex justify-center items-center w-[300px] mx-auto ${
                disabled ? "opacity-50" : ""
            }`}>
            {isLoading ? (
                <div className="w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
                <span>{children}</span>
            )}
        </button>
    );
};

export default Button;
