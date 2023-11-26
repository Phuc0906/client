import React from "react";
import FormLayout from "../components/layout/FormLayout";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import useToggle from "../hooks/useToggle";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/button";

const SignUpPage = () => {
    const { value, toggle } = useToggle();
    return (
        <FormLayout>
            <form className="max-w-[600px] w-full mx-auto mt-5" action="submit">
                <Field>
                    <Label htmlFor="fullname">Fullname</Label>
                    <Input
                        name="fullname"
                        type="text"
                        placeholder="Enter your fullname"></Input>
                </Field>
                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        onClick={toggle}
                        name="email"
                        placeholder="Enter your email"></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
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
                <Button>Sign up</Button>
            </form>
        </FormLayout>
    );
};

export default SignUpPage;
