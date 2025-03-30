import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

// 重要：このファイルパスはデモ用です。本番では絶対に使用しないでください。
const TOKEN_FILE_PATH = path.join('/tmp', 'ig_token.txt');

// トークンを安全に保存する関数（デモ用）
async function saveToken(token: string): Promise<void> {
  try {
    // /tmp ディレクトリが存在しない場合は作成
    await fs.mkdir(path.dirname(TOKEN_FILE_PATH), { recursive: true });
    await fs.writeFile(TOKEN_FILE_PATH, token, 'utf8');
    console.log('Token saved to:', TOKEN_FILE_PATH); // ログ確認用
  } catch (error) {
    console.error('Failed to save token:', error);
    throw new Error('トークンの保存に失敗しました。');
  }
}

// 保存されたトークンを取得する関数（デモ用）
async function getToken(): Promise<string | null> {
  try {
    const token = await fs.readFile(TOKEN_FILE_PATH, 'utf8');
    return token.trim();
  } catch (error: any) {
    // ファイルが存在しない場合はnullを返す
    if (error.code === 'ENOENT') {
      return null;
    }
    console.error('Failed to read token:', error);
    throw new Error('トークンの読み込みに失敗しました。');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { token } = req.body;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: '無効なトークンが指定されました。' });
    }

    try {
      await saveToken(token);
      return res.status(200).json({ message: 'トークンが正常に保存されました。' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'トークンの保存中にサーバーエラーが発生しました。' });
    }
  } else if (req.method === 'GET') {
    try {
      const token = await getToken();
      return res.status(200).json({ hasToken: !!token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'トークン状態の確認中にサーバーエラーが発生しました。' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 