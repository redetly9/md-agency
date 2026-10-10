import React, { ReactNode } from "react";
import { cn } from "@/utils/helper";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "large";
  className?: string;
  children?: ReactNode;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = "small",
  outline = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        `disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full bg-[#d4af5a]  bg-[#d4af5a]  text-[#0b1626] py-[8px] `,
        size === "small"
          ? " text-[16px] font-medium border-[1px]"
          : " text-[18px] font-semibold border-2",
        outline
          ? "bg-[#122037] border-[1px] border-gray-500 text-[#4e4e4e]"
          : "bg-[#d4af5a]  border-[#d4af5a]/40  text-[#0b1626]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
