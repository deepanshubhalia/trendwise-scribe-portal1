'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { signIn } from 'next-auth/react';

interface CommentFormProps {
  articleSlug: string;
  onCommentPosted: () => void;
  apiUrl: string;
}

export default function CommentForm({ articleSlug, onCommentPosted, apiUrl }: CommentFormProps) {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleSlug,
          author: session.user.name || session.user.email || 'Anonymous',
          content,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to post comment.');
      }

      setContent('');
      onCommentPosted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <p className="mb-2">You must be logged in to comment.</p>
        <Button onClick={() => signIn('google')}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Add a Comment</h2>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        required
        disabled={isSubmitting}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={isSubmitting || !content.trim()}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
} 