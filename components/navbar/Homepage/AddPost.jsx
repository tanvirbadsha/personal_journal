"use client";
import React, { useState } from "react";

export default function AddPost({ onCloseModal }) {
  // State to handle form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false); // Default to public
  const [tags, setTags] = useState([]); // Assuming tags are selected via checkboxes or similar

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the API
    const postData = {
      title,
      content,
      is_private: isPrivate,
      user_id: 1, // Replace with actual user ID if available from authentication
      tags,
    };

    try {
      const response = await fetch("/api/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        onCloseModal(); // Close the modal after successful submission
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("An error occurred while saving the post.");
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50"
      onClick={onCloseModal}
    >
      <div
        className="relative bg-white rounded-lg p-8 w-full h-full max-w-full max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times; {/* This represents the cross (×) symbol */}
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post content"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Private Post
            </label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              className="mt-2"
            />
          </div>

          {/* Add any additional UI for tags here */}
          {/* You could use checkboxes or a tag input to allow the user to select tags */}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCloseModal}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-300"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
