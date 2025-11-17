'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ExpertRequest {
  id: string;
  expertise: string;
  experience: string;
  certificate: string | null;
  status: string;
  rejectReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function MyPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [request, setRequest] = useState<ExpertRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 수정 폼 상태
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [certificate, setCertificate] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login');
      } else {
        fetchRequest();
      }
    }
  }, [user, authLoading]);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/expert/apply');
      const data = await res.json();

      if (data.success && data.request) {
        setRequest(data.request);
        // 폼에 기존 값 설정
        setExpertise(data.request.expertise);
        setExperience(data.request.experience);
        setCertificate(data.request.certificate || '');
      }
    } catch (error) {
      console.error('Failed to fetch request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!expertise.trim() || !experience.trim()) {
      alert('전문 분야와 경력은 필수 입력 항목입니다.');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('/api/expert/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertise, experience, certificate }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        setIsEditing(false);
        fetchRequest(); // 새로고침
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('전문가 신청 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">마이페이지</h1>

        {!request ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">전문가 신청 내역이 없습니다.</p>
            <p className="text-sm text-gray-500">
              전문가로 활동하시려면 회원가입 시 전문가로 신청해주세요.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">전문가 신청 현황</h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    request.status === 'PENDING'
                      ? 'bg-orange-100 text-orange-800'
                      : request.status === 'APPROVED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {request.status === 'PENDING' && '심사 중'}
                  {request.status === 'APPROVED' && '승인됨'}
                  {request.status === 'REJECTED' && '거부됨'}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                신청일: {formatDate(request.createdAt)}
              </p>
            </div>

            {request.status === 'REJECTED' && request.rejectReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-red-900 mb-2">거부 사유</p>
                <p className="text-red-800">{request.rejectReason}</p>
                <p className="text-sm text-red-700 mt-2">
                  아래 내용을 수정한 후 다시 신청하실 수 있습니다.
                </p>
              </div>
            )}

            {isEditing || request.status === 'REJECTED' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전문 분야 *
                  </label>
                  <input
                    type="text"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 식당 운영, 마케팅, 재무관리 등"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    경력 *
                  </label>
                  <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="관련 경력을 상세히 작성해주세요."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자격증 (선택)
                  </label>
                  <input
                    type="text"
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="보유 자격증이 있다면 입력해주세요"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                  >
                    {submitting ? '제출 중...' : '재신청'}
                  </button>
                  {request.status !== 'REJECTED' && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        // 원래 값으로 되돌리기
                        setExpertise(request.expertise);
                        setExperience(request.experience);
                        setCertificate(request.certificate || '');
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      취소
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 block mb-2">
                    전문 분야
                  </span>
                  <p className="text-gray-900">{request.expertise}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 block mb-2">
                    경력
                  </span>
                  <p className="text-gray-900 whitespace-pre-wrap">{request.experience}</p>
                </div>

                {request.certificate && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 block mb-2">
                      자격증
                    </span>
                    <p className="text-gray-900">{request.certificate}</p>
                  </div>
                )}

                {request.status === 'PENDING' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-blue-800">
                      💡 관리자 승인 대기 중입니다. 승인 후 전문가 기능을 사용하실 수 있습니다.
                    </p>
                  </div>
                )}

                {request.status === 'APPROVED' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-green-800">
                      🎉 전문가로 승인되었습니다! 전문가 Q&A에서 활동하실 수 있습니다.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
