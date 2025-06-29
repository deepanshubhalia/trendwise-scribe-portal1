import { Comment } from '@/types/comment';
import Image from 'next/image';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  // Format date consistently with error handling
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">Be the first to comment.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="flex items-start space-x-4">
              <Image
                src="/default-avatar.svg"
                alt={comment.author || 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{comment.author || 'Anonymous'}</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-gray-700">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 