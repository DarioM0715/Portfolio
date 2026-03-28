import { Button } from "./Button";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-gray-900 flex flex-col space-y-10 px-[4vw] border-t border-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                    <a href="/" className="text-xl font-bold">
                        <span className="text-violet-600">Dario.</span>
                        portfolio
                    </a>

                    <p>
                        Frontend development passionate about creating exceptional <br /> digital experiencies.
                    </p>
                </div>
                <div className="flex gap-6">
                    <Button icon className="border border-gray-700 rounded-full p-3 flex items-center">
                        <FiGithub size={24} />
                    </Button>

                    <Button icon className="border border-gray-700 rounded-full p-3 flex items-center">
                        <FiLinkedin size={24} />
                    </Button>
                </div>
            </div>

            <p>@ Dario.portfolio All rights reserved</p>
        </footer>
    );
};

export default Footer;
