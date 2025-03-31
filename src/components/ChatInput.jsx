// src/components/ChatInput.jsx
import React from 'react';

const ChatInput = ({ input, setInput, handleKeyDown, sendMessage, loading }) => {
  return (
    <div className="p-4 bg-white border-t">
      <textarea
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="2"
        placeholder="Type your message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
};

export default ChatInput;
