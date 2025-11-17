export default function Footer() {
  return (
    <footer
      className="relative w-full min-h-[400px] md:min-h-[300px] lg:h-[270px]"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[422px] py-8 md:py-10 lg:py-0 h-full relative">
        {/* Content Container */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0 lg:relative lg:h-full">
          {/* Logo and Navigation */}
          <div className="flex flex-col gap-4 lg:absolute lg:left-0 lg:top-[52px]">
            {/* Logo */}
            <div className="w-[71px] h-[23px]">
              <img
                src="/kim-grey.png"
                alt="김사장"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 lg:ml-[146px] lg:-mt-[23px]">
              <a
                href="#"
                className="text-[14px] md:text-[16px]"
                style={{
                  color: "#555555",
                  letterSpacing: "-0.7px",
                  lineHeight: "normal",
                }}
              >
                공지사항
              </a>
              <a
                href="#"
                className="text-[14px] md:text-[16px]"
                style={{
                  color: "#555555",
                  letterSpacing: "-0.7px",
                  lineHeight: "normal",
                }}
              >
                채용정보
              </a>
              <a
                href="#"
                className="text-[14px] md:text-[16px]"
                style={{
                  color: "#555555",
                  letterSpacing: "-0.7px",
                  lineHeight: "normal",
                }}
              >
                개인정보 처리방침
              </a>
              <a
                href="#"
                className="text-[14px] md:text-[16px]"
                style={{
                  color: "#555555",
                  letterSpacing: "-0.7px",
                  lineHeight: "normal",
                }}
              >
                이용약관
              </a>
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-3 lg:absolute lg:left-0 lg:top-[110px]">
            {/* SEOUL Address */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 text-[12px] md:text-[14px] lg:text-[16px]">
              <span className="font-semibold" style={{ color: "#888888", letterSpacing: "-0.7px" }}>SEOUL</span>
              <span className="hidden md:inline mx-3" style={{ color: "#DCDCDC" }}>|</span>
              <span style={{ color: "#888888", letterSpacing: "-0.7px" }}>서울특별시 강남구 테헤란로 4길 35 (역삼동 827-14) 프레스티지투빌딩 4층</span>
              <span className="hidden md:inline mx-3" style={{ color: "#DCDCDC" }}>|</span>
              <span style={{ color: "#888888" }}>TEL. 010-2706-6852</span>
              <span className="hidden lg:inline mx-3" style={{ color: "#DCDCDC" }}>|</span>
              <span style={{ color: "#888888" }}>FAX. 02-6944-8126</span>
            </div>

            {/* BUSAN Address */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 text-[12px] md:text-[14px] lg:text-[16px]">
              <span className="font-semibold" style={{ color: "#888888", letterSpacing: "-0.7px" }}>BUSAN</span>
              <span className="hidden md:inline mx-3" style={{ color: "#DCDCDC" }}>|</span>
              <span style={{ color: "#888888", letterSpacing: "-0.7px" }}>부산 북구 만덕대로 104, 3층</span>
              <span className="hidden md:inline mx-3" style={{ color: "#DCDCDC" }}>|</span>
              <span style={{ color: "#888888" }}>TEL. 070-8666-6466</span>
              <span className="hidden lg:inline mx-3" style={{ color: "#DCDCDC" }}>|</span>
              <span style={{ color: "#888888" }}>FAX. 02-6944-8126</span>
            </div>
          </div>

          {/* App Store and Social Media Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:absolute lg:left-0 lg:right-0 lg:top-[193px] lg:justify-between">
            {/* App Store Buttons */}
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="flex items-center justify-center">
                <img
                  src="/google.png"
                  alt="Google Play"
                  className="w-[100px] h-[30px] md:w-[128px] md:h-[38px]"
                />
              </a>
              <a href="#" className="flex items-center justify-center">
                <img
                  src="/apple.png"
                  alt="App Store"
                  className="w-[100px] h-[30px] md:w-[128px] md:h-[38px]"
                />
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="flex items-center justify-center">
                <img src="/youtube.png" alt="YouTube" className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]" />
              </a>
              <a href="#" className="flex items-center justify-center">
                <img src="/naver.png" alt="Naver" className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]" />
              </a>
              <a href="#" className="flex items-center justify-center">
                <img src="/insta.png" alt="Instagram" className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]" />
              </a>
              <a href="#" className="flex items-center justify-center">
                <img src="/tiktok.png" alt="TikTok" className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]" />
              </a>
              <a href="#" className="flex items-center justify-center">
                <img src="/rental.png" alt="Rental Page" className="w-[32px] h-[32px] md:w-[36px] md:h-[36px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
