"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { AlertIcon } from "../../components/ui/Icons";

export default function ExpertWritePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (!category) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/expert/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      });

      const data = await res.json();

      if (data.success) {
        alert('질문이 작성되었습니다.');
        router.push('/expert');
      } else {
        alert(data.message || '질문 작성에 실패했습니다.');
      }
    } catch (error) {
      alert('질문 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/expert");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
          <div
            className="rounded-[16px] md:rounded-[20px] lg:rounded-[24px] overflow-hidden relative h-[200px] md:h-[260px] lg:h-[320px]"
            style={{
              background: 'linear-gradient(90deg, rgba(248, 238, 238, 1) 0%, rgba(248, 238, 238, 1) 100%)'
            }}
          >
            <div className="flex items-center justify-between px-6 md:px-10 lg:px-[64px] h-full">
              <div className="flex-1">
                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#555555] leading-[22px] md:leading-[24px] lg:leading-[26px] mb-4 md:mb-5 lg:mb-6">
                  전문가들이 함께 고민하고, 함께 성장합니다
                </p>
                <h1 className="text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-[28px] md:leading-[36px] lg:leading-[44px] text-[#0A095B]">
                  당신의 가게를 위한 1:1 맞춤 솔루션
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub tab */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="border-b-2 border-[#7b8a9c] pb-4 md:pb-6 mb-8 md:mb-12">
          <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#7b8a9c] leading-[24px] md:leading-[26px] lg:leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
            홈 &gt; 전문가 &gt; 나도 질문
          </p>
        </div>
      </div>

      {/* Write Form */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] pb-16">
        <div className="space-y-4">
          {/* Title Input */}
          <div className="border border-[#7b8a9c] rounded-[8px] h-[88px] flex items-center px-[32px]">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="배달앱 수수료 줄이는 방법 있을까요?"
              className="w-full text-[18px] text-[#393939] leading-[24px] outline-none placeholder:text-[#393939]"
              style={{ letterSpacing: '-0.4px' }}
            />
          </div>

          {/* Category Select */}
          <div className="border border-[#7b8a9c] rounded-[8px] h-[88px] flex items-center px-[32px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-[18px] text-[#393939] leading-[24px] outline-none bg-transparent"
              style={{ letterSpacing: '-0.4px' }}
            >
              <option value="">카테고리를 선택해주세요</option>
              <option value="세무">세무</option>
              <option value="노무">노무</option>
              <option value="법률">법률</option>
              <option value="창폐업">창폐업</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* Content Textarea */}
          <div className="border border-[#7b8a9c] rounded-[8px] h-[400px] p-[32px]">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="요즘 배달앱 수수료가 너무 높아서 고민입니다. 매출은 늘어나는데 실제로 남는 게 없어요.. 혹시 수수료 부담 줄이는 좋은 방법 아시는 분 계신가요?"
              className="w-full h-full text-[18px] text-[#393939] leading-[24px] outline-none resize-none placeholder:text-[#393939]"
              style={{ letterSpacing: '-0.4px' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="ghost" size="lg" onClick={handleCancel} className="border-2 border-[#7b8a9c] text-[#7b8a9c]" disabled={loading}>
            취소
          </Button>
          <Button variant="primary" size="lg" onClick={handleSubmit} disabled={loading}>
            {loading ? '등록 중...' : '등록'}
          </Button>
        </div>

        {/* Alert Message */}
        <div className="flex items-center gap-2 justify-center mt-6">
          <AlertIcon className="text-[#7b8a9c]" />
          <p className="font-medium text-[18px] text-[#7b8a9c] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
            전문가의 답변이 달리면 수정이 불가합니다.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
