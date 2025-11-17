import { ButtonHTMLAttributes, ReactNode } from "react";
import { Undo2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "secondary"
  | "disabled";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "font-bold transition-colors rounded-lg inline-flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-[#0e53dc] text-white hover:bg-blue-700",
    outline: "border-2 border-[#0e53dc] text-[#0e53dc] hover:bg-[rgba(14,83,220,0.07)]",
    ghost: "border border-[#797979] text-[#555555] hover:bg-[rgba(14,83,220,0.07)] hover:border-[#0e53dc] hover:text-[#0e53dc]",
    secondary: "bg-[#c1c7cd] text-white",
    disabled: "bg-[#c1c7cd] text-white cursor-not-allowed",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-[18px] leading-[24px]", // 수정/삭제
    md: "px-4 py-2.5 text-[18px] leading-[28px]", // 답변등록
    lg: "px-[72px] py-4 text-[24px] leading-[34px]", // 취소/등록/목록
    xl: "px-8 py-4 text-[24px] leading-[34px]", // 커뮤니티 둘러보기
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const finalVariant = disabled ? "disabled" : variant;

  return (
    <button
      className={`${baseStyles} ${variantStyles[finalVariant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled}
      style={{ letterSpacing: size === "sm" ? "-0.4px" : "-0.7px" }}
      {...props}
    >
      {children}
    </button>
  );
}

// 특수 버튼들
export function BackButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`w-10 h-10 rounded-full bg-[rgba(14,83,220,0.07)] flex items-center justify-center hover:bg-[rgba(14,83,220,0.15)] transition-colors ${className}`}
      {...props}
    >
      <Undo2 size={20} className="text-[#0e53dc]" />
    </button>
  );
}

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "prev" | "next";
  active?: boolean;
}

export function NavButton({ direction, active = false, disabled, className = "", ...props }: NavButtonProps) {
  const baseStyles = "w-14 h-14 rounded-full bg-white shadow-[0px_4px_12px_0px_rgba(14,83,220,0.12)] flex items-center justify-center transition-colors";
  const stateStyles = disabled
    ? "opacity-40 cursor-not-allowed"
    : active
      ? "text-[#0e53dc]"
      : "text-gray-600 hover:text-[#0e53dc]";

  return (
    <button
      className={`${baseStyles} ${stateStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {direction === "prev" ? (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
          <path d="M15 18l-6-6 6-6" strokeWidth="2" stroke="currentColor" fill="none" />
        </svg>
      ) : (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
          <path d="M5 6l6 6-6 6" strokeWidth="2" stroke="currentColor" fill="none" />
        </svg>
      )}
    </button>
  );
}
