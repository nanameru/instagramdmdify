import React from 'react';

interface ConversationItem {
  id: number;
  username: string;
  lastMessage: string;
}

interface SidebarProps {
  conversations: ConversationItem[];
  activeConversation: number;
  onSelectConversation: (id: number) => void;
}

export default function Sidebar({ 
  conversations, 
  activeConversation, 
  onSelectConversation 
}: SidebarProps) {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>
      <div className="overflow-y-auto">
        {/* Conversation list */}
        {conversations.map((conversation) => (
          <div 
            key={conversation.id} 
            className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${
              activeConversation === conversation.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="ml-4">
              <div className="font-semibold">{conversation.username}</div>
              <div className="text-sm text-gray-500">{conversation.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 