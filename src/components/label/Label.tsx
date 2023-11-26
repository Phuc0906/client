import React, { HTMLProps } from "react";

const Label: React.FC<HTMLProps<HTMLLabelElement>> = ({
    htmlFor = "",
    children,
    ...props
}) => {
    return (
        <label className="font-semibold" htmlFor={htmlFor} {...props}>
            {children}
        </label>
    );
};

export default Label;
