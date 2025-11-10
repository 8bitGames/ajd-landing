export default function PopularPosts() {
  const posts = [
    { id: 1, title: "2023외식업 트렌드 실전편 마케팅편", author: "김사장탐험대", date: "2023.05.01" },
    { id: 2, title: "음식물 쓰레기, 정말 신박한 처리 방법", author: "피리부는소라90", date: "2023.05.01" },
    { id: 3, title: "고용노동부 '4대 기초노동질서 현장 점검'시작! 미리 교육 받아보세요", author: "나이스샷라이언65", date: "2023.05.01" },
    { id: 4, title: "네이버 플레이스 순위 이거 하지 마세요!", author: "장대비어피치66", date: "2023.05.01" },
    { id: 5, title: "무료로 가게 장비 싹다 바꾸신 사장님 특별 노하우, 100% 공개합니다", author: "김사장탐험대", date: "2023.05.01" },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">남들은 다 아는 #음식/외식/배달업계 HOT 이슈</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-200 pb-4 hover:bg-gray-50 transition-colors p-3 rounded-lg cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {post.id}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
