'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 전문가 가입 관련 상태
  const [isExpertSignup, setIsExpertSignup] = useState(false);
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [certificate, setCertificate] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isExpertSignupSuccess, setIsExpertSignupSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 전문가 가입 시 필수 필드 검증
    if (isExpertSignup) {
      if (!expertise.trim() || !experience.trim()) {
        setError('전문가 가입 시 전문 분야와 경력은 필수 입력 항목입니다.');
        return;
      }
    }

    setLoading(true);

    const result = await signup(
      username,
      password,
      name,
      isExpertSignup ? { expertise, experience, certificate } : undefined
    );

    if (result.success) {
      // 전문가 가입 여부에 따라 성공 모달 표시
      if (result.isExpertSignup) {
        setIsExpertSignupSuccess(true);
        setShowSuccessModal(true);
      } else {
        router.push('/');
        router.refresh();
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              로그인
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                아이디
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="아이디"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="이름"
              />
            </div>
          </div>

          {/* 전문가 가입 체크박스 */}
          <div className="flex items-center">
            <input
              id="expert-signup"
              name="expert-signup"
              type="checkbox"
              checked={isExpertSignup}
              onChange={(e) => setIsExpertSignup(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="expert-signup" className="ml-2 block text-sm text-gray-900">
              전문가로 가입하기
            </label>
          </div>

          {/* 전문가 추가 정보 입력 필드 */}
          {isExpertSignup && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4 space-y-4">
              <p className="text-sm text-blue-800 font-medium">
                전문가 정보를 입력해주세요. 관리자 승인 후 전문가 기능을 사용할 수 있습니다.
              </p>

              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                  전문 분야 *
                </label>
                <input
                  id="expertise"
                  name="expertise"
                  type="text"
                  required={isExpertSignup}
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="예: 식당 운영, 마케팅, 재무관리 등"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  경력 *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  required={isExpertSignup}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  rows={4}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="관련 경력을 상세히 작성해주세요."
                />
              </div>

              <div>
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-1">
                  자격증 (선택)
                </label>
                <input
                  id="certificate"
                  name="certificate"
                  type="text"
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="보유 자격증이 있다면 입력해주세요"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </div>
        </form>
      </div>

      {/* 전문가 가입 성공 모달 */}
      {showSuccessModal && isExpertSignupSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                회원가입이 완료되었습니다!
              </h3>
              <div className="mt-4 bg-blue-50 rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  💼 전문가 신청이 접수되었습니다.
                </p>
                <p className="text-sm text-blue-800">
                  관리자 승인 후 전문가 기능을 사용하실 수 있습니다.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  승인 결과는 마이페이지에서 확인 가능합니다.
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
