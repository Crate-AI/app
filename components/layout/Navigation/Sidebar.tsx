'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils/utils';
import { 
  Home, 
  Music, 
  ListMusic, 
  Search, 
  Brain, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { userIdentity } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  if (!userIdentity) return null;

  const navigationItems = [
    {
      name: 'Dashboard',
      href: `/${userIdentity.username}`,
      icon: Home,
      description: 'Overview and quick actions',
    },
    {
      name: 'Tracks',
      href: `/${userIdentity.username}/tracks`,
      icon: Music,
      description: 'Browse and manage tracks',
    },
    {
      name: 'Playlists',
      href: `/${userIdentity.username}/playlists`,
      icon: ListMusic,
      description: 'Create and manage playlists',
    },
    {
      name: 'Collection',
      href: `/${userIdentity.username}/collection`,
      icon: Search,
      description: 'Explore your Discogs collection',
    },
    {
      name: 'Analyze',
      href: '/analyze',
      icon: Brain,
      description: 'AI-powered music analysis',
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Crate</span>
          </div>
        )}
        <button
          onClick={handleToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          // Simplified active state logic
          const isActive = pathname === item.href || 
            (item.href !== `/${userIdentity.username}` && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
                isActive 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
              )} />
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                  {!isActive && (
                    <div className="text-xs text-gray-500 truncate">
                      {item.description}
                    </div>
                  )}
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center space-x-3 px-3 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer",
          isCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {userIdentity.username.charAt(0).toUpperCase()}
            </span>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {userIdentity.username}
              </div>
              <div className="text-xs text-gray-500">
                Music curator
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
} 