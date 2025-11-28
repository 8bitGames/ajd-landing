"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

interface Question {
  id: string;
  title: string;
  category: string;
  author: {
    name: string;
  };
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ExpertQuestions() {
  const [activeTab, setActiveTab] = useState("전체");

  const tabs = ["전체", "세무", "노무", "법률", "창폐업"];

  const categoryParam = activeTab === "전체" ? "" : `&category=${activeTab}`;
  const { data, isLoading } = useSWR(
    `/api/expert/questions?sortBy=viewCount&limit=5${categoryParam}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1분간 중복 요청 방지
    }
  );

  const questions: Question[] = data?.posts || [];

  return (
    <section>
      <h2
        className="text-[24px] font-bold mb-6"
        style={{ color: "#181A1C", letterSpacing: "-0.7px", lineHeight: "34px" }}
      >
        전문가에게 물어보세요
      </h2>

      <div className="flex gap-4 mb-7 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-6 py-3 rounded-[20px] font-medium text-[16px] transition-colors whitespace-nowrap flex-shrink-0"
            style={{
              backgroundColor: activeTab === tab ? "#0E53DC" : "#F2F4F8",
              color: activeTab === tab ? "#FFFFFF" : "#3E5364",
              letterSpacing: "-0.4px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {questions.map((question, index) => (
            <Link key={question.id} href={`/expert/${question.id}`} className="cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="flex items-center justify-center rounded-[4px] flex-shrink-0"
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "rgba(14, 83, 220, 0.07)",
                  }}
                >
                  <span
                    className="font-medium text-[18px]"
                    style={{ color: "#152E5F", letterSpacing: "-0.4px" }}
                  >
                    {index + 1}
                  </span>
                </div>
                <h3
                  className="font-semibold text-[18px]"
                  style={{ color: "#181A1C", letterSpacing: "-0.4px" }}
                >
                  {question.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 ml-[40px]">
                <span
                  className="text-[15px]"
                  style={{ color: "#797979", letterSpacing: "-0.4px" }}
                >
                  {question.author.name}
                </span>
                <span
                  className="text-[15px]"
                  style={{ color: "#797979", letterSpacing: "-0.4px" }}
                >
                  {question.category}
                </span>
                <span
                  className="text-[14px]"
                  style={{ color: "#ADADAD" }}
                >
                  {new Date(question.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).replace(/\. /g, '.').replace(/\.$/, '')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
