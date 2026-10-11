import { useState } from "react";
import { MdCheck, MdContentCopy, MdGpsFixed } from "react-icons/md";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { BsGoogle, BsWhatsapp } from "react-icons/bs";

const EMAIL = "dariomartinezotano@gmail.com";
const PHONE_DISPLAY = "+53 5684 2449";
const PHONE_TEL = "5356842449";
const LOCATION = "La Havana, Cuba";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=La+Habana%2C+Cuba";

const socials = [
    { id: 1, name: "GitHub", href: "https://github.com/DarioM0715", icon: <FiGithub size={20} /> },
    {
        id: 2,
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/dario-martinez-otano-652833356",
        icon: <FiLinkedin size={20} />,
    },
];

const dataItems = [
    {
        id: "email",
        labelKey: "contact_email",
        value: EMAIL,
        href: `mailto:${EMAIL}`,
        icon: <BsGoogle size={22} />,
        action: "copy" as const,
    },
    {
        id: "phone",
        labelKey: "contact_phone",
        value: PHONE_DISPLAY,
        href: `https://wa.me/${PHONE_TEL}`,
        icon: <BsWhatsapp size={22} />,
        action: "copy" as const,
    },
    {
        id: "location",
        labelKey: "contact_location",
        value: LOCATION,
        href: MAPS_URL,
        icon: <MdGpsFixed size={22} />,
        action: "link" as const,
    },
];

const Contact = () => {
    const { t } = useLanguage();
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = async (id: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        } catch {
            setCopied(null);
        }
    };

    return (
        <div id="contact" className="flex flex-col justify-center py-32 lg:min-h-screen lg:py-0 gap-12 px-[6vw]">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl text-center font-bold title-glow">{t("contact_title")}</h2>
                <p className="text-lg font-semibold text-center">{t("contact_description")}</p>
            </div>

            <div className="card-glow mx-auto flex w-full max-w-4xl flex-col overflow-hidden md:flex-row">
                {/* Identidad */}
                <div className="flex flex-col items-center justify-center gap-4 border-b border-violet-500/20 bg-violet-500/5 p-8 md:w-2/5 md:border-b-0 md:border-r">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-4xl font-bold text-violet-400 shadow-[0_0_25px_rgba(124,58,237,0.45)]">
                        DM
                    </div>

                    <div className="text-center">
                        <p className="text-xl font-bold">Dario Martinez</p>
                        <p className="text-sm font-semibold text-violet-400">{t("contact_role")}</p>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.id}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.name}
                                className="btn-ghost flex items-center justify-center rounded-full p-2.5 transition-transform hover:-rotate-4 hover:scale-110"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Datos */}
                <ul className="flex flex-1 min-h-0 flex-col divide-y divide-violet-500/20">
                    {dataItems.map((item) => {
                        const isCopied = copied === item.id;

                        return (
                            <li
                                key={item.id}
                                className="flex min-h-20 flex-1 items-center gap-4 p-5 transition-colors hover:bg-violet-500/5"
                            >
                                <div className="icon-pill h-10 w-10 shrink-0 text-violet-400">
                                    <a href={item.href} target="_blank" rel="noreferrer" className="cursor-pointer">
                                        {item.icon}
                                    </a>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-(--muted)">
                                        {t(item.labelKey)}
                                    </p>
                                    <a
                                        href={item.href}
                                        target={item.action === "link" ? "_blank" : undefined}
                                        rel={item.action === "link" ? "noreferrer" : undefined}
                                        className="break-all font-semibold transition-colors hover:text-violet-400"
                                    >
                                        {item.value}
                                    </a>
                                </div>

                                {item.action === "copy" && (
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(item.id, item.value)}
                                        aria-label={`${t("contact_copy")} ${item.value}`}
                                        className="btn-ghost flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold"
                                    >
                                        {isCopied ? <MdCheck size={16} /> : <MdContentCopy size={16} />}
                                        <span className="hidden sm:inline">
                                            {isCopied ? t("contact_copied") : t("contact_copy")}
                                        </span>
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Contact;
