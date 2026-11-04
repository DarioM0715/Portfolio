import Header from "./Header";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="text-(--text) relative min-h-screen">
            <Header />
            <div className="flex flex-col">{children}</div>
        </div>
    );
};

export default Layout;
