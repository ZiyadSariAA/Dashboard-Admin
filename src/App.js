import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ To detect the current route
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRoutes from "./services/AppRoutes";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation(); // ✅ Get current path

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // ✅ Detect if current path is root (welcome page)
  const isWelcomePage = location.pathname === "/";

  if (isWelcomePage) {
    // ✅ Show Welcome page full screen — no layout
    return <AppRoutes />;
  }

  // ✅ Show normal layout for other pages
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1">
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="p-4">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;
