import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

export interface User {
  id: number;
  username: string;
  avatarUrl?: string;
  lastActive: string;
  unreadCount?: number;
}

interface UserListProps {
  users: User[];
  activeUser?: number;
  onSelectUser: (userId: number) => void;
}

export default function UserList({ users, activeUser, onSelectUser }: UserListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">ユーザー</h2>
          <span className="text-sm text-gray-500">{users.length}人</span>
        </div>
      </CardHeader>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div 
            key={user.id}
            className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
              activeUser === user.id ? 'bg-gray-50' : ''
            }`}
            onClick={() => onSelectUser(user.id)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
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
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{user.username}</h3>
                  <p className="text-xs text-gray-500">{user.lastActive}</p>
                </div>
                <div className="flex items-center mt-1">
                  {user.unreadCount ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.unreadCount}件の未読
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">既読</span>
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