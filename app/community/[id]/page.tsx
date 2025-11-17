"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "@/lib/hooks/useAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button, { BackButton } from "../../components/ui/Button";
import { ProfileIcon, QuestionIconLarge } from "../../components/ui/Icons";
import CommunityBannerCarousel from "../../components/CommunityBannerCarousel";

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
  category?: string;
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
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
          <CommunityBannerCarousel />
        </div>
      </section>

      {/* Sub tab */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="border-b-2 border-[#7b8a9c] pb-4 md:pb-6 mb-8 md:mb-12 flex items-center justify-between">
          <Link href="/community" className="flex items-center gap-2 md:gap-4">
            <BackButton />
            <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#7b8a9c] leading-[24px] md:leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
              목록으로
            </p>
          </Link>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] pb-16">
        <div className="border-b-2 border-[#adadad] pb-12 mb-12">
          <div className="flex gap-4 items-start">
            <QuestionIconLarge />
            <div className="flex-1">
              {post.category && (
                <span className="inline-block px-[16px] py-[6px] rounded-[16px] bg-[#f0f4ff] text-[#0e53dc] text-[16px] font-semibold mb-4">
                  {post.category}
                </span>
              )}
              <h1 className="font-bold text-[28px] text-[#181a1c] leading-[36px] mb-6">
                {post.title}
              </h1>
              <div className="flex gap-4 items-center text-[16px] mb-6">
                <span className="font-semibold text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                  {post.author.name}
                </span>
                <span className="text-[#adadad] leading-[20px]">{formatDate(post.createdAt)}</span>
                <span className="font-semibold text-[#393939] leading-[24px]" style={{ letterSpacing: '-0.4px' }}>
                  {post.replies.length}개의 답변
                </span>
              </div>
              <div className="text-[20px] text-[#393939] leading-[26px] prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Input (if active) */}
        {showReplyInput && (
          <div className="border-2 border-[#e1e4eb] rounded-[8px] p-8 mb-8">
            <div className="flex gap-4">
              <ProfileIcon size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-[20px] text-[#393939] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
                    {user?.name || '사용자'}
                  </span>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답변을 입력해주세요"
                  className="w-full h-[80px] text-[18px] text-[#393939] leading-[24px] outline-none resize-none placeholder:text-[#a2a9b0]"
                  style={{ letterSpacing: '-0.4px' }}
                />
                <div className="flex justify-end mt-2">
                  <Button variant="primary" size="md" onClick={handleSubmitReply} className="bg-[#0e53dc]">
                    답변등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Answers List */}
        <div className="space-y-4 mb-8">
          {post.replies.map((reply) => (
            <div key={reply.id} className="bg-neutral-50 rounded-[8px] p-8">
              <div className="flex gap-4">
                <ProfileIcon size={40} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-bold text-[20px] text-[#393939] leading-[28px]" style={{ letterSpacing: '-0.7px' }}>
                      {reply.author.name}
                    </span>
                    <span className="text-[16px] text-[#adadad] leading-[20px]">{formatDate(reply.createdAt)}</span>
                  </div>
                  <div className="text-[18px] text-[#393939] leading-[24px] prose prose-lg max-w-none" style={{ letterSpacing: '-0.4px' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {reply.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          {!showReplyInput ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowReplyInput(true)}
            >
              답변달기
            </Button>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
