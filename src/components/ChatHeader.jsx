// src/components/ChatHeader.jsx
import React from 'react';

const ChatHeader = ({ onClearChat }) => {
  return (
    <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h3 className="text-xl font-bold">Brainshub - AI Chatbot</h3>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        onClick={onClearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default ChatHeader;
