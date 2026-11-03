import { MdContentCopy, MdGpsFixed } from "react-icons/md";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { BsWhatsapp } from "react-icons/bs";
import { useState } from "react";

const PHONE_DISPLAY = "+53 5684 2449";
const PHONE_TEL = "5356842449";
const LOCATION = "La Havana, Cuba";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=La+Habana%2C+Cuba";

const socials = [
    { id: 1, name: "GitHub", href: "https://github.com/DarioM0715", icon: <FiGithub size={28} /> },
    {
        id: 2,
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/dario-martinez-otano-652833356",
        icon: <FiLinkedin size={28} />,
    },
];

const dataItems = [
    {
        id: "phone",
        labelKey: "contact_phone",
        value: PHONE_DISPLAY,
        href: `https://wa.me/${PHONE_TEL}`,
        icon: <BsWhatsapp size={28} />,
        action: "copy" as const,
    },
    {
        id: "location",
        labelKey: "contact_location",
        value: LOCATION,
        href: MAPS_URL,
        icon: <MdGpsFixed size={28} />,
        action: "link" as const,
    },
];

const Contact = () => {
    const { t } = useLanguage();
    const [showToast, setShowToast] = useState(false);

    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 1800);
        } catch {

        }
    };

    return (
        <>
            <div id="contact" className="relative flex flex-col items-center justify-center lg:min-h-screen gap-12 px-[6vw] py-16">
                <div className="contact-section-backdrop absolute inset-0" />
                
                <div className="contact-card relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-xl z-10 border border-white/20 bg-[#111111]">

                    <div className="contact-card-header flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-white/10">
                        <div className="contact-email flex items-center gap-3 rounded-lg bg-black py-2 px-4 border border-white/20">
                            <span className="text-sm font-medium text-white">dariomartinezotano@gmail.com</span>
                            <button 
                                className="btn-ghost contact-copy-button cursor-pointer"
                                onClick={() => handleCopy("dariomartinezotano@gmail.com")}
                                title={t("contact_copy")}
                            >
                                <MdContentCopy size={18}/>
                            </button>
                        </div>

                    <a
                        href="/Dario_Martinez_Otano_CV.pdf" 
                        download 
                        className="btn-primary cursor-pointer rounded-lg py-2 px-6"
                    >
                        {t("nav_downloadCv")}
                    </a>
                </div>
                
                <div className="contact-card-body flex flex-col p-6 sm:p-8 gap-6">

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="contact-avatar relative font-black flex h-24 w-24 items-center justify-center rounded-full text-2xl bg-black border border-white/30">
                                DM
                            </div>

                            <div className="flex flex-col items-center sm:items-start gap-2">
                                <p className="text-2xl font-bold text-white">Dario Martinez Otano</p>
                                <p className="text-base font-medium text-white/80">{t("contact_role")}</p>
                                
                                <div className="contact-social-links mt-2 flex gap-3">
                                    {socials.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={social.name}
                                            className="btn-ghost contact-social-link flex items-center justify-center p-2.5"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="contact-description p-4 rounded-lg border border-white/10 flex flex-col gap-2">
                            <p className="text-base font-medium text-white/90 leading-relaxed">{t("contact_description")}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {dataItems.map((item) => {
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    target={item.action === "link" ? "_blank" : undefined}
                                    rel={item.action === "link" ? "noreferrer" : undefined}
                                    className="contact-detail-card flex items-center gap-4 p-4 rounded-lg border border-white/20 bg-black"
                                >
                                    <div className="contact-detail-icon p-2 rounded-lg border border-white/20">
                                        {item.icon}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium tracking-wide text-white/50 uppercase">
                                            {t(item.labelKey)}
                                        </p>
                                        <p className="font-semibold text-white">
                                            {item.value}
                                        </p>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>

        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-500 ${
                showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-black/90 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                <span className="text-sm font-medium text-white">{t("contact_copied")}</span>
            </div>
        </div>
        </>
    );
};

export default Contact;
