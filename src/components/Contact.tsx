import { useState } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { MdContentCopy, MdGpsFixed } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

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
        id: "phone",
        labelKey: "contact_phone",
        value: PHONE_DISPLAY,
        href: `https://wa.me/${PHONE_TEL}`,
        icon: <BsWhatsapp size={22} />,
    },
    {
        id: "location",
        labelKey: "contact_location",
        value: LOCATION,
        href: MAPS_URL,
        icon: <MdGpsFixed size={23} />,
    },
];

const Contact = () => {
    const { t } = useLanguage();
    const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopyStatus("success");
        } catch {
            setCopyStatus("error");
        }
        setTimeout(() => setCopyStatus("idle"), 1800);
    };

    return (
        <>
            <section id="contact" className="contact-section page-gutter relative py-20">
                <div className="contact-section-backdrop absolute inset-0" />

                <div className="contact-section-content relative mx-auto flex w-full max-w-7xl flex-col gap-8">
                    <header className="contact-section-heading flex flex-col gap-3">
                        <span className="contact-section-eyebrow">{t("contact_eyebrow")}</span>
                        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">{t("contact_title")}</h2>
                    </header>

                    <div className="contact-card grid w-full overflow-hidden rounded-2xl">
                        <div className="contact-card-main flex flex-col justify-between gap-10">
                            <div className="contact-profile flex items-center gap-6">
                                <div className="contact-avatar flex h-24 w-24 items-center justify-center rounded-full text-2xl font-black">
                                    DM
                                </div>

                                <div className="contact-profile-copy flex min-w-0 flex-col items-start gap-2">
                                    <h3 className="contact-name text-2xl font-bold text-white sm:text-3xl">Dario Martinez Otaño</h3>
                                    <p className="text-base font-medium text-white/65">{t("contact_role")}</p>

                                    <div className="contact-social-links mt-1 flex gap-2">
                                        {socials.map((social) => (
                                            <a
                                                key={social.id}
                                                href={social.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={social.name}
                                                className="btn-ghost contact-social-link flex items-center justify-center"
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="contact-details-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {dataItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="contact-detail-card flex min-w-0 items-center gap-4 rounded-xl p-4"
                                    >
                                        <span className="contact-detail-icon flex items-center justify-center rounded-lg p-2.5">
                                            {item.icon}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-xs font-medium uppercase tracking-wide text-white/45">
                                                {t(item.labelKey)}
                                            </span>
                                            <span className="mt-1 block break-words font-semibold text-white">
                                                {item.value}
                                            </span>
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <aside className="contact-card-cta flex flex-col items-start">
                            <span className="contact-availability">
                                <span className="contact-availability-dot" />
                                {t("contact_availability")}
                            </span>
                            <p className="contact-cta-eyebrow">{t("contact_cta_eyebrow")}</p>
                            <h3 className="contact-cta-title">{t("about_question")}</h3>
                            <p className="contact-cta-description">{t("contact_description")}</p>

                            <div className="contact-email flex w-full items-center gap-3 rounded-xl px-3 py-2.5">
                                <span className="min-w-0 flex-1 break-all text-sm font-medium text-white">{EMAIL}</span>
                                <button
                                    type="button"
                                    className="btn-ghost contact-copy-button"
                                    onClick={() => handleCopy(EMAIL)}
                                    title={t("contact_copy")}
                                    aria-label={t("contact_copy")}
                                >
                                    <MdContentCopy size={17} />
                                </button>
                            </div>

                            <a
                                href="/Dario_Martinez_Otano_CV.pdf"
                                download
                                className="btn-primary contact-cv-link mt-3 w-full rounded-lg px-5 py-3"
                            >
                                {t("nav_downloadCv")}
                            </a>
                        </aside>
                    </div>
                </div>
            </section>

            <div
                role="status"
                aria-live="polite"
                className={`contact-toast fixed top-24 left-1/2 z-[9999] -translate-x-1/2 transition-all duration-500 ${
                    copyStatus !== "idle" ? "is-visible" : ""
                }`}
            >
                <span>{t(copyStatus === "error" ? "contact_copy_failed" : "contact_copied")}</span>
            </div>
        </>
    );
};

export default Contact;
