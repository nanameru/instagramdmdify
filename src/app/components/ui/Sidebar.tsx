import React, { ReactNode } from 'react';
import Link from 'next/link';

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Instagram DM</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {children}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">ユーザー名</p>
            <p className="text-xs text-gray-500">アカウント設定</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarGroupProps {
  title: string;
  children: ReactNode;
}

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h3>
      <ul className="space-y-1">
        {children}
      </ul>
    </div>
  );
}

interface SidebarItemProps {
  icon?: ReactNode;
  href: string;
  active?: boolean;
  children: ReactNode;
}

export function SidebarItem({ icon, href, active = false, children }: SidebarItemProps) {
  return (
    <li>
      <Link 
        href={href}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          active 
            ? 'bg-gray-200 text-gray-900' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        {icon && <span className="mr-3">{icon}</span>}
        {children}
      </Link>
    </li>
  );
} 