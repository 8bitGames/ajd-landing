"use client";

import { useState } from "react";
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
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-[1920px] mx-auto px-[420px]">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-5xl">
              💬
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">지금 바로 회원가입하고 커뮤니티에 참여해보세요!</h2>
              <p className="text-gray-600">실전에 도움되는 다양한 경험담과 사업에 필요한 꿀정보가 가득</p>
            </div>
          </div>
          <button
            onClick={() => setShowSignupModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
