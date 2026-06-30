'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/components/forum/PostCard';

export default function LatestForumPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/latest`);
      const data = await res.json();
      setPosts(data.data || []);
    };
    fetchLatest();
  }, []);

  return (
    <section className="container mx-auto bg-gray-50 px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Latest from the Community</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}