import React, { ReactNode } from "react";
import Header from "../header/Header";
import NavBar from "../nav/NavBar";

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, ...props }) => {
    return (
        <div>
            <Header></Header>
            <div className=" grid grid-cols-[300px_minmax(0, 1fr)">
                <NavBar></NavBar>
            </div>
        </div>
    );
};

export default PageLayout;
