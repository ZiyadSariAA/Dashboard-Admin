// src/services/AppRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Groups from "../pages/Groups";
import UserProfile from "../pages/UsersProfile";
import Notifications from "../pages/Notifications"; // ✅ Actual component

// Future placeholders
const Posts = () => <div>Posts Page (To Build)</div>;
const Reports = () => <div>Reports Page (To Build)</div>;
const AdsManager = () => <div>Ads Manager Page (To Build)</div>;
const Chat = () => <div>Chat Page (To Build)</div>;
const AIAssistant = () => <div>AI Assistant Page (To Build)</div>;
const FormsBuilder = () => <div>Forms Builder Page (To Build)</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/ads-manager" element={<AdsManager />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/notifications" element={<Notifications />} /> {/* ✅ Real page */}
      <Route path="/forms-builder" element={<FormsBuilder />} />
    </Routes>
  );
};

export default AppRoutes;
