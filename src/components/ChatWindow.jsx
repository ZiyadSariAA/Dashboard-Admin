// src/components/ChatWindow.jsx
import React, { useRef, useEffect } from 'react';

const ChatWindow = ({ conversation, loading }) => {
  const conversationEndRef = useRef(null);

  // Auto-scroll to the bottom when conversation updates
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {conversation.map((msg, idx) => (
        <div
          key={idx}
          className={`mb-4 flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-md px-4 py-3 rounded-lg shadow-md ${
              msg.role === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-900 border border-gray-300'
            }`}
          >
            {msg.role === 'assistant' ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: msg.content }} />
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        </div>
      ))}
      {loading && (
        <div className="mb-4 flex justify-start">
          <div className="max-w-md px-4 py-3 rounded-lg shadow-md bg-white text-gray-900 border border-gray-300">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <div ref={conversationEndRef}></div>
    </div>
  );
};

export default ChatWindow;
