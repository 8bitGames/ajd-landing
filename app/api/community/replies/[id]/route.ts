import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// 댓글 삭제 (DELETE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 댓글 조회
    const reply = await prisma.reply.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!reply) {
      return NextResponse.json(
        { success: false, message: '댓글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 확인
    if (reply.authorId !== user.id) {
      return NextResponse.json(
        { success: false, message: '삭제 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 댓글 삭제
    await prisma.reply.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '댓글이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Delete reply error:', error);
    return NextResponse.json(
      { success: false, message: '댓글 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
