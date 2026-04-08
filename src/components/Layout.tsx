import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
    return (
        <div className="text-white bg-gray-900">
            <Header />
            <div className="flex flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
