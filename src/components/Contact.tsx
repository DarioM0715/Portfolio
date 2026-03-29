import { MdEmail, MdGpsFixed, MdPhone } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
    const { t } = useLanguage();
    return (
        <div id="contact" className="flex flex-col justify-center min-h-screen gap-8">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold text-violet-600">{t("contact_title")}</h2>
                <p className="text-lg font-semibold text-center">{t("contact_description")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ul className="flex flex-col gap-8">
                    {/* Email */}
                    <li className="flex border border-gray-700 rounded-md p-4 gap-4">
                        <div className="bg-gray-600 h-10 w-10 flex items-center justify-center rounded-md">
                            <MdEmail size={24} />
                        </div>

                        <div className="flex flex-col text-md font-semibold">
                            <p>{t("contact_email")}</p>

                            <div className="flex flex-col">
                                <p>martinezotano@gmail.com</p>
                                <a className="text-violet-600 hover:underline cursor-pointer">
                                    {t("contact_sendMessage")}
                                </a>
                            </div>
                        </div>
                    </li>

                    {/* Phone */}
                    <li className="flex border border-gray-700 rounded-md p-4 gap-4">
                        <div className="bg-gray-600 h-10 w-10 flex items-center justify-center rounded-md">
                            <MdPhone size={24} />
                        </div>

                        <div className="flex flex-col text-md font-semibold">
                            <p>{t("contact_phone")}</p>

                            <div className="flex flex-col">
                                <p>+53 5684 2449</p>
                                <a className="text-violet-600 hover:underline cursor-pointer">
                                    {t("contact_sendMessage")}
                                </a>
                            </div>
                        </div>
                    </li>

                    {/* Location */}
                    <li className="flex border border-gray-700 rounded-md p-4 gap-4">
                        <div className="bg-gray-600 h-10 w-10 flex items-center justify-center rounded-md">
                            <MdGpsFixed size={24} />
                        </div>

                        <div className="flex flex-col text-md font-semibold">
                            <p>{t("contact_location")}</p>
                            <p>La Havana, Cuba</p>
                        </div>
                    </li>
                </ul>

                <div className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg">
                    <div className="flex flex-col">
                        <p>{t("contact_name")}</p>
                        <input
                            className="p-2 border border-gray-700 rounded-md"
                            placeholder={t("contact_namePlaceholder")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <p>{t("contact_emailLabel")}</p>
                        <input
                            className="p-2 border border-gray-700 rounded-md"
                            placeholder={t("contact_emailPlaceholder")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <p>Message</p>
                        <input
                            className="p-2 border border-gray-700 rounded-md"
                            placeholder={t("contact_messagePlaceholder")}
                        />
                    </div>

                    <button className="p-2 rounded-md bg-violet-700 shadow-md shadow-violet-700">
                        {t("contact_sendBtn")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
