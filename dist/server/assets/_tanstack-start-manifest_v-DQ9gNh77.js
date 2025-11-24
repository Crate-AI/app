const tsrStartManifest = () => ({
  routes: {
    __root__: {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/__root.tsx',
      children: [
        '/',
        '/analyze',
        '/waitlist',
        '/$username/collection',
        '/$username/playlists',
        '/$username/tracks',
        '/api/waitlist',
        '/$username/',
        '/api/ai/chat',
        '/api/auth/set-redirect',
        '/api/auth/user',
        '/api/music/favorites',
        '/api/music/playlists',
        '/api/music/tracks',
        '/api/auth/discogs/callback',
        '/api/auth/discogs/request-token',
        '/api/external/discogs/collection',
        '/api/external/discogs/search',
        '/api/external/youtube/$videoId',
        '/api/external/youtube/search',
        '/api/external/discogs/release/$id',
      ],
      preloads: ['/assets/main-rZFLPwin.js'],
      assets: [],
    },
    '/': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/index.tsx',
      assets: [],
      preloads: ['/assets/index-DDU9Ro8J.js'],
    },
    '/analyze': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/analyze.tsx',
      children: ['/analyze/chat'],
      assets: [],
      preloads: ['/assets/analyze-CWzh19lz.js'],
    },
    '/waitlist': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/waitlist.tsx',
      assets: [],
      preloads: [
        '/assets/waitlist-DEg3YAS8.js',
        '/assets/input-DLULWS28.js',
        '/assets/select-Bm5-cKGb.js',
      ],
    },
    '/$username/collection': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/$username/collection.tsx',
      assets: [],
      preloads: [
        '/assets/collection-BwBQwFRl.js',
        '/assets/input-DLULWS28.js',
        '/assets/list-plus-BFMKShGe.js',
        '/assets/Breadcrumbs-Bxhd9kp8.js',
      ],
    },
    '/$username/playlists': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/$username/playlists.tsx',
      assets: [],
      preloads: [
        '/assets/playlists-DBUlraRd.js',
        '/assets/index-yOxD40BC.js',
        '/assets/Breadcrumbs-Bxhd9kp8.js',
      ],
    },
    '/$username/tracks': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/$username/tracks.tsx',
      assets: [],
      preloads: [
        '/assets/tracks-BBFfOQaE.js',
        '/assets/input-DLULWS28.js',
        '/assets/select-Bm5-cKGb.js',
        '/assets/list-plus-BFMKShGe.js',
        '/assets/Breadcrumbs-Bxhd9kp8.js',
        '/assets/index-yOxD40BC.js',
      ],
    },
    '/analyze/chat': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/analyze.chat.tsx',
      assets: [],
      preloads: ['/assets/analyze.chat-90e-mb6k.js'],
    },
    '/api/waitlist': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/api/waitlist.ts',
    },
    '/$username/': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/$username/index.tsx',
      assets: [],
      preloads: ['/assets/index-AGPzw0mr.js'],
    },
    '/api/ai/chat': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/api/ai/chat.ts',
    },
    '/api/auth/set-redirect': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/auth/set-redirect.ts',
    },
    '/api/auth/user': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/api/auth/user.ts',
    },
    '/api/music/favorites': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/music/favorites.ts',
    },
    '/api/music/playlists': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/music/playlists.ts',
      children: ['/api/music/playlists/$playlistId'],
    },
    '/api/music/tracks': {
      filePath: '/Users/ahmedfelfel/projects/crate/app/app/api/music/tracks.ts',
      children: ['/api/music/tracks/$discogsReleaseId'],
    },
    '/api/auth/discogs/callback': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/auth/discogs/callback.ts',
    },
    '/api/auth/discogs/request-token': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/auth/discogs/request-token.ts',
    },
    '/api/external/discogs/collection': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/external/discogs/collection.ts',
    },
    '/api/external/discogs/search': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/external/discogs/search.ts',
    },
    '/api/external/youtube/$videoId': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/external/youtube/$videoId.ts',
    },
    '/api/external/youtube/search': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/external/youtube/search.ts',
    },
    '/api/music/playlists/$playlistId': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/music/playlists/$playlistId.ts',
      children: [
        '/api/music/playlists/$playlistId/external-tracks',
        '/api/music/playlists/$playlistId/tracks',
      ],
    },
    '/api/music/tracks/$discogsReleaseId': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/music/tracks/$discogsReleaseId.ts',
    },
    '/api/external/discogs/release/$id': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/external/discogs/release/$id.ts',
    },
    '/api/music/playlists/$playlistId/external-tracks': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/music/playlists/$playlistId.external-tracks.ts',
    },
    '/api/music/playlists/$playlistId/tracks': {
      filePath:
        '/Users/ahmedfelfel/projects/crate/app/app/api/music/playlists/$playlistId.tracks.ts',
    },
  },
  clientEntry: '/assets/main-rZFLPwin.js',
});
export { tsrStartManifest };
