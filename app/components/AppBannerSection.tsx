export default function AppBannerSection() {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left Banner - Mobile App Download */}
          <div
            className="relative rounded-[8px] overflow-hidden h-[280px] md:h-[330px]"
            style={{
              backgroundColor: "#F8F9FB",
            }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 rounded-tl-[8px] rounded-bl-[8px]"
              style={{ backgroundColor: "rgba(14, 83, 220, 0.07)" }}
            />

            {/* Title Text */}
            <div
              className="absolute font-bold text-[20px] flex flex-col"
              style={{
                left: "32px",
                top: "60px",
                transform: "translateY(-50%)",
                color: "#353F53",
                letterSpacing: "-0.7px",
                lineHeight: "28px",
              }}
            >
              <p>모바일 앱으로 더 쉽고 빠르게</p>
              <p>지금 경험해 보세요</p>
            </div>

            {/* Mobile Phone Image */}
            <img
              src="/app-mobile.png"
              alt="Mobile App"
              className="absolute object-cover"
              style={{
                right: "32px",
                top: "60px",
                width: "184px",
                height: "390px",
                filter: "drop-shadow(0px 40px 20px rgba(0, 0, 0, 0.25))",
              }}
            />

            {/* Kim Icon */}
            <img
              src="/kim-icon.png"
              alt="Kim Icon"
              className="absolute object-cover right-4 top-4 md:right-[161px] md:top-[99px]"
              style={{
                width: "100px",
                height: "100px",
                filter: "drop-shadow(20px 30px 40px rgba(0, 0, 0, 0.25))",
              }}
            />

            {/* App Store Button */}
            <button
              className="absolute flex items-center gap-2 px-4 rounded-lg"
              style={{
                left: "32px",
                bottom: "94px",
                width: "179px",
                height: "52px",
                backgroundColor: "#000000",
                border: "1px solid #A6A6A6",
              }}
            >
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M18.7188 14.4688C18.7031 12.1875 19.625 10.1562 21.4219 8.51562C20.1094 6.625 18.1562 5.59375 15.6406 5.45312C13.2344 5.3125 10.6875 6.96875 9.71875 6.96875C8.71875 6.96875 6.53125 5.5 4.625 5.5C1.71875 5.54688 -0.96875 7.5625 -0.96875 11.6562C-0.96875 13.0312 -0.71875 14.4531 -0.21875 15.9219C0.46875 17.9531 3.03125 23.3438 5.6875 23.2656C7.5 23.2344 8.71875 21.9688 11 21.9688C13.2188 21.9688 14.3438 23.2656 16.3125 23.2656C18.9844 23.2344 21.2812 18.3594 21.9375 16.3281C18.5625 14.75 18.7188 14.5469 18.7188 14.4688ZM15.6719 3.59375C17.0781 1.875 16.9531 0.296875 16.9062 -0.25C15.5781 -0.15625 14.0312 0.828125 13.1562 1.84375C12.1875 2.9375 11.5781 4.28125 11.7031 5.82812C13.125 5.9375 14.4375 5.15625 15.6719 3.59375Z" fill="white"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white" style={{ lineHeight: "1" }}>Download on the</span>
                <span className="text-[18px] font-semibold text-white" style={{ lineHeight: "1.2" }}>App Store</span>
              </div>
            </button>

            {/* Google Play Button */}
            <button
              className="absolute flex items-center gap-2 px-4 rounded-lg"
              style={{
                left: "32px",
                bottom: "32px",
                width: "179px",
                height: "52px",
                backgroundColor: "#000000",
                border: "1px solid #A6A6A6",
              }}
            >
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                <path d="M1.5 0.75C1.1875 1.0625 1 1.5625 1 2.21094V21.7891C1 22.4375 1.1875 22.9375 1.5 23.25L1.59375 23.3438L12.8125 12.125V11.875L1.59375 0.65625L1.5 0.75Z" fill="#00D7FF"/>
                <path d="M16.9062 16.2109L12.8125 12.125V11.875L16.9062 7.78906L17.0312 7.85938L21.75 10.4766C23.0625 11.2266 23.0625 12.7734 21.75 13.5234L17.0312 16.1406L16.9062 16.2109Z" fill="#FFCE00"/>
                <path d="M17.0312 16.1406L12.8125 12L1.5 23.3438C1.96875 23.8438 2.75 23.9062 3.625 23.4062L17.0312 16.1406Z" fill="#FF3A44"/>
                <path d="M17.0312 7.85938L3.625 0.59375C2.75 0.09375 1.96875 0.15625 1.5 0.65625L12.8125 12L17.0312 7.85938Z" fill="#00F076"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-white" style={{ lineHeight: "1" }}>GET IT ON</span>
                <span className="text-[18px] font-semibold text-white" style={{ lineHeight: "1.2" }}>Google Play</span>
              </div>
            </button>
          </div>

          {/* Right Banner - Community */}
          <div
            className="relative rounded-[8px] overflow-hidden h-[280px] md:h-[330px]"
            style={{
              backgroundColor: "#F8F9FB",
            }}
          >
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(14, 83, 220, 0.07)" }}
            />

            {/* Notice Icon */}
            <img
              src="/notice-icon.png"
              alt="Notice"
              className="absolute object-cover"
              style={{
                left: "50%",
                top: "50px",
                width: "128px",
                height: "128px",
                transform: "translateX(-50%)",
              }}
            />

            {/* 커뮤니티 */}
            <div
              className="absolute box-border flex items-center justify-center px-4 md:px-6 py-2 md:py-4 rounded-[100px]"
              style={{
                left: "calc(50% - 77px)",
                top: "50px",
                width: "auto",
                minWidth: "80px",
                height: "auto",
                transform: "translateX(-50%)",
              }}
            >
              <p
                className="font-bold text-[16px] md:text-[20px] text-center whitespace-nowrap"
                style={{
                  color: "#122344",
                  letterSpacing: "-0.7px",
                  lineHeight: "1.4",
                }}
              >
                커뮤니티
              </p>
            </div>

            {/* 강의 */}
            <div
              className="absolute box-border flex items-center justify-center px-4 md:px-6 py-2 md:py-4 rounded-[100px]"
              style={{
                left: "calc(50% + 72px)",
                top: "70px",
                width: "auto",
                minWidth: "60px",
                height: "auto",
                transform: "translateX(-50%)",
              }}
            >
              <p
                className="font-bold text-[16px] md:text-[20px] text-center whitespace-nowrap"
                style={{
                  color: "#122344",
                  letterSpacing: "-0.7px",
                  lineHeight: "1.4",
                }}
              >
                강의
              </p>
            </div>

            {/* 전문가 상담 */}
            <div
              className="absolute box-border flex items-center justify-center px-4 md:px-6 py-2 md:py-4 rounded-[100px]"
              style={{
                left: "50%",
                top: "170px",
                width: "auto",
                minWidth: "100px",
                height: "auto",
                transform: "translateX(-50%)",
              }}
            >
              <p
                className="font-bold text-[16px] md:text-[20px] text-center whitespace-nowrap"
                style={{
                  color: "#122344",
                  letterSpacing: "-0.7px",
                  lineHeight: "1.4",
                }}
              >
                전문가 상담
              </p>
            </div>

            {/* Bottom Description */}
            <div
              className="absolute left-1/2 flex flex-col font-semibold text-[13px] md:text-[17px] text-center px-4"
              style={{
                bottom: "32px",
                transform: "translateX(-50%)",
                color: "#7B8A9C",
                letterSpacing: "-0.5px",
                lineHeight: "1.35",
              }}
            >
              <p className="whitespace-nowrap md:whitespace-normal">서로의 고충을 공유하고 해결이 어려웠던 부분을</p>
              <p className="whitespace-nowrap md:whitespace-normal">전문가의 지식으로 해결해보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
