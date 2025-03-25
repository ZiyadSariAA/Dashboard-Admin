import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "users"));
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id, // ✅ Use document ID
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-300">Avatar</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Role</th>
            <th className="p-3 border border-gray-300">Group</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)} // ✅ Use doc ID
              className="text-center cursor-pointer hover:bg-gray-100 transition"
            >
              <td className="p-3 border border-gray-300">
                <img
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-3 border border-gray-300">{user.name}</td>
              <td className="p-3 border border-gray-300">{user.email}</td>
              <td className="p-3 border border-gray-300">{user.role}</td>
              <td className="p-3 border border-gray-300">
                {user.groupId ? "✅ In Group" : "❌ Not in Group"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
