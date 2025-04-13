import React from "react";

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full bg-blue-800 py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">My Journal</div>
        <div className="space-x-6">
          <button className="bg-white text-blue-800 px-6 py-2 rounded-full font-bold hover:bg-blue-200 transition duration-300">
            Home
          </button>
          <button className="bg-white text-blue-800 px-6 py-2 rounded-full font-bold hover:bg-blue-200 transition duration-300">
            Posts
          </button>
        </div>
      </div>
    </div>
  );
}
