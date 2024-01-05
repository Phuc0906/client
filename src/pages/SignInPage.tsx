import React, { useEffect } from "react";
import FormLayout from "../components/layout/FormLayout";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import * as yup from "yup";
import useToggle from "../hooks/useToggle";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import {FormValues} from "../react-app-env";
const validationSchema = yup.object().shape({
    fullname: yup.string(),
    email: yup.string().required(),
    password: yup.string().required(),
});

const SignInPage = () => {
    const navigate = useNavigate();
    const { value, toggle } = useToggle();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver<FormValues>(validationSchema),
        mode: "onChange",
    });
    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        if (!isValid) return;
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            navigate("/");
        } catch (error) {
            console.log(error);
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
                    Do not have an account yet?{" "}
                    <NavLink className="text-primary" to={"/sign-up"}>
                        Register account
                    </NavLink>
                </strong>
                <Button type="submit">Sign in</Button>
            </form>
        </FormLayout>
    );
};

export default SignInPage;
