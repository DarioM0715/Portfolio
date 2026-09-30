import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { MdEmail, MdGpsFixed, MdPhone } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./Button";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type FormStatus = "idle" | "sending" | "success" | "error";

const Contact = () => {
    const { t } = useLanguage();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.warn("EmailJS env vars are not configured");
            setStatus("error");
            return;
        }

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: name,
                    from_email: email,
                    message,
                },
                { publicKey: PUBLIC_KEY },
            );
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <div id="contact" className="flex flex-col justify-center py-32 lg:min-h-screen lg:py-0 gap-8 px-[6vw]">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold title-glow">{t("contact_title")}</h2>
                <p className="text-lg font-semibold text-center">{t("contact_description")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ul className="flex flex-col gap-8">
                    {/* Email */}
                    <li className="flex card-glow p-4 gap-4 h-full hover:-translate-y-1">
                        <div className="icon-pill h-10 w-10 text-violet-400">
                            <MdEmail size={24} />
                        </div>

                        <div className="flex flex-col text-md font-semibold">
                            <p>{t("contact_email")}</p>

                            <div className="flex flex-col">
                                <a href="mailto:dariomartinezotano@gmail.com" className="hover:text-violet-400 transition-colors">
                                    dariomartinezotano@gmail.com
                                </a>
                                <a
                                    href="mailto:dariomartinezotano@gmail.com"
                                    className="text-violet-600 hover:underline cursor-pointer"
                                >
                                    {t("contact_sendMessage")}
                                </a>
                            </div>
                        </div>
                    </li>

                    {/* Phone */}
                    <li className="flex card-glow p-4 gap-4 h-full hover:-translate-y-1">
                        <div className="icon-pill h-10 w-10 text-violet-400">
                            <MdPhone size={24} />
                        </div>

                        <div className="flex flex-col text-md font-semibold">
                            <p>{t("contact_phone")}</p>

                            <div className="flex flex-col">
                                <a href="tel:+5356842449" className="hover:text-violet-400 transition-colors">
                                    +53 5684 2449
                                </a>
                                <a href="tel:+5356842449" className="text-violet-600 hover:underline cursor-pointer">
                                    {t("contact_sendMessage")}
                                </a>
                            </div>
                        </div>
                    </li>

                    {/* Location */}
                    <li className="flex card-glow p-4 gap-4 h-full hover:-translate-y-1">
                        <div className="icon-pill h-10 w-10 text-violet-400">
                            <MdGpsFixed size={24} />
                        </div>

                        <div className="flex flex-col text-md font-semibold">
                            <p>{t("contact_location")}</p>
                            <p>La Havana, Cuba</p>
                        </div>
                    </li>
                </ul>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-5 card-glow" noValidate={false}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="contact-name" className="font-semibold">
                            {t("contact_name")}
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            className="input-glow p-2"
                            placeholder={t("contact_namePlaceholder")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            minLength={2}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="contact-email" className="font-semibold">
                            {t("contact_emailLabel")}
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            className="input-glow p-2"
                            placeholder={t("contact_emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="contact-message" className="font-semibold">
                            {t("contact_messageLabel")}
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            className="input-glow p-2 min-h-32 resize-y"
                            placeholder={t("contact_messagePlaceholder")}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            minLength={10}
                        />
                    </div>

                    <div className="min-h-8" aria-live="polite">
                        {status === "success" && (
                            <p className="text-sm font-semibold text-violet-400">{t("contact_success")}</p>
                        )}
                        {status === "error" && (
                            <p className="text-sm font-semibold text-red-400">{t("contact_error")}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="btn-primary p-2 hover:-translate-y-1 font-semibold disabled:opacity-50 disabled:pointer-events-none"
                        disabled={status === "sending"}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {status === "sending" && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            )}
                            {t("contact_sendBtn")}
                        </span>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;