import Image from "next/image";

export default function ArticlesSection() {
  const articles = [
    { id: 1, title: "무인창업에 도전하고 싶은 40대 주부의 고민", image: "/article-1.png" },
    { id: 2, title: "창업하려는 브랜드에서 직접 일해보는게 도움이 될까요?", image: "/article-2.png" },
    { id: 3, title: "창업하려는 브랜드에서 직접 일해보는게 도움이 될까요?", image: "/article-3.png" },
    { id: 4, title: "창업하려는 브랜드에서 직접 일해보는게 도움이 될까요?", image: "/article-4.png" },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <h2
          className="text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-4 md:mb-5 lg:mb-6"
          style={{ color: "#181A1C", letterSpacing: "-0.7px", lineHeight: "34px" }}
        >
          자영업자 실전 A to Z
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[13px]">
          {articles.map((article) => (
            <div key={article.id} className="cursor-pointer">
              <div className="relative mb-3 md:mb-4 rounded-[12px] overflow-hidden h-[180px] md:h-[194px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3
                className="font-semibold text-[16px] md:text-[17px] lg:text-[18px]"
                style={{ color: "#181A1C", letterSpacing: "-0.5px", lineHeight: "28px" }}
              >
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
