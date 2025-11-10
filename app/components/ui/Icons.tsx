// Question Icon (Large)
export function QuestionIconLarge({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[38px] h-[38px] flex items-center justify-center ${className}`}>
      <span className="text-[26px] font-semibold text-[#0e53dc] leading-none">Q</span>
    </div>
  );
}

// Question Icon (Small)
export function QuestionIconSmall({ className = "" }: { className?: string }) {
  return (
    <div className={`w-6 h-6 flex items-center justify-center ${className}`}>
      <span className="text-[20px] font-semibold text-[#0e53dc] leading-[26px]">Q</span>
    </div>
  );
}

// Close Icon
export function CloseIcon({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// Alert Icon
export function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`w-6 h-6 flex items-center justify-center ${className}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
      </svg>
    </div>
  );
}

// Profile Icon
export function ProfileIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`rounded-full bg-[#576d89] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    </div>
  );
}

// Badge Components
export function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`px-2 py-0 rounded-full bg-[rgba(14,83,220,0.07)] text-[#0e53dc] text-[14px] font-semibold leading-[24px] inline-flex items-center ${className}`}
      style={{ letterSpacing: "-0.4px" }}
    >
      NEW
    </span>
  );
}

export function ExpertBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`px-2 py-0 rounded-full bg-[rgba(14,83,220,0.07)] text-[#0e53dc] text-[14px] font-semibold leading-[24px] inline-flex items-center ${className}`}
      style={{ letterSpacing: "-0.4px" }}
    >
      전문가
    </span>
  );
}

export function MyAnswerBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`px-2 py-0 rounded-full bg-white text-[#0e53dc] text-[14px] font-semibold leading-[24px] inline-flex items-center ${className}`}
      style={{ letterSpacing: "-0.4px" }}
    >
      나의 답변
    </span>
  );
}
