'use client';

import { useSession } from 'next-auth/react';
import { useRouter as useRouting } from 'next/navigation';
import { useRouter } from 'next/router';

import FriendProfil from '@/app/_components/users/FriendProfil';

export default function Profil() {
  const { data: session } = useSession();
  const router = useRouter();
  const routing = useRouting();
  const { id } = router.query;

  if (session?.user?.id === id) {
    router.push('/profil');
  }

  return (
    <div>
      <FriendProfil id={id} />
    </div>
  );
}
