// src/pages/Notifications.js

import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import { useAppContext } from "../context/AppContext"; // Import custom hook

const Notifications = () => {
  // Form states
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetRole, setTargetRole] = useState("all");
  const [sendAt, setSendAt] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Access user data from custom context
  const { user, userData } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    setLoading(true);

    try {
      await addDoc(collection(firestore, "scheduled_notifications"), {
        title: title.trim(),
        message: message.trim(),
        targetRole: targetRole.trim(),
        sendAt: new Date(sendAt),
        sent: false,
        createdAt: serverTimestamp(),
        createdBy: user?.uid || "unknown",
        createdByName: userData?.name || "Unknown",
        targetUserIds: [], // Optional: for future use if targeting specific users
      });

      // Reset form fields on success
      setTitle("");
      setMessage("");
      setTargetRole("all");
      setSendAt("");
      setStatus("✅ Notification saved successfully!");
    } catch (error) {
      console.error("Error saving notification:", error);
      setStatus("❌ Failed to save notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">📣 Create Notification</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="notification-title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            id="notification-title"
            type="text"
            placeholder="Enter notification title"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="notification-message" className="block font-semibold mb-1">
            Message
          </label>
          <textarea
            id="notification-message"
            placeholder="Enter notification message"
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Target Role */}
        <div>
          <label htmlFor="notification-target-role" className="block font-semibold mb-1">
            Target Role
          </label>
          <select
            id="notification-target-role"
            className="w-full border border-gray-300 p-2 rounded"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="student">Students</option>
            <option value="advisor">Advisors</option>
          </select>
        </div>

        {/* Send At */}
        <div>
          <label htmlFor="notification-send-at" className="block font-semibold mb-1">
            Send At
          </label>
          <input
            id="notification-send-at"
            type="datetime-local"
            className="w-full border border-gray-300 p-2 rounded"
            value={sendAt}
            onChange={(e) => setSendAt(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Notification"}
        </button>
      </form>

      {/* Status Message */}
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default Notifications;
