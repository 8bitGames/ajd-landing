import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.json({
      success: true,
      message: '로그아웃되었습니다.',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: '로그아웃 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
