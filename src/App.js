import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRoutes from "./services/AppRoutes"; 

const App = () => {
  return (
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="p-4">
            <AppRoutes /> 
          </div>
        </div>
      </div>
  );
};

export default App;
