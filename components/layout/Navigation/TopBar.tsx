'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils/utils';
import { logout } from '@/lib/supabase/auth';
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
  Brain,
  Home,
  Zap,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CommandPalette from './CommandPalette';

interface TopBarProps {
  sidebarCollapsed?: boolean;
  onMobileMenuToggle?: () => void;
  mobileMenuOpen?: boolean;
  onSearchQueryChange?: (query: string) => void;
  searchQuery?: string;
  searchPlaceholder?: string;
}

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords: string[];
  category: 'navigation' | 'actions' | 'search' | 'recent';
  href?: string;
  badge?: string;
}

export default function TopBar({
  sidebarCollapsed = false,
  onMobileMenuToggle,
  mobileMenuOpen = false,
  onSearchQueryChange,
  searchQuery: externalSearchQuery,
  searchPlaceholder = 'Search tracks, playlists, artists...',
}: TopBarProps) {
  const { userIdentity } = useAuthStore();
  const router = useRouter();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use external search query if provided, otherwise use internal state
  const searchQuery =
    externalSearchQuery !== undefined
      ? externalSearchQuery
      : internalSearchQuery;

  // Load recent commands from localStorage
  useEffect(() => {
    const recent = localStorage.getItem('crate-recent-commands');
    if (recent) {
      try {
        setRecentCommands(JSON.parse(recent));
      } catch (error) {
        console.error('Error loading recent commands:', error);
      }
    }
  }, []);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // The AuthProvider will handle redirecting to '/' and clearing the auth state
    } catch (error) {
      console.error('Failed to logout:', error);
      // Fallback to manual redirect if logout fails
      router.push('/');
    }
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

  const generateCommands = (): CommandItem[] => {
    if (!userIdentity) return [];

    const commands: CommandItem[] = [
      // Navigation
      {
        id: 'nav-dashboard',
        title: 'Dashboard',
        description: 'Go to your personal dashboard',
        icon: Home,
        action: () => router.push(`/${userIdentity.username}`),
        keywords: ['dashboard', 'home', 'overview', 'profile'],
        category: 'navigation',
        href: `/${userIdentity.username}`,
      },
      {
        id: 'nav-tracks',
        title: 'Tracks',
        description: 'Browse your complete track collection',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/tracks`),
        keywords: ['tracks', 'music', 'collection', 'songs'],
        category: 'navigation',
        href: `/${userIdentity.username}/tracks`,
      },
      {
        id: 'nav-playlists',
        title: 'Playlists',
        description: 'Create and manage your playlists',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/playlists`),
        keywords: ['playlists', 'lists', 'music', 'collections'],
        category: 'navigation',
        href: `/${userIdentity.username}/playlists`,
      },
      {
        id: 'nav-collection',
        title: 'Collection',
        description: 'Explore your synced Discogs collection',
        icon: Search,
        action: () => router.push(`/${userIdentity.username}/collection`),
        keywords: ['collection', 'discogs', 'explore', 'vinyl', 'records'],
        category: 'navigation',
        href: `/${userIdentity.username}/collection`,
      },
      {
        id: 'nav-analyze',
        title: 'AI Analysis',
        description: 'Analyze music with AI-powered insights',
        icon: Brain,
        action: () => router.push('/analyze'),
        keywords: ['analyze', 'ai', 'analysis', 'insights', 'smart'],
        category: 'navigation',
        href: '/analyze',
        badge: 'AI',
      },
      {
        id: 'nav-settings',
        title: 'Settings',
        description: 'Manage your account and preferences',
        icon: Settings,
        action: () => router.push('/settings'),
        keywords: ['settings', 'preferences', 'config', 'account'],
        category: 'navigation',
        href: '/settings',
      },

      // Quick Actions
      {
        id: 'action-new-playlist',
        title: 'Create Playlist',
        description: 'Start building a new playlist',
        icon: Plus,
        action: () => router.push(`/${userIdentity.username}/playlists/new`),
        keywords: ['create', 'new', 'playlist', 'make'],
        category: 'actions',
        badge: 'Quick',
      },
      {
        id: 'action-analyze-track',
        title: 'Analyze Track',
        description: 'Get AI-powered track analysis',
        icon: Zap,
        action: () => router.push('/analyze'),
        keywords: ['analyze', 'track', 'ai', 'quick'],
        category: 'actions',
        badge: 'AI',
      },
      {
        id: 'action-add-track',
        title: 'Add Track',
        description: 'Add new music to your collection',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/tracks/add`),
        keywords: ['add', 'track', 'music', 'upload'],
        category: 'actions',
      },
    ];

    return commands;
  };

  const commands = generateCommands();

  const filteredCommands = commands.filter((command) => {
    if (!searchQuery) return true;

    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every(
      (term) =>
        command.title.toLowerCase().includes(term) ||
        command.description?.toLowerCase().includes(term) ||
        command.keywords.some((keyword) =>
          keyword.toLowerCase().includes(term),
        ),
    );
  });

  const saveRecentCommand = (commandId: string) => {
    const updated = [
      commandId,
      ...recentCommands.filter((id) => id !== commandId),
    ].slice(0, 5);
    setRecentCommands(updated);
    localStorage.setItem('crate-recent-commands', JSON.stringify(updated));
  };

  const executeCommand = (command: CommandItem) => {
    saveRecentCommand(command.id);
    command.action();
    setSearchDropdownOpen(false);
    setInternalSearchQuery('');
    if (onSearchQueryChange) {
      onSearchQueryChange('');
    }
    setSelectedIndex(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // If external handler provided, use it (controlled mode)
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    } else {
      // Otherwise, use internal state (uncontrolled mode)
      setInternalSearchQuery(value);
    }

    // Show dropdown when typing, ONLY if not in filtering mode
    if (value.length > 0 && !onSearchQueryChange) {
      setSearchDropdownOpen(true);
      setSelectedIndex(0);
    } else {
      setSearchDropdownOpen(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0 && !onSearchQueryChange) {
      setSearchDropdownOpen(true);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!searchDropdownOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setSearchDropdownOpen(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  // Show recent commands if no query
  const recentCommandItems = !searchQuery
    ? commands.filter((cmd) => recentCommands.includes(cmd.id))
    : [];

  const displayCommands = searchQuery ? filteredCommands : recentCommandItems;

  return (
    <>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <header
        className={cn(
          'h-16 bg-white border-b-2 border-gray-800 transition-all duration-300 z-40 flex items-center justify-between px-6 w-full sticky top-0',
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
        <div className="flex-1 max-w-2xl mx-4 relative" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-16 py-2 border-2 border-gray-800 rounded-base focus:outline-none focus:ring-0 text-sm transition-all placeholder:text-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <kbd
                className="px-2 py-1 text-xs bg-white border-2 border-gray-800 rounded-base text-black font-bold cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setCommandPaletteOpen(true)}
              >
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Search Dropdown */}
          {searchDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
              {!searchQuery && recentCommandItems.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <Clock className="w-3 h-3 mr-2" />
                    Recent
                  </div>
                </div>
              )}

              {displayCommands.length > 0 ? (
                <div className="p-2 space-y-1">
                  {displayCommands.map((command, index) => (
                    <SearchCommandButton
                      key={command.id}
                      command={command}
                      isSelected={index === selectedIndex}
                      onClick={() => executeCommand(command)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Search className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No commands found</p>
                </div>
              )}
            </div>
          )}
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
              <DropdownMenuItem
                onClick={() => handleQuickAction('new-playlist')}
              >
                <ListMusic className="w-4 h-4 mr-2" />
                New Playlist
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleQuickAction('analyze-track')}
              >
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
                    <AvatarFallback className="bg-main text-black border-2 border-gray-800">
                      {userIdentity.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block font-medium">
                    {userIdentity.username}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => router.push(`/${userIdentity.username}`)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
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

interface SearchCommandButtonProps {
  command: CommandItem;
  isSelected: boolean;
  onClick: () => void;
}

function SearchCommandButton({
  command,
  isSelected,
  onClick,
}: SearchCommandButtonProps) {
  const Icon = command.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center p-2 rounded-lg text-left transition-all duration-150 group',
        isSelected ? 'bg-main text-black' : 'hover:bg-gray-100',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-md mr-3 transition-colors',
          isSelected ? 'bg-black/10' : 'bg-gray-100 group-hover:bg-gray-200',
        )}
      >
        <Icon
          className={cn(
            'w-4 h-4 transition-colors',
            isSelected ? 'text-black' : 'text-gray-600',
          )}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <div
            className={cn(
              'text-sm font-medium truncate transition-colors',
              isSelected ? 'text-black' : 'text-gray-900',
            )}
          >
            {command.title}
          </div>
          {command.badge && (
            <span
              className={cn(
                'ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full',
                isSelected
                  ? 'bg-black/10 text-black'
                  : 'bg-main/20 text-yellow-800',
              )}
            >
              {command.badge}
            </span>
          )}
        </div>
        {command.description && (
          <div
            className={cn(
              'text-xs truncate transition-colors',
              isSelected ? 'text-black/70' : 'text-gray-500',
            )}
          >
            {command.description}
          </div>
        )}
      </div>

      {command.href && (
        <ArrowRight
          className={cn(
            'w-4 h-4 ml-2 transition-all duration-150',
            isSelected
              ? 'text-black translate-x-0'
              : 'text-gray-400 group-hover:translate-x-0.5',
          )}
        />
      )}
    </button>
  );
}
