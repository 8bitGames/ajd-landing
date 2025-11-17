import Image from "next/image";

export default function ExpertConsultation() {
  const experts = [
    { id: 1, name: "한지훈 노무사", category: "노무", tag: "#소상공인 전문", image: "/expert-1.png", categoryColor: "#6A043B" },
    { id: 2, name: "신경수 세무사", category: "세무", tag: "#소상공인 전문", image: "/expert-2.png", categoryColor: "#152E5F" },
    { id: 3, name: "이혜림 세무사", category: "세무", tag: "#소상공인 전문", image: "/expert-3.png", categoryColor: "#152E5F" },
    { id: 4, name: "최중락 노무사", category: "세무", tag: "#소상공인 전문", image: "/expert-4.png", categoryColor: "#152E5F" },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden" style={{ backgroundColor: "#F9F3F3" }}>
      {/* Background Pattern - Hidden on mobile */}
      <div className="hidden lg:block absolute pointer-events-none left-[499px] top-[-175px] w-[922px] h-[950px]" style={{ mixBlendMode: "screen" }}>
        <Image
          src="/expert-consultation-pattern.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 lg:justify-between">
          {/* Left Text */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full lg:w-[198px]">
            <div className="flex flex-col gap-6">
              <h2
                className="text-[24px] font-bold"
                style={{ color: "#181A1C", letterSpacing: "-0.7px", lineHeight: "34px" }}
              >
                제가 답변해 드립니다!
              </h2>
              <p
                className="font-medium text-[20px]"
                style={{ color: "#181A1C", lineHeight: "26px" }}
              >
                검증된 전문가의 답변을<br />
                바로 받아보세요.
              </p>
            </div>
            <div className="flex gap-2">
              <div
                className="rounded-full"
                style={{
                  width: "40px",
                  height: "8px",
                  backgroundColor: "#0E53DC",
                }}
              ></div>
              <div
                className="rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#DCDCDC",
                }}
              ></div>
              <div
                className="rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#DCDCDC",
                }}
              ></div>
            </div>
          </div>

          {/* Right Expert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full lg:flex-1">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="relative rounded-[8px] overflow-hidden cursor-pointer h-[160px] md:h-[172px]"
              >
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute flex flex-col gap-1"
                  style={{
                    left: "16px",
                    top: "16px",
                    width: "126px",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <div
                      className="inline-flex items-center justify-center px-2 py-[3px] rounded-[4px]"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        width: "43px",
                        height: "24px",
                      }}
                    >
                      <span
                        className="font-medium text-[12px]"
                        style={{
                          color: expert.categoryColor,
                          letterSpacing: "-0.4px",
                          lineHeight: "14px",
                        }}
                      >
                        {expert.category}
                      </span>
                    </div>
                    <h3
                      className="font-bold text-[24px] text-white"
                      style={{
                        letterSpacing: "-0.7px",
                        lineHeight: "34px",
                      }}
                    >
                      {expert.name}
                    </h3>
                  </div>
                  <p
                    className="text-[16px] text-white"
                    style={{
                      lineHeight: "20px",
                    }}
                  >
                    {expert.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
