"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Header() {
  const { user, loading, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="w-full h-16 md:h-20 bg-white border-b border-[#eaeaea] sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[56px] h-full flex items-center justify-between">
        {/* Logo and Navigation - Left Side */}
        <div className="flex items-center gap-[56px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/Logo.png"
              alt="김사장"
              className="h-[16px] w-[54px] md:h-[19.571px] md:w-[65px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[56px] text-[16px] font-medium text-[#122344]" style={{ letterSpacing: '-0.4px' }}>
            <Link href="/community" className="hover:text-blue-600 transition-colors">
              커뮤니티
            </Link>
            <Link href="/expert" className="hover:text-blue-600 transition-colors">
              전문가
            </Link>
          </nav>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-[48px] text-[16px]" style={{ letterSpacing: '-0.4px' }}>
          {loading ? (
            <span className="text-[#797979]">...</span>
          ) : user ? (
            <>
              {isAdmin || user.role === 'USER' ? (
                <Link
                  href={isAdmin ? "/admin" : "/mypage"}
                  className="text-[#122344] font-medium hover:text-blue-600 transition-colors"
                >
                  {user.name}님
                </Link>
              ) : (
                <span className="text-[#122344] font-medium">{user.name}님</span>
              )}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#122344]"
          aria-label="메뉴"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#eaeaea] absolute w-full shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link
              href="/community"
              className="text-[16px] font-medium text-[#122344] hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              커뮤니티
            </Link>
            <Link
              href="/expert"
              className="text-[16px] font-medium text-[#122344] hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              전문가
            </Link>
            <div className="border-t border-[#eaeaea] pt-4 space-y-4">
              {loading ? (
                <span className="text-[#797979]">...</span>
              ) : user ? (
                <>
                  {isAdmin || user.role === 'USER' ? (
                    <Link
                      href={isAdmin ? "/admin" : "/mypage"}
                      className="text-[#122344] font-medium hover:text-blue-600 transition-colors block py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {user.name}님
                    </Link>
                  ) : (
                    <div className="text-[#122344] font-medium py-2">{user.name}님</div>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-[#797979] font-medium hover:text-blue-600 transition-colors block py-2"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-[#797979] font-medium hover:text-blue-600 transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-[#0e53dc] font-bold hover:text-blue-700 transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
