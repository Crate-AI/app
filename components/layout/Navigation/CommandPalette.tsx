'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils/utils';
import {
  Search,
  Music,
  ListMusic,
  Plus,
  Settings,
  User,
  Command,
  ArrowRight,
  Clock,
  Home,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { userIdentity } = useAuthStore();

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

  // Handle animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Focus input after animation starts
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev < filteredCommands.length - 1 ? prev + 1 : 0;
            scrollToSelected(newIndex);
            return newIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : filteredCommands.length - 1;
            scrollToSelected(newIndex);
            return newIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, query, onClose]);

  const scrollToSelected = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('[data-command-item]');
    const selectedItem = items[index];
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

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
    onClose();
    setQuery('');
    setSelectedIndex(0);
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
        icon: Music,
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
        id: 'action-add-track',
        title: 'Add Track',
        description: 'Add new music to your collection',
        icon: Music,
        action: () => router.push(`/${userIdentity.username}/tracks/add`),
        keywords: ['add', 'track', 'music', 'upload'],
        category: 'actions',
      },
    ];

    return commands;
  };

  const commands = generateCommands();

  const filteredCommands = commands.filter((command) => {
    if (!query) return true;

    const searchTerms = query.toLowerCase().split(' ');
    return searchTerms.every(
      (term) =>
        command.title.toLowerCase().includes(term) ||
        command.description?.toLowerCase().includes(term) ||
        command.keywords.some((keyword) =>
          keyword.toLowerCase().includes(term),
        ),
    );
  });

  // Maintain selected index when filtering
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Group commands by category
  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = [];
      }
      acc[command.category].push(command);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  // Show recent commands if no query
  const recentCommandItems = !query
    ? commands.filter((cmd) => recentCommands.includes(cmd.id))
    : [];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-50 transition-opacity duration-200',
          isAnimating ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
        <div
          className={cn(
            'bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-xl overflow-hidden transition-all duration-200 ease-out',
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2',
          )}
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-center w-8 h-8 bg-main rounded-lg mr-3">
                <Command className="w-4 h-4 text-black" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-500"
              />
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div ref={containerRef} className="max-h-80 overflow-y-auto">
            {!query && recentCommandItems.length > 0 && (
              <div className="p-3">
                <div className="flex items-center px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <Clock className="w-3 h-3 mr-2" />
                  Recent
                </div>
                <div className="space-y-0.5">
                  {recentCommandItems.map((command, index) => (
                    <CommandButton
                      key={command.id}
                      command={command}
                      isSelected={index === selectedIndex}
                      onClick={() => executeCommand(command)}
                    />
                  ))}
                </div>
              </div>
            )}

            {Object.entries(groupedCommands).map(
              ([category, categoryCommands]) => (
                <div key={category} className="p-3">
                  <div className="flex items-center px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {category === 'navigation' && (
                      <Home className="w-3 h-3 mr-2" />
                    )}
                    {category === 'actions' && <Zap className="w-3 h-3 mr-2" />}
                    {category === 'search' && (
                      <Search className="w-3 h-3 mr-2" />
                    )}
                    {category}
                  </div>
                  <div className="space-y-0.5">
                    {categoryCommands.map((command) => {
                      const globalIndex = filteredCommands.indexOf(command);
                      return (
                        <CommandButton
                          key={command.id}
                          command={command}
                          isSelected={globalIndex === selectedIndex}
                          onClick={() => executeCommand(command)}
                        />
                      );
                    })}
                  </div>
                </div>
              ),
            )}

            {filteredCommands.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No commands found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search or browse available commands
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-xs font-mono mr-1">
                    ↵
                  </kbd>
                  <span>to select</span>
                </div>
                <div className="flex items-center">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-xs font-mono mr-1">
                    ↑↓
                  </kbd>
                  <span>to navigate</span>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-xs font-mono mr-1">
                  esc
                </kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface CommandButtonProps {
  command: CommandItem;
  isSelected: boolean;
  onClick: () => void;
}

function CommandButton({ command, isSelected, onClick }: CommandButtonProps) {
  const Icon = command.icon;

  return (
    <button
      data-command-item
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
