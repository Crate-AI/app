import {
  r as i,
  j as e,
  B as d,
  d as m,
  b as x,
  u as h,
  L as n,
} from './main-rZFLPwin.js';
const o = ({}) => {
    const [s, r] = i.useState(!1),
      a = async () => {
        r(!0);
        try {
          const t = window.location.pathname;
          t !== '/' &&
            (await fetch('/api/auth/set-redirect', {
              method: 'POST',
              body: JSON.stringify({ redirectUrl: t }),
            }));
          const c = await fetch('/api/auth/discogs/request-token');
          if (!c.ok) throw new Error('Failed to get authorization URL');
          const { authUrl: l } = await c.json();
          window.location.href = l;
        } catch (t) {
          throw (
            console.error('Authentication error:', t),
            r(!1),
            t instanceof Error ? t.message : 'Failed to start authentication'
          );
        }
      };
    return e.jsxs(d, {
      onClick: a,
      disabled: s,
      className: 'w-full sm:w-auto flex items-center gap-2',
      children: [
        s && e.jsx(m, { className: 'h-4 w-4 animate-spin' }),
        s ? 'Connecting to Discogs...' : 'Sign In with Discogs',
      ],
    });
  },
  u = ({}) => {
    const { userIdentity: s, isLoading: r } = x(),
      a = h();
    return (
      i.useEffect(() => {
        s?.username && a({ to: `/${s.username}`, replace: !0 });
      }, [s, a]),
      r
        ? e.jsx('div', {
            className: 'flex items-center justify-center min-h-screen',
            children: e.jsx(n, {}),
          })
        : s?.username
          ? e.jsx('div', {
              className: 'flex items-center justify-center min-h-screen',
              children: e.jsx(n, {}),
            })
          : e.jsxs('div', {
              className: 'min-h-screen flex flex-col',
              children: [
                e.jsxs('header', {
                  className:
                    'bg-transparent text-black p-6 flex justify-between items-center',
                  children: [
                    e.jsx('div', {
                      className: 'flex items-center',
                      children: e.jsx('img', {
                        src: '/logo.svg',
                        alt: 'Crate Logo',
                        width: 64,
                        height: 64,
                        className: 'w-16 h-16',
                      }),
                    }),
                    e.jsx('div', {
                      className: 'flex items-center space-x-4',
                      children: e.jsx(o, {}),
                    }),
                  ],
                }),
                e.jsx('div', {
                  className:
                    'flex-1 flex flex-col items-center justify-center px-4',
                  children: e.jsxs('div', {
                    className: 'max-w-2xl text-center',
                    children: [
                      e.jsx('h1', {
                        className:
                          'text-4xl font-bold tracking-tight sm:text-6xl mb-6',
                        children: 'Discover, Curate, Share Your Music',
                      }),
                      e.jsx('p', {
                        className:
                          'text-lg leading-8 text-muted-foreground mb-8',
                        children:
                          'Connect your Discogs and Spotify collections. Create playlists and share them with the world.',
                      }),
                      e.jsx('p', {
                        className: 'text-base text-muted-foreground mb-8',
                        children:
                          'Sync your libraries in one place. Browse, search, and organize your music effortlessly.',
                      }),
                      e.jsxs('div', {
                        className:
                          'grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left',
                        children: [
                          e.jsxs('div', {
                            className: 'p-4 rounded-lg border bg-card',
                            children: [
                              e.jsx('h3', {
                                className: 'font-semibold mb-2',
                                children: '🎵 Collection Management',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-muted-foreground',
                                children:
                                  'Sync your Discogs and Spotify libraries in one place. Browse, search, and organize your music.',
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'p-4 rounded-lg border bg-card',
                            children: [
                              e.jsx('h3', {
                                className: 'font-semibold mb-2',
                                children: '🎧 Smart Playlists',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-muted-foreground',
                                children:
                                  'Create custom playlists from your collection. Add favorites and organize tracks your way.',
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'p-4 rounded-lg border bg-card',
                            children: [
                              e.jsx('h3', {
                                className: 'font-semibold mb-2',
                                children: '🌍 Share & Discover',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-muted-foreground',
                                children:
                                  'Make your playlists public and share them with friends. Discover what others are listening to.',
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'flex flex-col items-center space-y-4',
                        children: [
                          e.jsx(o, {}),
                          e.jsx('p', {
                            className: 'text-sm text-muted-foreground',
                            children:
                              'Sign in with your Discogs account to get started',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            })
    );
  };
function g() {
  return e.jsx('main', {
    className: 'min-h-screen',
    children: e.jsx(i.Suspense, {
      fallback: e.jsx(n, {}),
      children: e.jsx(u, {}),
    }),
  });
}
export { g as component };
