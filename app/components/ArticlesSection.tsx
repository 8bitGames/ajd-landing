export default function ArticlesSection() {
  const articles = [
    { id: 1, title: "무인창업에 도전하고 싶은 40대 주부의 고민" },
    { id: 2, title: "창업하려는 브랜드에서 직접 일해보는게 도움이 될까요?" },
    { id: 3, title: "창업하려는 브랜드에서 직접 일해보는게 도움이 될까요?" },
    { id: 4, title: "창업하려는 브랜드에서 직접 일해보는게 도움이 될까요?" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1920px] mx-auto px-[420px]">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">자영업자 실전 A to Z</h2>
        <div className="grid grid-cols-4 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-4xl">📄</span>
              </div>
              <h3 className="text-sm font-medium leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
