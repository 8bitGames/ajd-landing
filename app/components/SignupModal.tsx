"use client";

import Input from "./ui/Input";
import Button from "./ui/Button";
import { CloseIcon } from "./ui/Icons";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
        <div className="absolute top-4 right-4">
          <CloseIcon onClick={onClose} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">회원가입</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              아이디
            </label>
            <Input
              type="text"
              placeholder="아이디를 입력해주세요."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호 확인
            </label>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <Input
              type="text"
              placeholder="이름 또는 닉네임을 입력해주세요."
            />
          </div>

          <Button type="submit" fullWidth size="lg">
            회원가입
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 font-medium hover:underline"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
