import { BiPhone } from "react-icons/bi";
import { useIsDesktop } from "./useIsDestop";

const Footer = () => {
    const isDesktop = useIsDesktop()

    return (
        (!isDesktop && 
        <footer className="fixed bottom-2 left-0 right-0">

            <div className="flex items-center justify-center gap-4">

                <div className="bg-gray-500 rounded-xl">
                    <div className="bg-gray-800 rounded-xl px-3">
                        <BiPhone size={64} className=""/>
                    </div>

                    <span className="flex items-center justify-center font-bold">
                        Call
                    </span>
                </div>

                <div className="bg-gray-500 rounded-xl">
                    <div className="bg-gray-800 rounded-xl px-3">
                        <BiPhone size={64} className=""/>
                    </div>

                    <span className="flex items-center justify-center font-bold">
                        Call
                    </span>
                </div>

                <div className="bg-gray-500 rounded-xl">
                    <div className="bg-gray-800 rounded-xl px-3">
                        <BiPhone size={64} className=""/>
                    </div>

                    <span className="flex items-center justify-center font-bold">
                        Call
                    </span>
                </div>
                
            </div>
            
        </footer>)
    );
};

export default Footer;
