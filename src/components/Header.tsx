import { useState, useEffect } from "react";
import { LanguageSwitcher } from "../context/LanguageSwitcher";
import { Button } from "./Button";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useIsDesktop } from "./useIsDestop";
import { BiMenu, BiX } from "react-icons/bi";

const Header = () => {
    const isDesktop = useIsDesktop(1024);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shouldRenderMenu, setShouldRenderMenu] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            setShouldRenderMenu(true);
        } else if (shouldRenderMenu) {
            const timer = setTimeout(() => setShouldRenderMenu(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen, shouldRenderMenu]);

    useEffect(() => {
        if (isDesktop) {
            setIsMenuOpen(false);
        }
    }, [isDesktop]);

    const openMenu = () => {
        setShouldRenderMenu(true);

        setTimeout(() => {
            setIsMenuOpen(true);
        }, 0);
    };

    const navs = [
        { id: 1, name: "Home", href: "#home" },
        { id: 2, name: "About me", href: "#about" },
        { id: 3, name: "Skills", href: "#skills" },
        { id: 4, name: "Projects", href: "#href" },
        { id: 5, name: "Contact", href: "#contact" },
    ];

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="backdrop-blur-lg sticky top-0 left-0 right-0 flex items-center justify-between px-[4vw] py-4 border-b border-gray-800 z-50">
                <div className="font-bold text-xl flex items-center gap-6">
                    <a href="/" className="text-white transition-all duration-150 hover:scale-105">
                        <span className="text-violet-600">Dario.</span>
                        portfolio
                    </a>

                    <Button icon>
                        <FiGithub size={24} />
                    </Button>

                    <Button icon>
                        <FiLinkedin size={24} />
                    </Button>
                </div>

                {isDesktop && (
                    <div className="flex items-center gap-10">
                        <ul className="flex items-center gap-10 font-semibold text-md text-white">
                            {navs.map((nav) => (
                                <li
                                    key={nav.id}
                                    className="transition duration-150 hover:scale-110 hover:text-violet-600"
                                >
                                    <a href={nav.href}>{nav.name}</a>
                                </li>
                            ))}
                        </ul>
                        <LanguageSwitcher />
                    </div>
                )}

                {!isDesktop && (
                    <Button onClick={openMenu} aria-label="Abrir menú">
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
                        className={`relative w-4/5 max-w-xs ml-auto h-full bg-gray-900 shadow-xl flex flex-col p-6 transition-transform duration-300 ${
                            isMenuOpen ? "translate-x-0" : "translate-x-100"
                        }`}
                    >
                        <div className="flex justify-end">
                            <Button onClick={closeMenu} aria-label="Cerrar menú" className="p-2">
                                <BiX size={28} />
                            </Button>
                        </div>

                        <ul className="flex flex-col gap-6 mt-8 font-semibold text-white text-lg">
                            {navs.map((nav) => (
                                <li key={nav.id}>
                                    <a
                                        href={nav.href}
                                        onClick={closeMenu}
                                        className="block py-2 hover:text-violet-600 transition"
                                    >
                                        {nav.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-6 border-t border-gray-700">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
