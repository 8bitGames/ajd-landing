"use client";

import { useState } from "react";
import Image from "next/image";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

export default function MembershipSection() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div
          className="relative rounded-[8px] overflow-hidden min-h-[160px] md:h-[128px] flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:p-0"
          style={{
            backgroundColor: "#FFF9E2",
          }}
        >
          {/* Text Content */}
          <div className="flex flex-col gap-[2px] justify-center text-center md:text-left md:absolute md:left-6 lg:left-[24px] z-10 mb-4 md:mb-0">
            <h2
              className="font-semibold text-[16px] md:text-[18px] lg:text-[20px]"
              style={{
                color: "#343A3F",
                lineHeight: "24px",
              }}
            >
              지금 바로 회원가입하고 <span style={{ color: "#343A3F" }}>커뮤니티</span>에 참여해보세요!
            </h2>
            <p
              className="text-[14px] md:text-[15px] lg:text-[16px]"
              style={{
                color: "#797979",
                lineHeight: "20px",
              }}
            >
              실전에 도움되는 다양한 경험담과 사업에 필요한 꿀정보가 가득
            </p>
          </div>

          {/* Chat Icon Image - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[140px] h-[140px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px]">
            <Image
              src="/membership-chat-icon.png"
              alt="Chat Icon"
              fill
              className="object-cover"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={() => setShowSignupModal(true)}
            className="rounded-[100px] px-4 md:px-5 py-2 font-bold text-[16px] md:text-[18px] lg:text-[20px] transition-opacity hover:opacity-80 md:absolute md:right-6 lg:md:right-[32px]"
            style={{
              border: "2px solid #0E53DC",
              color: "#0E53DC",
              backgroundColor: "transparent",
              letterSpacing: "-0.7px",
              lineHeight: "28px",
            }}
          >
            회원가입
          </button>
        </div>
      </div>

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
    </section>
  );
}
