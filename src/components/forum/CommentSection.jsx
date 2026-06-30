'use client';

import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import CommentItem from './CommentItem';

export default function CommentSection({ postId }) {
  const { user } = useRole();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${postId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    setComments(data.data || []);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId,
        userEmail: user.email,
        userName: user.name,
        userImage: user.image,
        text,
        parentCommentId: null,
      }),
    });

    setText('');
    fetchComments();
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-xl font-semibold">Comments</h3>

      <form onSubmit={handleAddComment} className="mb-6 flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-lg border p-3"
        />
        <button type="submit" className="rounded-lg bg-orange-500 px-5 py-3 text-white">
          Post
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} onUpdated={fetchComments} />
        ))}
      </div>
    </div>
  );
}