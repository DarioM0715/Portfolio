import { LanguageProvider } from "./context/LanguageContext";

import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

const App = () => {
    return (
        <LanguageProvider>
            <Layout>
                <Home />
                <div className="portfolio-sections-background">
                    <About />
                    <div className="portfolio-after-about">
                        <Projects />
                        <Contact />
                        <Footer />
                    </div>
                </div>
            </Layout>
        </LanguageProvider>
    );
};

export default App;
