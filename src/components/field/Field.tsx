import React, { ReactNode } from "react";

const Field: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex flex-col mb-5 gap-y-3">{children}</div>;
};

export default Field;
