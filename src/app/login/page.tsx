'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore, QUICK_LOGIN_USERS, type AuthUser } from '@/lib/store/useAuthStore';

const ROLE_LABEL: Record<AuthUser['role'], string> = {
  'student-high': '고등학생',
  'student-middle': '중학생',
  admin: '관리자',
};

const ROLE_BG: Record<AuthUser['role'], string> = {
  'student-high': 'from-indigo-500 to-violet-500',
  'student-middle': 'from-sky-500 to-cyan-500',
  admin: 'from-rose-500 to-orange-500',
};

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = (user: AuthUser) => {
    login(user);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] px-6">
      {/* Logo */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 shadow-lg">
          <span className="text-4xl">📖</span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Keep</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">누구로 공부할까요?</p>
      </div>

      {/* Quick Login Cards */}
      <div className="w-full max-w-sm space-y-3">
        {QUICK_LOGIN_USERS.map((user) => (
          <button
            key={user.name}
            onClick={() => handleLogin(user)}
            className="group relative w-full overflow-hidden rounded-2xl shadow-md transition-transform active:scale-95 hover:scale-[1.02]"
          >
            <div className={`bg-gradient-to-r ${ROLE_BG[user.role]} p-px`}>
              <div className="flex items-center gap-4 rounded-2xl bg-[var(--bg-secondary)] px-5 py-4">
                <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ROLE_BG[user.role]} overflow-hidden shadow`}>
                  <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-[var(--text-primary)] text-lg">{user.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{ROLE_LABEL[user.role]}</p>
                </div>
                <div className="ml-auto text-[var(--text-secondary)] group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-10 text-xs text-[var(--text-secondary)]">My Keep · Study Planner</p>
    </div>
  );
}
