'use client';

import { useState } from 'react';
import { useRole } from '@/hooks/useRole';

export default function CommentItem({ comment, onUpdated }) {
  const { user } = useRole();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const isOwner = user?.email === comment.userEmail;

  const handleUpdate = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${comment._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, userEmail: user.email }),
    });
    setEditing(false);
    onUpdated();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this comment?')) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${comment._id}?userEmail=${user.email}`,
      { method: 'DELETE', credentials: 'include' }
    );
    onUpdated();
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">{comment.userName}</p>
        {isOwner && (
          <div className="flex gap-2 text-sm">
            <button onClick={() => setEditing(!editing)} className="text-orange-500">
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="mt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-lg border p-2"
          />
          <button onClick={handleUpdate} className="rounded-lg bg-orange-500 px-4 text-white">
            Save
          </button>
        </div>
      ) : (
        <p className="mt-1 text-gray-600">{comment.text}</p>
      )}
    </div>
  );
}