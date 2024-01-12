import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { auth } from "../firebase/firebase-config";

import {
  UserIcon,
  SunIcon,
  MoonIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useMode } from "../context/mode-context";

const Menu: React.FC = () => {
  // @ts-ignore
  const { user } = useAuth();
  // @ts-ignore
  const { appearance, setAppearance } = useMode();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signout");
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const menuItem = [
    {
      id: 0,
      icon: <UserIcon className="w-7 h-7"></UserIcon>,
      value: "Account details",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      id: 1,
      icon:
        appearance === "dark" ? (
          <SunIcon className="w-7 h-7"></SunIcon>
        ) : (
          <MoonIcon className="w-7 h-7"></MoonIcon>
        ),
      value: `${
        appearance === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }`,
      onClick: () => {
        setAppearance((prev: string) => (prev === "light" ? "dark" : "light"));
      },
    },
    {
      id: 2,
      icon: <EnvelopeIcon className="w-7 h-7"></EnvelopeIcon>,
      value: "Contact us",
    },
    {
      id: 3,
      icon: (
        <ArrowRightOnRectangleIcon className="w-7 h-7"></ArrowRightOnRectangleIcon>
      ),
      value: "Log out",
      onClick: handleSignOut,
    },
  ];
  return (
    <div onMouseLeave={() => setShow(false)} className="relative">
      <svg
        onMouseEnter={() => setShow(true)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={`${appearance === "dark" ? "#fff" : "#121212"}`}
        className={` z-50 w-12 h-12 `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <ul
        className={`absolute rounded-md right-0 ${
          appearance === "dark" ? "bg-[#202020] text-white" : "bg-white"
        } shadow-lg top-full w-60 z-50 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all text-[#333]`}
      >
        <li className="p-2 select-none break-words">
          <p>Email</p>
          <p>{user.email}</p>
        </li>
        {menuItem.length > 0 &&
          menuItem.map((item) => (
            <li
              key={item.id}
              onClick={item.onClick}
              className="flex items-center p-2 mt-2 cursor-pointer select-none gap-x-3 hover:bg-secondary hover:bg-opacity-80 hover:text-white"
            >
              {item.icon}
              <span className="text-md">{item.value}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Menu;
