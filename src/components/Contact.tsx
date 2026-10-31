import { MdContentCopy, MdGpsFixed } from "react-icons/md";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { BsWhatsapp } from "react-icons/bs";

const PHONE_DISPLAY = "+53 5684 2449";
const PHONE_TEL = "5356842449";
const LOCATION = "La Havana, Cuba";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=La+Habana%2C+Cuba";

const socials = [
    { id: 1, name: "GitHub", href: "https://github.com/DarioM0715", icon: <FiGithub size={32} /> },
    {
        id: 2,
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/dario-martinez-otano-652833356",
        icon: <FiLinkedin size={32} />,
    },
];

const dataItems = [
    {
        id: "phone",
        labelKey: "contact_phone",
        value: PHONE_DISPLAY,
        href: `https://wa.me/${PHONE_TEL}`,
        icon: <BsWhatsapp size={32} />,
        action: "copy" as const,
    },
    {
        id: "location",
        labelKey: "contact_location",
        value: LOCATION,
        href: MAPS_URL,
        icon: <MdGpsFixed size={32} />,
        action: "link" as const,
    },
];

const Contact = () => {
    const { t } = useLanguage();

    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {

        }
    };

    return (
        <div id="contact" className="flex flex-col items-center justify-center lg:min-h-screen gap-12 px-[6vw] bg-window">
            <div className="card-glow mx-auto flex w-full flex-col overflow-hidden border border-gray-500 rounded-2xl">

                <div className="flex items-center justify-between p-4">
                    <div className="font-bold flex items-center gap-4 rounded-full bg-black py-1 px-4 border-2 border-gray-500">
                        UUID: dariomartinezotano@gmail.com
                        <button className="cursor-pointer" onClick={() => handleCopy("dariomartinezotano@gmail.com")}>
                            <MdContentCopy size={20}/>
                        </button>
                    </div>

                    <div className="cursor-pointer font-bold rounded-full bg-black py-1 px-4 border-2 border-gray-500">
                        {t("nav_downloadCv")}
                    </div>
                </div>
                
                <div className="flex flex-col border border-gray-500 rounded-2xl p-4 gap-4">

                    <div className="flex flex-col border border-gray-500 rounded-2xl">
                        <div className="flex flex-col border border-gray-500 px-8 py-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="font-black flex h-28 w-28 items-center justify-center rounded-full border border-gray-500 text-4xl">
                                    DM
                                </div>

                                <div className="">
                                    <p className="text-xl font-bold">Dario Martinez</p>
                                    <p className="text-sm font-semibold">{t("contact_role")}</p>
                                </div>
                            </div>

                            <div className="mt-5 flex gap-10">
                                {socials.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.name}
                                        className="icon-pill flex items-center justify-center p-2.5"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="px-8 py-2">
                            <p className="text-lg font-semibold">{t("contact_description")}</p>
                        </div>
                    </div>

                    <ul className="flex items-center gap-10 min-h-0 rounded-2xl">
                        {dataItems.map((item) => {
                            return (
                                <li key={item.id} className="flex items-center border-2 border-gray-500 rounded-4xl">
                                    <div className="p-2 border-r-2 border-t-2 border-b-2 border-gray-500 rounded-4xl">
                                        <a href={item.href} target="_blank" rel="noreferrer" className="cursor-pointer">
                                            {item.icon}
                                        </a>
                                    </div>

                                    <div className="min-w-0 flex-1 pl-3 pr-5">
                                        <p className="text-xs font-semibold tracking-wide text-(--muted)">
                                            {t(item.labelKey)}
                                        </p>
                                        <a
                                            href={item.href}
                                            target={item.action === "link" ? "_blank" : undefined}
                                            rel={item.action === "link" ? "noreferrer" : undefined}
                                            className="break-all font-semibold transition-colors"
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Contact;
