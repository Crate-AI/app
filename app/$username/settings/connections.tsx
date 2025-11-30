import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Music, CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/$username/settings/connections')({
  component: ConnectionsPage,
});

interface MusicConnection {
  provider: string;
  providerUsername?: string;
  connectedAt: number;
}

function ConnectionsPage() {
  const user = useQuery(api.users.getCurrentUser);
  const [isConnecting, setIsConnecting] = useState(false);

  // TODO: Query to get user's music connections
  // const connections = useQuery(api.musicConnections.getUserConnections);

  const handleConnectDiscogs = async () => {
    setIsConnecting(true);
    
    try {
      // Make a request to get the Discogs OAuth URL
      const response = await fetch('/api/auth/discogs/request-token');
      
      if (!response.ok) {
        throw new Error('Failed to initiate Discogs connection');
      }
      
      const { authUrl } = await response.json();
      
      // Redirect to Discogs OAuth
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to connect Discogs:', error);
      toast.error('Failed to connect to Discogs. Please try again.');
      setIsConnecting(false);
    }
  };

  // Mock connection status for now
  const discogsConnected = false; // TODO: Check from actual connections

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Music Service Connections</h1>
        <p className="text-gray-600">
          Connect your music services to sync your collection and enhance your Crate experience
        </p>
      </div>

      <div className="space-y-4">
        {/* Discogs Connection */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold">Discogs</h3>
                  {discogsConnected ? (
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <XCircle className="w-4 h-4" />
                      <span>Not connected</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Sync your vinyl and physical music collection from Discogs. Browse releases,
                  view details, and add tracks to your Crate library.
                </p>
                {discogsConnected && (
                  <div className="text-xs text-gray-500">
                    <p>Username: @johndoe</p>
                    <p>Connected on: Jan 15, 2024</p>
                  </div>
                )}
              </div>
            </div>
            <div className="ml-4">
              {discogsConnected ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => toast.info('Syncing collection...')}
                  >
                    Sync Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => toast.info('Disconnect functionality coming soon')}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleConnectDiscogs}
                  disabled={isConnecting}
                  className="bg-main hover:bg-mainAccent border-2 border-gray-800 shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Connect Discogs'
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Spotify Connection (Coming Soon) */}
        <Card className="p-6 opacity-60">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold">Spotify</h3>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Connect your Spotify account to sync your playlists and listening history.
                  Create cross-platform playlists combining your digital and physical music.
                </p>
              </div>
            </div>
            <Button
              disabled
              variant="outline"
              className="ml-4"
            >
              Connect Spotify
            </Button>
          </div>
        </Card>

        {/* Apple Music Connection (Coming Soon) */}
        <Card className="p-6 opacity-60">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold">Apple Music</h3>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Sync your Apple Music library and playlists. Seamlessly integrate your
                  digital music collection with Crate.
                </p>
              </div>
            </div>
            <Button
              disabled
              variant="outline"
              className="ml-4"
            >
              Connect Apple Music
            </Button>
          </div>
        </Card>
      </div>

      {/* Help Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">About Music Connections</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Connect multiple music services to create a unified library</li>
          <li>• Your connections are secure and encrypted</li>
          <li>• You can disconnect a service at any time</li>
          <li>• Syncing happens automatically in the background</li>
        </ul>
        <a
          href="https://docs.crate.audio/connections"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mt-2"
        >
          Learn more about connections
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
}

