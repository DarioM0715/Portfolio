import { useState, useEffect } from "react";
import { LanguageSwitcher } from "../context/LanguageSwitcher";
import { Button } from "./Button";
import { FiGithub, FiLinkedin} from "react-icons/fi";
import { useIsDesktop } from "./useIsDestop";
import { useLockBodyScroll } from "./useLockBodyScroll";
import { BiMenu } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";
import { ChevronRight, X } from "lucide-react";

const Header = () => {
    const { t } = useLanguage();
    const isDesktop = useIsDesktop(1024);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shouldRenderMenu, setShouldRenderMenu] = useState(false);

    useLockBodyScroll(isMenuOpen);

    const [wasDesktop, setWasDesktop] = useState(isDesktop);
    if (isDesktop !== wasDesktop) {
        setWasDesktop(isDesktop);
        if (isDesktop) setIsMenuOpen(false);
    }

    useEffect(() => {
        if (!isMenuOpen && shouldRenderMenu) {
            const timer = setTimeout(() => setShouldRenderMenu(false), 350);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen, shouldRenderMenu]);

    const openMenu = () => {
        setShouldRenderMenu(true);

        setTimeout(() => {
            setIsMenuOpen(true);
        }, 0);
    };

    const navs = [
        { id: 1, name: t("nav_home"), href: "#home" },
        { id: 2, name: t("nav_about"), href: "#about" },
        { id: 3, name: t("nav_projects"), href: "#projects" },
        { id: 4, name: t("nav_contact"), href: "#contact" },
    ];

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="site-header fixed top-0 left-0 right-0 flex items-center justify-between px-[6vw] py-6 z-20 border-b border-white/10 bg-default">
                <div className="font-bold text-xl flex items-center gap-6">
                    <a href="/Portfolio/" className="transition-all duration-150 hover:scale-105">
                        <span className="title-glow">Dario.</span>
                        <span className="text-white">portfolio</span>
                    </a>

                    {isDesktop && 
                    <>
                        <Button icon className="">
                            <a href="https://github.com/DarioM0715" target="_blank">
                                <FiGithub size={24} />
                            </a>
                        </Button>

                        <Button icon className="">
                            <a href="https://www.linkedin.com/in/dario-martinez-otano-652833356" target="_blank">
                                <FiLinkedin size={24} />
                            </a>
                        </Button>

                      
                    </>
                    }
                    
                </div>

                {isDesktop && (
                    <div className="text-lg flex items-center gap-6">
                        <ul className="flex items-center gap-10 font-semibold text-md">
                            {navs.map((nav) => (
                                <li key={nav.id} className="duration-150 hover:scale-110">
                                    <a href={nav.href}>{nav.name}</a>
                                </li>
                            ))}
                        </ul>

                        <LanguageSwitcher />

                        {/* Theme toggle */}
                        {/* <ThemeToggleButton /> */}
                    </div>
                )}

                {!isDesktop && (
                    <Button
                        className="mobile-menu-trigger btn-ghost rounded-full p-2 transition-all duration-150 hover:scale-110"
                        onClick={openMenu}
                        aria-label={t("mobile_nav_heading")}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <BiMenu size={24} />
                    </Button>
                )}
            </header>

            {!isDesktop && shouldRenderMenu && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className={`mobile-menu-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                            isMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                    <div
                        id="mobile-navigation"
                        className={`mobile-menu-panel ${isMenuOpen ? "is-open" : ""}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t("mobile_nav_heading")}
                    >
                        <div className="mobile-menu-header flex items-center justify-between">
                            <a href="/Portfolio/" className="mobile-menu-brand" onClick={closeMenu}>
                                <span>Dario.</span>portfolio
                            </a>
                            <button type="button" className="mobile-menu-close" aria-label={t("projects_close")} onClick={closeMenu}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mobile-menu-intro">
                            <span>{t("mobile_nav_heading")}</span>
                            <div className="mobile-menu-intro-line" />
                        </div>

                        <nav className="mobile-menu-nav" aria-label={t("mobile_nav_heading")}>
                            <ul>
                                {navs.map((nav, index) => (
                                    <li key={nav.id}>
                                        <a href={nav.href} onClick={closeMenu} className="mobile-menu-link">
                                            <span className="mobile-menu-link-number">{String(index + 1).padStart(2, "0")}</span>
                                            <span className="mobile-menu-link-label">{nav.name}</span>
                                            <ChevronRight className="mobile-menu-link-arrow" size={18} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="mobile-menu-footer mt-auto flex items-center justify-between">
                            <LanguageSwitcher />

                            <div className="flex items-center gap-2">
                                <a className="mobile-menu-social" href="https://github.com/DarioM0715" target="_blank" rel="noreferrer" aria-label="GitHub">
                                    <FiGithub size={19} />
                                </a>
                                <a className="mobile-menu-social" href="https://www.linkedin.com/in/dario-martinez-otano-652833356" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                    <FiLinkedin size={19} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
