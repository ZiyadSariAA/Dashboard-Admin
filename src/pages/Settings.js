// src/pages/Settings.js
import React from "react";
import { FaPaintBrush, FaUserCog } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaPaintBrush className="text-indigo-500" />
          Appearance
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Theme options will go here (light/dark toggle)
        </p>
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaUserCog className="text-purple-500" />
          Account Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Coming soon: update email/password and logout
        </p>
      </div>
    </div>
  );
};

export default Settings;
