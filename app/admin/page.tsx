'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Stats {
  users: {
    total: number;
    experts: number;
    regular: number;
  };
  posts: {
    community: number;
    expert: number;
    total: number;
  };
  expertRequests: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
}

interface ExpertRequest {
  id: string;
  expertise: string;
  experience: string;
  certificate: string | null;
  status: string;
  rejectReason: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<ExpertRequest[]>([]);
  const [filter, setFilter] = useState<string>('PENDING');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user || !isAdmin) {
        router.push('/');
      } else {
        fetchData();
      }
    }
  }, [user, authLoading, isAdmin, filter]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [statsRes, requestsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch(`/api/admin/expert-requests?status=${filter}`),
      ]);

      const statsData = await statsRes.json();
      const requestsData = await requestsRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }

      if (requestsData.success) {
        setRequests(requestsData.requests);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    if (!confirm('이 신청을 승인하시겠습니까?')) return;

    try {
      setProcessing(requestId);

      const res = await fetch(`/api/admin/expert-requests/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        fetchData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('처리 중 오류가 발생했습니다.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId: string) => {
    const rejectReason = prompt('거부 사유를 입력해주세요:');
    if (!rejectReason) return;

    try {
      setProcessing(requestId);

      const res = await fetch(`/api/admin/expert-requests/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', rejectReason }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        fetchData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('처리 중 오류가 발생했습니다.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReopen = async (requestId: string) => {
    if (!confirm('이 신청을 재검토 대기 상태로 변경하시겠습니까?')) return;

    try {
      setProcessing(requestId);

      const res = await fetch(`/api/admin/expert-requests/${requestId}`, {
        method: 'PATCH',
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        fetchData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('처리 중 오류가 발생했습니다.');
    } finally {
      setProcessing(null);
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">관리자 대시보드</h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">사용자 통계</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">전체: <span className="font-bold text-gray-900">{stats.users.total}명</span></p>
                <p className="text-sm text-gray-600">전문가: <span className="font-bold text-blue-600">{stats.users.experts}명</span></p>
                <p className="text-sm text-gray-600">일반: <span className="font-bold text-gray-900">{stats.users.regular}명</span></p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">게시글 통계</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">전체: <span className="font-bold text-gray-900">{stats.posts.total}개</span></p>
                <p className="text-sm text-gray-600">커뮤니티: <span className="font-bold text-green-600">{stats.posts.community}개</span></p>
                <p className="text-sm text-gray-600">전문가 Q&A: <span className="font-bold text-purple-600">{stats.posts.expert}개</span></p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">전문가 신청</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">전체: <span className="font-bold text-gray-900">{stats.expertRequests.total}건</span></p>
                <p className="text-sm text-gray-600">대기 중: <span className="font-bold text-orange-600">{stats.expertRequests.pending}건</span></p>
                <p className="text-sm text-gray-600">승인: <span className="font-bold text-green-600">{stats.expertRequests.approved}건</span></p>
                <p className="text-sm text-gray-600">거부: <span className="font-bold text-red-600">{stats.expertRequests.rejected}건</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Expert Requests Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">전문가 신청 관리</h2>

            <div className="flex gap-2">
              {['PENDING', 'APPROVED', 'REJECTED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status === 'PENDING' && '대기 중'}
                  {status === 'APPROVED' && '승인됨'}
                  {status === 'REJECTED' && '거부됨'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {requests.length === 0 ? (
              <p className="text-center text-gray-500 py-8">해당하는 신청이 없습니다.</p>
            ) : (
              requests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{request.user.name} <span className="text-gray-600">({request.user.username})</span></h3>
                      <p className="text-sm text-gray-500">{formatDate(request.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                      request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'PENDING' && '대기 중'}
                      {request.status === 'APPROVED' && '승인됨'}
                      {request.status === 'REJECTED' && '거부됨'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="text-sm font-medium text-gray-700 block mb-1">전문 분야:</span>
                      <p className="text-gray-900 font-medium">{request.expertise}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="text-sm font-medium text-gray-700 block mb-1">경력:</span>
                      <p className="text-gray-900 whitespace-pre-wrap">{request.experience}</p>
                    </div>
                    {request.certificate && (
                      <div className="bg-gray-50 p-3 rounded">
                        <span className="text-sm font-medium text-gray-700 block mb-1">자격증:</span>
                        <p className="text-gray-900">{request.certificate}</p>
                      </div>
                    )}
                    {request.rejectReason && (
                      <div className="bg-red-50 p-3 rounded">
                        <span className="text-sm font-medium text-red-900">거부 사유:</span>
                        <p className="text-red-800">{request.rejectReason}</p>
                      </div>
                    )}
                  </div>

                  {request.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={processing === request.id}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        승인
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={processing === request.id}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        거부
                      </button>
                    </div>
                  )}

                  {request.status === 'REJECTED' && (
                    <button
                      onClick={() => handleReopen(request.id)}
                      disabled={processing === request.id}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      재검토 (대기 상태로 변경)
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
