import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Community Legend */}
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: "#F8F9FB" }}
      >
        <h3
          className="text-[20px] font-bold mb-4"
          style={{ color: "#0A095B", letterSpacing: "-0.5px" }}
        >
          커뮤니티 레전드
        </h3>
        <div className="space-y-4">
          <h4
            className="text-[16px] font-semibold leading-[24px]"
            style={{ color: "#0A095B", letterSpacing: "-0.5px" }}
          >
            넘흐 멋찐 우리 단골 손님, 자랑하고 싶습니다.
          </h4>
          <p
            className="text-[14px] leading-[21px]"
            style={{ color: "#555555", letterSpacing: "-0.5px" }}
          >
            우리 가게에는 생각보다 나이 많으신 어르신 단골들이 많습니다. 그 중에 한 아버님이 계신데요...항상 정장...
          </p>
        </div>
        <div className="flex gap-2 mt-6">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#0E53DC" }}
          ></div>
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#D9D9D9" }}
          ></div>
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#D9D9D9" }}
          ></div>
        </div>
      </div>

      {/* Expert Answers */}
      <div
        className="rounded-xl p-6 relative"
        style={{ backgroundColor: "#DBF2F1" }}
      >
        <div className="space-y-4">
          <h3
            className="text-[20px] font-bold"
            style={{ color: "#076D84", letterSpacing: "-0.5px" }}
          >
            전문가가 답합니다.
          </h3>
          <p
            className="text-[14px] leading-[21px]"
            style={{ color: "#076D84", letterSpacing: "-0.5px" }}
          >
            궁금한 것이 있나요?<br />
            지금 전문가에게 문의하세요!
          </p>
          <Link href="/expert/write">
            <button
              className="px-6 py-2 rounded-lg font-semibold text-[14px] hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#076D84",
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
              }}
            >
              질문하기
            </button>
          </Link>
        </div>
        <div className="absolute right-6 bottom-6">
          <Image
            src="/expert-profile.png"
            alt="Expert Profile"
            width={92}
            height={110}
            className="object-contain"
          />
        </div>
      </div>

      {/* Answer Notification */}
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: "rgba(14, 83, 220, 0.07)" }}
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <h4
              className="font-bold text-[14px]"
              style={{ color: "#0A095B", letterSpacing: "-0.5px" }}
            >
              기다리시던 전문가 답변이 도착했어요!
            </h4>
            <span className="text-[20px]">💡</span>
          </div>
          <button className="flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#0A095B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p
          className="text-[12px]"
          style={{ color: "#555555", letterSpacing: "-0.5px" }}
        >
          &apos;세무&apos;에 대한 전문가 답변 확인하기
        </p>
      </div>
    </aside>
  );
}
