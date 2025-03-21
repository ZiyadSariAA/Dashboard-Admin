import React from "react";
import { useParams } from "react-router-dom";
import usersData from "../data/users.json"; // ✅ Import users data

const UsersProfile = () => {
  const { id } = useParams(); // ✅ Get user ID from URL
  const user = usersData.find((u) => u.id.toString() === id); // Find user by ID

  if (!user) {
    return <h2 className="text-red-500 text-center mt-6">User not found</h2>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
