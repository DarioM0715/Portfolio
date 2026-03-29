interface ButtonProps {
    children: any;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    onClick?: any;
    icon?: boolean;
    href?: string;
}

export const Button = ({ className, onClick, children, icon, type = "button" }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`cursor-pointer text-lg font-semibold ${className}  ${icon && "transition duration-150 transform hover:scale-110 hover:-rotate-4 hover:text-violet-600"}`}
        >
            {children}
        </button>
    );
};
