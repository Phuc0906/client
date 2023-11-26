import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
const FormLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <div className="container">
                <NavLink to="#">
                    <img
                        className="object-cover w-56 h-56 mx-auto mt-0 mb-5"
                        srcSet="logo.png 2x"
                        alt="LevelUpAI Logo"
                    />
                </NavLink>
                <h1 className="text-4xl font-semibold text-center text-[#2ec17c] uppercase">
                    Level Up AI
                </h1>
                {children}
            </div>
        </div>
    );
};

export default FormLayout;
