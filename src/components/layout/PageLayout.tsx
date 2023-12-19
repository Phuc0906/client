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
                <div className="fixed inset-0 top-[48px] right-0 bottom-0 left-[80px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
