import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { UserRole, ExpertStatus } from '@prisma/client';

// 전문가 승인 (POST) - 관리자만
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAuth(UserRole.ADMIN);
    const { id } = await params;
    const body = await request.json();
    const { action, rejectReason } = body; // action: 'approve' | 'reject'

    if (!action || (action !== 'approve' && action !== 'reject')) {
      return NextResponse.json(
        { success: false, message: '올바르지 않은 요청입니다.' },
        { status: 400 }
      );
    }

    if (action === 'reject' && !rejectReason) {
      return NextResponse.json(
        { success: false, message: '거부 사유를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 신청 정보 조회
    const expertRequest = await prisma.expertRequest.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!expertRequest) {
      return NextResponse.json(
        { success: false, message: '신청 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (expertRequest.status !== ExpertStatus.PENDING) {
      return NextResponse.json(
        { success: false, message: '이미 처리된 신청입니다.' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      // 승인: 신청 상태 업데이트 + 사용자 role 변경
      await prisma.$transaction([
        prisma.expertRequest.update({
          where: { id },
          data: {
            status: ExpertStatus.APPROVED,
            reviewedBy: admin.id,
            reviewedAt: new Date(),
          },
        }),
        prisma.user.update({
          where: { id: expertRequest.userId },
          data: { role: UserRole.EXPERT },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: '전문가 승인이 완료되었습니다.',
      });
    } else {
      // 거부: 신청 상태만 업데이트
      await prisma.expertRequest.update({
        where: { id },
        data: {
          status: ExpertStatus.REJECTED,
          reviewedBy: admin.id,
          reviewedAt: new Date(),
          rejectReason,
        },
      });

      return NextResponse.json({
        success: true,
        message: '전문가 신청이 거부되었습니다.',
      });
    }
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, message: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    console.error('Process expert request error:', error);
    return NextResponse.json(
      { success: false, message: '처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
