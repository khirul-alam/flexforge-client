'use client';

import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import toast from 'react-hot-toast';

export default function MyForumPostsPage() {
  const { user } = useRole();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!user) return;
    const res = await authFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/author/${user.email}`
    );
    const data = await res.json();
    setPosts(data.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) { toast.success('Post deleted'); fetchPosts(); }
    else toast.error(data.message || 'Delete failed');
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">My Forum Posts</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="overflow-hidden rounded-xl border shadow-sm">
            <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{post.description}</p>
              <button onClick={() => handleDelete(post._id)} className="mt-3 rounded-lg bg-red-500 px-3 py-1 text-xs text-white">Delete</button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="col-span-full text-center text-gray-400">No posts yet.</p>}
      </div>
    </div>
  );
}