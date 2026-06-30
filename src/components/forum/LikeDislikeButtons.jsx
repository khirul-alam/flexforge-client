'use client';

import { useState } from 'react';
import { useRole } from '@/hooks/useRole';

export default function LikeDislikeButtons({ post }) {
  const { user } = useRole();
  const [likes, setLikes] = useState(post.likes || []);
  const [dislikes, setDislikes] = useState(post.dislikes || []);

  const vote = async (voteType) => {
    if (!user) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${post._id}/vote`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: user.email, voteType }),
    });

    if (voteType === 'like') {
      setLikes((prev) => (prev.includes(user.email) ? prev.filter((e) => e !== user.email) : [...prev, user.email]));
      setDislikes((prev) => prev.filter((e) => e !== user.email));
    } else {
      setDislikes((prev) => (prev.includes(user.email) ? prev.filter((e) => e !== user.email) : [...prev, user.email]));
      setLikes((prev) => prev.filter((e) => e !== user.email));
    }
  };

  return (
    <div className="mt-4 flex gap-4">
      <button onClick={() => vote('like')} className="rounded-lg border px-4 py-2">
        👍 {likes.length}
      </button>
      <button onClick={() => vote('dislike')} className="rounded-lg border px-4 py-2">
        👎 {dislikes.length}
      </button>
    </div>
  );
}