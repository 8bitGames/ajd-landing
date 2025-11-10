export default function ExpertConsultation() {
  const experts = [
    { id: 1, name: "김전문가", specialty: "세무 전문", color: "from-purple-500 to-purple-700" },
    { id: 2, name: "이전문가", specialty: "법률 전문", color: "from-blue-500 to-blue-700" },
    { id: 3, name: "박전문가", specialty: "노무 전문", color: "from-indigo-500 to-indigo-700" },
    { id: 4, name: "최전문가", specialty: "경영 전문", color: "from-teal-500 to-teal-700" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-[420px] relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">제가 답변해 드립니다!</h2>
          <p className="text-lg text-gray-600">검증된 전문가의 답변을 바로 받아보세요.</p>
          <div className="flex gap-2 mt-4">
            <div className="h-2 w-10 bg-blue-600 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className={`bg-gradient-to-br ${expert.color} rounded-xl p-6 text-white hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div>
                  <h3 className="text-xl font-bold">{expert.name}</h3>
                  <p className="text-sm opacity-90">{expert.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
