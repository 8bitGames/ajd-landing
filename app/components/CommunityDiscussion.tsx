import Link from "next/link";
import Button, { NavButton } from "./ui/Button";

export default function CommunityDiscussion() {
  const discussions = [
    {
      id: 1,
      author: "홍길동",
      date: "2025.05.01 15:32",
      title: "날씨가 좋으면 포장 매출이 늘어나나요?",
      content: "저희 가게는 아직 포장을 운영하고 있지는 않은데요, 날씨만 좋으면 이상하게 배달 매출이 늘어나는 것 같더라구요. 다른 분들도 저랑 비슷하게 느끼시는지 궁금해요..",
      replies: 3,
    },
    {
      id: 2,
      author: "김사장",
      date: "2025.05.01 15:32",
      title: "배달앱 수수료 줄이는 방법 있을까요?",
      content: "요즘 배달앱 수수료가 너무 높아서 고민입니다. 매출은 늘어나는데 실제로 남는게 없어요.. 혹시 수수료 부담 줄이는 좋은 방법 아시는 분 계신가요?",
      replies: 3,
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1920px] mx-auto px-[348px]">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-900">
          지금 자영업자들은 어떤 고민이 있을까? 🤔
        </h2>

        <div className="flex items-center gap-4">
          <NavButton direction="prev" />

          <div className="flex-1 grid grid-cols-2 gap-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <span className="font-medium">{discussion.author}</span>
                  <span className="text-gray-400">{discussion.date}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900">{discussion.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{discussion.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{discussion.replies}개의 답변</span>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    답변하기
                  </button>
                </div>
              </div>
            ))}
          </div>

          <NavButton direction="next" />
        </div>

        <div className="text-center mt-12">
          <Link href="/community">
            <Button variant="primary" size="xl">
              커뮤니티 입장하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
