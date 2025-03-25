// src/pages/Groups.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "groups"));
        const groupList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupList);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Groups Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">Group ID</th>
              <th className="p-3 border border-gray-300">Is Full?</th>
              <th className="p-3 border border-gray-300">Members Count</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr
                key={group.id}
                onClick={() => navigate(`/groups/${group.id}`)}
                className="text-center cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="p-3 border border-gray-300">{group.id}</td>
                <td className="p-3 border border-gray-300">
                  {group.isFull ? "✅ Yes" : "❌ No"}
                </td>
                <td className="p-3 border border-gray-300">
                  {group.members?.length || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groups;
