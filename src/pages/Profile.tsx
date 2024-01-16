import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { UserIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import InfoDialog from "../components/infoDialog/InfoDialog";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  // @ts-ignore
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<
    "username" | "password" | "email"
  >("username");

  const handleEdit = (type: "username" | "password" | "email") => {
    setEditingType(type);
    setIsDialogOpen(true);
  };

  const handleSave = async (type: string, newInfo: string) => {
    if (type === "username") {
      await updateUsername(newInfo);
      setIsDialogOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else if (type === "password") {
      await updateUserPassword(newInfo);
      setIsDialogOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setIsDialogOpen(false);
    }
  };

  const updateUsername = async (newInfo: string) => {
    try {
      if (user) {
        await updateProfile(user, {
          displayName: newInfo,
        });
      }
      console.log("Profile updated successfully!");
      toast.success("Update successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Fail to update");
    }
  };

  const updateUserPassword = async (newInfo: string) => {
    try {
      if (user) {
        await updatePassword(user, newInfo);
      }
      console.log("Password updated successfully!");
      toast.success("Update successfully");
    } catch (error) {
      console.error("Error updating Password:", error);
      toast.error("Fail to update");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="h-full w-full bg-white">
      {user && (
        <div className="h-fit w-4/5 bg-white p-10">
          <div className="flex gap-5 items-center mb-5">
            <UserIcon className="w-9 h-9"></UserIcon>
            <h2 className="text-2xl font-semibold">Account details</h2>
          </div>
          <div className="flex-col ms-10">
            {/* Name */}
            <div className="grid grid-cols-3 ">
              <h4 className="font-medium">Name: </h4>
              {user.displayName}
              <div className="flex justify-end">
                <button
                  onClick={() => handleEdit("username")}
                  className="flex items-center gap-1 hover:scale-110 text-black bg-white w-fit shadow-none"
                >
                  <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
                  <span className="text-md">Edit</span>
                </button>
              </div>
            </div>

            <hr className="my-3"></hr>

            {/* Email */}
            <div className="grid grid-cols-3">
              <h4 className="font-medium">Email: </h4>
              {user.email}
              {/* <button
                className="flex items-center gap-1"
                onClick={() => handleEdit("email")}
              >
                <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
                <span className="text-md">Edit</span>
              </button> */}
            </div>

            <hr className="my-3"></hr>

            {/* Password */}
            <div className="grid grid-cols-3">
              <h4 className="font-medium">Password </h4>

              <div className="">
                <button
                  onClick={() => handleEdit("password")}
                  className="flex items-center gap-1 hover:scale-110 bg-white text-black w-fit shadow-none"
                >
                  <PencilSquareIcon className="w-5 h-5"></PencilSquareIcon>
                  <span className="text-md">Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDialogOpen && (
        <InfoDialog
          type={editingType}
          onSave={handleSave}
          onCancel={handleCancel}
          isOpen={isDialogOpen}
        />
      )}
    </div>
  );
};

export default Profile;
