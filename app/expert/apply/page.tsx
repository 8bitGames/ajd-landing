'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExpertApplyPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [certificate, setCertificate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingRequest, setExistingRequest] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      checkExistingRequest();
    }
  }, [user, authLoading]);

  const checkExistingRequest = async () => {
    try {
      const res = await fetch('/api/expert/apply');
      const data = await res.json();
      if (data.success && data.request) {
        setExistingRequest(data.request);
      }
    } catch (error) {
      console.error('Failed to check existing request:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expertise.trim() || !experience.trim()) {
      setError('전문 분야와 경력을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/expert/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertise, experience, certificate }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        router.push('/expert');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('신청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (existingRequest) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-6">전문가 신청 현황</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">신청 상태</label>
                <p className={`text-lg font-semibold ${
                  existingRequest.status === 'PENDING' ? 'text-orange-600' :
                  existingRequest.status === 'APPROVED' ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {existingRequest.status === 'PENDING' && '검토 중'}
                  {existingRequest.status === 'APPROVED' && '승인됨'}
                  {existingRequest.status === 'REJECTED' && '거부됨'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">전문 분야</label>
                <p className="text-gray-900">{existingRequest.expertise}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">경력</label>
                <p className="text-gray-900 whitespace-pre-wrap">{existingRequest.experience}</p>
              </div>

              {existingRequest.certificate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">자격증</label>
                  <p className="text-gray-900">{existingRequest.certificate}</p>
                </div>
              )}

              {existingRequest.status === 'REJECTED' && existingRequest.rejectReason && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <label className="block text-sm font-medium text-red-900 mb-1">거부 사유</label>
                  <p className="text-red-800">{existingRequest.rejectReason}</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <Link
                href="/expert"
                className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                목록으로
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-2">전문가 신청</h1>
          <p className="text-gray-600 mb-8">
            전문가로 활동하시려면 아래 정보를 입력해주세요. 관리자 검토 후 승인됩니다.
          </p>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                전문 분야 *
              </label>
              <input
                type="text"
                id="expertise"
                required
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1a1a1a] placeholder:text-[#a2a9b0]"
                placeholder="예: 식당 운영, 마케팅, 재무관리 등"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                경력 *
              </label>
              <textarea
                id="experience"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1a1a1a] placeholder:text-[#a2a9b0]"
                placeholder="관련 경력을 상세히 작성해주세요."
              />
            </div>

            <div>
              <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-2">
                자격증 (선택)
              </label>
              <input
                type="text"
                id="certificate"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1a1a1a] placeholder:text-[#a2a9b0]"
                placeholder="보유 자격증이 있다면 입력해주세요"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? '신청 중...' : '신청하기'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/expert')}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
