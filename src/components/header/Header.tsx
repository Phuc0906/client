import React from "react";
import { useAuth } from "../../context/auth-context";
import { NavLink } from "react-router-dom";
import Menu from "../../module/Menu";
import {userInputProp} from "../../react-app-env";

const Header: React.FC<userInputProp> = ({ className }) => {
    // @ts-ignore
    const { user } = useAuth();

    return (
        <div
            className={`grid items-center justify-center w-full grid-cols-3 shadow-md h-15 ${
                className === "dark" ? "bg-[#202020] text-white" : ""
            }`}>
            <div className="flex items-center gap-3">
                <img
                    className="object-cover w-12 h-12"
                    srcSet="logo.png 2x"
                    alt=""
                />
                <h2 className="font-medium">
                    Levelup AI{" "}
                    <strong className="text-yellow-300">Premium</strong>
                </h2>
            </div>

            <h2 className="text-center">Enhance Your Work</h2>

            <div className="flex items-center gap-3 pr-3 ml-auto">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span>
                            Welcome back <strong>{user.displayName}</strong>!
                        </span>
                        <Menu></Menu>
                    </div>
                ) : (
                    <NavLink to={"/sign-in"}>Login</NavLink>
                )}
            </div>
        </div>
    );
};

export default Header;
