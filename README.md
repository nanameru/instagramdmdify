# Instagram DM 連携システム

Instagram DMと連携し、メッセージを自動的に取得・表示するNext.jsプロジェクトです。

## プロジェクト概要

本システムは、InstagramのDMと連携し、DMで受信したメッセージを自動的に取得して指定のNextjsプロダクト上に表示するシステムです。
また、過去のDM履歴の表示機能と、受信メッセージへの返信文章作成支援機能を提供します。

詳細な要件定義は [requirements.md](./requirements.md) をご参照ください。

## 主要機能

- Instagram DMとの連携
- メッセージ自動取得
- メッセージ表示機能
- DM履歴表示機能
- 返信文章作成支援機能

## 使用技術

- Next.js 15.2.4
- React 19.0.0
- TypeScript
- Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 開発フェーズ

1. **フェーズ1（MVP）**: Instagram DMとの基本連携、メッセージ自動取得・表示機能の実装
2. **フェーズ2（拡張）**: 過去DM履歴表示機能、返信文章作成支援機能の実装
3. **フェーズ3（最適化）**: ユーザーフィードバックに基づく改善、パフォーマンス最適化

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
