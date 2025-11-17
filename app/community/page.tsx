'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommunityBannerCarousel from "../components/CommunityBannerCarousel";

interface Post {
  id: string;
  title: string;
  content: string;
  category?: string;
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
      const res = await fetch(`/api/community/posts?page=${page}&limit=10`);
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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
          <CommunityBannerCarousel />
        </div>
      </section>

      {/* Breadcrumb & Write Button */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="border-b-2 border-[#7b8a9c] pb-4 md:pb-6 mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#7b8a9c] leading-[24px] md:leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
            홈 &gt; 커뮤니티
          </p>
          <Link href="/community/write">
            <button className="bg-[#0e53dc] text-white px-[12px] py-[10px] rounded-[20px] shadow-[0px_3px_7px_0px_rgba(18,38,77,0.31)] flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.419 1.44775 12.6663 1.44775C12.9137 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08604 14.552 3.33337C14.552 3.58071 14.5032 3.8262 14.4084 4.05497C14.3137 4.28375 14.1748 4.49162 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.666 2.33337L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-[14px]" style={{ letterSpacing: '-0.5px' }}>글쓰기</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Posts List */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] pb-16">
        {loading ? (
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">게시글이 없습니다.</div>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <div className="border-b border-[#adadad] py-4 md:py-6 lg:h-[104px] flex flex-col lg:flex-row items-start lg:items-center px-4 md:px-[24px] hover:bg-gray-50 transition-colors cursor-pointer relative gap-3 lg:gap-0">
                  <div className="flex gap-4 md:gap-[32px] items-start w-full">
                    {/* Q Icon */}
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      Q
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 md:gap-[8px] flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[12px]">
                        {post.category && (
                          <span className="px-[12px] py-[4px] rounded-[12px] bg-[#f0f4ff] text-[#0e53dc] text-[13px] md:text-[14px] font-medium w-fit">
                            {post.category}
                          </span>
                        )}
                        <h3 className="font-semibold text-[17px] md:text-[18px] lg:text-[20px] text-[#181a1c] leading-[24px] md:leading-[26px] line-clamp-2 lg:line-clamp-1">
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-[16px] items-center text-[14px] md:text-[16px]">
                        <span className="font-medium text-[#393939] leading-[20px]" style={{ letterSpacing: '-0.4px' }}>
                          {post._count.replies}개의 답변
                        </span>
                        <span className="text-[13px] md:text-[14px] text-[#adadad] leading-[18px]">
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="lg:hidden font-medium text-[#393939] leading-[20px]" style={{ letterSpacing: '-0.4px' }}>
                          {post.author.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Author Name - Desktop Only */}
                  <div className="hidden lg:block absolute right-[78px] top-1/2 -translate-y-1/2 translate-x-full">
                    <span className="font-medium text-[18px] text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                      {post.author.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && posts.length > 0 && (
          <div className="flex items-center justify-center gap-[6px] mt-16">
            {/* Previous Button */}
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-[32px] h-[32px] flex items-center justify-center disabled:opacity-30"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M20 8L12 16L20 24" stroke="#797979" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Page Numbers */}
            {(() => {
              const maxVisible = 5;
              let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);

              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }

              return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors ${
                    page === pageNum
                      ? 'bg-[rgba(14,83,220,0.07)]'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`font-semibold text-[16px] leading-[24px] ${
                      page === pageNum ? 'text-[#0e53dc]' : 'text-[#797979]'
                    }`}
                    style={{ letterSpacing: '-0.4px' }}
                  >
                    {pageNum}
                  </span>
                </button>
              ));
            })()}

            {/* Next Button */}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="w-[32px] h-[32px] flex items-center justify-center disabled:opacity-30"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M12 8L20 16L12 24" stroke="#797979" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
