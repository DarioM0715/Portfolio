import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    icon?: boolean;
    href?: string;
}

type ButtonComponentProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, onClick, children, icon, type = "button", disabled = false, ...props }: ButtonComponentProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...props}
            className={`cursor-pointer text-lg font-semibold ${className ?? ""} ${icon ? "transition duration-150 transform hover:scale-110" : ""}`}
        >
            {children}
        </button>
    );
};
