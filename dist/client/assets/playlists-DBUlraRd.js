import {
  c as k,
  g as N,
  i as S,
  j as e,
  C as q,
  a as b,
  P as E,
  n as w,
  B as T,
  l as G,
  I as O,
  h as W,
  m as X,
  t as C,
  r as h,
  E as I,
  v as Y,
  w as J,
  A as M,
  D as K,
  ah as Q,
} from './main-rZFLPwin.js';
import { u as Z } from './index-yOxD40BC.js';
import { P as ee } from './Breadcrumbs-Bxhd9kp8.js';
const R = k('Globe', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  [
    'path',
    { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' },
  ],
  ['path', { d: 'M2 12h20', key: '9i4pu4' }],
]);
const _ = k('Lock', [
  [
    'rect',
    {
      width: '18',
      height: '11',
      x: '3',
      y: '11',
      rx: '2',
      ry: '2',
      key: '1w4ew1',
    },
  ],
  ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4', key: 'fwvmzm' }],
]);
const z = k('Trash2', [
    ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
    ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
    ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
    ['line', { x1: '10', x2: '10', y1: '11', y2: '17', key: '1uufr5' }],
    ['line', { x1: '14', x2: '14', y1: '11', y2: '17', key: 'xtxkd' }],
  ]),
  te = ({ playlist: t, handleClick: c, onExpand: a }) => {
    const { deletePlaylist: l, togglePlaylistPublic: o } = N(),
      { playingTrackId: x, isPlaying: r, togglePlayPause: d } = S(),
      i = t.tracks?.some((n) => n.id === x),
      m = (n) => {
        (n.stopPropagation(), t.tracks?.length > 0 && (d(t.tracks[0]), a()));
      },
      s = async (n) => {
        n.stopPropagation();
        try {
          (await l(t.id), C.success('Playlist deleted'));
        } catch {
          C.error('Failed to delete playlist');
        }
      };
    return e.jsxs(q, {
      className: b(
        'group relative overflow-hidden transition-all hover:shadow-light cursor-pointer border-none',
        i && 'ring-2 ring-mainAccent',
      ),
      onClick: c,
      children: [
        e.jsx('div', {
          className:
            'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity',
        }),
        e.jsxs('div', {
          className: 'absolute right-4 top-4 flex gap-2',
          children: [
            e.jsx('button', {
              className: b(
                'p-3 rounded-full bg-mainAccent text-text',
                i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                'transition-all hover:scale-105',
              ),
              onClick: m,
              children:
                i && r ? e.jsx(E, { size: 24 }) : e.jsx(w, { size: 24 }),
            }),
            !t.is_favorites &&
              e.jsx(T, {
                variant: 'destructive',
                size: 'icon',
                className:
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                onClick: s,
                children: e.jsx(z, { className: 'h-4 w-4' }),
              }),
          ],
        }),
        e.jsx(G, {
          className: 'h-48 bg-gray-100',
          children:
            t.tracks?.length > 0 && t.tracks[0].artwork
              ? e.jsx(O, {
                  src: decodeURIComponent(
                    t.tracks[0].artwork.replace(/^"(.*)"$/, '$1'),
                  ),
                  alt: t.tracks[0].artist ?? '',
                  className: 'w-full h-full object-cover',
                  width: 400,
                  height: 400,
                })
              : e.jsx('div', {
                  className:
                    'w-full h-full bg-gray-100 flex items-center justify-center',
                  children: e.jsx(w, { size: 48, className: 'text-gray-400' }),
                }),
        }),
        e.jsxs(W, {
          className: 'p-4 bg-bg space-y-3',
          children: [
            e.jsx(X, {
              className: 'text-lg font-heading font-medium text-text mb-1',
              children: t?.title,
            }),
            e.jsxs('p', {
              className: 'text-small-subtitle text-text/70',
              children: [t?.tracks?.length, ' tracks'],
            }),
            e.jsx('div', {
              className:
                'flex items-center justify-between pt-3 border-t border-border/50',
              children: e.jsx('div', {
                className: 'flex items-center gap-2',
                children: e.jsx('label', {
                  htmlFor: `public-${t.id}`,
                  className:
                    'text-xs font-medium cursor-pointer flex items-center gap-1.5',
                  onClick: (n) => n.stopPropagation(),
                  children: t.is_public
                    ? e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(R, { className: 'h-3 w-3' }),
                          'Public',
                        ],
                      })
                    : e.jsxs(e.Fragment, {
                        children: [
                          e.jsx(_, { className: 'h-3 w-3' }),
                          'Private',
                        ],
                      }),
                }),
              }),
            }),
          ],
        }),
      ],
    });
  },
  se = (t) => {
    if (!t || t === 'EMPTY') return '-';
    if (typeof t == 'string' && t.includes(':')) return t;
    if ((typeof t == 'string' && (t = parseInt(t)), isNaN(t))) return '-';
    const c = Math.floor(t / 60),
      a = Math.floor(t % 60);
    return `${c}:${a.toString().padStart(2, '0')}`;
  };
var y = 'Switch',
  [ae] = J(y),
  [re, ie] = ae(y),
  F = h.forwardRef((t, c) => {
    const {
        __scopeSwitch: a,
        name: l,
        checked: o,
        defaultChecked: x,
        required: r,
        disabled: d,
        value: i = 'on',
        onCheckedChange: m,
        form: s,
        ...n
      } = t,
      [p, u] = h.useState(null),
      j = I(c, (f) => u(f)),
      v = h.useRef(!1),
      P = p ? s || !!p.closest('form') : !0,
      [g, U] = Y({ prop: o, defaultProp: x ?? !1, onChange: m, caller: y });
    return e.jsxs(re, {
      scope: a,
      checked: g,
      disabled: d,
      children: [
        e.jsx(M.button, {
          type: 'button',
          role: 'switch',
          'aria-checked': g,
          'aria-required': r,
          'data-state': H(g),
          'data-disabled': d ? '' : void 0,
          disabled: d,
          value: i,
          ...n,
          ref: j,
          onClick: K(t.onClick, (f) => {
            (U((V) => !V),
              P &&
                ((v.current = f.isPropagationStopped()),
                v.current || f.stopPropagation()));
          }),
        }),
        P &&
          e.jsx($, {
            control: p,
            bubbles: !v.current,
            name: l,
            value: i,
            checked: g,
            required: r,
            disabled: d,
            form: s,
            style: { transform: 'translateX(-100%)' },
          }),
      ],
    });
  });
F.displayName = y;
var B = 'SwitchThumb',
  A = h.forwardRef((t, c) => {
    const { __scopeSwitch: a, ...l } = t,
      o = ie(B, a);
    return e.jsx(M.span, {
      'data-state': H(o.checked),
      'data-disabled': o.disabled ? '' : void 0,
      ...l,
      ref: c,
    });
  });
A.displayName = B;
var ce = 'SwitchBubbleInput',
  $ = h.forwardRef(
    (
      { __scopeSwitch: t, control: c, checked: a, bubbles: l = !0, ...o },
      x,
    ) => {
      const r = h.useRef(null),
        d = I(r, x),
        i = Z(a),
        m = Q(c);
      return (
        h.useEffect(() => {
          const s = r.current;
          if (!s) return;
          const n = window.HTMLInputElement.prototype,
            u = Object.getOwnPropertyDescriptor(n, 'checked').set;
          if (i !== a && u) {
            const j = new Event('click', { bubbles: l });
            (u.call(s, a), s.dispatchEvent(j));
          }
        }, [i, a, l]),
        e.jsx('input', {
          type: 'checkbox',
          'aria-hidden': !0,
          defaultChecked: a,
          ...o,
          tabIndex: -1,
          ref: d,
          style: {
            ...o.style,
            ...m,
            position: 'absolute',
            pointerEvents: 'none',
            opacity: 0,
            margin: 0,
          },
        })
      );
    },
  );
$.displayName = ce;
function H(t) {
  return t ? 'checked' : 'unchecked';
}
var D = F,
  ne = A;
const L = h.forwardRef(({ className: t, ...c }, a) =>
  e.jsx(D, {
    className: b(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-mainAccent data-[state=unchecked]:bg-input',
      t,
    ),
    ...c,
    ref: a,
    children: e.jsx(ne, {
      className: b(
        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
      ),
    }),
  }),
);
L.displayName = D.displayName;
const le = ({ activePlaylistId: t }) => {
  const {
      playlists: c,
      removeTrackFromPlaylist: a,
      togglePlaylistPublic: l,
    } = N(),
    {
      initializePlayer: o,
      playingTrackId: x,
      isPlaying: r,
      togglePlayPause: d,
    } = S(),
    i = c.find((s) => s.id === t);
  if (
    (h.useEffect(() => {
      o();
    }, [o]),
    !i)
  )
    return null;
  const m = async (s) => {
    try {
      await a(t, s);
    } catch (n) {
      console.error('Error removing track:', n);
    }
  };
  return e.jsxs('div', {
    className: 'relative overflow-x-auto',
    children: [
      e.jsxs('div', {
        className: 'mb-6 space-y-4',
        children: [
          e.jsx('div', {
            className: 'flex items-center justify-between',
            children: e.jsx('h2', {
              className: 'text-medium-title font-heading font-bold text-text',
              children: i.title,
            }),
          }),
          e.jsxs('div', {
            className: 'flex items-center gap-3 pb-4 border-b border-border',
            children: [
              e.jsx(L, {
                id: `public-${i.id}`,
                checked: i.is_public ?? !1,
                onCheckedChange: (s) => {
                  l(i.id, s);
                },
              }),
              e.jsx('label', {
                htmlFor: `public-${i.id}`,
                className:
                  'text-sm font-medium cursor-pointer flex items-center gap-2',
                children: i.is_public
                  ? e.jsxs(e.Fragment, {
                      children: [
                        e.jsx(R, { className: 'h-4 w-4' }),
                        'Public Playlist',
                      ],
                    })
                  : e.jsxs(e.Fragment, {
                      children: [
                        e.jsx(_, { className: 'h-4 w-4' }),
                        'Private Playlist',
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      e.jsxs('table', {
        className: 'min-w-full divide-y divide-border',
        children: [
          e.jsx('thead', {
            className: 'bg-bg',
            children: e.jsxs('tr', {
              children: [
                e.jsx('th', {
                  className:
                    'w-16 px-4 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Play',
                }),
                e.jsx('th', {
                  className:
                    'px-4 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Track',
                }),
                e.jsx('th', {
                  className:
                    'w-24 px-4 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Duration',
                }),
                e.jsx('th', {
                  className:
                    'w-16 px-4 py-3 text-right text-xs font-medium text-text/70 uppercase tracking-wider',
                  children: 'Actions',
                }),
              ],
            }),
          }),
          e.jsx('tbody', {
            className: 'bg-bg divide-y divide-border',
            children: i.tracks?.map((s) => {
              const n = x === s.id;
              return e.jsxs(
                'tr',
                {
                  className: 'hover:bg-bg/50',
                  children: [
                    e.jsx('td', {
                      className: 'px-4 py-3 whitespace-nowrap',
                      children: e.jsx('button', {
                        onClick: () => d(s),
                        className: 'p-2 rounded-full hover:bg-bg/50',
                        children:
                          n && r
                            ? e.jsx(E, { className: 'h-4 w-4' })
                            : e.jsx(w, { className: 'h-4 w-4' }),
                      }),
                    }),
                    e.jsx('td', {
                      className: 'px-4 py-3 whitespace-nowrap',
                      children: e.jsx('div', {
                        className: 'flex items-center',
                        children: e.jsx('div', {
                          className: 'text-sm font-medium text-text',
                          children: s.title,
                        }),
                      }),
                    }),
                    e.jsx('td', {
                      className:
                        'px-4 py-3 whitespace-nowrap text-right text-sm text-text/70',
                      children: se(s.duration),
                    }),
                    e.jsx('td', {
                      className: 'px-4 py-3 whitespace-nowrap text-right',
                      children: e.jsx(T, {
                        variant: 'ghost',
                        size: 'icon',
                        onClick: () => m(s.id),
                        children: e.jsx(z, { className: 'h-4 w-4' }),
                      }),
                    }),
                  ],
                },
                s.id,
              );
            }),
          }),
        ],
      }),
    ],
  });
};
function xe() {
  const [t, c] = h.useState(null),
    { playlists: a, fetchPlaylists: l } = N();
  h.useEffect(() => {
    l();
  }, [l]);
  const o = (r) => {
      c((d) => (d === r.id ? null : r.id));
    },
    x = (r) => {
      c(r);
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(ee, {
        title: 'Playlists',
        description: 'Create and manage your music playlists',
      }),
      e.jsx('div', {
        className: 'min-h-screen py-8',
        children: e.jsxs('div', {
          className: 'container mx-auto px-4',
          children: [
            e.jsx('div', {
              className:
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12',
              children: a.map((r) =>
                e.jsx(
                  te,
                  {
                    playlist: r,
                    handleClick: () => o(r),
                    onExpand: () => x(r.id),
                  },
                  r.id,
                ),
              ),
            }),
            t &&
              e.jsx('div', {
                className: 'mt-12',
                children: e.jsx(le, { activePlaylistId: t }),
              }),
          ],
        }),
      }),
    ],
  });
}
export { xe as component };
