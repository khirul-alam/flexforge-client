'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import LikeDislikeButtons from '@/components/forum/LikeDislikeButtons';
import CommentSection from '@/components/forum/CommentSection';
import Loading from '@/components/shared/Loading';

export default function ForumPostDetailsPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useRole();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push(`/login?redirect=/community-forum/${id}`);
      return;
    }

    if (!user) return;

    const fetchPost = async () => {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts/${id}`
      );
      const data = await res.json();
      setPost(data.data);
    };

    fetchPost();
  }, [id, user, authLoading]);

  if (authLoading) return <Loading />;
  if (!user) return null;
  if (!post) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-12">
      <img src={post.image} alt={post.title} className="w-full rounded-xl object-cover max-h-96" />
      <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">By {post.authorName}</p>
      <p className="mt-4">{post.description}</p>
      <LikeDislikeButtons post={post} />
      <CommentSection postId={post._id} />
    </div>
  );
}