import React from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-white w-64 min-h-screen border-r flex flex-col">
      {/* Sidebar Header */}
      <div className="p-5 border-b">
        <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem icon={<FaChartBar />} text="Dashboard" link="/dashboard" />
        <SidebarItem icon={<FaUsers />} text="Users" link="/users" />
        <SidebarItem icon={<FaCog />} text="Settings" link="/settings" />
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t">
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" link="/logout" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, link }) => (
  <Link
    to={link}
    className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-200 transition"
  >
    <span className="text-lg">{icon}</span>
    <span className="ml-3 text-sm">{text}</span>
  </Link>
);

export default Sidebar;
