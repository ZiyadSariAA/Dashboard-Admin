import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import UsersProfile from "../pages/UsersProfile"; // ✅ Import User Profile Page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/users/:id" element={<UsersProfile />} /> {/* ✅ Dynamic route */}
    </Routes>
  );
};

export default AppRoutes;
