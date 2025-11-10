export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-[1920px] mx-auto px-[420px]">
        <div className="rounded-[24px] overflow-hidden relative h-[263px]" style={{ backgroundColor: 'rgba(14, 83, 220, 0.07)' }}>
          <div className="flex items-center justify-between px-[64px] h-full">
            <div className="flex-1">
              <p className="text-[20px] text-[#555555] leading-[26px] mb-6">
                상위 1% 매장들의 비법 전수 1탄
              </p>
              <h1 className="text-[32px] font-bold leading-[48px] text-[#0A095B]" style={{ letterSpacing: '-0.7px' }}>
                요즘 대세는 SNS 마케팅이죠<br />
                인스타그램 고객 유입 시나리오 강좌 오픈
              </h1>
            </div>
            <div className="w-[324px] h-[197px] flex items-center justify-center flex-shrink-0">
              <img
                src="https://www.figma.com/api/mcp/asset/9f306cff-0e83-4438-a946-889a9ba1e088"
                alt="Instagram"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
