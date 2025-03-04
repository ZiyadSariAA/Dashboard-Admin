
import React from "react";
import { FaPaperPlane, FaBell } from "react-icons/fa";
import SearchBar from "./ui/SearchBar";
import IconButton from "./ui/IconButton";
import UserProfile from "./ui/AdminProfile";

const Navbar = () => {
  return (
    <div className="bg-white border-b-2 border-gray-200">
      <div className="flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <img
          src="https://pbs.twimg.com/profile_images/856590595783110656/4CVlrO1z_200x200.jpg"  
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
