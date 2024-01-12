import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [isNavBarHover, setIsNavbarHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            onMouseEnter={() => {
                setIsNavbarHover(true);
            }}
            onMouseLeave={() => {
                setIsNavbarHover(false);
            }}
            className="absolute top-0 left-0 z-40 flex flex-col items-center justify-between py-10 bg-green-950 sidebar page-content">
            <div
                className={`flex flex-col gap-16 items-center w-full ${
                    isNavBarHover ? "" : ""
                }`}>
                <div
                    className={`flex flex-col gap-5 items-start transition-all duration-300 mt-10 w-full ${
                        isNavBarHover ? "mr-0" : "mr-0"
                    }`}>
                    <div
                        onClick={() => {
                            navigate("/");
                            window.location.reload();
                        }}
                        className={`${
                            isNavBarHover ? "pl-10" : "pl-4"
                        } flex gap-3 relative items-center transition-colors duration-100 hover:bg-gray-100 hover:bg-opacity-10 px-5 py-1.5 w-full`}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FFFFFF"
                                className="w-12 h-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                            </svg>
                        </div>
                        <div
                            className={`${
                                isNavBarHover ? "left-32" : "-left-80"
                            } absolute w-[200px] transition-all duration-300 text-green-300 text-2xl`}>
                            <button className={`bg-transparent w-fit shadow-none`}>My Document</button>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/grammar");
                            window.location.reload();
                        }}
                        className={`${
                            isNavBarHover ? "pl-10" : "pl-4"
                        } flex gap-3 relative items-center transition-colors duration-100 hover:bg-gray-100 hover:bg-opacity-10 px-5 py-1.5 w-full `}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FFFFFF"
                                className="w-12 h-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                            </svg>
                        </div>
                        <div
                            className={`${
                                isNavBarHover ? "left-32" : "-left-80"
                            } absolute w-[200px] transition-all duration-300 text-green-300 text-2xl`}>
                            <button className={`bg-transparent w-fit shadow-none`}>Grammar</button>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            navigate("/payment");
                            window.location.reload();
                        }}
                        className={`${
                            isNavBarHover ? "pl-10" : "pl-4"
                        } flex gap-3 relative items-center transition-colors duration-100 hover:bg-gray-100 hover:bg-opacity-10 px-5 py-1.5 w-full `}>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FFFFFF"
                                className="w-12 h-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                />
                            </svg>
                        </div>
                        <div
                            className={`${
                                isNavBarHover ? "left-32" : "-left-80"
                            } absolute w-[200px] transition-all duration-300 text-green-300 text-2xl`}>
                            <button className={`bg-transparent w-fit shadow-none`}>Premium</button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isNavBarHover ? "pl-10" : "pl-4"
                } flex gap-3 relative items-center transition-colors duration-100 hover:bg-gray-100 hover:bg-opacity-10 px-5 py-1.5 w-full mb-8`}>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#FFFFFF"
                        className="w-12 h-12">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                </div>
                <div
                    className={`${
                        isNavBarHover ? "left-32" : "-left-80"
                    } absolute w-[200px] transition-all duration-300 text-green-300 text-2xl`}>
                    <button className={`bg-transparent w-fit shadow-none text-2xl`}>Sign out</button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
