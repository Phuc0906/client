import React from "react";
import { useAuth } from "../context/auth-context";
import { UserIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Profile: React.FC = () => {
  // @ts-ignore
  const { user } = useAuth();

  const edit = () => {
    alert("Function pending");
  };

  console.log(user);
  return (
    <div className="h-full flex bg-[#F3F5F9]">
      <div className="h-fit w-4/5 bg-white m-auto rounded-md shadow-md flex-col p-10">
        <div className="flex gap-5 items-center mb-5">
          <UserIcon className="w-5 h-5"></UserIcon>
          <h4 className="font-semibold">Account details</h4>
        </div>
        <div className="flex-col ms-10 w-4/5">
          {/* Name */}
          <div className="flex justify-between ">
            <h4 className="font-medium">Name: </h4>
            {user.displayName}
            <button className="flex items-center gap-1" onClick={edit}>
              <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
              <span className="text-md">Edit</span>
            </button>
          </div>

          <hr className="my-3"></hr>

          {/* Email */}
          <div className="flex justify-between ">
            <h4 className="font-medium">Email: </h4>
            {user.email}
            <button className="flex items-center gap-1" onClick={edit}>
              <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
              <span className="text-md">Edit</span>
            </button>
          </div>

          <hr className="my-3"></hr>

          {/* Password */}
          <div className="flex justify-between ">
            <h4 className="font-medium">Password: </h4>
            <button className="flex items-center gap-1" onClick={edit}>
              <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
              <span className="text-md">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
