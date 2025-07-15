'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils/utils';
import {
  Search,
  Music,
  ListMusic,
  Brain,
  Plus,
  Settings,
  User,
  Command,
  ArrowRight,
  Clock,
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
}

export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

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
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedIndex, query, onClose]);

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
        description: 'Go to your dashboard',
        icon: User,
        action: () => router.push(`/${userIdentity.username}`),
        keywords: ['dashboard', 'home', 'overview'],
        category: 'navigation',
        href: `/${userIdentity.username}`,
      },
      {
        id: 'nav-tracks',
        title: 'Tracks',
        description: 'Browse your track collection',
        icon: Music,
        action: () => router.push(`/${userIdentity.username}/tracks`),
        keywords: ['tracks', 'music', 'collection'],
        category: 'navigation',
        href: `/${userIdentity.username}/tracks`,
      },
      {
        id: 'nav-playlists',
        title: 'Playlists',
        description: 'Manage your playlists',
        icon: ListMusic,
        action: () => router.push(`/${userIdentity.username}/playlists`),
        keywords: ['playlists', 'lists', 'music'],
        category: 'navigation',
        href: `/${userIdentity.username}/playlists`,
      },
      {
        id: 'nav-collection',
        title: 'Collection',
        description: 'Explore your Discogs collection',
        icon: Search,
        action: () => router.push(`/${userIdentity.username}/collection`),
        keywords: ['collection', 'discogs', 'explore'],
        category: 'navigation',
        href: `/${userIdentity.username}/collection`,
      },
      {
        id: 'nav-analyze',
        title: 'Analyze',
        description: 'AI-powered music analysis',
        icon: Brain,
        action: () => router.push('/analyze'),
        keywords: ['analyze', 'ai', 'analysis'],
        category: 'navigation',
        href: '/analyze',
      },
      {
        id: 'nav-settings',
        title: 'Settings',
        description: 'Manage your preferences',
        icon: Settings,
        action: () => router.push('/settings'),
        keywords: ['settings', 'preferences', 'config'],
        category: 'navigation',
        href: '/settings',
      },

      // Actions
      {
        id: 'action-new-playlist',
        title: 'Create New Playlist',
        description: 'Start a new playlist',
        icon: Plus,
        action: () => router.push(`/${userIdentity.username}/playlists/new`),
        keywords: ['create', 'new', 'playlist'],
        category: 'actions',
      },
      {
        id: 'action-analyze-track',
        title: 'Analyze Track',
        description: 'Analyze a track with AI',
        icon: Brain,
        action: () => router.push('/analyze'),
        keywords: ['analyze', 'track', 'ai'],
        category: 'actions',
      },
      {
        id: 'action-add-track',
        title: 'Add Track',
        description: 'Add a new track to your collection',
        icon: Music,
        action: () => router.push(`/${userIdentity.username}/tracks/add`),
        keywords: ['add', 'track', 'music'],
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Command className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands and navigation..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 text-lg outline-none"
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {!query && recentCommandItems.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Recent
              </div>
              {recentCommandItems.map((command, index) => (
                <CommandButton
                  key={command.id}
                  command={command}
                  isSelected={index === selectedIndex}
                  onClick={() => executeCommand(command)}
                />
              ))}
            </div>
          )}

          {Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category} className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 capitalize">
                {category}
              </div>
              {commands.map((command, index) => {
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
          ))}

          {filteredCommands.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-4 text-gray-300" />
              <p>No commands found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <kbd className="px-2 py-1 bg-white rounded border mr-1">↵</kbd>
                to select
              </span>
              <span className="flex items-center">
                <kbd className="px-2 py-1 bg-white rounded border mr-1">↑↓</kbd>
                to navigate
              </span>
            </div>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-white rounded border mr-1">esc</kbd>
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
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
      onClick={onClick}
      className={cn(
        'w-full flex items-center p-3 rounded-lg text-left transition-colors',
        isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100',
      )}
    >
      <Icon
        className={cn(
          'w-5 h-5 mr-3',
          isSelected ? 'text-white' : 'text-gray-400',
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{command.title}</div>
        {command.description && (
          <div
            className={cn(
              'text-sm truncate',
              isSelected ? 'text-white/80' : 'text-gray-500',
            )}
          >
            {command.description}
          </div>
        )}
      </div>
      {command.href && (
        <ArrowRight
          className={cn(
            'w-4 h-4 ml-2',
            isSelected ? 'text-white' : 'text-gray-400',
          )}
        />
      )}
    </button>
  );
}
