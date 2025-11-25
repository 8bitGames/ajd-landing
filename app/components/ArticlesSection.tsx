import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesSection() {
  const articles = getAllArticles();

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6">
          <h2
            className="text-[20px] md:text-[22px] lg:text-[24px] font-bold"
            style={{ color: "#181A1C", letterSpacing: "-0.7px", lineHeight: "34px" }}
          >
            자영업자 실전 A to Z
          </h2>
          <Link
            href="/articles"
            className="text-[14px] md:text-[16px] font-medium text-[#797979] hover:text-[#0e53dc] transition-colors"
            style={{ letterSpacing: "-0.4px" }}
          >
            더보기 +
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[13px]">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="cursor-pointer group"
            >
              <div className="relative mb-3 md:mb-4 rounded-[12px] overflow-hidden h-[180px] md:h-[194px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3
                className="font-semibold text-[16px] md:text-[17px] lg:text-[18px] group-hover:text-[#0e53dc] transition-colors"
                style={{ color: "#181A1C", letterSpacing: "-0.5px", lineHeight: "28px" }}
              >
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
