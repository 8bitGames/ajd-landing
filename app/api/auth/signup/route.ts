import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, name, expertInfo } = body;

    // 입력 검증
    if (!username || !password || !name) {
      return NextResponse.json(
        { success: false, message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 전문가 가입 시 추가 검증
    if (expertInfo) {
      if (!expertInfo.expertise || !expertInfo.experience) {
        return NextResponse.json(
          { success: false, message: '전문가 가입 시 전문 분야와 경력은 필수입니다.' },
          { status: 400 }
        );
      }
    }

    // 아이디 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: '이미 사용 중인 아이디입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 사용자 생성 (전문가 신청 정보 포함)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        // 전문가 신청 정보가 있으면 ExpertRequest도 함께 생성
        ...(expertInfo && {
          expertRequest: {
            create: {
              expertise: expertInfo.expertise,
              experience: expertInfo.experience,
              certificate: expertInfo.certificate || null,
            },
          },
        }),
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
      },
    });

    // 세션 저장
    const session = await getSession();
    session.user = user;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({
      success: true,
      message: expertInfo
        ? '회원가입이 완료되었습니다. 전문가 신청이 접수되었습니다.'
        : '회원가입이 완료되었습니다.',
      user,
      isExpertSignup: !!expertInfo,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
