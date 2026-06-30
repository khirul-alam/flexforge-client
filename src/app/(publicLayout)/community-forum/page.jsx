'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/components/forum/PostCard';

export default function CommunityForumPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setPosts(data.data || []);
      setTotalPages(data.totalPages || 1);
    };
    fetchPosts();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Community Forum</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`rounded-md px-4 py-2 ${
              page === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}