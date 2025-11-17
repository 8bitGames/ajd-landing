"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
  _count?: {
    comments: number;
  };
}

export default function CommunityDiscussion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discussions, setDiscussions] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/community/posts?sortBy=createdAt&limit=5');
        if (res.ok) {
          const data = await res.json();
          setDiscussions(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching community posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < discussions.length - 2 ? prev + 1 : prev));
  };

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        {/* Title and Button */}
        <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12">
          <h2
            className="text-center font-bold text-[24px] md:text-[28px] lg:text-[32px]"
            style={{
              color: "#181A1C",
              letterSpacing: "-0.7px",
              lineHeight: "36px",
            }}
          >
            지금 자영업자들은<br />
            어떤 고민이 있을까? 🤔
          </h2>
          <Link href="/community">
            <button
              className="font-bold text-[16px] md:text-[18px] px-8 md:px-12 py-3 md:py-4 rounded-lg"
              style={{
                backgroundColor: "#0E53DC",
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
                lineHeight: "28px",
              }}
            >
              커뮤니티 둘러보기
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center rounded-full flex-shrink-0 w-[48px] h-[48px] lg:w-[56px] lg:h-[56px]"
            style={{
              backgroundColor: "#F8F9FB",
              boxShadow: "0px 4px 12px 0px rgba(14, 83, 220, 0.12)",
            }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M13 18L7 12L13 6" stroke="#181A1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Discussion Cards */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
            {loading ? (
              <div className="flex-1 flex justify-center items-center py-20">
                <div className="text-gray-500">로딩 중...</div>
              </div>
            ) : discussions.length === 0 ? (
              <div className="flex-1 flex justify-center items-center py-20">
                <div className="text-gray-500">게시글이 없습니다.</div>
              </div>
            ) : (
              discussions.slice(currentIndex, currentIndex + 2).map((discussion) => (
                <Link
                  key={discussion.id}
                  href={`/community/${discussion.id}`}
                  className="flex-1 bg-white rounded-[8px] border-2 cursor-pointer hover:shadow-lg transition-shadow"
                  style={{
                    borderColor: "#E1E4EB",
                    padding: "32px 42px",
                  }}
                >
                  <div className="flex flex-col gap-6">
                    {/* Author and Date */}
                    <div className="flex items-center gap-3">
                      <span
                        className="font-semibold text-[16px]"
                        style={{
                          color: "#343A3F",
                          letterSpacing: "-0.4px",
                          lineHeight: "24px",
                        }}
                      >
                        {discussion.author.name}
                      </span>
                      <span
                        className="text-[14px]"
                        style={{
                          color: "#ADADAD",
                          letterSpacing: "-0.5px",
                          lineHeight: "22px",
                        }}
                      >
                        {new Date(discussion.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }).replace(/\. /g, '.').replace(/\.$/, '')}
                      </span>
                    </div>

                    {/* Title and Content */}
                    <div className="flex flex-col gap-4">
                      <h3
                        className="font-bold text-[20px]"
                        style={{
                          color: "#181A1C",
                          letterSpacing: "-0.7px",
                          lineHeight: "28px",
                        }}
                      >
                        {discussion.title}
                      </h3>
                      <p
                        className="text-[18px] line-clamp-2"
                        style={{
                          color: "#343A3F",
                          letterSpacing: "-0.4px",
                          lineHeight: "24px",
                        }}
                      >
                        {discussion.content}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[15px]"
                        style={{
                          color: "#353F53",
                          letterSpacing: "-0.5px",
                          lineHeight: "22px",
                        }}
                      >
                        {discussion._count?.comments || 0}개의 답변
                      </span>
                      <button
                        className="font-semibold text-[18px]"
                        style={{
                          color: "#0E53DC",
                          letterSpacing: "-0.5px",
                          lineHeight: "28px",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/community/${discussion.id}`;
                        }}
                      >
                        답변하기
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="hidden md:flex items-center justify-center rounded-full flex-shrink-0 w-[48px] h-[48px] lg:w-[56px] lg:h-[56px]"
            style={{
              backgroundColor: "#F8F9FB",
              boxShadow: "0px 4px 12px 0px rgba(14, 83, 220, 0.12)",
            }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M7 6L13 12L7 18" stroke="#181A1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
