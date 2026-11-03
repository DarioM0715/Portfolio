import { useState, useEffect } from "react";
import { LanguageSwitcher } from "../context/LanguageSwitcher";
import { Button } from "./Button";
import { FiGithub, FiLinkedin} from "react-icons/fi";
import { useIsDesktop } from "./useIsDestop";
import { useLockBodyScroll } from "./useLockBodyScroll";
import { BiMenu } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";
import { X } from "lucide-react";

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
            const timer = setTimeout(() => setShouldRenderMenu(false), 300);
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
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-[6vw] py-6 z-20 border-b border-white/10 bg-default">
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
                        className="btn-ghost rounded-full p-2 transition-all duration-150 hover:scale-110"
                        onClick={openMenu}
                        aria-label="Abrir menú"
                    >
                        <BiMenu size={24} />
                    </Button>
                )}
            </header>

            {!isDesktop && shouldRenderMenu && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                            isMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                    <div
                        className={`relative w-4/5 max-w-xs ml-auto h-full bg-(--surface) shadow-xl flex flex-col gap-10 p-6 transition-transform duration-300 zz-pattern ${
                            isMenuOpen ? "translate-x-0" : "translate-x-100"
                        }`}
                    >
                        {/* CLOSE BUTTON */}
                        <div className="flex justify-end">
                            <button type="button" className="close-button" aria-label="Cerrar portafolio" onClick={closeMenu}>
                              <X size={30} strokeWidth={4} />
                            </button>
                        </div>

                        <ul className="flex flex-col gap-1 overflow-y-auto pb-3">
                          {navs.map((nav) => {
                            return (
                              <a key={nav.id} href={nav.href} onClick={closeMenu} className="project-link">
                               {nav.name}
                              </a>
                            );
                          })}
                        </ul>

                        <div className="mt-auto pt-6 border-t border-violet-500/10 flex items-center justify-between">
                            <LanguageSwitcher />

                            <div className="flex items-center gap-4">
                                <Button icon className="btn-ghost rounded-full p-2">
                                    <a href="https://github.com/DarioM0715" target="_blank">
                                        <FiGithub size={24} />
                                    </a>
                                </Button>

                                <Button icon className="btn-ghost rounded-full p-2">
                                    <a href="https://www.linkedin.com/in/dario-martinez-otano-652833356" target="_blank">
                                        <FiLinkedin size={24} />
                                    </a>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
