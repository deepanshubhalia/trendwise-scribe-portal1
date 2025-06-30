'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          TrendWise Scribe
        </Link>
        <Link href="/admin" className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:underline">
          Admin
        </Link>
      </div>
      
      <div className="flex gap-2">
        {session ? (
          <>
            <span className="text-gray-700">Welcome, {session.user?.name}</span>
            <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <button onClick={() => signIn('google')} className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600">Sign in with Google</button>
        )}
      </div>
    </header>
  );
} 