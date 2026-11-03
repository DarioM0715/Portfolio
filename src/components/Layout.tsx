import Header from "./Header";

const Layout = ({ children }: any) => {
    return (
        <div className="text-(--text) relative min-h-screen">
            <Header />
            <div className="flex flex-col">{children}</div>
        </div>
    );
};

export default Layout;
