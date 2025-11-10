"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error = false, ...props }, ref) => {
    const baseStyles = "w-full h-[52px] px-4 rounded-lg text-[16px] leading-[20px] text-[#1a1a1a] transition-colors";
    const borderStyles = error
      ? "border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      : "border border-[#c1c7cd] focus:outline-none focus:border-[#0e53dc] focus:ring-1 focus:ring-[#0e53dc]";
    const placeholderStyles = "placeholder:text-[#a2a9b0]";

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${borderStyles} ${placeholderStyles} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
