import Image from "next/image";

export default function ExpertLectures() {
  const lectures = [
    { id: 1, title: "150만원으로 월 천만 원 도전하는 액세사리 스마...", image: "/lecture-1.png" },
    { id: 2, title: "브랜딩을 담은 리빙 & 푸드 스토어, 집에서 시작하...", image: "/lecture-2.png" },
    { id: 3, title: "조MD의 스마트 스토어 순수익이 보장되는 비결은..", image: "/lecture-3.png" },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <h2
          className="text-[20px] md:text-[22px] lg:text-[24px] font-bold mb-4 md:mb-5 lg:mb-6"
          style={{ color: "#181A1C", letterSpacing: "-0.7px", lineHeight: "34px" }}
        >
          사업을 한다면 꼭 한번은 들어봐야 할 강의
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="cursor-pointer">
              <div className="relative mb-3 md:mb-4 rounded-[8px] overflow-hidden h-[180px] md:h-[194px]">
                <Image
                  src={lecture.image}
                  alt={lecture.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3
                className="font-semibold text-[16px] md:text-[17px] lg:text-[18px]"
                style={{ color: "#181A1C", letterSpacing: "-0.5px", lineHeight: "28px" }}
              >
                {lecture.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
