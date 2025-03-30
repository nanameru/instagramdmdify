"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import UserList, { ConversationSummary } from '@/app/components/dashboard/UserList';
// import Conversation, { Message } from '@/app/components/dashboard/Conversation'; // 一旦コメントアウト
import { Card, CardContent, CardHeader } from '@/app/components/ui/Card';

// // モックデータ (削除)
// const mockUsers: User[] = [...];
// const mockMessages: { [key: number]: Message[] } = {...};

export default function Dashboard() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = process.env.NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID || '0'; // 環境変数から取得推奨

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/instagram/conversations');
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `エラーが発生しました (${res.status})`);
        }
        const data = await res.json();
        setConversations(data.conversations || []);
      } catch (err: any) {
        setError(err.message || '会話データの取得に失敗しました。');
        console.error('Failed to fetch conversations:', err);
      }
      setIsLoading(false);
    };

    fetchConversations();
  }, []);

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    // TODO: 選択された会話のメッセージを取得するAPI呼び出しを追加
    console.log("Selected conversation:", conversationId);
  };

  // // メッセージ送信ハンドラ (一旦コメントアウト)
  // const handleSendMessage = (content: string) => {
  //   console.log(`送信: ${content} to conversation ${activeConversationId}`);
  // };

  const activeConversationDetail = conversations.find(c => c.id === activeConversationId);

  return (
    <DashboardLayout>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">エラー:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="md:col-span-1">
          {isLoading ? (
            <Card className="h-full flex items-center justify-center">
              <CardContent>読み込み中...</CardContent>
            </Card>
          ) : (
            <UserList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          )}
        </div>
        <div className="md:col-span-2">
          {activeConversationId && activeConversationDetail ? (
            // 詳細メッセージ表示部分は別途実装
            <Card className="h-full flex flex-col">
              <CardHeader className="flex items-center">
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    {activeConversationDetail.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{activeConversationDetail.username}</h2>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto bg-gray-50 p-4">
                <p>ここに選択された会話のメッセージが表示されます。</p>
                <p>(メッセージ取得・表示機能は未実装です)</p>
                {/* <Conversation 
                  user={...} // ユーザー情報
                  messages={...} // メッセージリスト
                  currentUserId={currentUserId}
                  onSendMessage={handleSendMessage}
                /> */}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">会話が選択されていません</h3>
                  <p className="text-gray-500">{isLoading ? '会話を読み込み中...' : '左側のリストから会話を選択してください'}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 