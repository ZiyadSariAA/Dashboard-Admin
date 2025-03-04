import React, { useState } from "react";

const Settings = () => {
  // State for theme selection
  const [theme, setTheme] = useState("light");

  // Handle theme change
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      {/* Theme Selection */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Appearance</h2>
        <label className="block mb-2">Select Theme:</label>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold mb-2">Account</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
