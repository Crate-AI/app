import {
  c as h,
  j as a,
  an as o,
  b as u,
  a as m,
  o as x,
  ao as f,
  p as b,
  al as p,
  M as d,
  ap as g,
} from './main-rZFLPwin.js';
const y = h('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]]);
function j() {
  const { pathname: l } = o(),
    { userIdentity: t } = u();
  if (!t) return null;
  const c = (() => {
    const e = l.split('/').filter(Boolean),
      s = [];
    if (
      (s.push({ label: 'Dashboard', href: `/${t.username}`, icon: f }),
      e.length > 1)
    )
      switch (e[1]) {
        case 'tracks':
          s.push({ label: 'Tracks', href: `/${t.username}/tracks`, icon: d });
          break;
        case 'playlists':
          if (
            (s.push({
              label: 'Playlists',
              href: `/${t.username}/playlists`,
              icon: p,
            }),
            e.length > 2)
          ) {
            const n = e[2];
            s.push({
              label: `Playlist ${n}`,
              href: `/${t.username}/playlists/${n}`,
            });
          }
          break;
        case 'collection':
          s.push({
            label: 'Collection',
            href: `/${t.username}/collection`,
            icon: b,
          });
          break;
      }
    if (
      e[0] === 'analyze' &&
      ((s.length = 0),
      s.push({ label: 'Analyze', href: '/analyze', icon: g }),
      e.length > 1)
    )
      switch (e[1]) {
        case 'chat':
          s.push({ label: 'Chat', href: '/analyze/chat' });
          break;
      }
    return (s.length > 0 && (s[s.length - 1].current = !0), s);
  })();
  return c.length <= 1
    ? null
    : a.jsx('nav', {
        className:
          'flex items-center space-x-2 text-sm text-gray-600 mb-6 px-2',
        children: a.jsx('ol', {
          className: 'flex items-center space-x-2',
          children: c.map((e, s) => {
            const i = s === c.length - 1,
              n = e.icon;
            return a.jsxs(
              'li',
              {
                className: 'flex items-center',
                children: [
                  s > 0 &&
                    a.jsx(y, { className: 'w-4 h-4 mx-2 text-gray-400' }),
                  i
                    ? a.jsxs('span', {
                        className: m(
                          'flex items-center font-medium',
                          e.current ? 'text-gray-900' : 'text-gray-600',
                        ),
                        children: [
                          n && a.jsx(n, { className: 'w-4 h-4 mr-2' }),
                          e.label,
                        ],
                      })
                    : a.jsxs(x, {
                        to: e.href,
                        className:
                          'flex items-center hover:text-gray-900 transition-colors',
                        children: [
                          n && a.jsx(n, { className: 'w-4 h-4 mr-2' }),
                          e.label,
                        ],
                      }),
                ],
              },
              e.href || e.label,
            );
          }),
        }),
      });
}
function k({ title: l, description: t, children: r }) {
  return a.jsxs('div', {
    className: 'mb-8',
    children: [
      a.jsx(j, {}),
      a.jsxs('div', {
        className: 'flex items-center justify-between',
        children: [
          a.jsxs('div', {
            children: [
              a.jsx('h1', {
                className: 'text-2xl font-bold text-gray-900',
                children: l,
              }),
              t &&
                a.jsx('p', {
                  className: 'mt-1 text-sm text-gray-500',
                  children: t,
                }),
            ],
          }),
          r &&
            a.jsx('div', {
              className: 'flex items-center space-x-3',
              children: r,
            }),
        ],
      }),
    ],
  });
}
export { y as C, k as P };
