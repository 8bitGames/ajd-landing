"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const banners = [
  "/expert-banner-1.png",
  "/expert-banner-2.png",
  "/expert-banner-3.png",
];

export default function ExpertBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // 1부터 시작 (복제본 고려)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // 무한 루프를 위한 배너 배열 (마지막을 앞에, 첫번째를 뒤에 복제)
  const infiniteBanners = [banners[banners.length - 1], ...banners, banners[0]];

  // 자동 슬라이드 시작 함수
  const startAutoSlide = () => {
    // 기존 타이머가 있으면 제거
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    // 5초마다 자동 슬라이드
    autoSlideRef.current = setInterval(() => {
      goToNext();
    }, 5000);
  };

  // 자동 슬라이드 초기화 함수
  const resetAutoSlide = () => {
    startAutoSlide();
  };

  // 컴포넌트 마운트 시 자동 슬라이드 시작
  useEffect(() => {
    startAutoSlide();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  // 트랜지션 종료 후 무한 루프 처리
  useEffect(() => {
    if (isTransitioning) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);

        // 복제된 첫 슬라이드(맨 끝)에 도달하면 실제 첫번째로 점프
        if (currentIndex === infiniteBanners.length - 1) {
          setCurrentIndex(1);
        }
        // 복제된 마지막 슬라이드(맨 앞)에 도달하면 실제 마지막으로 점프
        else if (currentIndex === 0) {
          setCurrentIndex(banners.length);
        }
      }, 500); // transition 시간과 동일
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isTransitioning, infiniteBanners.length, banners.length]);

  const goToSlide = (index: number) => {
    resetAutoSlide(); // 타이머 초기화
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // 복제본 고려해서 +1
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    resetAutoSlide(); // 타이머 초기화
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = (shouldResetTimer = false) => {
    if (isTransitioning) return;
    if (shouldResetTimer) {
      resetAutoSlide(); // 수동 클릭 시에만 타이머 초기화
    }
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="relative rounded-[24px] overflow-hidden h-[320px]">
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
        }}
      >
        {infiniteBanners.map((banner, index) => (
          <div key={index} className="min-w-full h-full relative flex-shrink-0">
            <Image
              src={banner}
              alt={`Expert Banner`}
              fill
              className="object-cover"
              priority={index <= 2}
            />
          </div>
        ))}
      </div>

      {/* 이전/다음 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => goToNext(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* 인디케이터 (점) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => {
          // 실제 인덱스 계산 (복제본 제외)
          const actualIndex = currentIndex === 0 ? banners.length - 1 :
                             currentIndex === infiniteBanners.length - 1 ? 0 :
                             currentIndex - 1;

          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === actualIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
