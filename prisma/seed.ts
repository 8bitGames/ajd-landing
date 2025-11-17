import { PrismaClient, UserRole } from '@prisma/client';
import { hashPassword } from '../lib/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. 관리자 계정 생성
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      name: '관리자',
      role: UserRole.ADMIN,
    },
  });
  console.log('✅ Admin user created:', admin.username);

  // 2. 일반 사용자 생성
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      password: userPassword,
      name: '김사장',
      role: UserRole.USER,
    },
  });
  console.log('✅ Test user created:', user.username);

  // 3. 전문가 사용자 생성
  const expertPassword = await hashPassword('expert123');
  const expert = await prisma.user.upsert({
    where: { username: 'expert' },
    update: {},
    create: {
      username: 'expert',
      password: expertPassword,
      name: '전문가',
      role: UserRole.EXPERT,
    },
  });
  console.log('✅ Expert user created:', expert.username);

  // 4. 추가 사용자 생성
  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'kimceo' },
      update: {},
      create: {
        username: 'kimceo',
        password: await hashPassword('user123'),
        name: '김사장탐험대',
        role: UserRole.USER,
      },
    }),
    prisma.user.upsert({
      where: { username: 'sorapiri' },
      update: {},
      create: {
        username: 'sorapiri',
        password: await hashPassword('user123'),
        name: '피리부는소라90',
        role: UserRole.USER,
      },
    }),
    prisma.user.upsert({
      where: { username: 'niceshot' },
      update: {},
      create: {
        username: 'niceshot',
        password: await hashPassword('user123'),
        name: '나이스샷라이언65',
        role: UserRole.USER,
      },
    }),
    prisma.user.upsert({
      where: { username: 'bigrain' },
      update: {},
      create: {
        username: 'bigrain',
        password: await hashPassword('user123'),
        name: '장대비어피치66',
        role: UserRole.USER,
      },
    }),
  ]);
  console.log('✅ Additional users created');

  // 5. 커뮤니티 게시글 5개 생성 (HOT 이슈)
  const communityPosts = await Promise.all([
    prisma.post.create({
      data: {
        type: 'COMMUNITY',
        title: '2023외식업 트렌드 실전편 마케팅편',
        content: '2023년 외식업계 최신 트렌드와 실전 마케팅 전략을 공유합니다. 요즘 효과 좋은 마케팅 방법들을 정리했어요.',
        category: '기타',
        authorId: users[0].id,
        viewCount: 856,
      },
    }),
    prisma.post.create({
      data: {
        type: 'COMMUNITY',
        title: '음식물 쓰레기, 정말 신박한 처리 방법',
        content: '음식물 쓰레기 처리 비용 절감할 수 있는 방법 공유합니다. 저희 가게에서 실제로 적용해서 효과 본 방법이에요.',
        category: '기타',
        authorId: users[1].id,
        viewCount: 742,
      },
    }),
    prisma.post.create({
      data: {
        type: 'COMMUNITY',
        title: '고용노동부 4대 기초노동질서 현장 점검 시작! 미리 교육 받아보세요',
        content: '고용노동부에서 4대 기초노동질서 현장 점검을 시작한다고 합니다. 미리 준비하시는게 좋을 것 같아요.',
        category: '노무',
        authorId: users[2].id,
        viewCount: 623,
      },
    }),
    prisma.post.create({
      data: {
        type: 'COMMUNITY',
        title: '네이버 플레이스 순위 이거 하지 마세요!',
        content: '네이버 플레이스 순위 올리려다가 오히려 역효과 나는 방법들 정리해봤습니다. 절대 하지 마세요!',
        category: '기타',
        authorId: users[3].id,
        viewCount: 521,
      },
    }),
    prisma.post.create({
      data: {
        type: 'COMMUNITY',
        title: '무료로 가게 장비 싹다 바꾸신 사장님 특별 노하우, 100% 공개합니다',
        content: '가게 장비를 무료로 교체한 사장님의 특별한 노하우를 공유합니다. 정말 신기한 방법이에요!',
        category: '기타',
        authorId: users[0].id,
        viewCount: 413,
      },
    }),
  ]);
  console.log('✅ 5 Community posts created');

  // 6. 전문가 질문 5개 생성 (카테고리별)
  const expertPosts = await Promise.all([
    prisma.post.create({
      data: {
        type: 'EXPERT',
        title: '재고부족으로 인한 환불, 본사 상대로 손해배상 되나요?',
        content: '프랜차이즈 본사의 재고 부족으로 인해 환불 처리를 했는데, 이로 인한 손해를 본사에 청구할 수 있을까요?',
        category: '법률',
        authorId: user.id,
        viewCount: 687,
      },
    }),
    prisma.post.create({
      data: {
        type: 'EXPERT',
        title: '단골쿠폰, 몇 회 이상 주문한 고객에게 보내야 할까요?',
        content: '단골 고객에게 쿠폰을 보내려고 하는데, 보통 몇 회 이상 주문한 고객을 기준으로 하나요?',
        category: '기타',
        authorId: users[1].id,
        viewCount: 542,
      },
    }),
    prisma.post.create({
      data: {
        type: 'EXPERT',
        title: '고용노동부 4대노통 기초질서 현장 점검 시작! 미리...',
        content: '고용노동부의 현장 점검에 대비하려면 어떤 서류를 준비해야 하나요?',
        category: '노무',
        authorId: users[2].id,
        viewCount: 476,
      },
    }),
    prisma.post.create({
      data: {
        type: 'EXPERT',
        title: '네이버 플레이스 순위 이거 하지 마세요!',
        content: '네이버 플레이스 순위를 올리고 싶은데, 피해야 할 행동이 있나요?',
        category: '기타',
        authorId: users[3].id,
        viewCount: 398,
      },
    }),
    prisma.post.create({
      data: {
        type: 'EXPERT',
        title: '여름 주방 너무 더운데 해결책 없을까요?',
        content: '여름에 주방 온도가 너무 높아서 직원들이 힘들어 합니다. 효과적인 해결 방법이 있을까요?',
        category: '창폐업',
        authorId: user.id,
        viewCount: 321,
      },
    }),
  ]);
  console.log('✅ 5 Expert questions created');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Test Accounts:');
  console.log('  Admin:  username=admin, password=admin123');
  console.log('  User:   username=testuser, password=user123');
  console.log('  Expert: username=expert, password=expert123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
