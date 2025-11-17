import Image from "next/image";

export default function CommunityBanner() {
  return (
    <div
      className="rounded-[24px] overflow-hidden relative h-[320px]"
      style={{
        background: "rgba(14, 83, 220, 0.07)",
      }}
    >
      {/* 텍스트 콘텐츠 - 왼쪽 */}
      <div className="absolute left-[64px] top-[109px] -translate-y-1/2">
        <p className="text-[20px] text-[#555555] leading-[26px]">
          사업의 성장, 혼자가 아닌 함께의 힘으로
        </p>
      </div>

      <div className="absolute left-[64px] top-[180px] -translate-y-1/2">
        <h1 className="text-[32px] font-bold leading-[44px] text-[#0A095B]">
          서로 배우고 도와주는 진짜 커뮤니티
        </h1>
        <h1 className="text-[32px] font-bold leading-[44px] text-[#0A095B]">
          김사장에서 함께해요!
        </h1>
      </div>

      {/* 핸드셰이크 이미지 - 오른쪽 */}
      <div
        className="absolute"
        style={{
          right: "128px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "231px",
          height: "152px",
        }}
      >
        <Image
          src="/community-handshake.png"
          alt="Handshake"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </div>

      {/* 그림자 효과용 빈 div */}
      <div
        className="absolute rounded-full"
        style={{
          right: "144px",
          top: "256px",
          width: "200px",
          height: "28px",
        }}
      />
    </div>
  );
}
