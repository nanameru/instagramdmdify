import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

// APIから取得する会話データに合わせた型
export interface ConversationSummary {
  id: string; // Instagram側の会話ID
  userId: string; // 相手のInstagramユーザーID
  username: string;
  lastMessage: string; // 最新メッセージのスニペット
  unreadCount: number;
  avatarUrl?: string; // 必要なら追加
  // lastActive は直接取得できない場合があるため、一旦削除または別の方法で管理
}

interface UserListProps {
  conversations: ConversationSummary[];
  activeConversationId?: string; // IDをstringに変更
  onSelectConversation: (conversationId: string) => void;
}

export default function UserList({ conversations, activeConversationId, onSelectConversation }: UserListProps) {
  return (
    <Card className="h-full overflow-y-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">会話リスト</h2>
          <span className="text-sm text-gray-500">{conversations.length}件</span>
        </div>
      </CardHeader>
      <div className="divide-y divide-gray-200">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
              activeConversationId === conv.id ? 'bg-gray-50' : ''
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {conv.avatarUrl ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={conv.avatarUrl}
                    alt={conv.username}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    {conv.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0"> {/* min-w-0 を追加 */} 
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{conv.username}</h3> {/* truncateを追加 */} 
                  {/* lastActive は一旦削除 */}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p> {/* truncateを追加 */} 
                  {conv.unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 