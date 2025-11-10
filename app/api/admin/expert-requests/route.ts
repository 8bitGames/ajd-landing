import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { UserRole } from '@prisma/client';

// 전문가 신청 목록 조회 (GET) - 관리자만
export async function GET(request: NextRequest) {
  try {
    await requireAuth(UserRole.ADMIN);

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status'); // PENDING, APPROVED, REJECTED

    const where = status ? { status: status as any } : {};

    const requests = await prisma.expertRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        expertise: true,
        experience: true,
        certificate: true,
        status: true,
        rejectReason: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json(
        { success: false, message: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    console.error('Get expert requests error:', error);
    return NextResponse.json(
      { success: false, message: '신청 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
