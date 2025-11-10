import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// 게시글 상세 조회 (GET)
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

    // 게시글 조회
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        title: true,
        content: true,
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
        { success: false, message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { success: false, message: '게시글을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 수정 (PUT)
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

    // 게시글 조회
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '게시글을 찾을 수 없습니다.' },
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

    // 게시글 수정
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
      select: {
        id: true,
        title: true,
        content: true,
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
      message: '게시글이 수정되었습니다.',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { success: false, message: '게시글 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 삭제 (DELETE)
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

    // 게시글 조회
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '게시글을 찾을 수 없습니다.' },
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

    // 게시글 삭제 (댓글도 자동 삭제 - Cascade)
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '게시글이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { success: false, message: '게시글 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
