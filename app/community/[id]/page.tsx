"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { ProfileIcon } from "../../components/ui/Icons";

interface Reply {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    role: string;
  };
}

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
    role: string;
  };
  replies: Reply[];
}

export default function PostDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/community/posts/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!replyText.trim()) {
      return;
    }

    try {
      const res = await fetch('/api/community/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: params.id, content: replyText }),
      });

      const data = await res.json();

      if (data.success) {
        setReplyText("");
        setShowReplyInput(false);
        fetchPost(); // 댓글 목록 새로고침
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('댓글 작성 중 오류가 발생했습니다.');
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

  if (loading) {
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </div>
    );
  }

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
          {/* Back Button */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 mb-6"
          >
            <Button variant="ghost" size="sm">← 목록으로</Button>
          </Link>

          {/* Post Content */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <ProfileIcon size={40} />
              <div>
                <div className="font-medium text-gray-900">이하나</div>
                <div className="text-sm text-gray-600">2025.05.01 15:32</div>
              </div>
              <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                응답중
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-6 text-gray-900">날씨가 좋으면 포장 매출이 늘어나나요?</h1>

            <p className="text-gray-800 leading-relaxed mb-6">
              저희 가게는 아직 포장을 운영하고 있지는 않은데요, 날씨만 좋으면 이상하게 배달 매출이 늘어나는 것 같더라구요.
              지금은 겨울이 오면 오히려 손님이 적고 날씨 좋으면 조금씩 늘어나는 것 같은데 다른 분들도 저랑 비슷하게 느끼시는지
              궁금해요. 지금 위기가 되어서는 안 되는데, 날씨 좋을 때 포장 매출을 늘리는 방법이 있을까 싶어서 질문드립니다.
              좋은 의견 부탁드립니다. 그리고나서는 어떤 방법으로 했을 때 괜찮았었는지 의견주시면 감사하겠습니다.
            </p>

            <div className="flex gap-4">
              <Button variant="ghost" size="sm">추천</Button>
              <Button variant="ghost" size="sm">반대</Button>
            </div>
          </div>

          {/* Replies Section */}
          <div className="border-t pt-6">
            <div className="space-y-4 mb-6">
              {post.replies.map((reply) => (
                <div key={reply.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <ProfileIcon size={40} className="flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{reply.author.name}</span>
                      <span className="text-sm text-gray-600">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{reply.content}</p>
                  </div>
                </div>
              ))}

              {/* Reply Input */}
              {showReplyInput && (
                <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <ProfileIcon size={40} className="flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium mb-2 text-gray-900">김사장</div>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="답변을 달아주세요"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-[#1a1a1a] placeholder:text-[#a2a9b0]"
                    />
                    <div className="flex justify-end mt-2">
                      <Button variant="secondary" size="md" onClick={handleSubmitReply}>
                        답변등록
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!showReplyInput && (
              <div className="flex justify-center">
                <Button variant="outline" size="lg" onClick={() => setShowReplyInput(true)}>
                  답변달기
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
