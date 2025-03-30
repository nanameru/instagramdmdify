import React from 'react';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

interface ChatAreaProps {
  activeUser: {
    id: number;
    username: string;
  };
  messages: Message[];
  currentUserId: number;
  onSendMessage: (text: string) => void;
}

export default function ChatArea({ 
  activeUser, 
  messages, 
  currentUserId,
  onSendMessage 
}: ChatAreaProps) {
  const [newMessage, setNewMessage] = React.useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b border-gray-300">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="ml-4 font-semibold">{activeUser.username}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            
            return (
              <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : ''}`}>
                <div className={`max-w-xs ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-2xl p-3`}>
                  <p>{message.text}</p>
                  <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="ml-2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 