# 김사장 (AJD Landing)

소상공인을 위한 커뮤니티 및 전문가 Q&A 플랫폼입니다.

## 주요 기능

### 1. 사용자 인증 시스템
- 회원가입 및 로그인 (iron-session 기반)
- 역할 기반 접근 제어 (일반 사용자, 전문가, 관리자)
- 안전한 비밀번호 해싱 (bcrypt)

### 2. 커뮤니티 게시판
- 자유 게시글 작성 및 조회
- 댓글 기능
- 페이지네이션 및 검색
- 조회수 추적

### 3. 전문가 Q&A
- 질문 작성 (모든 사용자)
- 답변 작성 (전문가 및 관리자만)
- 전문가 신청 시스템
- 관리자 승인/거부 기능

### 4. 관리자 대시보드
- 통계 대시보드 (사용자, 게시글, 전문가 신청)
- 전문가 신청 관리
- 승인/거부 처리

## 기술 스택

### Frontend
- **Next.js 16.0.1** - App Router
- **React 19.2.0** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS v4** - 스타일링

### Backend
- **Next.js API Routes** - Serverless API
- **Prisma ORM 6.19.0** - 데이터베이스 관리
- **PostgreSQL 16** - 데이터베이스

### Authentication & Security
- **iron-session 8.0.4** - 세션 관리
- **bcrypt 6.0.0** - 비밀번호 해싱
- httpOnly 쿠키 기반 인증 (7일 만료)

## 프로젝트 구조

```
ajd-landing/
├── app/                      # Next.js App Router
│   ├── admin/               # 관리자 대시보드
│   ├── api/                 # API Routes
│   │   ├── auth/           # 인증 API
│   │   ├── community/      # 커뮤니티 API
│   │   ├── expert/         # 전문가 Q&A API
│   │   └── admin/          # 관리자 API
│   ├── auth/               # 로그인/회원가입 페이지
│   ├── community/          # 커뮤니티 페이지
│   ├── expert/             # 전문가 Q&A 페이지
│   └── components/         # 공통 컴포넌트
├── lib/                    # 유틸리티 라이브러리
│   ├── auth.ts            # 인증 유틸
│   ├── password.ts        # 비밀번호 유틸
│   ├── prisma.ts          # Prisma 클라이언트
│   └── hooks/             # React Hooks
├── prisma/                # 데이터베이스 스키마
│   ├── schema.prisma      # Prisma 스키마
│   └── seed.ts            # 시드 데이터
└── public/                # 정적 파일
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/ajd_landing?schema=public"
SESSION_SECRET="your-secret-key-at-least-32-characters-long-for-security"
```

### 3. Docker로 PostgreSQL 실행

```bash
docker run --name ajd-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ajd_landing \
  -p 5433:5432 \
  -d postgres:16
```

### 4. 데이터베이스 마이그레이션

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev --name init
```

### 5. 초기 데이터 시드

```bash
npm run db:seed
```

시드 스크립트는 다음 테스트 계정을 생성합니다:

| 역할 | 아이디 | 비밀번호 | 이름 |
|------|--------|----------|------|
| 관리자 | admin | admin123 | 관리자 |
| 일반 사용자 | testuser | user123 | 테스트유저 |
| 전문가 | expert | expert123 | 전문가김 |

### 6. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인하세요.

## 데이터베이스 스키마

### User (사용자)
- 역할: USER (일반), EXPERT (전문가), ADMIN (관리자)
- 게시글, 댓글, 전문가 신청 연결

### ExpertRequest (전문가 신청)
- 상태: PENDING (대기), APPROVED (승인), REJECTED (거부)
- 전문 분야, 경력, 자격증 정보

### Post (게시글)
- 타입: COMMUNITY (커뮤니티), EXPERT (전문가 Q&A)
- 제목, 내용, 조회수
- 댓글 연결

### Reply (댓글)
- 게시글과 연결
- 작성자 정보

## API 엔드포인트

### 인증 API
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보

### 커뮤니티 API
- `GET /api/community/posts` - 게시글 목록 (페이지네이션)
- `POST /api/community/posts` - 게시글 작성
- `GET /api/community/posts/[id]` - 게시글 상세
- `PUT /api/community/posts/[id]` - 게시글 수정
- `DELETE /api/community/posts/[id]` - 게시글 삭제
- `POST /api/community/replies` - 댓글 작성
- `DELETE /api/community/replies/[id]` - 댓글 삭제

### 전문가 Q&A API
- `GET /api/expert/questions` - 질문 목록
- `POST /api/expert/questions` - 질문 작성
- `GET /api/expert/questions/[id]` - 질문 상세
- `PUT /api/expert/questions/[id]` - 질문 수정
- `DELETE /api/expert/questions/[id]` - 질문 삭제
- `POST /api/expert/answers` - 답변 작성 (전문가 전용)
- `POST /api/expert/apply` - 전문가 신청
- `GET /api/expert/apply` - 신청 상태 조회

### 관리자 API
- `GET /api/admin/stats` - 통계 조회
- `GET /api/admin/expert-requests` - 전문가 신청 목록
- `POST /api/admin/expert-requests/[id]` - 신청 승인/거부

## Vercel 배포

### 1. Vercel 프로젝트 생성

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 프로젝트 배포
vercel
```

또는 [Vercel Dashboard](https://vercel.com/new)에서 GitHub 저장소를 연결하세요.

### 2. 데이터베이스 설정

Vercel Postgres 또는 외부 PostgreSQL 서비스를 사용하세요:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)

### 3. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

```
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_production_secret_key
```

### 4. 배포 후 마이그레이션

```bash
# Production 데이터베이스에 마이그레이션 적용
DATABASE_URL="your_production_database_url" npx prisma migrate deploy

# 시드 데이터 추가 (선택사항)
DATABASE_URL="your_production_database_url" npm run db:seed
```

## 개발 가이드

### Prisma 관련 명령어

```bash
# Prisma Studio 실행 (GUI 데이터베이스 관리)
npx prisma studio

# 스키마 변경 후 마이그레이션 생성
npx prisma migrate dev --name migration_name

# 프로덕션 마이그레이션 적용
npx prisma migrate deploy

# 클라이언트 재생성
npx prisma generate

# 데이터베이스 초기화 (주의: 모든 데이터 삭제)
npx prisma migrate reset
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 후 실행
npm start
```

### 코드 린팅

```bash
npm run lint
```

## 보안 고려사항

1. **비밀번호 보안**
   - bcrypt를 사용한 안전한 해싱 (SALT_ROUNDS: 10)
   - 평문 비밀번호는 저장되지 않음

2. **세션 관리**
   - httpOnly 쿠키로 XSS 공격 방지
   - 7일 자동 만료
   - HTTPS 강제 (프로덕션)

3. **API 보안**
   - 역할 기반 접근 제어 (RBAC)
   - 인증 미들웨어로 보호된 엔드포인트
   - Cascade 삭제로 데이터 무결성 보장

4. **프로덕션 배포 시 주의사항**
   - `.env` 파일을 절대 커밋하지 마세요
   - `SESSION_SECRET`는 최소 32자 이상의 랜덤 문자열 사용
   - 프로덕션 환경에서는 HTTPS 필수

## 라이선스

This project is for educational and demonstration purposes.
