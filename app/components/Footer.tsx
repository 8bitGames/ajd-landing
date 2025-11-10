export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12">
      <div className="max-w-[1920px] mx-auto px-[422px]">
        <div className="flex items-center gap-8 mb-8">
          <div className="text-white font-bold text-xl">김사장</div>
        </div>

        <nav className="flex gap-12 mb-8 text-sm">
          <a href="#" className="hover:text-white transition-colors">공지사항</a>
          <a href="#" className="hover:text-white transition-colors">채용정보</a>
          <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
        </nav>

        <div className="space-y-2 text-sm mb-8">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">SEOUL</span>
            <span>서울특별시 강남구 테헤란로 4길 35 (역삼동 827-14) 프레스티지투빌딩 4층</span>
            <span className="text-gray-500">|</span>
            <span>TEL. 010-2706-6852</span>
            <span className="text-gray-500">|</span>
            <span>FAX. 02-6944-8126</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">BUSAN</span>
            <span>부산 북구 만덕대로 104, 3층</span>
            <span className="text-gray-500">|</span>
            <span>TEL. 070-8666-6466</span>
            <span className="text-gray-500">|</span>
            <span>FAX. 02-6944-8126</span>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span className="text-red-500">▶</span>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span className="text-green-500">N</span>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span className="text-pink-500">📷</span>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span>🎵</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
