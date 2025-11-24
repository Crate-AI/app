import {
  c as b,
  r as d,
  j as e,
  B as y,
  ai as G,
  p as S,
  L as Q,
  aj as H,
  P as v,
  n as N,
  i as T,
  g as C,
  d as _,
  a5 as E,
  a6 as L,
  a7 as I,
  a8 as k,
  q as D,
  H as z,
  ak as F,
  al as U,
  am as w,
  t as f,
  a9 as O,
} from './main-rZFLPwin.js';
import { I as Y, a as J, C as V } from './input-DLULWS28.js';
import { L as A } from './list-plus-BFMKShGe.js';
import { P as W } from './Breadcrumbs-Bxhd9kp8.js';
const K = b('Disc', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['circle', { cx: '12', cy: '12', r: '2', key: '1c9p78' }],
]);
const M = b('Ellipsis', [
  ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
  ['circle', { cx: '19', cy: '12', r: '1', key: '1wjl8i' }],
  ['circle', { cx: '5', cy: '12', r: '1', key: '1pcz8c' }],
]);
const X = b('Filter', [
  [
    'polygon',
    { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3', key: '1yg77f' },
  ],
]);
const Z = b('Grid3x3', [
    [
      'rect',
      { width: '18', height: '18', x: '3', y: '3', rx: '2', key: 'afitv7' },
    ],
    ['path', { d: 'M3 9h18', key: '1pudct' }],
    ['path', { d: 'M3 15h18', key: '5xshup' }],
    ['path', { d: 'M9 3v18', key: 'fh3hqa' }],
    ['path', { d: 'M15 3v18', key: '14nvp0' }],
  ]),
  ee = (s, a) => {
    const [i, o] = d.useState(s);
    return (
      d.useEffect(() => {
        const t = setTimeout(() => {
          o(s);
        }, a);
        return () => {
          clearTimeout(t);
        };
      }, [s, a]),
      i
    );
  },
  se = 3,
  te = () => {
    const [s, a] = d.useState(''),
      [i, o] = d.useState([]),
      [t, n] = d.useState(!1),
      [u, l] = d.useState(null),
      m = ee(s, 300),
      g = m.length >= se;
    return (
      d.useEffect(() => {
        (async () => {
          if (!g) {
            (o([]), l(null));
            return;
          }
          (n(!0), l(null));
          try {
            const r = await fetch('/api/external/discogs/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: m }),
            });
            if (!r.ok) throw new Error('Search request failed');
            const c = await r.json();
            o(c.results);
          } catch (r) {
            (l(
              r instanceof Error
                ? r.message
                : 'An error occurred during search',
            ),
              o([]));
          } finally {
            n(!1);
          }
        })();
      }, [m, g]),
      {
        query: s,
        setQuery: a,
        results: i,
        isLoading: t,
        error: u,
        isQueryValid: g,
      }
    );
  };
function ae() {
  const [s, a] = d.useState({ collection: [] }),
    [i, o] = d.useState(!1),
    [t, n] = d.useState(null),
    u = async () => {
      try {
        (o(!0), n(null));
        const l = await fetch('/api/external/discogs/collection');
        if (!l.ok) throw new Error('Failed to fetch collection');
        const m = await l.json();
        a({ collection: m.releases, pagination: m.pagination });
      } catch (l) {
        n(l instanceof Error ? l.message : 'An error occurred');
      } finally {
        o(!1);
      }
    };
  return (
    d.useEffect(() => {
      u();
    }, []),
    {
      collection: s.collection,
      pagination: s.pagination,
      loading: i,
      error: t,
      refetch: u,
    }
  );
}
const re = ({ viewMode: s, onViewModeChange: a }) =>
    e.jsxs('div', {
      className: 'flex justify-between items-center mb-4',
      children: [
        e.jsxs('div', {
          className: 'flex gap-2',
          children: [
            e.jsxs(y, {
              variant: s === 'list' ? 'default' : 'noShadow',
              onClick: () => a('list'),
              children: [e.jsx(G, { className: 'w-4 h-4 mr-2' }), 'List'],
            }),
            e.jsxs(y, {
              variant: s === 'grid' ? 'default' : 'noShadow',
              onClick: () => a('grid'),
              children: [e.jsx(Z, { className: 'w-4 h-4 mr-2' }), 'Grid'],
            }),
          ],
        }),
        e.jsx(y, {
          variant: 'noShadow',
          size: 'icon',
          children: e.jsx(X, { className: 'w-4 h-4' }),
        }),
      ],
    }),
  ie = ({ view: s, onViewChange: a, collectionCount: i }) => {
    const o = (t) => `
    px-4 py-2 rounded transition-colors flex items-center gap-2
    ${s === t ? 'bg-main text-black' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}
  `;
    return e.jsxs('div', {
      className: 'flex gap-4',
      children: [
        e.jsxs(y, {
          onClick: () => a('search'),
          className: o('search'),
          children: [e.jsx(S, { size: 18 }), 'Search'],
        }),
        e.jsxs(y, {
          onClick: () => a('collection'),
          className: o('collection'),
          children: [e.jsx(K, { size: 18 }), 'Collection ', i ? `(${i})` : ''],
        }),
      ],
    });
  },
  ne = ({ query: s, isLoading: a, onQueryChange: i }) =>
    e.jsxs('div', {
      className: 'flex gap-3 mb-6',
      children: [
        e.jsx(Y, {
          type: 'text',
          placeholder: 'Search vinyl records...',
          value: s,
          onChange: (o) => i(o.target.value),
          className: 'flex-1',
        }),
        e.jsxs(y, {
          type: 'button',
          disabled: a,
          variant: 'default',
          children: [
            a
              ? e.jsx(Q, { className: 'w-4 h-4' })
              : e.jsx(S, { className: 'w-4 h-4' }),
            e.jsx('span', { className: 'ml-2', children: 'Search' }),
          ],
        }),
      ],
    }),
  oe = ({ track: s, isPlaying: a, onPlayToggle: i, isPlayerReady: o }) =>
    e.jsxs(
      'div',
      {
        className:
          'grid grid-cols-[auto_1fr_auto] gap-4 p-3 border-2 border-border dark:border-darkBorder rounded-base group items-center hover:bg-border/10',
        children: [
          e.jsx('div', {
            className: 'w-8 flex items-center justify-center',
            children: e.jsx(y, {
              variant: 'noShadow',
              size: 'icon',
              className: 'w-8 h-8',
              onClick: i,
              disabled: !s.youtube_video_id || !o,
              children: a
                ? e.jsx(v, { className: 'w-4 h-4' })
                : e.jsx(N, { className: 'w-4 h-4' }),
            }),
          }),
          e.jsxs('div', {
            children: [
              e.jsx('div', {
                className: 'font-medium text-text dark:text-darkText',
                children: s.title,
              }),
              s.extra_artists &&
                e.jsx('div', {
                  className: 'text-sm text-text/60 dark:text-darkText/60',
                  children: s.extra_artists,
                }),
            ],
          }),
          e.jsx('div', {
            className: 'text-text/60 dark:text-darkText/60',
            children: s.duration,
          }),
        ],
      },
      s.position,
    );
function ce({
  tracks: s,
  playingTrackId: a,
  onPlayToggle: i,
  isPlayerReady: o,
}) {
  return e.jsxs('div', {
    className: 'space-y-2',
    children: [
      e.jsxs('div', {
        className:
          'grid grid-cols-[auto_1fr_auto] gap-4 p-2 text-sm text-text/60 dark:text-darkText/60',
        children: [
          e.jsx('div', { className: 'w-8', children: '#' }),
          e.jsx('div', { children: 'TITLE' }),
          e.jsxs('div', {
            className: 'flex items-center gap-1',
            children: [
              e.jsx(H, { className: 'w-4 h-4' }),
              e.jsx('span', { children: 'TIME' }),
            ],
          }),
        ],
      }),
      s.map((t) =>
        e.jsx(
          oe,
          {
            track: t,
            isPlaying: a === t.position,
            onPlayToggle: () => i(t),
            isPlayerReady: o,
          },
          t.position,
        ),
      ),
    ],
  });
}
const B = ({ releaseId: s }) => {
    const [a, i] = d.useState([]),
      [o, t] = d.useState(!1),
      [n, u] = d.useState(null),
      {
        player: l,
        isReady: m,
        playingTrackId: g,
        setPlayingTrackId: p,
        initializePlayer: r,
      } = T();
    d.useEffect(() => {
      r();
    }, [r]);
    const c = async (x) => {
      if (!x.youtube_video_id || !l || !m) {
        const h = x.youtube_video_id
          ? l
            ? 'Player not ready'
            : 'YouTube player not initialized'
          : 'No video ID available';
        u({
          message: 'Cannot play track',
          details: h,
          trackPosition: x.position,
        });
        return;
      }
      try {
        g === x.position
          ? (l.pauseVideo(), p(null))
          : (g && l.stopVideo(),
            l.loadVideoById({
              videoId: x.youtube_video_id,
              suggestedQuality: 'small',
            }),
            l.playVideo(),
            p(x.position));
      } catch (h) {
        u({
          message: 'Failed to play track',
          details: h instanceof Error ? h.message : 'Unknown error',
          trackPosition: x.position,
        });
      }
    };
    return (
      d.useEffect(() => {
        (async () => {
          (t(!0), u(null));
          try {
            const h = await fetch(`/api/music/tracks/${s}`);
            if (!h.ok) throw new Error('Failed to fetch release');
            const j = await h.json();
            i(j);
          } catch (h) {
            u({
              message: h instanceof Error ? h.message : 'Failed to load tracks',
            });
          } finally {
            t(!1);
          }
        })();
      }, [s]),
      o
        ? e.jsx('div', {
            className: 'animate-pulse space-y-2',
            children: Array.from({ length: 4 }).map((x, h) =>
              e.jsx('div', { className: 'h-16 bg-border/10 rounded-base' }, h),
            ),
          })
        : n
          ? e.jsxs('div', {
              className: 'text-red-500 dark:text-red-400 p-4 text-center',
              children: [
                e.jsx('p', { className: 'font-semibold', children: n.message }),
                n.details &&
                  e.jsxs('p', {
                    className: 'text-sm mt-1 text-red-400 dark:text-red-300',
                    children: [
                      n.details,
                      n.trackPosition && ` (Track ${n.trackPosition})`,
                    ],
                  }),
              ],
            })
          : e.jsx(e.Fragment, {
              children: e.jsx(ce, {
                tracks: a,
                playingTrackId: g,
                onPlayToggle: c,
                isPlayerReady: m,
              }),
            })
    );
  },
  le = () => {
    const {
        result: s,
        isPlaying: a,
        isLoading: i,
        onPlayToggle: o,
        dateAdded: t,
      } = $(),
      [n, u] = d.useState(!1),
      { playlists: l, addExternalTrackToPlaylist: m, fetchPlaylists: g } = C();
    d.useEffect(() => {
      g();
    }, [g]);
    const p = async (r) => {
      if (s)
        try {
          const c = F(s);
          await m(r, c);
        } catch (c) {
          console.error('Error adding to playlist:', c);
        }
    };
    return s
      ? e.jsxs('div', {
          className: 'space-y-2',
          children: [
            e.jsxs('div', {
              className:
                'grid grid-cols-[auto_1fr_auto] gap-4 p-3 border-2 border-border dark:border-darkBorder rounded-base group items-center',
              children: [
                e.jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    e.jsxs('div', {
                      className: 'relative',
                      children: [
                        e.jsx('img', {
                          src: s.thumb || '/api/placeholder/50/50',
                          alt: s.title,
                          className: 'w-12 h-12 rounded-base object-cover',
                        }),
                        e.jsx('button', {
                          onClick: o,
                          disabled: i,
                          className:
                            'absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-base disabled:opacity-100',
                          children: i
                            ? e.jsx(_, {
                                className: 'w-5 h-5 text-white animate-spin',
                              })
                            : a
                              ? e.jsx(v, { className: 'w-5 h-5 text-white' })
                              : e.jsx(N, { className: 'w-5 h-5 text-white' }),
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      children: [
                        e.jsx('div', {
                          className: 'font-medium text-text dark:text-darkText',
                          children: s.title,
                        }),
                        e.jsxs('div', {
                          className:
                            'text-sm text-text/60 dark:text-darkText/60',
                          children: [s.year, ' · ', s.country || 'Unknown'],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'text-sm text-text/60 dark:text-darkText/60',
                  children: [
                    e.jsx('div', {
                      children: s.genre?.join(', ') || 'No Genre',
                    }),
                    e.jsx('div', {
                      children: s.style?.join(', ') || 'No Style',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    e.jsx(y, {
                      variant: 'noShadow',
                      size: 'icon',
                      onClick: () => u(!n),
                      children: n
                        ? e.jsx(J, { className: 'w-4 h-4' })
                        : e.jsx(V, { className: 'w-4 h-4' }),
                    }),
                    e.jsxs(E, {
                      children: [
                        e.jsx(L, {
                          asChild: !0,
                          children: e.jsx(y, {
                            variant: 'noShadow',
                            size: 'icon',
                            title: 'Add to Playlist',
                            children: e.jsx(A, { className: 'w-4 h-4' }),
                          }),
                        }),
                        e.jsx(I, {
                          align: 'end',
                          children:
                            l && l.length > 0
                              ? l.map((r) =>
                                  e.jsxs(
                                    k,
                                    {
                                      onClick: () => p(r.id),
                                      children: [
                                        e.jsx(D, { className: 'mr-2 h-4 w-4' }),
                                        r.title,
                                      ],
                                    },
                                    r.id,
                                  ),
                                )
                              : e.jsx(k, {
                                  disabled: !0,
                                  children: 'No playlists found',
                                }),
                        }),
                      ],
                    }),
                    e.jsx(y, {
                      variant: 'noShadow',
                      size: 'icon',
                      children: e.jsx(z, { className: 'w-4 h-4' }),
                    }),
                    e.jsx(y, {
                      variant: 'noShadow',
                      size: 'icon',
                      children: e.jsx(M, { className: 'w-4 h-4' }),
                    }),
                  ],
                }),
              ],
            }),
            n &&
              e.jsx('div', {
                className: 'ml-16',
                children: e.jsx(B, { releaseId: s.id }),
              }),
          ],
        })
      : null;
  },
  de = () => {
    const {
        result: s,
        isPlaying: a,
        isLoading: i,
        onPlayToggle: o,
        dateAdded: t,
      } = $(),
      [n, u] = d.useState(!1),
      { playlists: l, addExternalTrackToPlaylist: m, fetchPlaylists: g } = C();
    d.useEffect(() => {
      g();
    }, [g]);
    const p = async (r) => {
      if (s)
        try {
          const c = F(s);
          await m(r, c);
        } catch (c) {
          console.error('Error adding to playlist:', c);
        }
    };
    return s
      ? e.jsxs('div', {
          className:
            'relative border-2 border-border dark:border-darkBorder rounded-base p-3',
          children: [
            n &&
              e.jsx('div', {
                className:
                  'absolute inset-0 z-10 bg-background/95 dark:bg-darkBg/95 backdrop-blur-sm rounded-base overflow-y-auto',
                children: e.jsxs('div', {
                  className: 'p-4',
                  children: [
                    e.jsxs('div', {
                      className: 'flex justify-between items-center mb-4',
                      children: [
                        e.jsx('h3', {
                          className: 'font-medium text-text dark:text-darkText',
                          children: s.title,
                        }),
                        e.jsx(y, {
                          variant: 'noShadow',
                          size: 'icon',
                          onClick: () => u(!1),
                          children: e.jsx(V, { className: 'w-4 h-4' }),
                        }),
                      ],
                    }),
                    e.jsx(B, { releaseId: s.id }),
                  ],
                }),
              }),
            e.jsxs('div', {
              className: 'relative group mb-3',
              children: [
                e.jsx('img', {
                  src: s.cover_image || '/api/placeholder/300/300',
                  alt: s.title,
                  className: 'w-full aspect-square object-cover rounded-base',
                }),
                e.jsx('div', {
                  className:
                    'absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-base',
                  children: e.jsxs('div', {
                    className: 'flex gap-2',
                    children: [
                      e.jsx('button', {
                        onClick: o,
                        disabled: i,
                        className:
                          'p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors disabled:opacity-80',
                        children: i
                          ? e.jsx(_, {
                              className: 'w-8 h-8 text-white animate-spin',
                            })
                          : a
                            ? e.jsx(v, { className: 'w-8 h-8 text-white' })
                            : e.jsx(N, { className: 'w-8 h-8 text-white' }),
                      }),
                      e.jsx('button', {
                        onClick: () => u(!0),
                        className:
                          'p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors',
                        children: e.jsx(U, { className: 'w-8 h-8 text-white' }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'flex justify-between items-start',
              children: [
                e.jsxs('div', {
                  children: [
                    e.jsx('h3', {
                      className:
                        'font-medium text-text dark:text-darkText mb-1',
                      children: s.title,
                    }),
                    e.jsxs('div', {
                      className:
                        'text-sm text-text/60 dark:text-darkText/60 mb-2',
                      children: [s.year, ' · ', s.country || 'Unknown'],
                    }),
                    e.jsx('div', {
                      className: 'text-sm text-text/60 dark:text-darkText/60',
                      children: s.genre?.join(', ') || 'No Genre',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex gap-2',
                  children: [
                    e.jsxs(E, {
                      children: [
                        e.jsx(L, {
                          asChild: !0,
                          children: e.jsx(y, {
                            variant: 'noShadow',
                            size: 'icon',
                            title: 'Add to Playlist',
                            children: e.jsx(A, { className: 'w-4 h-4' }),
                          }),
                        }),
                        e.jsx(I, {
                          align: 'end',
                          children:
                            l && l.length > 0
                              ? l.map((r) =>
                                  e.jsxs(
                                    k,
                                    {
                                      onClick: () => p(r.id),
                                      children: [
                                        e.jsx(D, { className: 'mr-2 h-4 w-4' }),
                                        r.title,
                                      ],
                                    },
                                    r.id,
                                  ),
                                )
                              : e.jsx(k, {
                                  disabled: !0,
                                  children: 'No playlists found',
                                }),
                        }),
                      ],
                    }),
                    e.jsx(y, {
                      variant: 'noShadow',
                      size: 'icon',
                      children: e.jsx(z, { className: 'w-4 h-4' }),
                    }),
                    e.jsx(y, {
                      variant: 'noShadow',
                      size: 'icon',
                      children: e.jsx(M, { className: 'w-4 h-4' }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : null;
  },
  R = d.createContext(null),
  $ = () => {
    const s = d.useContext(R);
    if (!s)
      throw new Error(
        'useTrackContext must be used within a TrackContextProvider',
      );
    return s;
  },
  ue = ({
    result: s,
    isPlaying: a,
    isLoading: i,
    onPlayToggle: o,
    viewMode: t,
    dateAdded: n,
  }) =>
    s
      ? e.jsx(R.Provider, {
          value: {
            result: s,
            isPlaying: a,
            isLoading: i,
            onPlayToggle: o,
            dateAdded: n,
          },
          children: t === 'list' ? e.jsx(le, {}) : e.jsx(de, {}),
        })
      : null,
  q = ({ viewMode: s, items: a }) => {
    const {
        playingTrackId: i,
        isPlaying: o,
        togglePlayPause: t,
        isReady: n,
        setQueue: u,
      } = T(),
      [l, m] = d.useState(null),
      g = async (r) => {
        try {
          const c = r.title.split(' - '),
            x = c.length > 1 ? c[0] : '',
            h = c.length > 1 ? c.slice(1).join(' - ') : r.title,
            j = `${x} ${h}`.trim(),
            P = await fetch(
              `/api/external/youtube/search?q=${encodeURIComponent(j)}`,
            );
          if (!P.ok) throw new Error('YouTube search failed');
          return (await P.json()).videoId || null;
        } catch (c) {
          return (console.error('YouTube search error:', c), null);
        }
      },
      p = async (r) => {
        if (!n) {
          f.error('Player is still loading...');
          return;
        }
        try {
          const c = w(r);
          if ((m(c.id), !c.youtube_video_id)) {
            f.loading('Finding audio for this track...', {
              id: 'youtube-search',
            });
            const j = await g(r);
            if (!j) {
              (f.error('No audio found for this track', {
                id: 'youtube-search',
              }),
                m(null));
              return;
            }
            ((c.youtube_video_id = j),
              f.success('Audio found! Starting playback...', {
                id: 'youtube-search',
              }));
          }
          const x = a.map((j) => w(j)),
            h = x.findIndex((j) => j.id === c.id);
          (h !== -1 && (x[h] = c), u(x, h), t(c));
        } catch (c) {
          (console.error('Error playing track:', c),
            f.error('Failed to play track'));
        } finally {
          m(null);
        }
      };
    return e.jsx('div', {
      className:
        s === 'list'
          ? 'space-y-2'
          : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      children: a.map((r) => {
        const c = w(r),
          x = l === c.id;
        return e.jsx(
          ue,
          {
            result: r,
            viewMode: s,
            isPlaying: i === c.id,
            isLoading: x,
            onPlayToggle: () => p(r),
            dateAdded: r.date_added || '',
          },
          r.id,
        );
      }),
    });
  },
  xe = ({
    query: s,
    isLoading: a,
    error: i,
    results: o,
    onQueryChange: t,
    viewMode: n,
  }) =>
    e.jsxs(e.Fragment, {
      children: [
        e.jsx(ne, { query: s, isLoading: a, onQueryChange: t }),
        i &&
          e.jsx('div', {
            className: 'text-red-500 dark:text-red-400 text-center py-4',
            children: i,
          }),
        !i && e.jsx(q, { viewMode: n, items: o }),
      ],
    }),
  he = ({ isLoading: s, error: a, collection: i, viewMode: o }) =>
    s
      ? e.jsx('div', { children: 'Loading collection...' })
      : a
        ? e.jsx('div', { className: 'text-red-500', children: a })
        : e.jsx(q, {
            viewMode: o,
            items: i.map((t) => ({
              id: t.basic_information.id,
              title: `${t.basic_information.artists.map((n) => n.name).join(', ')} - ${t.basic_information.title}`,
              thumb: t.basic_information.thumb,
              cover_image: t.basic_information.cover_image,
              year: String(t.basic_information.year),
              label: [t.basic_information.labels.map((n) => n.name).join(', ')],
              genre: t.basic_information.genres,
              style: t.basic_information.styles,
              format: [
                t.basic_information.formats.map((n) => n.name).join(', '),
              ],
              type: 'release',
              uri: `https://www.discogs.com/release/${t.basic_information.id}`,
              resource_url: `https://api.discogs.com/releases/${t.basic_information.id}`,
              date_added: t.date_added,
            })),
          }),
  me = ({}) => {
    const { query: s, setQuery: a, results: i, isLoading: o, error: t } = te(),
      { collection: n, pagination: u, loading: l, error: m } = ae(),
      [g, p] = d.useState('list'),
      [r, c] = d.useState('search'),
      { initializePlayer: x } = T();
    d.useEffect(() => {
      x();
    }, [x]);
    const [h, j] = d.useState({ total: 0, loaded: 0 });
    return (
      d.useEffect(() => {
        u && j({ total: u.items, loaded: n.length });
      }, [n, u]),
      e.jsxs('div', {
        className: 'w-full max-w-6xl mx-auto p-6',
        children: [
          e.jsxs('div', {
            className: 'flex justify-between items-center mb-6',
            children: [
              e.jsx(ie, { view: r, onViewChange: c, collectionCount: h.total }),
              e.jsx(re, { viewMode: g, onViewModeChange: p }),
            ],
          }),
          r === 'search'
            ? e.jsx(xe, {
                query: s,
                isLoading: o,
                error: t,
                results: i,
                onQueryChange: a,
                viewMode: g,
              })
            : e.jsx(he, { isLoading: l, error: m, collection: n, viewMode: g }),
        ],
      })
    );
  };
function ke() {
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(W, {
        title: 'Collection Explorer',
        description: 'Browse your Discogs collection and discover new music',
      }),
      e.jsx(O, { children: e.jsx(me, {}) }),
    ],
  });
}
export { ke as component };
