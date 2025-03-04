
import React from "react";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import SearchBar from "./ui/SearchBar";
import IconButton from "./ui/IconButton";
import UserProfile from "./ui/UserProfile";

const Navbar = () => {
  return (
    <div className="bg-white border-b-2 border-gray-200">
      <div className="flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <img
          src="/Res/lolo.png"  // Make sure lolo.png is inside the public/Res/ folder
          className="h-8 w-auto"
          alt="Logo"
        />

        {/* Search Bar */}
        <SearchBar />

        {/* Icons & Profile */}
        <div className="flex items-center space-x-4">
          <IconButton icon={<FaPaperPlane />} />
          <IconButton icon={<FaBell className="w-6 h-6" />} badge="2" />
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
