'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="p-4 flex justify-end gap-2">
      {session ? (
        <>
          <span>Welcome, {session.user?.name}</span>
          <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 text-white rounded">Logout</button>
        </>
      ) : (
        <button onClick={() => signIn('google')} className="bg-blue-500 px-4 py-2 text-white rounded">Sign in with Google</button>
      )}
    </header>
  );
} 