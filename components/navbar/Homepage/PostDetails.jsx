// app/posts/[postId]/page.jsx
import React, { useEffect, useState } from "react";

export default function PostDetail({ params }) {
  const { postId } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetail() {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setLoading(false);
      }
    }

    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <span className="text-sm text-gray-500">
        {new Date(post.created_at).toLocaleDateString()}
      </span>
    </div>
  );
}
