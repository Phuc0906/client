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
            <div className="relative">
                <NavBar></NavBar>
                <div className="absolute top-0 left-[80px] inset-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
