import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';

export interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface ConversationProps {
  user: {
    id: number;
    username: string;
    avatarUrl?: string;
  };
  messages: Message[];
  currentUserId: number;
  onSendMessage: (content: string) => void;
}

export default function Conversation({ user, messages, currentUserId, onSendMessage }: ConversationProps) {
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
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center">
        <div className="flex items-center">
          {user.avatarUrl ? (
            <img 
              className="h-10 w-10 rounded-full" 
              src={user.avatarUrl} 
              alt={user.username} 
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900">{user.username}</h2>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId;
          
          return (
            <div 
              key={message.id} 
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-md rounded-lg px-4 py-2 ${
                  isCurrentUser 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-700' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="bg-white">
        <div className="flex items-center w-full">
          <textarea
            rows={1}
            placeholder="メッセージを入力..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSendMessage}
          >
            送信
          </button>
        </div>
      </CardFooter>
    </Card>
  );
} 