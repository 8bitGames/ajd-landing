import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "자영업자 실전 A to Z - 김사장",
  description: "창업부터 운영까지, 자영업자를 위한 실전 가이드. 무인창업, 프랜차이즈, 세무회계, 운영 노하우를 확인하세요.",
  openGraph: {
    title: "자영업자 실전 A to Z - 김사장",
    description: "창업부터 운영까지, 자영업자를 위한 실전 가이드",
    type: "website",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <section className="py-8 md:py-12 lg:py-16 bg-white border-b border-[#eaeaea]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
          <div className="flex flex-col gap-2 md:gap-3">
            <p
              className="font-medium text-[14px] md:text-[16px] text-[#7b8a9c]"
              style={{ letterSpacing: '-0.4px' }}
            >
              홈 &gt; 자영업자 실전 A to Z
            </p>
            <h1
              className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#181A1C]"
              style={{ letterSpacing: '-0.7px', lineHeight: '1.3' }}
            >
              자영업자 실전 A to Z
            </h1>
            <p
              className="text-[16px] md:text-[18px] text-[#797979] mt-2"
              style={{ letterSpacing: '-0.4px' }}
            >
              창업부터 운영까지, 실전에 필요한 모든 정보를 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[13px]">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Article Image */}
                  <div className="relative h-[180px] md:h-[194px] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="inline-block px-[12px] py-[6px] rounded-[12px] bg-[#f0f4ff] text-[#0e53dc] text-[13px] md:text-[14px] font-semibold"
                        style={{ letterSpacing: '-0.4px' }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-4 md:p-5">
                    <h3
                      className="font-semibold text-[16px] md:text-[17px] lg:text-[18px] text-[#181A1C] mb-2 line-clamp-2 group-hover:text-[#0e53dc] transition-colors"
                      style={{ letterSpacing: '-0.5px', lineHeight: '28px' }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-[14px] md:text-[15px] text-[#797979] line-clamp-2 mb-4"
                      style={{ letterSpacing: '-0.4px', lineHeight: '22px' }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center gap-2 text-[13px] text-[#adadad]">
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
