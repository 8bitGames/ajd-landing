"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Header() {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="w-full h-20 bg-white border-b border-[#eaeaea] sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-[56px] h-full flex items-center justify-between">
        <div className="flex items-center gap-[80px]">
          <Link href="/" className="flex items-center">
            <img
              src="https://www.figma.com/api/mcp/asset/56346655-43cc-427a-8adf-6303710b31af"
              alt="김사장"
              className="h-[19.571px] w-[65px]"
            />
          </Link>

          <nav className="flex items-center gap-[56px] text-[16px] font-medium text-[#122344]" style={{ letterSpacing: '-0.4px' }}>
            <Link href="/community" className="hover:text-blue-600 transition-colors">
              커뮤니티
            </Link>
            <Link href="/expert" className="hover:text-blue-600 transition-colors">
              전문가
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-[48px] text-[16px]" style={{ letterSpacing: '-0.4px' }}>
          {loading ? (
            <span className="text-[#797979]">...</span>
          ) : user ? (
            <>
              <span className="text-[#122344] font-medium">{user.name}님</span>
              <button
                onClick={handleLogout}
                className="text-[#797979] font-medium hover:text-blue-600 transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-[#797979] font-medium hover:text-blue-600 transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/auth/signup"
                className="text-[#0e53dc] font-bold hover:text-blue-700 transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
