// src/components/Navbar.js

import React from "react";
import { FaBell, FaPaperPlane } from "react-icons/fa";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b shadow-sm bg-white">
      <div className="flex items-center space-x-4">
        <button
          className="lg:hidden p-2"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      <div className="flex items-center space-x-4">
        <FaPaperPlane />
        <FaBell />
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
