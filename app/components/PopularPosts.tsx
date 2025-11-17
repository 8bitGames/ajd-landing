"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  author: {
    name: string;
  };
  createdAt: string;
}

export default function PopularPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/community/posts?sortBy=viewCount&limit=5');

        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="mb-16">
      <h2
        className="text-[24px] font-bold mb-6"
        style={{ color: "#181A1C", letterSpacing: "-0.7px", lineHeight: "34px" }}
      >
        남들은 다 아는 #<span style={{ color: "#0E53DC" }}>음식/외식/배달업계</span> HOT 이슈
      </h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              게시글이 없습니다.
            </div>
          ) : (
            posts.map((post, index) => (
              <Link key={post.id} href={`/community/${post.id}`} className="cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="flex items-center justify-center rounded-[5.622px] flex-shrink-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "rgba(14, 83, 220, 0.07)",
                    }}
                  >
                    <span
                      className="font-medium text-[18px]"
                      style={{ color: "#152E5F", letterSpacing: "-0.5px" }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-[18px]"
                    style={{ color: "#181A1C", letterSpacing: "-0.5px" }}
                  >
                    {post.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 ml-[40px]">
                  <span
                    className="text-[15px]"
                    style={{ color: "#797979", letterSpacing: "-0.5622px" }}
                  >
                    {post.author.name}
                  </span>
                  <span
                    className="text-[15px]"
                    style={{ color: "#ADADAD" }}
                  >
                    {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }).replace(/\. /g, '.').replace(/\.$/, '')}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </section>
  );
}
