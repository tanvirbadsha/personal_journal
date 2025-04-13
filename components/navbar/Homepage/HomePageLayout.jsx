"use client";
import React, { useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";

export default function HomePageLayout() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Add New Post Button - Centered below Navbar */}
      <div className="flex justify-center mt-6">
        <button
          onClick={openModal}
          className="bg-blue-800 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition duration-300"
        >
          Add a new Post
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <AddPost onCloseModal={closeModal} />}
      <Posts />
    </div>
  );
}
