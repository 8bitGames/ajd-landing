import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { UserRole } from '@prisma/client';

// 전문가 답변 작성 (POST) - 전문가만 가능
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 전문가 권한 확인
    if (user.role !== UserRole.EXPERT && user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: '전문가만 답변을 작성할 수 있습니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { postId, content } = body;

    // 입력 검증
    if (!postId || !content) {
      return NextResponse.json(
        { success: false, message: '내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 질문 존재 확인
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '질문을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 답변 생성
    const reply = await prisma.reply.create({
      data: {
        content,
        postId,
        authorId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: '답변이 작성되었습니다.',
      reply,
    });
  } catch (error) {
    console.error('Create expert answer error:', error);
    return NextResponse.json(
      { success: false, message: '답변 작성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
