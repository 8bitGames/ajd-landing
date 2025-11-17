import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// 전문가 질문 상세 조회 (GET)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 조회수 증가
    await prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    // 질문 조회
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        title: true,
        content: true,
        category: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
        replies: {
          orderBy: { createdAt: 'asc' },
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
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '질문을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Get expert question error:', error);
    return NextResponse.json(
      { success: false, message: '질문을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 전문가 질문 수정 (PUT) - 답변이 없을 때만 가능
export async function PUT(
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
    const body = await request.json();
    const { title, content } = body;

    // 입력 검증
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: '제목과 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 질문 조회
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        authorId: true,
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '질문을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 확인
    if (post.authorId !== user.id) {
      return NextResponse.json(
        { success: false, message: '수정 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 답변이 있으면 수정 불가
    if (post._count.replies > 0) {
      return NextResponse.json(
        { success: false, message: '답변이 달린 질문은 수정할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 질문 수정
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: '질문이 수정되었습니다.',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Update expert question error:', error);
    return NextResponse.json(
      { success: false, message: '질문 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 전문가 질문 삭제 (DELETE)
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

    // 질문 조회
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '질문을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 작성자 확인
    if (post.authorId !== user.id) {
      return NextResponse.json(
        { success: false, message: '삭제 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 질문 삭제 (답변도 자동 삭제 - Cascade)
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '질문이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Delete expert question error:', error);
    return NextResponse.json(
      { success: false, message: '질문 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
