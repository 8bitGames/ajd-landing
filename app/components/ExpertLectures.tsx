export default function ExpertLectures() {
  const lectures = [
    { id: 1, title: "150만원으로 월 천만 원 도전하는 액세사리 스마..." },
    { id: 2, title: "브랜딩을 담은 리빙 & 푸드 스토어, 집에서 시작하..." },
    { id: 3, title: "조MD의 스마트 스토어 순수익이 보장되는 비결은.." },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1920px] mx-auto px-[420px]">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">사업을 한다면 꼭 한번은 들어봐야 할 강의</h2>
        <div className="grid grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg h-48 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-5xl">🎓</span>
              </div>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {lecture.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
