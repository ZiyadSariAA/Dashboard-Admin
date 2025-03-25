import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { firestore } from "../firebase";

const UsersProfile = () => {
  const { id } = useParams(); // URL param = user doc ID
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with ID:", id);
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("✅ User found:", docSnap.data());
          setUser(docSnap.data());
        } else {
          console.warn("❌ User not found in Firestore");
        }
      } catch (err) {
        console.error("🔥 Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6">Loading user profile...</div>;
  if (!user) return <div className="p-6 text-red-500">User not found.</div>;

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto bg-white shadow rounded-lg">
      {/* Back Button */}
      <button
        onClick={() => navigate("/users")}
        className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded transition mb-4"
      >
        ← Back to Users
      </button>

      <div className="flex items-center space-x-4">
        <img
          src={user.image || "/default-avatar.png"}
          alt={user.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Speciality:</strong> {user.speciality || "N/A"}</p>
        <p><strong>Group:</strong> {user.groupId ? "✅ In Group" : "❌ Not in Group"}</p>
        <p><strong>About:</strong> {user.about || "No description"}</p>
        <p className="col-span-2">
          <strong>Skills:</strong> {user.skills?.join(", ") || "None"}
        </p>
        <p className="col-span-2">
          <strong>URLs:</strong>{" "}
          {user.urls?.length > 0 ? (
            user.urls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 ml-2 underline"
              >
                Link {index + 1}
              </a>
            ))
          ) : (
            "No links"
          )}
        </p>
      </div>
    </div>
  );
};

export default UsersProfile;
