import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { PostType } from '@prisma/client';

// 게시글 목록 조회 (GET)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';

    const skip = (page - 1) * limit;

    // 검색 조건
    const where = {
      type: PostType.COMMUNITY,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
        ],
      }),
    };

    // 총 게시글 수
    const total = await prisma.post.count({ where });

    // 정렬 조건 (보조 키로 id 추가하여 일관된 순서 보장)
    const orderBy = sortBy === 'viewCount'
      ? [{ viewCount: 'desc' as const }, { id: 'desc' as const }]
      : [{ createdAt: 'desc' as const }, { id: 'desc' as const }];

    // 게시글 목록
    const posts = await prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        viewCount: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { success: false, message: '게시글 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 작성 (POST)
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
    const { title, content, category } = body;

    // 입력 검증
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: '제목과 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, message: '카테고리를 선택해주세요.' },
        { status: 400 }
      );
    }

    // 카테고리 유효성 검증
    const validCategories = ['세무', '노무', '법률', '창폐업', '기타'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 카테고리입니다.' },
        { status: 400 }
      );
    }

    // 게시글 생성
    const post = await prisma.post.create({
      data: {
        type: PostType.COMMUNITY,
        title,
        content,
        category,
        authorId: user.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        viewCount: true,
        createdAt: true,
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
      message: '게시글이 작성되었습니다.',
      post,
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { success: false, message: '게시글 작성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
