'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Post {
  id: string;
  title: string;
  content: string;
  viewCount: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
  };
  _count: {
    replies: number;
  };
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/community/posts?page=${page}&limit=14`);
      const data = await res.json();

      if (data.success) {
        setPosts(data.posts);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
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
    }).replace(/\. /g, '.').replace(/\./g, '.').slice(0, -1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-[1920px] mx-auto px-[420px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 mb-2">사업의 성장, 준사가 아닌 경제의 원으로</p>
              <h1 className="text-4xl font-bold mb-2 text-black">서로 배우고 도와주는 진짜 커뮤니티</h1>
              <h2 className="text-4xl font-bold text-blue-600">김사장에서 함께해요!</h2>
            </div>
            <div className="text-8xl">🤝</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-[420px] py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">커뮤니티</span>
          </div>

          {/* Write Button */}
          <div className="flex justify-end mb-6">
            <Link
              href="/community/write"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              ✏️ 글쓰기
            </Link>
          </div>

          {/* Posts List */}
          <div className="space-y-1">
            {loading ? (
              <div className="text-center py-8 text-gray-500">로딩 중...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">게시글이 없습니다.</div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                      Q
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {post.title}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {post.author.name} · {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {post._count.replies > 0 ? `${post._count.replies}개 댓글` : '응답중'}
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      pageNum === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
