import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// 댓글 작성 (POST)
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
    const { postId, content } = body;

    // 입력 검증
    if (!postId || !content) {
      return NextResponse.json(
        { success: false, message: '내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 게시글 존재 확인
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 댓글 생성
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
      message: '댓글이 작성되었습니다.',
      reply,
    });
  } catch (error) {
    console.error('Create reply error:', error);
    return NextResponse.json(
      { success: false, message: '댓글 작성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
