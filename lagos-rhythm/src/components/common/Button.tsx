import { forwardRef, ReactNode } from "react";

interface ButtonProps {
  label: string | ReactNode;
  ariaLabel: string
  onClick?: () => void;
  type: "submit" | "reset" | "button";
  className?: string;
  variant?: "outline" | "ghost" | "primary";
  disabled?: boolean
}


const variants = {
  outline: "bg-transparent border-[2px] border-[#ffffff] rounded-[200px]",
  ghost: "bg-[#FFFFFF26]  rounded-[200px]",
  primary: "bg-[#ffffff] rounded-lg"
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, onClick, type, className = "", variant = "outline", ariaLabel, disabled }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        className={`text-white font-medium text-base font-lato py-2 px-3 md:px-5 md:py-3 cursor-pointer transition-transform transform ease-in-out duration-150 ${variants[variant]} ${className}`}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
