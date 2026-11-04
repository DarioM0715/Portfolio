import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="portfolio-footer page-gutter">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex max-w-xl flex-col gap-2">
                    <a className="portfolio-footer-brand w-fit text-lg font-black tracking-tight" href="#home">
                        Dario<span>.</span>portfolio
                    </a>
                    <p className="text-sm leading-relaxed text-white/55">{t("footer_description")}</p>
                    <p className="text-xs text-white/40">{t("footer_copyright")}</p>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        className="portfolio-footer-link"
                        href="https://github.com/DarioM0715"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                    >
                        <FiGithub size={18} />
                    </a>
                    <a
                        className="portfolio-footer-link"
                        href="https://www.linkedin.com/in/dario-martinez-otano-652833356"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FiLinkedin size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
