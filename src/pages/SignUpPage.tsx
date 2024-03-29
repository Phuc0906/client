import FormLayout from "../components/layout/FormLayout";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import useToggle from "../hooks/useToggle";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import {FormValues} from "../react-app-env";

const validationSchema = yup.object().shape({
    fullname: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
});

const SignUpPage = () => {
    const { value, toggle } = useToggle();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
        resolver: yupResolver<FormValues>(validationSchema),
        mode: "onChange",
    });
    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        if (!isValid) return;
        try {
            await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
        } catch (err) {
            console.log(err);
        }
        const currentUser = auth.currentUser;
        if (currentUser) {
            await updateProfile(currentUser, {
                displayName: values.fullname,
            });
            const colRef = collection(db, "users");
            await addDoc(colRef, {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                uid: currentUser.uid,
                activate: -1
            });
            toast.success("Register successfully");
        } else {
            console.log("User is null");
        }
    };

    useEffect(() => {
        const errorArr = Object.values(errors);
        if (errorArr.length > 0) {
            // @ts-ignore
            toast.error(errorArr[0].message);
        }
    }, [errors]);

    return (
        <FormLayout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[600px] w-full mx-auto mt-5"
                action="submit">
                <Field>
                    <Label htmlFor="fullname">Fullname</Label>
                    <Input
                        control={control}
                        name="fullname"
                        type="text"
                        placeholder="Enter your fullname"></Input>
                </Field>
                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        control={control}
                        name="email"
                        placeholder="Enter your email"></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        control={control}
                        onClick={toggle}
                        name="password"
                        type={value ? "text" : "password"}
                        placeholder="Enter your password">
                        {value ? (
                            <EyeIcon></EyeIcon>
                        ) : (
                            <EyeSlashIcon></EyeSlashIcon>
                        )}
                    </Input>
                </Field>
                <strong className="block mb-5 text-center">
                    You have an account already?{" "}
                    <NavLink className="text-primary" to={"/sign-in"}>
                        Login here!
                    </NavLink>
                </strong>
                <Button
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit">
                    Sign up
                </Button>
            </form>
        </FormLayout>
    );
};

export default SignUpPage;
