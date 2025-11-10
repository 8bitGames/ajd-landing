import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { UserRole, PostType, ExpertStatus } from '@prisma/client';

// 관리자 대시보드 통계 (GET) - 관리자만
export async function GET() {
  try {
    await requireAuth(UserRole.ADMIN);

    // 병렬로 모든 통계 조회
    const [
      totalUsers,
      totalExperts,
      totalCommunityPosts,
      totalExpertQuestions,
      pendingExpertRequests,
      approvedExpertRequests,
      rejectedExpertRequests,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.EXPERT } }),
      prisma.post.count({ where: { type: PostType.COMMUNITY } }),
      prisma.post.count({ where: { type: PostType.EXPERT } }),
      prisma.expertRequest.count({ where: { status: ExpertStatus.PENDING } }),
      prisma.expertRequest.count({ where: { status: ExpertStatus.APPROVED } }),
      prisma.expertRequest.count({ where: { status: ExpertStatus.REJECTED } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          experts: totalExperts,
          regular: totalUsers - totalExperts,
        },
        posts: {
          community: totalCommunityPosts,
          expert: totalExpertQuestions,
          total: totalCommunityPosts + totalExpertQuestions,
        },
        expertRequests: {
          pending: pendingExpertRequests,
          approved: approvedExpertRequests,
          rejected: rejectedExpertRequests,
          total: pendingExpertRequests + approvedExpertRequests + rejectedExpertRequests,
        },
      },
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, message: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { success: false, message: '통계를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
