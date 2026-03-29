import { BiTag, BiSolidPencil } from "react-icons/bi";

const Card = ({ infocard }: any) => {
    const { id, icon, title, description } = infocard;

    return (
        <div
            id={id}
            className="border border-gray-700 rounded-md flex flex-col gap-4 p-4 transition-transform hover:translate-y-0.5"
        >
            <div className="bg-gray-600 h-12 w-12 flex items-center justify-center rounded-md">{icon}</div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg font-semibold">{description}</p>
        </div>
    );
};

const About = () => {
    const infocards = [
        {
            id: 1,
            icon: <BiTag size={24} />,
            title: "Frontend developer",
            description: "Creation of modern interfaces with HTML, CSS, JavaScript and frameworks like react.",
        },
        {
            id: 2,
            icon: "",
            title: "Reponsive Design",
            description: "Website development thah works saemlessly across all devices and screen sizes.",
        },
        {
            id: 3,
            icon: "",
            title: "UI/UX Design",
            description: "Creating intuitive and aesthetically pleasing interfaces focused on user experience.",
        },
        {
            id: 4,
            icon: <BiSolidPencil size={24} />,
            title: "Web Performance",
            description: "Optimizing website performance to improve speed and overall browsing experience.",
        },
    ];

    return (
        <div id="about" className="min-h-screen grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-8">
                <h2 className="text-violet-600 font-bold text-4xl">
                    Frontend developer for the user
                    <br /> experience
                </h2>

                <p className="font-semibold text-lg">
                    I am a frontend developer specialized in creating attractive and functional user <br /> interfaces
                </p>

                <p className="font-semibold text-md text-violet-600">
                    Shall we work together?{" "}
                    <a href="#contact">
                        <span className="text-violet-600 hover:underline cursor-pointer">Contact me.</span>
                    </a>
                </p>
            </div>

            <div className="items-center grid grid-cols-1 lg:grid-cols-2 gap-6">
                {infocards.map((info) => (
                    <Card infocard={info} />
                ))}
            </div>
        </div>
    );
};

export default About;
