'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils/utils';
import { 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  Command,
  Plus,
  Menu,
  X,
  ListMusic,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CommandPalette from './CommandPalette';

interface TopBarProps {
  sidebarCollapsed?: boolean;
  onMobileMenuToggle?: () => void;
  mobileMenuOpen?: boolean;
}

export default function TopBar({ 
  sidebarCollapsed = false, 
  onMobileMenuToggle,
  mobileMenuOpen = false
}: TopBarProps) {
  const { userIdentity } = useAuthStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Handle command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };



  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-playlist':
        router.push(`/${userIdentity?.username}/playlists/new`);
        break;
      case 'analyze-track':
        router.push('/analyze');
        break;
      case 'add-track':
        router.push(`/${userIdentity?.username}/tracks/add`);
        break;
    }
  };

  return (
    <>
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
      />
      <header 
        className={cn(
          "fixed top-0 right-0 h-16 bg-white border-b border-gray-200 transition-all duration-300 z-50 flex items-center justify-between px-4",
          sidebarCollapsed ? "left-16" : "left-64"
        )}
      >
      {/* Mobile Menu Button */}
              <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 active:text-main transition-colors" />
          ) : (
            <Menu className="w-5 h-5 active:text-main transition-colors" />
          )}
        </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tracks, playlists, artists... (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setCommandPaletteOpen(true)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-main text-sm cursor-pointer transition-all active:bg-mainAccent/10"
            readOnly
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1">
            <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border">⌘</kbd>
            <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Quick Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4 active:text-main transition-colors" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleQuickAction('new-playlist')}>
              <ListMusic className="w-4 h-4 mr-2" />
              New Playlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleQuickAction('analyze-track')}>
              <Brain className="w-4 h-4 mr-2" />
              Analyze Track
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleQuickAction('add-track')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Track
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 relative"
        >
          <Bell className="w-4 h-4 active:text-main transition-colors" />
          {/* Notification indicator */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </Button>

        {/* User Menu */}
        {userIdentity ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gray-100 p-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={userIdentity.avatarUrl} />
                  <AvatarFallback className="bg-main text-black border-2 border-black">
                    {userIdentity.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block font-medium">
                  {userIdentity.username}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => router.push(`/${userIdentity.username}`)}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={() => router.push('/auth/signin')}
            className="text-sm"
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
    </>
  );
} 