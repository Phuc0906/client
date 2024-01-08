import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface InfoDialogProps {
  type: "username" | "password" | "email";
  onSave: (type: "username" | "password" | "email", newInfo: string) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  type,
  onSave,
  onCancel,
  isOpen,
}) => {
  const validationSchema = yup.object().shape({
    newInfo:
      type === "email"
        ? yup.string().email("Invalid email").required("Email is required")
        : yup.string().required("Field is required"),
  });

  const { handleSubmit, register, setValue, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors, isValid } = formState;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onSave(type, data.newInfo);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white shadow-md rounded z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <label className="block mt-4">
          New{" "}
          {type === "username"
            ? "Username"
            : type === "email"
            ? "Email"
            : "Password"}
          :
          <input
            type={type === "password" ? "password" : "text"}
            {...register("newInfo")}
            className={`block w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 ${
              errors.newInfo ? "border-red-500" : ""
            }`}
          />
          {errors.newInfo && (
            <span className="text-red-500 text-sm">
              {errors.newInfo.message}
            </span>
          )}
        </label>
        <div className="mt-6 flex justify-end">
          {isValid && (
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded hover:bg-green-600 focus:outline-none bg-green-500`}
            >
              Save
            </button>
          )}
          <button
            type="button"
            onClick={handleCancel}
            className="ml-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
      )}
    </>
  );
};

export default InfoDialog;
