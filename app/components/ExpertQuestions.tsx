export default function ExpertQuestions() {
  const questions = [
    { id: 1, title: "재고부족으로 인한 환불, 본사 상대로 손해배상 되나요?", category: "정보", date: "2023.05.01" },
    { id: 2, title: "단골쿠폰, 몇 회 이상 주문한 고객에게 보내야 할까요?", category: "질문/답변", date: "2023.05.01" },
    { id: 3, title: "고용노동부 '4대노통 기초질서 현장 점검'시작! 미리...", category: "정보", date: "2023.05.01" },
    { id: 4, title: "네이버 플레이스 순위 이거 하지 마세요!", category: "정보", date: "2023.05.01" },
    { id: 5, title: "여름 주방 너무 더운데 해결책 없을까요?", category: "리뷰", date: "2023.05.01" },
  ];

  const tabs = ["전체", "세무", "노무", "법률", "창폐업"];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">전문가에게 물어보세요</h2>

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="px-6 py-3 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors p-3 rounded-lg cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {question.id}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{question.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">{question.category}</span>
                  <span>{question.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
