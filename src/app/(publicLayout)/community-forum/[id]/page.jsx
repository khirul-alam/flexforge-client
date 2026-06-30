'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LikeDislikeButtons from '@/components/forum/LikeDislikeButtons';
import CommentSection from '@/components/forum/CommentSection';

export default function ForumPostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setPost(data.data);
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <img src={post.image} alt={post.title} className="w-full rounded-xl object-cover" />
      <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">By {post.authorName}</p>
      <p className="mt-4">{post.description}</p>

      <LikeDislikeButtons post={post} />
      <CommentSection postId={post._id} />
    </div>
  );
}