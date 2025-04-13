"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import the usePathname hook

export default function PostDetail() {
  const pathname = usePathname(); // Get the full pathname of the current route
  const postId = pathname?.split("/")[2]; // Extract postId from the pathname (i.e., [postId] in /posts/[postId])

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure postId is available before making the fetch request
    if (postId) {
      async function fetchPost() {
        try {
          const response = await fetch(`/api/getPost/${postId}`);
          const data = await response.json();

          if (response.ok) {
            setPost(data);
          } else {
            console.error("Error fetching post:", data);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchPost();
    }
  }, [postId]); // This effect will run when postId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-4">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-lg">{post.content}</p>
        {/* Add any other fields from the post you want to display */}
      </div>
    </div>
  );
}
