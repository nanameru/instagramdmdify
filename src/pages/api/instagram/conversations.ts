import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

// 重要：トークン取得ロジックは /api/settings/token.ts と共通化推奨
const TOKEN_FILE_PATH = path.join('/tmp', 'ig_token.txt');

async function getToken(): Promise<string | null> {
  try {
    const token = await fs.readFile(TOKEN_FILE_PATH, 'utf8');
    return token.trim();
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null;
    }
    console.error('Failed to read token:', error);
    throw new Error('トークンの読み込みに失敗しました。');
  }
}

interface InstagramConversation {
  id: string;
  // 他に必要なフィールドがあれば追加 (例: snippet, unread_count, participants)
  participants: {
    data: { id: string; username: string; }[];
  };
  snippet: string; // 最新メッセージのプレビューなど
  unread_count: number;
  // Meta APIのレスポンスに合わせて調整
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const accessToken = await getToken();
    if (!accessToken) {
      return res.status(400).json({ error: 'アクセストークンが設定されていません。' });
    }

    const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    if (!igUserId) {
      console.error('INSTAGRAM_BUSINESS_ACCOUNT_ID is not set in environment variables.');
      return res.status(500).json({ error: 'サーバー設定エラー: InstagramアカウントIDが未設定です。' });
    }

    // Instagram Graph APIのエンドポイント (conversations を取得)
    // participants, snippet, unread_count フィールドを取得するように修正
    const apiUrl = `https://graph.facebook.com/v19.0/${igUserId}/conversations?platform=instagram&fields=participants{id,username},snippet,unread_count&access_token=${accessToken}`;

    console.log('Fetching from Instagram API:', apiUrl.replace(accessToken, '[REDACTED]')); // デバッグ用（トークンは隠す）

    const apiRes = await fetch(apiUrl);
    const apiData = await apiRes.json();

    if (!apiRes.ok) {
      console.error('Instagram API Error:', apiData);
      return res.status(apiRes.status).json({ error: apiData.error?.message || 'Instagram APIからのデータ取得に失敗しました。' });
    }

    // APIレスポンスから必要なデータを整形 (例)
    const conversations: InstagramConversation[] = apiData.data || [];

    console.log('Conversations fetched:', conversations.length);

    // フロントエンドで扱いやすい形式に変換（必要に応じて）
    const formattedConversations = conversations.map(conv => {
      // 自分以外の参加者を取得（DMは通常1対1）
      const otherParticipant = conv.participants.data.find(p => p.id !== igUserId);
      return {
        id: conv.id,
        userId: otherParticipant?.id || 'unknown', // 相手のID
        username: otherParticipant?.username || '不明なユーザー',
        lastMessage: conv.snippet || '',
        unreadCount: conv.unread_count || 0,
        // 必要に応じて他の情報も追加
      };
    });

    res.status(200).json({ conversations: formattedConversations });

  } catch (error: any) {
    console.error('Error fetching Instagram DMs:', error);
    res.status(500).json({ error: error.message || 'サーバーエラーが発生しました。' });
  }
} 