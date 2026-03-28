interface ButtonProps {
    children: any;
    className?: string;
    onClick?: any;
    icon?: boolean;
    href?: string;
}

export const Button = ({ className, onClick, children, icon }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer text-lg font-semibold ${className}  ${icon && "transition duration-150 transform hover:scale-120 hover:text-violet-600"}`}
        >
            {children}
        </button>
    );
};
