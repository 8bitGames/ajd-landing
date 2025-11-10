"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import { QuestionIconSmall } from "../components/ui/Icons";

interface Question {
  id: string;
  title: string;
  createdAt: string;
  author: {
    name: string;
  };
  _count: {
    replies: number;
  };
}

export default function ExpertPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [currentPage]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/expert/questions?page=${currentPage}&limit=10`);
      const data = await res.json();

      if (data.success) {
        setQuestions(data.posts);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
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

      {/* Banner */}
      <section className="py-20">
        <div className="max-w-[1920px] mx-auto px-[420px]">
          <div
            className="rounded-[24px] overflow-hidden relative h-[320px]"
            style={{
              background: 'linear-gradient(90deg, rgba(248, 238, 238, 1) 0%, rgba(248, 238, 238, 1) 100%)'
            }}
          >
            <div className="flex items-center justify-between px-[64px] h-full">
              <div className="flex-1">
                <p className="text-[20px] text-[#555555] leading-[26px] mb-6">
                  전문가들이 함께 고민하고, 함께 성장합니다
                </p>
                <h1 className="text-[32px] font-bold leading-[44px] text-[#0A095B]">
                  당신의 가게를 위한 1:1 맞춤 솔루션
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub tab */}
      <div className="max-w-[1920px] mx-auto px-[420px]">
        <div className="border-b-2 border-[#7b8a9c] pb-6 mb-12 flex items-center justify-between">
          <p className="font-bold text-[20px] text-[#7b8a9c] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
            홈 &gt; 전문가
          </p>
          <Link href="/expert/write">
            <button className="bg-[#0e53dc] text-white px-[12px] py-[10px] rounded-[20px] shadow-[0px_3px_7px_0px_rgba(18,38,77,0.31)] flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
                <path d="M15.5 2.5L2.5 15.5M2.5 2.5L15.5 15.5" stroke="white" strokeWidth="2" />
              </svg>
              <span className="font-semibold text-[14px]" style={{ letterSpacing: '-0.5px' }}>나도 질문</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-[1920px] mx-auto px-[420px] pb-16">
        {loading ? (
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">질문이 없습니다.</div>
        ) : (
          <div className="space-y-0">
            {questions.map((question) => (
              <Link key={question.id} href={`/expert/${question.id}`}>
                <div className="border-b border-[#adadad] h-[104px] flex items-center px-[24px] hover:bg-gray-50 transition-colors cursor-pointer relative">
                  <div className="flex gap-[32px] items-start w-full">
                    <QuestionIconSmall />
                    <div className="flex flex-col gap-[8px] flex-1">
                      <h3 className="font-semibold text-[20px] text-[#181a1c] leading-[26px]">
                        {question.title}
                    </h3>
                    <div className="flex gap-[16px] items-center text-[16px]">
                      <span className="font-medium text-[#393939] leading-[20px]" style={{ letterSpacing: '-0.4px' }}>
                        {question._count.replies}개의 답변
                      </span>
                      <span className="text-[14px] text-[#adadad] leading-[18px]">
                        {formatDate(question.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-[78px] top-1/2 -translate-y-1/2 translate-x-full">
                    <span className="font-medium text-[18px] text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                      {question.author.name}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-[6px] mt-16">
          <button className="w-[32px] h-[32px] rounded-full bg-[rgba(14,83,220,0.07)] flex items-center justify-center">
            <span className="font-semibold text-[16px] text-[#0e53dc] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
              1
            </span>
          </button>
          <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-gray-100">
            <span className="font-semibold text-[16px] text-[#797979] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
              2
            </span>
          </button>
          <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-gray-100">
            <span className="font-semibold text-[16px] text-[#797979] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
              3
            </span>
          </button>
          <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-gray-100">
            <span className="font-semibold text-[16px] text-[#797979] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
              4
            </span>
          </button>
          <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-gray-100">
            <span className="font-semibold text-[16px] text-[#797979] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
              5
            </span>
          </button>
          <button className="w-[32px] h-[32px] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 8L20 16L12 24" stroke="#797979" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
