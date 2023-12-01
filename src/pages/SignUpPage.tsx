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
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
    fullname: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
});

const SignUpPage = () => {
    const { value, toggle } = useToggle();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
        resolver: yupResolver<FormValues>(validationSchema),
        mode: "onChange",
    });
    const onSubmit: SubmitHandler<FormValues> = (values) => {
        if (isValid) {
            console.log(values);
        }
    };

    useEffect(() => {
        const errorArr = Object.values(errors);
        if (errorArr.length > 0) {
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
                        onClick={toggle}
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
                <Button type="submit">Sign up</Button>
            </form>
        </FormLayout>
    );
};

export default SignUpPage;
