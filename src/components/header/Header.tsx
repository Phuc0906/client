import React from "react";
import { useAuth, AuthContextPropsType } from "../../context/auth-context";
import { spawn } from "child_process";

const Header: React.FC = () => {
    // @ts-ignore
    const { user } = useAuth();
    return (
        <div className="grid items-center justify-center w-full grid-cols-3 shadow-md h-15">
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

            <h2 className="text-center">Paraphaser</h2>

            <div className="flex items-center gap-3 pr-3 ml-auto">
                {user ? (
                    <span>
                        Welcome back <strong>{user.displayName}</strong>!
                    </span>
                ) : (
                    <span>Login</span>
                )}

                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#2c2b2b"
                        className="w-12 h-12">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Header;
