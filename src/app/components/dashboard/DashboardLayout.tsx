import React, { ReactNode } from 'react';
import { Sidebar, SidebarGroup, SidebarItem } from '../ui/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar>
        <SidebarGroup title="メイン">
          <SidebarItem href="/dashboard" active>
            ダッシュボード
          </SidebarItem>
          <SidebarItem href="/dashboard/conversations">
            すべての会話
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup title="アカウント">
          <SidebarItem href="/dashboard/users">
            ユーザー管理
          </SidebarItem>
          <SidebarItem href="/dashboard/settings">
            設定
          </SidebarItem>
        </SidebarGroup>
      </Sidebar>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">ダッシュボード</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 