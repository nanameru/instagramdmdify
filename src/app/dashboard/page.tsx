"use client";

import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import UserList, { User } from '../components/dashboard/UserList';
import Conversation, { Message } from '../components/dashboard/Conversation';
import { Card, CardContent } from '../components/ui/Card';

// モックデータ
const mockUsers: User[] = [
  { id: 1, username: '田中太郎', lastActive: '5分前', unreadCount: 3 },
  { id: 2, username: '鈴木花子', lastActive: '10分前' },
  { id: 3, username: '佐藤健', lastActive: '30分前', unreadCount: 1 },
  { id: 4, username: '山田優', lastActive: '1時間前' },
  { id: 5, username: '伊藤誠', lastActive: '2時間前', unreadCount: 5 },
  { id: 6, username: '小林美咲', lastActive: '昨日' },
  { id: 7, username: '加藤勇', lastActive: '2日前' },
];

const mockMessages: { [key: number]: Message[] } = {
  1: [
    { id: 1, senderId: 1, content: 'こんにちは！', timestamp: '12:30', isRead: true },
    { id: 2, senderId: 0, content: 'こんにちは！お元気ですか？', timestamp: '12:31', isRead: true },
    { id: 3, senderId: 1, content: '元気です！新商品について質問があります。', timestamp: '12:32', isRead: true },
    { id: 4, senderId: 0, content: 'もちろんです。どのようなことでしょうか？', timestamp: '12:33', isRead: true },
    { id: 5, senderId: 1, content: '最新のカタログはどこで見れますか？', timestamp: '12:34', isRead: false },
    { id: 6, senderId: 1, content: 'ウェブサイトで見つけられなくて…', timestamp: '12:34', isRead: false },
    { id: 7, senderId: 1, content: 'あと、店舗での取り扱いはいつからですか？', timestamp: '12:35', isRead: false },
  ],
  2: [
    { id: 1, senderId: 2, content: 'お問い合わせありがとうございます。', timestamp: '昨日', isRead: true },
    { id: 2, senderId: 0, content: 'こちらこそ、ありがとうございます。', timestamp: '昨日', isRead: true },
    { id: 3, senderId: 2, content: '商品の発送状況を確認したいのですが。', timestamp: '昨日', isRead: true },
  ],
  3: [
    { id: 1, senderId: 3, content: '先日はありがとうございました。', timestamp: '昨日', isRead: true },
    { id: 2, senderId: 0, content: 'こちらこそありがとうございます。', timestamp: '昨日', isRead: true },
    { id: 3, senderId: 3, content: 'また新商品が出たら教えてください！', timestamp: '今日', isRead: false },
  ],
  4: [
    { id: 1, senderId: 4, content: 'お世話になっております。', timestamp: '先週', isRead: true },
    { id: 2, senderId: 0, content: 'いつもありがとうございます。', timestamp: '先週', isRead: true },
  ],
  5: [
    { id: 1, senderId: 5, content: '新規キャンペーンについて質問です。', timestamp: '3日前', isRead: true },
    { id: 2, senderId: 0, content: 'どのような内容でしょうか？', timestamp: '3日前', isRead: true },
    { id: 3, senderId: 5, content: '期間はいつまでですか？', timestamp: '2日前', isRead: false },
    { id: 4, senderId: 5, content: 'あと、特典内容も教えていただけますか？', timestamp: '2日前', isRead: false },
    { id: 5, senderId: 5, content: '友人にも紹介したいので、詳細が知りたいです。', timestamp: '1日前', isRead: false },
    { id: 6, senderId: 5, content: 'よろしくお願いします。', timestamp: '昨日', isRead: false },
    { id: 7, senderId: 5, content: '返信お待ちしています。', timestamp: '今日', isRead: false },
  ],
  6: [
    { id: 1, senderId: 6, content: 'はじめまして。', timestamp: '先月', isRead: true },
    { id: 2, senderId: 0, content: 'はじめまして。ご連絡ありがとうございます。', timestamp: '先月', isRead: true },
  ],
  7: [
    { id: 1, senderId: 7, content: 'お世話になっております。', timestamp: '先週', isRead: true },
    { id: 2, senderId: 0, content: 'いつもありがとうございます。', timestamp: '先週', isRead: true },
  ],
};

export default function Dashboard() {
  const [activeUser, setActiveUser] = useState<number | undefined>(undefined);
  const currentUserId = 0; // 自分のユーザーID

  const handleSelectUser = (userId: number) => {
    setActiveUser(userId);
  };

  const handleSendMessage = (content: string) => {
    console.log(`送信: ${content} to user ${activeUser}`);
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="md:col-span-1">
          <UserList 
            users={mockUsers} 
            activeUser={activeUser} 
            onSelectUser={handleSelectUser} 
          />
        </div>
        <div className="md:col-span-2">
          {activeUser ? (
            <Conversation 
              user={mockUsers.find(user => user.id === activeUser) || mockUsers[0]}
              messages={mockMessages[activeUser] || []}
              currentUserId={currentUserId}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">会話が選択されていません</h3>
                  <p className="text-gray-500">左側のユーザーリストから会話を選択してください</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 