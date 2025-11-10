import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { UserRole } from '@prisma/client';

export interface SessionData {
  user?: {
    id: string;
    username: string;
    name: string;
    role: UserRole;
  };
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'ajd-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7일
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session.isLoggedIn ? session.user : null;
}

export async function requireAuth(requiredRole?: UserRole) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (requiredRole && user.role !== requiredRole && user.role !== UserRole.ADMIN) {
    throw new Error('Forbidden');
  }

  return user;
}
