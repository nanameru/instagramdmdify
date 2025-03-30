"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

// Mock data
const mockConversations = [
  { id: 1, username: "Jane Smith", lastMessage: "See you tomorrow!" },
  { id: 2, username: "John Doe", lastMessage: "Thanks for the info" },
  { id: 3, username: "Alice Johnson", lastMessage: "Sounds good!" },
  { id: 4, username: "Bob Williams", lastMessage: "I'll check and let you know" },
  { id: 5, username: "Emma Davis", lastMessage: "That's great news!" },
];

const mockUsers = {
  1: { id: 1, username: "Jane Smith" },
  2: { id: 2, username: "John Doe" },
  3: { id: 3, username: "Alice Johnson" },
  4: { id: 4, username: "Bob Williams" },
  5: { id: 5, username: "Emma Davis" },
};

const mockMessages = {
  1: [
    { id: 1, senderId: 1, text: "Hi there! How are you?", timestamp: "10:30 AM" },
    { id: 2, senderId: 0, text: "I'm good, thanks! How about you?", timestamp: "10:32 AM" },
    { id: 3, senderId: 1, text: "I'm doing great! Just checking in.", timestamp: "10:33 AM" },
    { id: 4, senderId: 0, text: "That's nice to hear!", timestamp: "10:34 AM" },
  ],
  2: [
    { id: 1, senderId: 2, text: "Did you get the files I sent?", timestamp: "Yesterday" },
    { id: 2, senderId: 0, text: "Yes, I got them. Thanks!", timestamp: "Yesterday" },
    { id: 3, senderId: 2, text: "Great! Let me know if you need anything else.", timestamp: "Yesterday" },
    { id: 4, senderId: 0, text: "Thanks for the info", timestamp: "Yesterday" },
  ],
  3: [
    { id: 1, senderId: 3, text: "Are we still meeting on Friday?", timestamp: "Monday" },
    { id: 2, senderId: 0, text: "Yes, 2 PM works for me.", timestamp: "Monday" },
    { id: 3, senderId: 3, text: "Perfect, see you then!", timestamp: "Monday" },
    { id: 4, senderId: 0, text: "Sounds good!", timestamp: "Monday" },
  ],
  4: [
    { id: 1, senderId: 4, text: "Can you review the proposal?", timestamp: "Sunday" },
    { id: 2, senderId: 0, text: "I'll take a look at it tomorrow.", timestamp: "Sunday" },
    { id: 3, senderId: 4, text: "Thank you, no rush.", timestamp: "Sunday" },
    { id: 4, senderId: 0, text: "I'll check and let you know", timestamp: "Sunday" },
  ],
  5: [
    { id: 1, senderId: 5, text: "We got the new contract!", timestamp: "Last week" },
    { id: 2, senderId: 0, text: "Wow, that's amazing news!", timestamp: "Last week" },
    { id: 3, senderId: 5, text: "Yes, all thanks to your hard work.", timestamp: "Last week" },
    { id: 4, senderId: 0, text: "That's great news!", timestamp: "Last week" },
  ],
};

export default function Home() {
  const [activeConversation, setActiveConversation] = useState(1);
  const currentUserId = 0; // Current user has ID 0
  
  const handleSelectConversation = (id: number) => {
    setActiveConversation(id);
  };
  
  const handleSendMessage = (text: string) => {
    // In a real app, this would send the message to a backend
    console.log(`Sending message to ${activeConversation}: ${text}`);
    // In this demo, we're not updating the mockMessages state
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        conversations={mockConversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
      />
      <ChatArea 
        activeUser={mockUsers[activeConversation as keyof typeof mockUsers]}
        messages={mockMessages[activeConversation as keyof typeof mockMessages]}
        currentUserId={currentUserId}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
