import Image from "next/image";

export default function BannerSection() {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left Banner */}
          <div
            className="relative rounded-[8px] overflow-hidden cursor-pointer w-full md:flex-1 h-[140px] md:h-[160px]"
            style={{
              backgroundColor: "rgba(14, 83, 220, 0.07)",
            }}
          >
            <div
              className="absolute px-3 py-1 rounded-[4px]"
              style={{
                left: "16px",
                top: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <span
                className="font-medium text-[12px]"
                style={{
                  color: "#0E53DC",
                  letterSpacing: "-0.4px",
                  lineHeight: "14px",
                }}
              >
                기획
              </span>
            </div>

            <h3
              className="absolute font-bold text-[16px] md:text-[20px]"
              style={{
                left: "16px",
                top: "62px",
                transform: "translateY(-50%)",
                color: "#21252E",
                letterSpacing: "-0.7px",
                lineHeight: "28px",
                maxWidth: "calc(100% - 130px)",
              }}
            >
              MZ를 사로잡은 노포 맛집
            </h3>

            <p
              className="absolute text-[13px] md:text-[15px]"
              style={{
                left: "16px",
                top: "calc(50% + 7px)",
                transform: "translateY(-50%)",
                color: "#3E5364",
                letterSpacing: "-0.5px",
                lineHeight: "22px",
                maxWidth: "calc(100% - 130px)",
              }}
            >
              젊은 사장님의 비밀 노트 엿보기
            </p>

            <div
              className="absolute"
              style={{
                right: "12px",
                bottom: "-11px",
                width: "103px",
                height: "101px",
              }}
            >
              <Image
                src="/banner-notebook.png"
                alt="Notebook"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Banner */}
          <div
            className="relative rounded-[8px] overflow-hidden cursor-pointer w-full md:flex-1 h-[140px] md:h-[160px]"
            style={{
              backgroundColor: "#F8EEEE",
            }}
          >
            <div
              className="absolute px-3 py-1 rounded-[4px]"
              style={{
                left: "16px",
                top: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <span
                className="font-medium text-[12px]"
                style={{
                  color: "#6A043B",
                  letterSpacing: "-0.4px",
                  lineHeight: "14px",
                }}
              >
                강의
              </span>
            </div>

            <h3
              className="absolute font-bold text-[16px] md:text-[20px]"
              style={{
                left: "16px",
                top: "76px",
                transform: "translateY(-50%)",
                color: "#21252E",
                letterSpacing: "-0.7px",
                lineHeight: "24px",
                maxWidth: "calc(100% - 130px)",
              }}
            >
              2023 종합소득세 획기적으로 줄이는 장부기입방법 3가지
            </h3>

            <div
              className="absolute"
              style={{
                right: "2px",
                bottom: "-19px",
                width: "110px",
                height: "110px",
              }}
            >
              <Image
                src="/banner-contract.png"
                alt="Contract"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
