import React from "react";
import Header from "../header/Header";
import NavBar from "../nav/NavBar";
import { Outlet } from "react-router-dom";
import { useMode } from "../../context/mode-context";
import DownloadStatusModal from "../modal/DownloadStatusModal";
import {RequestPremiumModal} from "../modal";
import DeleteStatusModal from "../modal/DeleteStatusModal";

const PageLayout: React.FC = () => {
    // @ts-ignore
    const { appearance } = useMode();
    return (
        <div >
            <Header className={`${appearance}`}></Header>
            <div className="relative">
                <NavBar></NavBar>
                <div
                    className={`fixed inset-0 top-[48px] right-0 bottom-0 left-[80px] ${
                        appearance === "dark" ? "bg-[#121212]" : ""
                    } overflow-scroll`}>
                    <Outlet></Outlet>
                </div>
                <DownloadStatusModal/>
                <RequestPremiumModal/>
                <DeleteStatusModal/>
            </div>
        </div>
    );
};

export default PageLayout;
