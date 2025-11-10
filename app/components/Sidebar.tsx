export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Community Legend */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">커뮤니티 레전드</h3>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 relative overflow-hidden">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-900">넘흐 멋찐 우리 단골 손님, 자랑하고 싶습니다.</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              우리 가게에는 생각보다 나이 많으신 어르신 단골들이 많습니다. 그 중에 한 아버님이 계신데요...항상 정장...
            </p>
          </div>
          <div className="flex gap-1 mt-4">
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            <div className="h-1 w-12 bg-gray-300 rounded-full"></div>
            <div className="h-1 w-12 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Expert Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">전문가가 답합니다.</h3>
          <p className="text-sm leading-relaxed">
            궁금한 것이 있나요?<br />
            지금 전문가에게 문의하세요!
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            질문하기
          </button>
        </div>
        <div className="absolute right-4 bottom-4 text-6xl opacity-20">💼</div>
      </div>

      {/* Answer Notification */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-1">기다리시던 전문가 답변이 도착했어요!</h4>
            <p className="text-sm text-gray-600">'세무'에 대한 전문가 답변 확인하기</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">→</button>
        </div>
      </div>
    </aside>
  );
}
