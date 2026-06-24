import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
    return (
        <div style={{ color: "var(--text)", background: "var(--bg)" }}>
            <Header />
            <div className="flex flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
