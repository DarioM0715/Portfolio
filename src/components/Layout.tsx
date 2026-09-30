import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
    return (
        <div className="text-(--text) bg-(--bg)">
            <Header />
            <div className="flex flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
