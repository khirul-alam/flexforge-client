'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ForumManagePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts?limit=100`, {
      credentials: 'include',
    });
    const data = await res.json();
    setPosts(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();

    if (data.success) {
      toast.success('Post deleted');
      fetchPosts();
    } else {
      toast.error(data.message || 'Delete failed');
    }
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Forum Post Management</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="border-t">
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.authorName}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                No posts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}