import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김사장 - DMS 마케팅으로 고객과 더 가깝게",
  description: "자영업자를 위한 커뮤니티, 전문가 상담, 강의 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
