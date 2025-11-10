"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button, { BackButton } from "../../components/ui/Button";
import { QuestionIconLarge, ProfileIcon, ExpertBadge } from "../../components/ui/Icons";

export default function ExpertDetailPage() {
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [answerText, setAnswerText] = useState("");

  const answers = [
    {
      id: 1,
      author: "이혜림",
      date: "2025.05.01 15:32",
      content: "안녕하세요. 세무 전문가 이혜림 입니다. 배달앱 수수료로 인해 고민이 많으시죠? 요즘 많은 소상공인분들의 고민이 아닐까 합니다. 현실적으로 수수료를 줄일 수 있는 가장 좋은 방법은 ",
      isExpert: true,
    },
    {
      id: 2,
      author: "한지훈",
      date: "2025.05.01 15:32",
      content: "안녕하세요. 노무 전문가 한지훈 입니다. 배달앱 수수료로 인해 고민이 많으시죠? 요즘 많은 소상공인분들의 고민이 아닐까 합니다. 현실적으로 수수료를 줄일 수 있는 가장 좋은 방법은 ",
      isExpert: true,
    },
  ];

  const handleSubmitAnswer = () => {
    console.log("Answer submitted:", answerText);
    setAnswerText("");
    setShowAnswerInput(false);
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
          <Link href="/expert" className="flex items-center gap-4">
            <BackButton />
            <p className="font-bold text-[20px] text-[#7b8a9c] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
              목록으로
            </p>
          </Link>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-[1920px] mx-auto px-[420px] pb-16">
        <div className="border-b-2 border-[#adadad] pb-12 mb-12">
          <div className="flex gap-4 items-start">
            <QuestionIconLarge />
            <div className="flex-1">
              <h1 className="font-bold text-[28px] text-[#181a1c] leading-[36px] mb-6">
                배달앱 수수료 줄이는 방법 있을까요?
              </h1>
              <div className="flex gap-4 items-center text-[16px] mb-6">
                <span className="font-semibold text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                  홍길동
                </span>
                <span className="text-[#adadad] leading-[20px]">2025.05.01 15:32</span>
                <span className="font-semibold text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                  1개의 답변
                </span>
              </div>
              <p className="text-[20px] text-[#393939] leading-[26px]">
                요즘 배달앱 수수료가 너무 높아서 고민입니다. 매출은 늘어나는데 실제로 남는 게 없어요.. 혹시 수수료 부담 줄이는 좋은 방법 아시는 분 계신가요?
              </p>
            </div>
          </div>
        </div>

        {/* Answer Input (if active) */}
        {showAnswerInput && (
          <div className="border-2 border-[#e1e4eb] rounded-[8px] p-8 mb-8">
            <div className="flex gap-4">
              <ProfileIcon size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-[20px] text-[#393939] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
                    한지훈
                  </span>
                  <ExpertBadge />
                </div>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="안녕하세요. 세무 전문가 한지훈 입니다. 배달앱 수수료로 인해 고민이 많으시죠? 요즘"
                  className="w-full h-[80px] text-[18px] text-[#393939] leading-[24px] outline-none resize-none placeholder:text-[#393939]"
                  style={{ letterSpacing: '-0.4px' }}
                />
                <div className="flex justify-end mt-2">
                  <Button variant="primary" size="md" onClick={handleSubmitAnswer} className="bg-[#0e53dc]">
                    답변등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Answers List */}
        <div className="space-y-4 mb-8">
          {answers.map((answer) => (
            <div key={answer.id} className="bg-neutral-50 rounded-[8px] p-8">
              <div className="flex gap-4">
                <ProfileIcon size={40} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-bold text-[20px] text-[#393939] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
                      {answer.author}
                    </span>
                    <span className="text-[16px] text-[#adadad] leading-[20px]">{answer.date}</span>
                    {answer.isExpert && <ExpertBadge />}
                  </div>
                  <p className="text-[18px] text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                    {answer.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          {!showAnswerInput ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAnswerInput(true)}
            >
              목록
            </Button>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
