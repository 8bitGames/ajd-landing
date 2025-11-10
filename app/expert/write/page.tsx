"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { AlertIcon } from "../../components/ui/Icons";

export default function ExpertWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log("Question submitted:", { title, content });
    router.push("/expert");
  };

  const handleCancel = () => {
    router.push("/expert");
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
        <div className="border-b-2 border-[#7b8a9c] pb-6 mb-12">
          <p className="font-bold text-[20px] text-[#7b8a9c] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
            홈 &gt; 전문가 &gt; 나도 질문
          </p>
        </div>
      </div>

      {/* Write Form */}
      <div className="max-w-[1920px] mx-auto px-[420px] pb-16">
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
          <Button variant="ghost" size="lg" onClick={handleCancel} className="border-2 border-[#7b8a9c] text-[#7b8a9c]">
            취소
          </Button>
          <Button variant="primary" size="lg" onClick={handleSubmit}>
            등록
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
