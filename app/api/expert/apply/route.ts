import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// 전문가 신청 (POST)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { expertise, experience, certificate } = body;

    // 입력 검증
    if (!expertise || !experience) {
      return NextResponse.json(
        { success: false, message: '전문 분야와 경력을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 기존 신청 확인
    const existingRequest = await prisma.expertRequest.findUnique({
      where: { userId: user.id },
    });

    if (existingRequest) {
      // REJECTED 상태인 경우에만 수정 허용
      if (existingRequest.status === 'REJECTED') {
        const updatedRequest = await prisma.expertRequest.update({
          where: { userId: user.id },
          data: {
            expertise,
            experience,
            certificate: certificate || null,
            status: 'PENDING', // 다시 검토 대기 상태로
            rejectReason: null,
            reviewedBy: null,
            reviewedAt: null,
          },
        });

        return NextResponse.json({
          success: true,
          message: '전문가 신청이 수정되었습니다. 다시 검토 후 승인 여부를 알려드리겠습니다.',
          request: updatedRequest,
        });
      }

      // PENDING 또는 APPROVED 상태인 경우 에러
      return NextResponse.json(
        { success: false, message: '이미 전문가 신청을 하셨습니다.' },
        { status: 400 }
      );
    }

    // 신규 전문가 신청 생성
    const expertRequest = await prisma.expertRequest.create({
      data: {
        userId: user.id,
        expertise,
        experience,
        certificate: certificate || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: '전문가 신청이 완료되었습니다. 검토 후 승인 여부를 알려드리겠습니다.',
      request: expertRequest,
    });
  } catch (error) {
    console.error('Expert application error:', error);
    return NextResponse.json(
      { success: false, message: '전문가 신청 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 전문가 신청 상태 조회 (GET)
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const expertRequest = await prisma.expertRequest.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        expertise: true,
        experience: true,
        certificate: true,
        status: true,
        rejectReason: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      request: expertRequest,
    });
  } catch (error) {
    console.error('Get expert request error:', error);
    return NextResponse.json(
      { success: false, message: '신청 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
