import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { BackButton } from "../../components/ui/Button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "게시글을 찾을 수 없습니다 - 김사장",
    };
  }

  return {
    title: `${article.title} - 김사장`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const allArticles = getAllArticles();

  // Get related articles (excluding current article)
  const relatedArticles = allArticles
    .filter(a => a.id !== article?.id)
    .slice(0, 3);

  if (!article) {
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

      {/* Breadcrumb */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] pt-8 md:pt-12">
        <div className="border-b-2 border-[#7b8a9c] pb-4 md:pb-6 mb-8 md:mb-12 flex items-center justify-between">
          <Link href="/articles" className="flex items-center gap-2 md:gap-4">
            <BackButton />
            <p
              className="font-bold text-[16px] md:text-[18px] lg:text-[20px] text-[#7b8a9c] leading-[24px] md:leading-[28px]"
              style={{ letterSpacing: '-0.7px' }}
            >
              목록으로
            </p>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] pb-16">
        {/* Article Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block px-[16px] py-[6px] rounded-[16px] bg-[#f0f4ff] text-[#0e53dc] text-[14px] md:text-[16px] font-semibold"
              style={{ letterSpacing: '-0.4px' }}
            >
              {article.category}
            </span>
          </div>

          <h1
            className="font-bold text-[24px] md:text-[28px] lg:text-[32px] text-[#181A1C] mb-6"
            style={{ letterSpacing: '-0.7px', lineHeight: '1.3' }}
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-2 md:gap-4 items-center text-[14px] md:text-[16px] text-[#adadad] mb-8">
            <span className="font-medium text-[#393939]">{article.author}</span>
            <span>·</span>
            <span>{article.publishedAt}</span>
            <span>·</span>
            <span>{article.readTime} 소요</span>
          </div>

          {/* Article Intro */}
          <div
            className="text-[17px] md:text-[18px] lg:text-[20px] text-[#393939] leading-[1.6] p-6 md:p-8 bg-[#f9f9fa] rounded-[12px] border-l-4 border-[#0e53dc]"
            style={{ letterSpacing: '-0.4px' }}
            dangerouslySetInnerHTML={{
              __html: article.content.intro
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#0e53dc] font-bold">$1</strong>')
            }}
          />
        </div>

        {/* Article Sections */}
        <div className="space-y-12">
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="border-b border-[#eaeaea] pb-8 last:border-0">
              <h2
                className="font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#181A1C] mb-6 pb-4 border-b-2 border-[#0e53dc] inline-block"
                style={{ letterSpacing: '-0.7px' }}
              >
                {section.title}
              </h2>

              <div className="space-y-4 mt-6">
                {section.content.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className={`text-[16px] md:text-[17px] lg:text-[18px] text-[#393939] leading-[1.7] ${
                      paragraph.startsWith('**') || paragraph.includes('**')
                        ? 'font-semibold'
                        : ''
                    }`}
                    style={{ letterSpacing: '-0.4px' }}
                    dangerouslySetInnerHTML={{
                      __html: paragraph
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#0e53dc] font-bold">$1</strong>')
                        .replace(/\n/g, '<br />')
                    }}
                  />
                ))}
              </div>

              {section.image && (
                <div className="relative h-[300px] md:h-[400px] mt-8 rounded-[12px] overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t-2 border-[#eaeaea]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="font-semibold text-[16px] md:text-[18px] text-[#393939]"
              style={{ letterSpacing: '-0.4px' }}
            >
              이 글이 도움이 되셨나요?
            </p>
            <div className="flex gap-2">
              <button
                className="px-6 py-3 rounded-[20px] bg-[#f0f4ff] text-[#0e53dc] font-semibold text-[14px] md:text-[16px] hover:bg-[#e0e9ff] transition-colors"
                style={{ letterSpacing: '-0.4px' }}
              >
                공유하기
              </button>
              <Link href="/community/write">
                <button
                  className="px-6 py-3 rounded-[20px] bg-[#0e53dc] text-white font-semibold text-[14px] md:text-[16px] hover:bg-[#0a3d9e] transition-colors"
                  style={{ letterSpacing: '-0.4px' }}
                >
                  질문하기
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-16 border-t-2 border-[#eaeaea]">
            <h2
              className="font-bold text-[20px] md:text-[22px] lg:text-[24px] text-[#181A1C] mb-8"
              style={{ letterSpacing: '-0.7px' }}
            >
              다른 글 더보기
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-[12px] overflow-hidden border border-[#eaeaea] hover:border-[#0e53dc] hover:shadow-md transition-all">
                    <div className="relative h-[140px] bg-gray-100">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span
                        className="inline-block px-[10px] py-[4px] rounded-[10px] bg-[#f0f4ff] text-[#0e53dc] text-[12px] font-semibold mb-2"
                        style={{ letterSpacing: '-0.4px' }}
                      >
                        {relatedArticle.category}
                      </span>
                      <h3
                        className="font-semibold text-[15px] md:text-[16px] text-[#181A1C] line-clamp-2 group-hover:text-[#0e53dc] transition-colors"
                        style={{ letterSpacing: '-0.4px', lineHeight: '24px' }}
                      >
                        {relatedArticle.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
