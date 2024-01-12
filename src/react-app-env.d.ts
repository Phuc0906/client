/// <reference types="react-scripts" />
import {Dispatch, SetStateAction} from "react";

type FormValues = {
    fullname?: string;
    email: string;
    password: string;
};
interface Coordinate {
    bottom?: number;
    left?: number;
    width: number;
}
interface userInputProp {
    className?: string;
    setText?: Dispatch<SetStateAction<string>>;
    editable?: boolean,
    placeholder?: string,
    value?: string
}
