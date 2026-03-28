import { LanguageProvider } from "./context/LanguageContext";

import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Layout from "./components/Layout";

const App = () => {
    return (
        <LanguageProvider>
            <Layout>
                <Home />
                <About />
                <Projects />
                <Skills />
                <Contact />
            </Layout>
        </LanguageProvider>
    );
};

export default App;
