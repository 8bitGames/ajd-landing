export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-white py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="rounded-[16px] md:rounded-[20px] lg:rounded-[24px] overflow-hidden relative min-h-[200px] md:min-h-[240px] lg:h-[263px]" style={{ backgroundColor: 'rgba(14, 83, 220, 0.07)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-8 lg:px-12 xl:px-[64px] py-8 md:py-10 lg:py-0 lg:h-full gap-6 md:gap-8">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-[#555555] leading-[20px] md:leading-[24px] lg:leading-[26px] mb-4 md:mb-5 lg:mb-6">
                상위 1% 매장들의 비법 전수 1탄
              </p>
              <h1 className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold leading-[30px] md:leading-[36px] lg:leading-[42px] xl:leading-[48px] text-[#0A095B]" style={{ letterSpacing: '-0.7px' }}>
                요즘 대세는 SNS 마케팅이죠<br />
                인스타그램 고객 유입 시나리오 강좌 오픈
              </h1>
            </div>
            <div className="w-[200px] h-[120px] md:w-[240px] md:h-[146px] lg:w-[280px] lg:h-[170px] xl:w-[324px] xl:h-[197px] flex items-center justify-center flex-shrink-0">
              <img
                src="/instagram.png"
                alt="Instagram"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
