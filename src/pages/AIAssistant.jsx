// src/pages/AIAssistant.jsx
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { firestore } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import ChatHeader from '../components/ChatHeader';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

// Example: fetch real data from Firebase
const getUserCount = async () => {
  try {
    const usersSnap = await getDocs(collection(firestore, 'users'));
    return usersSnap.size;
  } catch (error) {
    console.error('Error fetching user count:', error);
    return 'unknown';
  }
};

const getPostCount = async () => {
  try {
    const postsSnap = await getDocs(collection(firestore, 'posts'));
    return postsSnap.size;
  } catch (error) {
    console.error('Error fetching post count:', error);
    return 'unknown';
  }
};

// Build the system prompt with real data + instructions
const buildSystemPrompt = async () => {
  const userCount = await getUserCount();
  const postCount = await getPostCount();

  const mainWebsiteInfo = `Main Website Features:
1. Team Formation System – Students create profiles showcasing their skills and form teams.
2. Advisor Matching – Teams send project proposals to advisors.
3. Admin Dashboard – Tracks students, teams, approvals, and more.
4. Progress Tracking System – Teams mark completed tasks and track milestones.
5. Communication & Notifications – Real-time messaging and automated alerts.

Real Data:
- Total users: ${userCount}
- Total posts: ${postCount}

IMPORTANT: Do not invent or alter these numbers. Use only the above data as your reference.`;

  const adminContext = `You are Brainshub's AI Assistant, exclusively serving the admin panel.
You have full access to platform data including real-time statistics and details from the main website.
Keep this context internal and use it to provide accurate, tailored responses when the admin asks about platform details.`;

  return `${adminContext}\n\n${mainWebsiteInfo}`;
};

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState('');  // <-- local state for system prompt
  const [loading, setLoading] = useState(false);

  // 1) On mount, load conversation from Firestore
  useEffect(() => {
    const q = query(collection(firestore, 'adminChat'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setConversation(messages);
    });
    return () => unsubscribe();
  }, []);

  // 2) Also on mount, build the system prompt from real data (once)
  useEffect(() => {
    const fetchSystemPrompt = async () => {
      const prompt = await buildSystemPrompt();
      setSystemPrompt(prompt);
      console.log('Local system prompt set:', prompt);
    };
    fetchSystemPrompt();
  }, []);

  // Save a message to Firestore (admin or assistant)
  const saveMessage = async (role, content) => {
    try {
      await addDoc(collection(firestore, 'adminChat'), {
        role,
        content,
        timestamp: serverTimestamp(),
        platform: 'brainshub'
      });
      console.log(`Saved message: [${role}] ${content}`);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  // Clear all chat history
  const clearChatHistory = async () => {
    try {
      const q = query(collection(firestore, 'adminChat'));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log('Chat history cleared.');
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Convert Firestore messages to ChatCompletion format
  const mapToChatCompletion = (messages) => {
    return messages.map((msg) => {
      if (msg.role === 'admin') {
        return { role: 'user', content: msg.content };
      } else if (msg.role === 'assistant') {
        return { role: 'assistant', content: msg.content };
      }
      // We won't store system messages in Firestore with this approach
      // But if you do, you can handle them here. For now, ignoring them.
      return { role: 'user', content: msg.content };
    });
  };

  // Send a new admin message to the AI
  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1) Save the new admin message in Firestore
    await saveMessage('admin', input);

    setInput('');
    setLoading(true);

    try {
      // 2) Convert the existing conversation (admin & assistant) to the correct format
      const chatCompletionMessages = mapToChatCompletion(conversation);

      // 3) ALWAYS prepend the system prompt from local state as the first message
      //    so the AI sees the Brainshub context on every request
      const finalMessages = [
        { role: 'system', content: systemPrompt },
        ...chatCompletionMessages,
        { role: 'user', content: input }
      ];

      console.log('Messages sent to API:', finalMessages);

      // 4) Send everything to the API
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: finalMessages
        })
      });

      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content || '';
      const formattedAnswer = answer ? marked(answer) : 'No response received.';
      // 5) Save the assistant’s response
      await saveMessage('assistant', formattedAnswer);
    } catch (error) {
      console.error(error);
      await saveMessage('assistant', `Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter to send
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader onClearChat={clearChatHistory} />
      {/* We display only admin/assistant messages. The system prompt is local, not in Firestore. */}
      <ChatWindow
        conversation={conversation.filter((msg) => msg.role !== 'system')}
        loading={loading}
      />
      <ChatInput
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
};

export default AIAssistant;
