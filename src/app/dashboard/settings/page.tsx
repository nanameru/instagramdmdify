"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardContent, CardFooter } from '@/app/components/ui/Card';

export default function SettingsPage() {
  const [token, setToken] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('読み込み中...');

  useEffect(() => {
    // 現在のトークン設定状態を取得（例：APIから取得）
    const fetchTokenStatus = async () => {
      try {
        const res = await fetch('/api/settings/token');
        if (res.ok) {
          const data = await res.json();
          setCurrentStatus(data.hasToken ? 'アクセストークン設定済み' : 'アクセストークン未設定');
        } else {
          setCurrentStatus('状態取得エラー');
        }
      } catch (error) {
        setCurrentStatus('状態取得エラー');
        console.error('Failed to fetch token status:', error);
      }
    };
    fetchTokenStatus();
  }, []);

  const handleSaveToken = async () => {
    setIsLoading(true);
    setStatusMessage('');
    try {
      const res = await fetch('/api/settings/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        setStatusMessage('アクセストークンを保存しました。');
        setToken(''); // 入力フィールドをクリア
        setCurrentStatus('アクセストークン設定済み');
      } else {
        const errorData = await res.json();
        setStatusMessage(`保存に失敗しました: ${errorData.error || '不明なエラー'}`);
      }
    } catch (error) {
      setStatusMessage('保存中にエラーが発生しました。');
      console.error('Failed to save token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">設定</h1>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Instagram アクセストークン</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Instagram Graph APIにアクセスするための長期アクセストークンを設定します。
              トークンは安全にサーバーサイドで管理されます。
              現在の状態: <span className="font-semibold">{currentStatus}</span>
            </p>
            <div>
              <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700 mb-1">
                アクセストークン
              </label>
              <input
                type="password" // トークンが見えないように
                id="accessToken"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ここにアクセストークンを貼り付け"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {statusMessage && (
              <p className={`text-sm ${statusMessage.includes('失敗') || statusMessage.includes('エラー') ? 'text-red-600' : 'text-green-600'}`}>
                {statusMessage}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <button
              onClick={handleSaveToken}
              disabled={isLoading || !token}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '保存中...' : '保存'}
            </button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
} 