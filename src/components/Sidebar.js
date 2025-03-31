// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaLayerGroup,
  FaFileAlt,
  FaExclamationTriangle,
  FaBullhorn,
  FaComments,
  FaRobot,
  FaBell,
  FaWpforms,
  FaCog,
} from "react-icons/fa";

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
        <SidebarItem icon={<FaLayerGroup />} text="Groups" link="/groups" />
        <SidebarItem icon={<FaFileAlt />} text="Posts" link="/posts" />
        <SidebarItem icon={<FaExclamationTriangle />} text="Reports" link="/reports" />
        <SidebarItem icon={<FaBullhorn />} text="Ads Manager" link="/ads-manager" />
        <SidebarItem icon={<FaComments />} text="Chat" link="/chat" />
        {/* Updated AI Assistant link to match the route */}
        <SidebarItem icon={<FaRobot />} text="AI Assistant" link="/ai-assistant" />
        <SidebarItem icon={<FaBell />} text="Notifications" link="/notifications" />
        <SidebarItem icon={<FaWpforms />} text="Forms Builder" link="/forms-builder" />
        <SidebarItem icon={<FaCog />} text="Settings" link="/settings" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-200 transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="ml-3 text-sm">{text}</span>
    </Link>
  );
};

export default Sidebar;
