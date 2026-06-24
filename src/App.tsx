import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Layout from "./components/Layout";

const App = () => {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <Layout>
                    <Home />
                    <About />
                    <Projects />
                    <Skills />
                    <Contact />
                </Layout>
            </ThemeProvider>
        </LanguageProvider>
    );
};

export default App;
