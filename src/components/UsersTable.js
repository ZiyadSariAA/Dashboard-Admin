import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Use useNavigate for navigation
import usersData from "../data/users.json"; // Import users from JSON

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // ✅ React Router navigation hook

  useEffect(() => {
    setUsers(usersData); // Load users from JSON
  }, []);

  // ✅ Function to navigate when clicking a row
  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-300">Face</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="text-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleRowClick(user.id)} // ✅ Click anywhere on the row
            >
              <td className="p-3 border border-gray-300">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-3 border border-gray-300">{user.name}</td>
              <td className="p-3 border border-gray-300">{user.email}</td>
              <td className="p-3 border border-gray-300">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
