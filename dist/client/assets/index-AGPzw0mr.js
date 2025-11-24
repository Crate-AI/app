import {
  c as k,
  e as D,
  b as S,
  j as e,
  L as v,
  r as g,
  f as P,
  g as G,
  M as A,
  H as u,
  C as j,
  h as p,
  a as b,
  i as T,
  k as L,
  l as C,
  m as F,
  B as h,
  P as R,
  n as M,
  I as B,
  o as H,
  p as Q,
  q as U,
  s as _,
  t as c,
} from './main-rZFLPwin.js';
const $ = k('Headphones', [
  [
    'path',
    {
      d: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
      key: '1xhozi',
    },
  ],
]);
const X = k('TrendingUp', [
    ['polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17', key: '126l90' }],
    ['polyline', { points: '16 7 22 7 22 13', key: 'kwv8wd' }],
  ]),
  Y = ({ tracks: a }) => {
    const i = {
        totalTracks: a.length,
        totalGenres: new Set(a.flatMap((s) => s.genres || [])).size,
        avgBpm:
          a.filter((s) => s.bpm).length > 0
            ? Math.round(
                a.filter((s) => s.bpm).reduce((s, o) => s + (o.bpm || 0), 0) /
                  a.filter((s) => s.bpm).length,
              )
            : 0,
        totalArtists: new Set(a.map((s) => s.artist)).size,
      },
      l = [
        {
          label: 'Total Tracks',
          value: i.totalTracks,
          icon: A,
          color: 'bg-main border-2 border-gray-800',
        },
        {
          label: 'Artists',
          value: i.totalArtists,
          icon: $,
          color: 'bg-main border-2 border-gray-800',
        },
        {
          label: 'Genres',
          value: i.totalGenres,
          icon: u,
          color: 'bg-main border-2 border-gray-800',
        },
      ];
    return e.jsx('div', {
      className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-8',
      children: l.map((s) =>
        e.jsx(
          j,
          {
            variant: 'elevated',
            children: e.jsx(p, {
              className: 'p-4',
              children: e.jsxs('div', {
                className: 'flex items-center space-x-3',
                children: [
                  e.jsx('div', {
                    className: b(
                      'p-2 rounded-base flex items-center justify-center',
                      s.color,
                    ),
                    children: e.jsx(s.icon, {
                      className: 'w-5 h-5 text-black',
                    }),
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('p', {
                        className: 'text-2xl font-semibold text-text',
                        children: s.value,
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-gray-600',
                        children: s.label,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          },
          s.label,
        ),
      ),
    });
  },
  q = ({ allTracks: a }) => {
    const {
        togglePlayPause: i,
        playingTrackId: l,
        isPlaying: s,
        setQueue: o,
        isReady: d,
        initializePlayer: t,
      } = T(),
      {
        getFavoriteTracksFromAllTracks: x,
        toggleFavorite: m,
        isFavorite: E,
        isLoading: I,
        loadFavorites: y,
      } = L(),
      N = x(a).slice(0, 6);
    g.useEffect(() => {
      (t(), y());
    }, [t, y]);
    const w = (r) => {
        if (!r.youtube_video_id) {
          c.error('No audio available for this track');
          return;
        }
        if (!d) {
          c.error('Player is still loading...');
          return;
        }
        try {
          const n = a.findIndex((f) => f.id === r.id);
          (o(a, n), i(r));
        } catch (n) {
          (console.error('Error playing track:', n),
            c.error('Failed to play track'));
        }
      },
      z = async (r) => {
        const n = E(r);
        try {
          (await m(r),
            n
              ? c.success('Removed from favorites')
              : c.success('Added to favorites'));
        } catch (f) {
          (console.error('Error toggling favorite:', f),
            c.error('Failed to update favorites'));
        }
      };
    return e.jsxs(j, {
      variant: 'elevated',
      children: [
        e.jsx(C, {
          className: 'border-b-2 border-gray-800 bg-bg',
          children: e.jsxs(F, {
            className: 'flex items-center space-x-2',
            children: [
              e.jsx(u, { className: 'w-5 h-5' }),
              e.jsx('span', { children: 'Favourite list' }),
            ],
          }),
        }),
        e.jsxs(p, {
          className: 'p-4',
          children: [
            e.jsx('div', {
              className: 'space-y-3',
              children: I
                ? e.jsxs('div', {
                    className: 'text-center text-gray-500 py-8',
                    children: [
                      e.jsx('div', {
                        className:
                          'animate-spin w-8 h-8 border-2 border-mainAccent border-t-transparent rounded-full mx-auto mb-2',
                      }),
                      e.jsx('p', { children: 'Loading favorites...' }),
                    ],
                  })
                : N.length === 0
                  ? e.jsxs('div', {
                      className: 'text-center text-gray-500 py-8',
                      children: [
                        e.jsx(u, {
                          className: 'w-8 h-8 mx-auto mb-2 text-gray-400',
                        }),
                        e.jsx('p', { children: 'No favorite tracks yet' }),
                        e.jsx('p', {
                          className: 'text-sm',
                          children:
                            'Use the heart icon in the player to add favorites',
                        }),
                      ],
                    })
                  : N.map((r) =>
                      e.jsxs(
                        'div',
                        {
                          className:
                            'flex items-center space-x-3 p-3 rounded-base hover:bg-mainAccent/10 transition-colors group cursor-pointer active:bg-mainAccent/20 active:scale-[0.98]',
                          onClick: () => w(r),
                          children: [
                            e.jsx(h, {
                              variant: 'ghost',
                              size: 'sm',
                              onClick: (n) => {
                                (n.stopPropagation(), w(r));
                              },
                              disabled: !r.youtube_video_id || !d,
                              className: b(
                                'h-8 w-8 p-0 border border-gray-800 rounded-base',
                                l === r.id && s
                                  ? 'bg-main/20 hover:bg-main/30'
                                  : 'bg-main hover:bg-mainAccent',
                              ),
                              children:
                                l === r.id && s
                                  ? e.jsxs(e.Fragment, {
                                      children: [
                                        e.jsx(R, {
                                          className: 'w-4 h-4 text-black',
                                        }),
                                        e.jsx('span', {
                                          className:
                                            'absolute inset-0 rounded-full animate-pulse-light bg-main/30',
                                        }),
                                      ],
                                    })
                                  : e.jsx(M, {
                                      className: 'w-4 h-4 text-black',
                                    }),
                            }),
                            r.artwork
                              ? e.jsx(B, {
                                  src: r.artwork,
                                  alt: r.title,
                                  width: 40,
                                  height: 40,
                                  className:
                                    'w-10 h-10 rounded-base object-cover',
                                })
                              : e.jsx('div', {
                                  className:
                                    'w-10 h-10 bg-mainAccent border-2 border-gray-800 rounded-base flex items-center justify-center',
                                  children: e.jsx(A, {
                                    className: 'w-5 h-5 text-black',
                                  }),
                                }),
                            e.jsxs('div', {
                              className: 'flex-1 min-w-0',
                              children: [
                                e.jsx('div', {
                                  className:
                                    'font-medium text-sm truncate text-text',
                                  children: r.title,
                                }),
                                e.jsx('div', {
                                  className: 'text-xs text-gray-600 truncate',
                                  children: r.artist,
                                }),
                              ],
                            }),
                            e.jsx(h, {
                              variant: 'ghost',
                              size: 'sm',
                              onClick: (n) => {
                                (n.stopPropagation(), z(r.id));
                              },
                              className:
                                'h-8 w-8 p-0 bg-red-100 hover:bg-red-200 text-red-600 border border-gray-800 rounded-base',
                              children: e.jsx(u, {
                                className: 'w-4 h-4 fill-current',
                              }),
                            }),
                          ],
                        },
                        r.id,
                      ),
                    ),
            }),
            e.jsx('div', {
              className: 'mt-4 pt-4 border-t-2 border-gray-800',
              children: e.jsx(H, {
                to: '/$username/tracks',
                params: { username: S.getState().userIdentity?.username || '' },
                children: e.jsx(h, {
                  variant: 'outline',
                  className: 'w-full',
                  children: 'View All Tracks',
                }),
              }),
            }),
          ],
        }),
      ],
    });
  },
  O = ({ username: a }) => {
    const i = [
        {
          title: 'Explore Collection',
          description: 'Browse your Discogs collection',
          icon: Q,
          href: `/${a}/collection`,
          color: 'bg-main border-2 border-gray-800',
        },
        {
          title: 'Create Playlist',
          description: 'Organize your favorite tracks',
          icon: U,
          href: `/${a}/playlists`,
          color: 'bg-main border-2 border-gray-800',
        },
        {
          title: 'Shuffle Play',
          description: 'Start a random mix',
          icon: _,
          href: '#',
          color: 'bg-main border-2 border-gray-800',
          action: 'shuffle',
        },
      ],
      { toggleShuffle: l, setQueue: s } = T(),
      { allTracks: o } = P(),
      d = (t) => {
        t === 'shuffle' &&
          (o.length > 0
            ? (s(o, 0),
              l(),
              c.success('Shuffle mode enabled! Playing your collection.'))
            : c.error('No tracks available to shuffle'));
      };
    return e.jsxs(j, {
      variant: 'elevated',
      children: [
        e.jsx(C, {
          className: 'border-b-2 border-gray-800 bg-bg',
          children: e.jsxs(F, {
            className: 'flex items-center space-x-2',
            children: [
              e.jsx(X, { className: 'w-5 h-5' }),
              e.jsx('span', { children: 'Quick Actions' }),
            ],
          }),
        }),
        e.jsx(p, {
          className: 'p-4',
          children: e.jsx('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
            children: i.map((t) =>
              e.jsx(
                'div',
                {
                  children:
                    t.href === '#'
                      ? e.jsx(h, {
                          variant: 'ghost',
                          onClick: () => d(t.action),
                          className:
                            'h-auto p-4 text-left justify-start bg-white hover:bg-mainAccent/10 border-2 border-gray-800 rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full active:bg-mainAccent/20 active:scale-[0.98]',
                          children: e.jsxs('div', {
                            className: 'flex items-center space-x-3',
                            children: [
                              e.jsx('div', {
                                className: b(
                                  'p-2 rounded-base text-black flex items-center justify-center',
                                  t.color,
                                ),
                                children: e.jsx(t.icon, {
                                  className: 'w-5 h-5',
                                }),
                              }),
                              e.jsxs('div', {
                                children: [
                                  e.jsx('div', {
                                    className: 'font-medium text-sm',
                                    children: t.title,
                                  }),
                                  e.jsx('div', {
                                    className: 'text-xs text-gray-600',
                                    children: t.description,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        })
                      : e.jsx(H, {
                          to: t.href,
                          children: e.jsx(h, {
                            variant: 'ghost',
                            className:
                              'h-auto p-4 text-left justify-start bg-white hover:bg-mainAccent/10 border-2 border-gray-800 rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full active:bg-mainAccent/20 active:scale-[0.98]',
                            children: e.jsxs('div', {
                              className: 'flex items-center space-x-3',
                              children: [
                                e.jsx('div', {
                                  className: b(
                                    'p-2 rounded-base text-black flex items-center justify-center',
                                    t.color,
                                  ),
                                  children: e.jsx(t.icon, {
                                    className: 'w-5 h-5',
                                  }),
                                }),
                                e.jsxs('div', {
                                  children: [
                                    e.jsx('div', {
                                      className: 'font-medium text-sm',
                                      children: t.title,
                                    }),
                                    e.jsx('div', {
                                      className: 'text-xs text-gray-600',
                                      children: t.description,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                },
                t.title,
              ),
            ),
          }),
        }),
      ],
    });
  },
  V = ({ username: a }) => {
    const i = new Date().getHours(),
      l = () =>
        i < 12 ? 'Good morning' : i < 17 ? 'Good afternoon' : 'Good evening';
    return e.jsxs('div', {
      className: 'mb-8',
      children: [
        e.jsxs('h1', {
          className: 'text-3xl font-semibold text-text mb-2',
          children: [l(), ', ', a, '!'],
        }),
        e.jsx('p', {
          className: 'text-gray-600',
          children:
            "Ready to explore your music collection? Here's what's happening with your tracks.",
        }),
      ],
    });
  },
  W = ({ username: a }) => {
    const { allTracks: i, setAllTracks: l } = P(),
      { fetchPlaylists: s } = G(),
      [o, d] = g.useState(!0);
    return (
      g.useEffect(() => {
        (async () => {
          try {
            const x = await fetch('/api/music/tracks', {
              credentials: 'include',
            });
            if (x.ok) {
              const m = await x.json();
              m.tracks && l(m.tracks);
            }
            await s();
          } catch (x) {
            console.error('Error fetching dashboard data:', x);
          } finally {
            d(!1);
          }
        })();
      }, [l, s]),
      o
        ? e.jsx('div', {
            className: 'flex items-center justify-center min-h-[400px]',
            children: e.jsx(v, {}),
          })
        : e.jsxs('div', {
            className: 'space-y-8',
            children: [
              e.jsx(V, { username: a }),
              e.jsx(Y, { tracks: i }),
              e.jsxs('div', {
                className: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
                children: [
                  e.jsx(q, { allTracks: i }),
                  e.jsx(O, { username: a }),
                ],
              }),
            ],
          })
    );
  };
function K() {
  const { username: a } = D.useParams(),
    { userIdentity: i } = S();
  return i
    ? e.jsx('main', {
        className: 'container mx-auto px-4 py-8',
        children: e.jsx(g.Suspense, {
          fallback: e.jsx(v, {}),
          children: e.jsx(W, { username: a }),
        }),
      })
    : e.jsx('div', {
        className: 'flex items-center justify-center min-h-[400px]',
        children: e.jsx(v, {}),
      });
}
export { K as component };
