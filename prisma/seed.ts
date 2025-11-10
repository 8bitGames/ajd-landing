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

  // 4. 커뮤니티 샘플 게시글 생성
  const communityPost = await prisma.post.create({
    data: {
      type: 'COMMUNITY',
      title: '날씨가 좋으면 포장 매출이 늘어나나요?',
      content: '요즘 날씨가 좋을 때 포장 주문이 확실히 늘어나는 것 같은데, 다른 사장님들도 그러신가요? 날씨와 매출의 상관관계가 궁금합니다.',
      authorId: user.id,
    },
  });
  console.log('✅ Community post created');

  // 5. 커뮤니티 댓글 생성
  await prisma.reply.create({
    data: {
      content: '저도 비슷한 경험이 있어요. 특히 맑은 주말에는 배달보다 포장이 많이 나가더라구요!',
      postId: communityPost.id,
      authorId: expert.id,
    },
  });
  console.log('✅ Community reply created');

  // 6. 전문가 Q&A 샘플 질문 생성
  const expertPost = await prisma.post.create({
    data: {
      type: 'EXPERT',
      title: '음식점 마케팅 어떻게 시작하면 좋을까요?',
      content: '소규모 음식점을 운영 중인데 마케팅을 전혀 안 해봤습니다. SNS, 블로그 등 어디서부터 시작하면 좋을까요?',
      authorId: user.id,
    },
  });
  console.log('✅ Expert question created');

  // 7. 전문가 답변 생성
  await prisma.reply.create({
    data: {
      content: '먼저 인스타그램부터 시작하시는 것을 추천드립니다. 음식 사진을 예쁘게 찍어서 올리고, 해시태그를 활용하면 초기 비용 없이 시작할 수 있습니다. 고객 리뷰도 스토리로 공유하면 효과적이에요!',
      postId: expertPost.id,
      authorId: expert.id,
    },
  });
  console.log('✅ Expert answer created');

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
