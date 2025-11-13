import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';

const sampleChats = [
  {
    id: 1,
    name: 'Rahul Sharma',
    lastMessage: 'Hey, are you still looking for a roommate?',
    time: '2h ago',
    unread: 2
  },
  {
    id: 2,
    name: 'Priya Singh',
    lastMessage: 'The apartment looks great!',
    time: '1d ago',
    unread: 0
  }
];

export default function Messages() {
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(location.state?.chatUser || null);
  const [messages, setMessages] = useState([]);
  const [chats] = useState(sampleChats);

  useEffect(() => {
    if (selectedChat) {
      // Load messages for selected chat (mock data)
      setMessages([
        { sender: selectedChat.name, text: 'Hi! I saw we matched. Are you still looking for a roommate?' },
        { sender: 'You', text: 'Yes! I am. The location looks perfect for me.' },
        { sender: selectedChat.name, text: 'Great! When would you like to visit the place?' }
      ]);
    }
  }, [selectedChat]);

  const handleSendMessage = (text) => {
    const newMessage = { sender: 'You', text };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-beige">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Messages
          </h1>
          <p className="text-gray-600">
            Chat with your matches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Recent Chats</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat({
                      id: chat.id,
                      name: chat.name,
                      city: 'Delhi'
                    })}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-gray-900">{chat.name}</h4>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="inline-block mt-1 px-2 py-1 bg-black text-white text-xs rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedChat ? (
              <ChatBox
                chatUser={selectedChat}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a chat from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
