import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../button";

// const NavLinks = () => {
//   return (
//     <>
//       <div className="flex justify-between w-full">
//         <NavLink to="/document-converter">Main page</NavLink>
//         <div className="flex justify-between">
//           <NavLink to="/Sign-up" className="px-5">
//             Sign in
//           </NavLink>
//           <NavLink to="/Sign-in" className="px-5">
//             Sign up
//           </NavLink>
//         </div>
//       </div>
//     </>
//   );
// };

// const Nav = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <nav className="w-13 flex justify-end text-green">
//         <div className="hidden w-full md:flex justify-between">
//           <NavLinks />
//         </div>
//       </nav>
//       {isOpen && (
//         <div className="flex flex-col basis-full items-center">
//           <NavLinks />
//         </div>
//       )}
//     </>
//   );
// };

const Nav = () => {
  let Links = [
    { name: "SIGN IN", link: "/Sign-in" },
    { name: "SIGN UP", link: "/Sign-up" },
    // { name: "ABOUT", link: "/" },
    // { name: "BLOG'S", link: "/" },
    // { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full">
      <div className="md:flex items-center justify-between bg-white py-4  px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <NavLink to="/document-converter">LevelUp</NavLink>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-3 cursor-pointer md:hidden"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-10 h-10"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
