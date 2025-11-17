import Image from "next/image";

export default function ExpertBanner() {
  return (
    <div
      className="rounded-[24px] overflow-hidden relative h-[320px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(248, 238, 238, 1) 0%, rgba(248, 238, 238, 1) 100%), linear-gradient(90deg, rgba(14, 83, 220, 0.08) 0%, rgba(14, 83, 220, 0.08) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      {/* 텍스트 콘텐츠 */}
      <div className="absolute left-[64px] top-1/2 -translate-y-1/2 z-10">
        <p className="text-[20px] text-[#555555] leading-[26px] mb-4">
          전문가들이 함께 고민하고, 함께 성장합니다
        </p>
        <h1 className="text-[32px] font-bold leading-[44px] text-[#0A095B]">
          당신의 가게를 위한 1:1 맞춤 솔루션
        </h1>
      </div>

      {/* 블러 처리된 하트 이미지 */}
      <div
        className="absolute"
        style={{
          left: "598px",
          top: "55px",
          width: "260px",
          height: "232px",
          filter: "blur(20.5px)",
          opacity: 0.2,
        }}
      >
        <Image
          src="/expert-heart.png"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </div>

      {/* 일반 하트 이미지 */}
      <div
        className="absolute"
        style={{
          left: "597px",
          top: "17px",
          width: "286px",
          height: "256px",
        }}
      >
        <Image
          src="/expert-heart.png"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </div>

      {/* 신용카드 이미지 */}
      <div
        className="absolute shadow-[0px_8px_16px_0px_rgba(0,0,0,0.25)]"
        style={{
          left: "707px",
          top: "120px",
          width: "204px",
          height: "230px",
        }}
      >
        <Image
          src="/expert-card.png"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </div>
    </div>
  );
}
