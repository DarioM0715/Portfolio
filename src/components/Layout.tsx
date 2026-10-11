import Header from "./Header";

const Layout = ({ children }: any) => {
    return (
        <div className="text-(--text) bg-(--bg)">
            <Header />
            <div className="flex flex-col">{children}</div>
        </div>
    );
};

export default Layout;
