import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import UsersProfile from "../pages/UsersProfile";
import Welcome from "../pages/Welcome"; // ✅ Import Welcome Page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} /> {/* ✅ Set Welcome as default */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UsersProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;
