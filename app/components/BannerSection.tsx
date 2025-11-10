export default function BannerSection() {
  return (
    <section className="py-16">
      <div className="max-w-[1920px] mx-auto px-[420px]">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Banner */}
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="bg-white text-orange-600 px-3 py-1 rounded text-sm font-medium inline-block mb-4">
              기획
            </div>
            <h3 className="text-2xl font-bold mb-2">MZ를 사로잡은 노포 맛집</h3>
            <p className="text-sm opacity-90">젊은 사장님의 비밀 노트 엿보기</p>
            <div className="absolute right-4 bottom-4 text-7xl opacity-30">🍜</div>
          </div>

          {/* Right Banner */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium inline-block mb-4">
              강의
            </div>
            <h3 className="text-2xl font-bold leading-tight">
              2023 종합소득세 획기적으로 줄이는<br />
              장부기입방법 3가지
            </h3>
            <div className="absolute right-4 bottom-4 text-7xl opacity-30">📊</div>
          </div>
        </div>

        {/* App Download Banner */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-8 text-white relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">
              모바일 앱으로 더 쉽고 빠르게<br />
              지금 경험해 보세요
            </h3>
            <div className="space-y-3">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-900 transition-colors">
                <span className="text-2xl">🍎</span>
                <span className="text-sm font-medium">App Store</span>
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-900 transition-colors">
                <span className="text-2xl">▶</span>
                <span className="text-sm font-medium">Google Play</span>
              </button>
            </div>
            <div className="absolute right-4 bottom-4 text-8xl opacity-30">📱</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-8 left-8 w-24 h-24 bg-white/20 rounded-full"></div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                  <span className="font-medium">커뮤니티</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block ml-8">
                  <span className="font-medium">강의</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block ml-4">
                  <span className="font-medium">전문가 상담</span>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed">
                서로의 고충을 공유하고<br />
                해결이 어려웠던 부분을<br />
                전문가의 지식으로 해결해보세요.
              </p>
            </div>
            <div className="absolute right-4 top-4 text-6xl">🔔</div>
          </div>
        </div>
      </div>
    </section>
  );
}
