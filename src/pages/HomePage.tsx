import React, { useContext, useEffect, useRef, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import DocumentCard from "../components/document/DocumentCard";
import axios from "axios";
import { FileProps } from "../typing/File";
import PageLayout from "../components/layout/PageLayout";
import Line from "../components/portal/Line";
import HeaderUserInput from "../module/HeaderUserInput";
import UserInput from "../module/UserInput";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const myRef = useRef<HTMLInputElement | null>(null);
    // @ts-ignore
    const { user } = useAuth();
    const [userFiles, setUserFiles] = useState<FileProps[]>([]);
    const [coordinate, setCoordinate] = useState<Coordinate>({
        width: 0,
    });
    const focusInput = () => {
        if (myRef.current) {
            myRef.current.focus();
        }
    };
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/file?uid=${user?.uid}`)
            .then((res) => {
                console.log(res.data);
                setUserFiles(res.data);
            })
            .catch((err) => {});
    }, [user]);

    useEffect(() => {
        focusInput();
        if (myRef.current) {
            const { bottom, left, width } =
                myRef.current.getBoundingClientRect();
            setCoordinate({ bottom, left, width });
        }

        return () => {
            focusInput();
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const targetElement = e.currentTarget;
        const { bottom, left, width } = targetElement.getBoundingClientRect();
        setCoordinate({ bottom, left, width });
    };

    return (
        <PageLayout>
            <div className="flex flex-col max-w-3xl gap-4 py-10 mx-auto">
                <HeaderUserInput></HeaderUserInput>
                <UserInput></UserInput>
            </div>
        </PageLayout>
    );
};

export default HomePage;
