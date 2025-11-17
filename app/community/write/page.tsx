"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function WritePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 로그인 확인
  if (!authLoading && !user) {
    router.push("/auth/login");
    return null;
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!category) {
      setError("카테고리를 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/community");
        router.refresh();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("게시글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/community");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
            <div>
              <p className="text-gray-800 mb-2 text-[14px] md:text-[16px]">사업의 성장, 준사가 아닌 경제의 원으로</p>
              <h1 className="text-[24px] md:text-[28px] lg:text-[32px] xl:text-4xl font-bold mb-2 text-black">서로 배우고 도와주는 진짜 커뮤니티</h1>
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] xl:text-4xl font-bold text-blue-600">김사장에서 함께해요!</h2>
            </div>
            <div className="text-[48px] md:text-[64px] lg:text-8xl">🤝</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] py-8 md:py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <span>&gt;</span>
            <Link href="/community" className="hover:text-blue-600">커뮤니티</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">글쓰기</span>
          </div>

          {/* Write Form */}
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="날씨가 좋으면 포장 매출이 늘어나나요?"
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1a1a1a]"
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
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="저희 가게는 아직 포장을 운영하고 있지는 않은데요, 날씨만 좋으면 이상하게 배달 매출이 늘어나는 것 같더라구요. 지금은 겨울이 오면 오히려 손님이 적고 날씨 좋으면 조금씩 늘어나는 것 같은데 다른 분들도 저랑 비슷하게 느끼시는지 궁금해요. 지금 위기가 되어서는 안 되는데, 날씨 좋을 때 포장 매출을 늘리는 방법이 있을까 싶어서 질문드립니다. 좋은 의견 부탁드립니다. 그리고나서는 어떤 방법으로 했을 때 괜찮았었는지 의견주시면 감사하겠습니다..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px] resize-y text-[#1a1a1a] placeholder:text-[#a2a9b0]"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="ghost" size="lg" onClick={handleCancel} disabled={loading}>
                취소
              </Button>
              <Button variant="primary" size="lg" onClick={handleSubmit} disabled={loading}>
                {loading ? "등록 중..." : "등록"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
