interface ButtonProps {
  label: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button";
  className?: string;
  variant?: "outline" | "ghost" | "primary";
}

const variants = {
  outline: "bg-transparent border-[2px] border-[#ffffff] rounded-[200px]",
  ghost: "bg-[#FFFFFF26]  rounded-[200px] ",
  primary: "bg-[#ffffff]   rounded-lg  "
};

export default function Button({
  label,
  onClick,
  type,
  className = "",
  variant = "outline",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white font-medium text-base font-lato py-2 px-3 md:px-5 md:py-3 cursor-pointer  transition-transform transform ease-in-out duration-150 ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
