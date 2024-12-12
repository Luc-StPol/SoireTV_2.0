'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/Authorization';

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();
  const logoutUser = () => {
    logout();
    router.push('/login');
  };
  return (
    <button className="mx-8 h-14" onClick={logoutUser}>
      Se déconnecter
    </button>
  );
}
