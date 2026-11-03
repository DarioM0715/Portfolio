import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

const App = () => {
    return (
        <LanguageProvider>
            <ThemeProvider>
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
            </ThemeProvider>
        </LanguageProvider>
    );
};

export default App;
