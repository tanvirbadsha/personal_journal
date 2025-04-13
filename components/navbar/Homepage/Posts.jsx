"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/getPost");
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    router.push(`/posts/${postId}`);
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <div
          key={post.entry_id}
          className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl"
          onClick={() => handlePostClick(post.entry_id)}
        >
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">
            {post.content.substring(0, 100)}...
          </p>
          <span className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}
