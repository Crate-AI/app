import {
  c as Re,
  r as x,
  j as a,
  p as is,
  a as Q,
  X as zn,
  v as Hn,
  w as Gn,
  x as st,
  y as ut,
  z as ls,
  A as Ve,
  D as ge,
  E as Xe,
  F as cs,
  G as us,
  J as ds,
  K as gs,
  N as fs,
  O as Bn,
  Q as ps,
  T as ms,
  f as dt,
  g as hs,
  i as Me,
  B as X,
  H as xs,
  P as qn,
  n as Un,
  I as ws,
  q as He,
  t as G,
  U as Jn,
  V as vs,
  W as ys,
  Y as Ss,
  Z as Cs,
  $ as Rs,
  a0 as Wn,
  R as sn,
  a1 as _s,
  C as ot,
  h as Yn,
  M as Xn,
  b as bs,
  a2 as Es,
  a3 as Is,
  a4 as Ns,
  a5 as js,
  a6 as Ps,
  a7 as ks,
  a8 as Ts,
  d as Fs,
  a9 as Kn,
} from './main-rZFLPwin.js';
import { I as gt } from './input-DLULWS28.js';
import {
  S as Ds,
  a as As,
  b as Ms,
  c as $s,
  d as Os,
  R as Vs,
  L as vt,
  C as Ls,
} from './select-Bm5-cKGb.js';
import { L as Cn } from './list-plus-BFMKShGe.js';
import { C as yt, P as zs } from './Breadcrumbs-Bxhd9kp8.js';
import './index-yOxD40BC.js';
const St = Re('ArrowUpDown', [
  ['path', { d: 'm21 16-4 4-4-4', key: 'f6ql7i' }],
  ['path', { d: 'M17 20V4', key: '1ejh1v' }],
  ['path', { d: 'm3 8 4-4 4 4', key: '11wl7u' }],
  ['path', { d: 'M7 4v16', key: '1glfcx' }],
]);
const ft = Re('Bot', [
  ['path', { d: 'M12 8V4H8', key: 'hb8ula' }],
  [
    'rect',
    { width: '16', height: '12', x: '4', y: '8', rx: '2', key: 'enze0r' },
  ],
  ['path', { d: 'M2 14h2', key: 'vft8re' }],
  ['path', { d: 'M20 14h2', key: '4cs60a' }],
  ['path', { d: 'M15 13v2', key: '1xurst' }],
  ['path', { d: 'M9 13v2', key: 'rq6x2g' }],
]);
const Ct = Re('ChevronLeft', [
  ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
]);
const Hs = Re('CirclePlus', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['path', { d: 'M8 12h8', key: '1wcyev' }],
  ['path', { d: 'M12 8v8', key: 'napkw2' }],
]);
const Qn = Re('EllipsisVertical', [
  ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
  ['circle', { cx: '12', cy: '5', r: '1', key: 'gxeob9' }],
  ['circle', { cx: '12', cy: '19', r: '1', key: 'lyex9k' }],
]);
const Gs = Re('MessageCircle', [
  ['path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z', key: 'vv11sd' }],
]);
const Bs = Re('MessageSquare', [
  [
    'path',
    {
      d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
      key: '1lielz',
    },
  ],
]);
const qs = Re('Send', [
  ['path', { d: 'm22 2-7 20-4-9-9-4Z', key: '1q3vgg' }],
  ['path', { d: 'M22 2 11 13', key: 'nzbqef' }],
]);
const Zn = Re('Sparkles', [
    [
      'path',
      {
        d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
        key: '4pj2yx',
      },
    ],
    ['path', { d: 'M20 3v4', key: '1olli1' }],
    ['path', { d: 'M22 5h-4', key: '1gvqau' }],
    ['path', { d: 'M4 17v2', key: 'vumght' }],
    ['path', { d: 'M5 18H3', key: 'zchphs' }],
  ]),
  Us = x.forwardRef(
    ({ value: e, onChange: t, placeholder: n = 'Search tracks...' }, r) =>
      a.jsxs('div', {
        className: 'relative w-full p-[4px]',
        children: [
          a.jsx(is, {
            className:
              'absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10',
          }),
          a.jsx(gt, {
            ref: r,
            type: 'text',
            placeholder: n,
            value: e,
            onChange: (s) => t(s.target.value),
            className: Q(
              'w-full pl-12 pr-8',
              'transition-shadow duration-300',
              'hover:shadow-hover',
              'focus:shadow-focus',
            ),
          }),
          e &&
            a.jsx('button', {
              onClick: () => t(''),
              className:
                'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground',
              children: a.jsx(zn, { className: 'h-4 w-4' }),
            }),
        ],
      }),
  );
function Js() {
  return {
    accessor: (e, t) =>
      typeof e == 'function'
        ? { ...t, accessorFn: e }
        : { ...t, accessorKey: e },
    display: (e) => e,
    group: (e) => e,
  };
}
function Ee(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function ce(e, t) {
  return (n) => {
    t.setState((r) => ({ ...r, [e]: Ee(n, r[e]) }));
  };
}
function pt(e) {
  return e instanceof Function;
}
function Ws(e) {
  return Array.isArray(e) && e.every((t) => typeof t == 'number');
}
function Ys(e, t) {
  const n = [],
    r = (s) => {
      s.forEach((o) => {
        n.push(o);
        const i = t(o);
        i != null && i.length && r(i);
      });
    };
  return (r(e), n);
}
function j(e, t, n) {
  let r = [],
    s;
  return (o) => {
    let i;
    n.key && n.debug && (i = Date.now());
    const l = e(o);
    if (!(l.length !== r.length || l.some((g, f) => r[f] !== g))) return s;
    r = l;
    let u;
    if (
      (n.key && n.debug && (u = Date.now()),
      (s = t(...l)),
      n == null || n.onChange == null || n.onChange(s),
      n.key && n.debug && n != null && n.debug())
    ) {
      const g = Math.round((Date.now() - i) * 100) / 100,
        f = Math.round((Date.now() - u) * 100) / 100,
        p = f / 16,
        d = (m, h) => {
          for (m = String(m); m.length < h; ) m = ' ' + m;
          return m;
        };
      console.info(
        `%c⏱ ${d(f, 5)} /${d(g, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * p, 120))}deg 100% 31%);`,
        n?.key,
      );
    }
    return s;
  };
}
function P(e, t, n, r) {
  return {
    debug: () => {
      var s;
      return (s = e?.debugAll) != null ? s : e[t];
    },
    key: !1,
    onChange: r,
  };
}
function Xs(e, t, n, r) {
  const s = () => {
      var i;
      return (i = o.getValue()) != null ? i : e.options.renderFallbackValue;
    },
    o = {
      id: `${t.id}_${n.id}`,
      row: t,
      column: n,
      getValue: () => t.getValue(r),
      renderValue: s,
      getContext: j(
        () => [e, n, t, o],
        (i, l, c, u) => ({
          table: i,
          column: l,
          row: c,
          cell: u,
          getValue: u.getValue,
          renderValue: u.renderValue,
        }),
        P(e.options, 'debugCells'),
      ),
    };
  return (
    e._features.forEach((i) => {
      i.createCell == null || i.createCell(o, n, t, e);
    }, {}),
    o
  );
}
function Ks(e, t, n, r) {
  var s, o;
  const l = { ...e._getDefaultColumnDef(), ...t },
    c = l.accessorKey;
  let u =
      (s =
        (o = l.id) != null
          ? o
          : c
            ? typeof String.prototype.replaceAll == 'function'
              ? c.replaceAll('.', '_')
              : c.replace(/\./g, '_')
            : void 0) != null
        ? s
        : typeof l.header == 'string'
          ? l.header
          : void 0,
    g;
  if (
    (l.accessorFn
      ? (g = l.accessorFn)
      : c &&
        (c.includes('.')
          ? (g = (p) => {
              let d = p;
              for (const h of c.split('.')) {
                var m;
                d = (m = d) == null ? void 0 : m[h];
              }
              return d;
            })
          : (g = (p) => p[l.accessorKey])),
    !u)
  )
    throw new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: g,
    parent: r,
    depth: n,
    columnDef: l,
    columns: [],
    getFlatColumns: j(
      () => [!0],
      () => {
        var p;
        return [
          f,
          ...((p = f.columns) == null
            ? void 0
            : p.flatMap((d) => d.getFlatColumns())),
        ];
      },
      P(e.options, 'debugColumns'),
    ),
    getLeafColumns: j(
      () => [e._getOrderColumnsFn()],
      (p) => {
        var d;
        if ((d = f.columns) != null && d.length) {
          let m = f.columns.flatMap((h) => h.getLeafColumns());
          return p(m);
        }
        return [f];
      },
      P(e.options, 'debugColumns'),
    ),
  };
  for (const p of e._features) p.createColumn == null || p.createColumn(f, e);
  return f;
}
const oe = 'debugHeaders';
function Rn(e, t, n) {
  var r;
  let o = {
    id: (r = n.id) != null ? r : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const i = [],
        l = (c) => {
          (c.subHeaders && c.subHeaders.length && c.subHeaders.map(l),
            i.push(c));
        };
      return (l(o), i);
    },
    getContext: () => ({ table: e, header: o, column: t }),
  };
  return (
    e._features.forEach((i) => {
      i.createHeader == null || i.createHeader(o, e);
    }),
    o
  );
}
const Qs = {
  createTable: (e) => {
    ((e.getHeaderGroups = j(
      () => [
        e.getAllColumns(),
        e.getVisibleLeafColumns(),
        e.getState().columnPinning.left,
        e.getState().columnPinning.right,
      ],
      (t, n, r, s) => {
        var o, i;
        const l =
            (o = r?.map((f) => n.find((p) => p.id === f)).filter(Boolean)) !=
            null
              ? o
              : [],
          c =
            (i = s?.map((f) => n.find((p) => p.id === f)).filter(Boolean)) !=
            null
              ? i
              : [],
          u = n.filter(
            (f) =>
              !(r != null && r.includes(f.id)) &&
              !(s != null && s.includes(f.id)),
          );
        return Qe(t, [...l, ...u, ...c], e);
      },
      P(e.options, oe),
    )),
      (e.getCenterHeaderGroups = j(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.left,
          e.getState().columnPinning.right,
        ],
        (t, n, r, s) => (
          (n = n.filter(
            (o) =>
              !(r != null && r.includes(o.id)) &&
              !(s != null && s.includes(o.id)),
          )),
          Qe(t, n, e, 'center')
        ),
        P(e.options, oe),
      )),
      (e.getLeftHeaderGroups = j(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.left,
        ],
        (t, n, r) => {
          var s;
          const o =
            (s = r?.map((i) => n.find((l) => l.id === i)).filter(Boolean)) !=
            null
              ? s
              : [];
          return Qe(t, o, e, 'left');
        },
        P(e.options, oe),
      )),
      (e.getRightHeaderGroups = j(
        () => [
          e.getAllColumns(),
          e.getVisibleLeafColumns(),
          e.getState().columnPinning.right,
        ],
        (t, n, r) => {
          var s;
          const o =
            (s = r?.map((i) => n.find((l) => l.id === i)).filter(Boolean)) !=
            null
              ? s
              : [];
          return Qe(t, o, e, 'right');
        },
        P(e.options, oe),
      )),
      (e.getFooterGroups = j(
        () => [e.getHeaderGroups()],
        (t) => [...t].reverse(),
        P(e.options, oe),
      )),
      (e.getLeftFooterGroups = j(
        () => [e.getLeftHeaderGroups()],
        (t) => [...t].reverse(),
        P(e.options, oe),
      )),
      (e.getCenterFooterGroups = j(
        () => [e.getCenterHeaderGroups()],
        (t) => [...t].reverse(),
        P(e.options, oe),
      )),
      (e.getRightFooterGroups = j(
        () => [e.getRightHeaderGroups()],
        (t) => [...t].reverse(),
        P(e.options, oe),
      )),
      (e.getFlatHeaders = j(
        () => [e.getHeaderGroups()],
        (t) => t.map((n) => n.headers).flat(),
        P(e.options, oe),
      )),
      (e.getLeftFlatHeaders = j(
        () => [e.getLeftHeaderGroups()],
        (t) => t.map((n) => n.headers).flat(),
        P(e.options, oe),
      )),
      (e.getCenterFlatHeaders = j(
        () => [e.getCenterHeaderGroups()],
        (t) => t.map((n) => n.headers).flat(),
        P(e.options, oe),
      )),
      (e.getRightFlatHeaders = j(
        () => [e.getRightHeaderGroups()],
        (t) => t.map((n) => n.headers).flat(),
        P(e.options, oe),
      )),
      (e.getCenterLeafHeaders = j(
        () => [e.getCenterFlatHeaders()],
        (t) =>
          t.filter((n) => {
            var r;
            return !((r = n.subHeaders) != null && r.length);
          }),
        P(e.options, oe),
      )),
      (e.getLeftLeafHeaders = j(
        () => [e.getLeftFlatHeaders()],
        (t) =>
          t.filter((n) => {
            var r;
            return !((r = n.subHeaders) != null && r.length);
          }),
        P(e.options, oe),
      )),
      (e.getRightLeafHeaders = j(
        () => [e.getRightFlatHeaders()],
        (t) =>
          t.filter((n) => {
            var r;
            return !((r = n.subHeaders) != null && r.length);
          }),
        P(e.options, oe),
      )),
      (e.getLeafHeaders = j(
        () => [
          e.getLeftHeaderGroups(),
          e.getCenterHeaderGroups(),
          e.getRightHeaderGroups(),
        ],
        (t, n, r) => {
          var s, o, i, l, c, u;
          return [
            ...((s = (o = t[0]) == null ? void 0 : o.headers) != null ? s : []),
            ...((i = (l = n[0]) == null ? void 0 : l.headers) != null ? i : []),
            ...((c = (u = r[0]) == null ? void 0 : u.headers) != null ? c : []),
          ]
            .map((g) => g.getLeafHeaders())
            .flat();
        },
        P(e.options, oe),
      )));
  },
};
function Qe(e, t, n, r) {
  var s, o;
  let i = 0;
  const l = function (p, d) {
    (d === void 0 && (d = 1),
      (i = Math.max(i, d)),
      p
        .filter((m) => m.getIsVisible())
        .forEach((m) => {
          var h;
          (h = m.columns) != null && h.length && l(m.columns, d + 1);
        }, 0));
  };
  l(e);
  let c = [];
  const u = (p, d) => {
      const m = {
          depth: d,
          id: [r, `${d}`].filter(Boolean).join('_'),
          headers: [],
        },
        h = [];
      (p.forEach((y) => {
        const w = [...h].reverse()[0],
          b = y.column.depth === m.depth;
        let E,
          I = !1;
        if (
          (b && y.column.parent
            ? (E = y.column.parent)
            : ((E = y.column), (I = !0)),
          w && w?.column === E)
        )
          w.subHeaders.push(y);
        else {
          const R = Rn(n, E, {
            id: [r, d, E.id, y?.id].filter(Boolean).join('_'),
            isPlaceholder: I,
            placeholderId: I
              ? `${h.filter((v) => v.column === E).length}`
              : void 0,
            depth: d,
            index: h.length,
          });
          (R.subHeaders.push(y), h.push(R));
        }
        (m.headers.push(y), (y.headerGroup = m));
      }),
        c.push(m),
        d > 0 && u(h, d - 1));
    },
    g = t.map((p, d) => Rn(n, p, { depth: i, index: d }));
  (u(g, i - 1), c.reverse());
  const f = (p) =>
    p
      .filter((m) => m.column.getIsVisible())
      .map((m) => {
        let h = 0,
          y = 0,
          w = [0];
        m.subHeaders && m.subHeaders.length
          ? ((w = []),
            f(m.subHeaders).forEach((E) => {
              let { colSpan: I, rowSpan: R } = E;
              ((h += I), w.push(R));
            }))
          : (h = 1);
        const b = Math.min(...w);
        return (
          (y = y + b),
          (m.colSpan = h),
          (m.rowSpan = y),
          { colSpan: h, rowSpan: y }
        );
      });
  return (f((s = (o = c[0]) == null ? void 0 : o.headers) != null ? s : []), c);
}
const on = (e, t, n, r, s, o, i) => {
    let l = {
      id: t,
      index: r,
      original: n,
      depth: s,
      parentId: i,
      _valuesCache: {},
      _uniqueValuesCache: {},
      getValue: (c) => {
        if (l._valuesCache.hasOwnProperty(c)) return l._valuesCache[c];
        const u = e.getColumn(c);
        if (u != null && u.accessorFn)
          return (
            (l._valuesCache[c] = u.accessorFn(l.original, r)),
            l._valuesCache[c]
          );
      },
      getUniqueValues: (c) => {
        if (l._uniqueValuesCache.hasOwnProperty(c))
          return l._uniqueValuesCache[c];
        const u = e.getColumn(c);
        if (u != null && u.accessorFn)
          return u.columnDef.getUniqueValues
            ? ((l._uniqueValuesCache[c] = u.columnDef.getUniqueValues(
                l.original,
                r,
              )),
              l._uniqueValuesCache[c])
            : ((l._uniqueValuesCache[c] = [l.getValue(c)]),
              l._uniqueValuesCache[c]);
      },
      renderValue: (c) => {
        var u;
        return (u = l.getValue(c)) != null ? u : e.options.renderFallbackValue;
      },
      subRows: [],
      getLeafRows: () => Ys(l.subRows, (c) => c.subRows),
      getParentRow: () => (l.parentId ? e.getRow(l.parentId, !0) : void 0),
      getParentRows: () => {
        let c = [],
          u = l;
        for (;;) {
          const g = u.getParentRow();
          if (!g) break;
          (c.push(g), (u = g));
        }
        return c.reverse();
      },
      getAllCells: j(
        () => [e.getAllLeafColumns()],
        (c) => c.map((u) => Xs(e, l, u, u.id)),
        P(e.options, 'debugRows'),
      ),
      _getAllCellsByColumnId: j(
        () => [l.getAllCells()],
        (c) => c.reduce((u, g) => ((u[g.column.id] = g), u), {}),
        P(e.options, 'debugRows'),
      ),
    };
    for (let c = 0; c < e._features.length; c++) {
      const u = e._features[c];
      u == null || u.createRow == null || u.createRow(l, e);
    }
    return l;
  },
  Zs = {
    createColumn: (e, t) => {
      ((e._getFacetedRowModel =
        t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id)),
        (e.getFacetedRowModel = () =>
          e._getFacetedRowModel
            ? e._getFacetedRowModel()
            : t.getPreFilteredRowModel()),
        (e._getFacetedUniqueValues =
          t.options.getFacetedUniqueValues &&
          t.options.getFacetedUniqueValues(t, e.id)),
        (e.getFacetedUniqueValues = () =>
          e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : new Map()),
        (e._getFacetedMinMaxValues =
          t.options.getFacetedMinMaxValues &&
          t.options.getFacetedMinMaxValues(t, e.id)),
        (e.getFacetedMinMaxValues = () => {
          if (e._getFacetedMinMaxValues) return e._getFacetedMinMaxValues();
        }));
    },
  },
  er = (e, t, n) => {
    var r, s;
    const o =
      n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
    return !!(
      !(
        (s = e.getValue(t)) == null ||
        (s = s.toString()) == null ||
        (s = s.toLowerCase()) == null
      ) && s.includes(o)
    );
  };
er.autoRemove = (e) => fe(e);
const tr = (e, t, n) => {
  var r;
  return !!(
    !((r = e.getValue(t)) == null || (r = r.toString()) == null) &&
    r.includes(n)
  );
};
tr.autoRemove = (e) => fe(e);
const nr = (e, t, n) => {
  var r;
  return (
    ((r = e.getValue(t)) == null || (r = r.toString()) == null
      ? void 0
      : r.toLowerCase()) === n?.toLowerCase()
  );
};
nr.autoRemove = (e) => fe(e);
const rr = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
rr.autoRemove = (e) => fe(e);
const sr = (e, t, n) =>
  !n.some((r) => {
    var s;
    return !((s = e.getValue(t)) != null && s.includes(r));
  });
sr.autoRemove = (e) => fe(e) || !(e != null && e.length);
const or = (e, t, n) =>
  n.some((r) => {
    var s;
    return (s = e.getValue(t)) == null ? void 0 : s.includes(r);
  });
or.autoRemove = (e) => fe(e) || !(e != null && e.length);
const ar = (e, t, n) => e.getValue(t) === n;
ar.autoRemove = (e) => fe(e);
const ir = (e, t, n) => e.getValue(t) == n;
ir.autoRemove = (e) => fe(e);
const an = (e, t, n) => {
  let [r, s] = n;
  const o = e.getValue(t);
  return o >= r && o <= s;
};
an.resolveFilterValue = (e) => {
  let [t, n] = e,
    r = typeof t != 'number' ? parseFloat(t) : t,
    s = typeof n != 'number' ? parseFloat(n) : n,
    o = t === null || Number.isNaN(r) ? -1 / 0 : r,
    i = n === null || Number.isNaN(s) ? 1 / 0 : s;
  if (o > i) {
    const l = o;
    ((o = i), (i = l));
  }
  return [o, i];
};
an.autoRemove = (e) => fe(e) || (fe(e[0]) && fe(e[1]));
const Se = {
  includesString: er,
  includesStringSensitive: tr,
  equalsString: nr,
  arrIncludes: rr,
  arrIncludesAll: sr,
  arrIncludesSome: or,
  equals: ar,
  weakEquals: ir,
  inNumberRange: an,
};
function fe(e) {
  return e == null || e === '';
}
const eo = {
  getDefaultColumnDef: () => ({ filterFn: 'auto' }),
  getInitialState: (e) => ({ columnFilters: [], ...e }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: ce('columnFilters', e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100,
  }),
  createColumn: (e, t) => {
    ((e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0],
        r = n?.getValue(e.id);
      return typeof r == 'string'
        ? Se.includesString
        : typeof r == 'number'
          ? Se.inNumberRange
          : typeof r == 'boolean' || (r !== null && typeof r == 'object')
            ? Se.equals
            : Array.isArray(r)
              ? Se.arrIncludes
              : Se.weakEquals;
    }),
      (e.getFilterFn = () => {
        var n, r;
        return pt(e.columnDef.filterFn)
          ? e.columnDef.filterFn
          : e.columnDef.filterFn === 'auto'
            ? e.getAutoFilterFn()
            : (n =
                  (r = t.options.filterFns) == null
                    ? void 0
                    : r[e.columnDef.filterFn]) != null
              ? n
              : Se[e.columnDef.filterFn];
      }),
      (e.getCanFilter = () => {
        var n, r, s;
        return (
          ((n = e.columnDef.enableColumnFilter) != null ? n : !0) &&
          ((r = t.options.enableColumnFilters) != null ? r : !0) &&
          ((s = t.options.enableFilters) != null ? s : !0) &&
          !!e.accessorFn
        );
      }),
      (e.getIsFiltered = () => e.getFilterIndex() > -1),
      (e.getFilterValue = () => {
        var n;
        return (n = t.getState().columnFilters) == null ||
          (n = n.find((r) => r.id === e.id)) == null
          ? void 0
          : n.value;
      }),
      (e.getFilterIndex = () => {
        var n, r;
        return (n =
          (r = t.getState().columnFilters) == null
            ? void 0
            : r.findIndex((s) => s.id === e.id)) != null
          ? n
          : -1;
      }),
      (e.setFilterValue = (n) => {
        t.setColumnFilters((r) => {
          const s = e.getFilterFn(),
            o = r?.find((g) => g.id === e.id),
            i = Ee(n, o ? o.value : void 0);
          if (_n(s, i, e)) {
            var l;
            return (l = r?.filter((g) => g.id !== e.id)) != null ? l : [];
          }
          const c = { id: e.id, value: i };
          if (o) {
            var u;
            return (u = r?.map((g) => (g.id === e.id ? c : g))) != null
              ? u
              : [];
          }
          return r != null && r.length ? [...r, c] : [c];
        });
      }));
  },
  createRow: (e, t) => {
    ((e.columnFilters = {}), (e.columnFiltersMeta = {}));
  },
  createTable: (e) => {
    ((e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(),
        r = (s) => {
          var o;
          return (o = Ee(t, s)) == null
            ? void 0
            : o.filter((i) => {
                const l = n.find((c) => c.id === i.id);
                if (l) {
                  const c = l.getFilterFn();
                  if (_n(c, i.value, l)) return !1;
                }
                return !0;
              });
        };
      e.options.onColumnFiltersChange == null ||
        e.options.onColumnFiltersChange(r);
    }),
      (e.resetColumnFilters = (t) => {
        var n, r;
        e.setColumnFilters(
          t
            ? []
            : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) !=
                null
              ? n
              : [],
        );
      }),
      (e.getPreFilteredRowModel = () => e.getCoreRowModel()),
      (e.getFilteredRowModel = () => (
        !e._getFilteredRowModel &&
          e.options.getFilteredRowModel &&
          (e._getFilteredRowModel = e.options.getFilteredRowModel(e)),
        e.options.manualFiltering || !e._getFilteredRowModel
          ? e.getPreFilteredRowModel()
          : e._getFilteredRowModel()
      )));
  },
};
function _n(e, t, n) {
  return (
    (e && e.autoRemove ? e.autoRemove(t, n) : !1) ||
    typeof t > 'u' ||
    (typeof t == 'string' && !t)
  );
}
const to = (e, t, n) =>
    n.reduce((r, s) => {
      const o = s.getValue(e);
      return r + (typeof o == 'number' ? o : 0);
    }, 0),
  no = (e, t, n) => {
    let r;
    return (
      n.forEach((s) => {
        const o = s.getValue(e);
        o != null && (r > o || (r === void 0 && o >= o)) && (r = o);
      }),
      r
    );
  },
  ro = (e, t, n) => {
    let r;
    return (
      n.forEach((s) => {
        const o = s.getValue(e);
        o != null && (r < o || (r === void 0 && o >= o)) && (r = o);
      }),
      r
    );
  },
  so = (e, t, n) => {
    let r, s;
    return (
      n.forEach((o) => {
        const i = o.getValue(e);
        i != null &&
          (r === void 0
            ? i >= i && (r = s = i)
            : (r > i && (r = i), s < i && (s = i)));
      }),
      [r, s]
    );
  },
  oo = (e, t) => {
    let n = 0,
      r = 0;
    if (
      (t.forEach((s) => {
        let o = s.getValue(e);
        o != null && (o = +o) >= o && (++n, (r += o));
      }),
      n)
    )
      return r / n;
  },
  ao = (e, t) => {
    if (!t.length) return;
    const n = t.map((o) => o.getValue(e));
    if (!Ws(n)) return;
    if (n.length === 1) return n[0];
    const r = Math.floor(n.length / 2),
      s = n.sort((o, i) => o - i);
    return n.length % 2 !== 0 ? s[r] : (s[r - 1] + s[r]) / 2;
  },
  io = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()),
  lo = (e, t) => new Set(t.map((n) => n.getValue(e))).size,
  co = (e, t) => t.length,
  Rt = {
    sum: to,
    min: no,
    max: ro,
    extent: so,
    mean: oo,
    median: ao,
    unique: io,
    uniqueCount: lo,
    count: co,
  },
  uo = {
    getDefaultColumnDef: () => ({
      aggregatedCell: (e) => {
        var t, n;
        return (t =
          (n = e.getValue()) == null || n.toString == null
            ? void 0
            : n.toString()) != null
          ? t
          : null;
      },
      aggregationFn: 'auto',
    }),
    getInitialState: (e) => ({ grouping: [], ...e }),
    getDefaultOptions: (e) => ({
      onGroupingChange: ce('grouping', e),
      groupedColumnMode: 'reorder',
    }),
    createColumn: (e, t) => {
      ((e.toggleGrouping = () => {
        t.setGrouping((n) =>
          n != null && n.includes(e.id)
            ? n.filter((r) => r !== e.id)
            : [...(n ?? []), e.id],
        );
      }),
        (e.getCanGroup = () => {
          var n, r;
          return (
            ((n = e.columnDef.enableGrouping) != null ? n : !0) &&
            ((r = t.options.enableGrouping) != null ? r : !0) &&
            (!!e.accessorFn || !!e.columnDef.getGroupingValue)
          );
        }),
        (e.getIsGrouped = () => {
          var n;
          return (n = t.getState().grouping) == null
            ? void 0
            : n.includes(e.id);
        }),
        (e.getGroupedIndex = () => {
          var n;
          return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
        }),
        (e.getToggleGroupingHandler = () => {
          const n = e.getCanGroup();
          return () => {
            n && e.toggleGrouping();
          };
        }),
        (e.getAutoAggregationFn = () => {
          const n = t.getCoreRowModel().flatRows[0],
            r = n?.getValue(e.id);
          if (typeof r == 'number') return Rt.sum;
          if (Object.prototype.toString.call(r) === '[object Date]')
            return Rt.extent;
        }),
        (e.getAggregationFn = () => {
          var n, r;
          if (!e) throw new Error();
          return pt(e.columnDef.aggregationFn)
            ? e.columnDef.aggregationFn
            : e.columnDef.aggregationFn === 'auto'
              ? e.getAutoAggregationFn()
              : (n =
                    (r = t.options.aggregationFns) == null
                      ? void 0
                      : r[e.columnDef.aggregationFn]) != null
                ? n
                : Rt[e.columnDef.aggregationFn];
        }));
    },
    createTable: (e) => {
      ((e.setGrouping = (t) =>
        e.options.onGroupingChange == null
          ? void 0
          : e.options.onGroupingChange(t)),
        (e.resetGrouping = (t) => {
          var n, r;
          e.setGrouping(
            t
              ? []
              : (n = (r = e.initialState) == null ? void 0 : r.grouping) != null
                ? n
                : [],
          );
        }),
        (e.getPreGroupedRowModel = () => e.getFilteredRowModel()),
        (e.getGroupedRowModel = () => (
          !e._getGroupedRowModel &&
            e.options.getGroupedRowModel &&
            (e._getGroupedRowModel = e.options.getGroupedRowModel(e)),
          e.options.manualGrouping || !e._getGroupedRowModel
            ? e.getPreGroupedRowModel()
            : e._getGroupedRowModel()
        )));
    },
    createRow: (e, t) => {
      ((e.getIsGrouped = () => !!e.groupingColumnId),
        (e.getGroupingValue = (n) => {
          if (e._groupingValuesCache.hasOwnProperty(n))
            return e._groupingValuesCache[n];
          const r = t.getColumn(n);
          return r != null && r.columnDef.getGroupingValue
            ? ((e._groupingValuesCache[n] = r.columnDef.getGroupingValue(
                e.original,
              )),
              e._groupingValuesCache[n])
            : e.getValue(n);
        }),
        (e._groupingValuesCache = {}));
    },
    createCell: (e, t, n, r) => {
      ((e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId),
        (e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped()),
        (e.getIsAggregated = () => {
          var s;
          return (
            !e.getIsGrouped() &&
            !e.getIsPlaceholder() &&
            !!((s = n.subRows) != null && s.length)
          );
        }));
    },
  };
function go(e, t, n) {
  if (!(t != null && t.length) || !n) return e;
  const r = e.filter((o) => !t.includes(o.id));
  return n === 'remove'
    ? r
    : [...t.map((o) => e.find((i) => i.id === o)).filter(Boolean), ...r];
}
const fo = {
    getInitialState: (e) => ({ columnOrder: [], ...e }),
    getDefaultOptions: (e) => ({ onColumnOrderChange: ce('columnOrder', e) }),
    createColumn: (e, t) => {
      ((e.getIndex = j(
        (n) => [ze(t, n)],
        (n) => n.findIndex((r) => r.id === e.id),
        P(t.options, 'debugColumns'),
      )),
        (e.getIsFirstColumn = (n) => {
          var r;
          return ((r = ze(t, n)[0]) == null ? void 0 : r.id) === e.id;
        }),
        (e.getIsLastColumn = (n) => {
          var r;
          const s = ze(t, n);
          return ((r = s[s.length - 1]) == null ? void 0 : r.id) === e.id;
        }));
    },
    createTable: (e) => {
      ((e.setColumnOrder = (t) =>
        e.options.onColumnOrderChange == null
          ? void 0
          : e.options.onColumnOrderChange(t)),
        (e.resetColumnOrder = (t) => {
          var n;
          e.setColumnOrder(
            t ? [] : (n = e.initialState.columnOrder) != null ? n : [],
          );
        }),
        (e._getOrderColumnsFn = j(
          () => [
            e.getState().columnOrder,
            e.getState().grouping,
            e.options.groupedColumnMode,
          ],
          (t, n, r) => (s) => {
            let o = [];
            if (!(t != null && t.length)) o = s;
            else {
              const i = [...t],
                l = [...s];
              for (; l.length && i.length; ) {
                const c = i.shift(),
                  u = l.findIndex((g) => g.id === c);
                u > -1 && o.push(l.splice(u, 1)[0]);
              }
              o = [...o, ...l];
            }
            return go(o, n, r);
          },
          P(e.options, 'debugTable'),
        )));
    },
  },
  _t = () => ({ left: [], right: [] }),
  po = {
    getInitialState: (e) => ({ columnPinning: _t(), ...e }),
    getDefaultOptions: (e) => ({
      onColumnPinningChange: ce('columnPinning', e),
    }),
    createColumn: (e, t) => {
      ((e.pin = (n) => {
        const r = e
          .getLeafColumns()
          .map((s) => s.id)
          .filter(Boolean);
        t.setColumnPinning((s) => {
          var o, i;
          if (n === 'right') {
            var l, c;
            return {
              left: ((l = s?.left) != null ? l : []).filter(
                (f) => !(r != null && r.includes(f)),
              ),
              right: [
                ...((c = s?.right) != null ? c : []).filter(
                  (f) => !(r != null && r.includes(f)),
                ),
                ...r,
              ],
            };
          }
          if (n === 'left') {
            var u, g;
            return {
              left: [
                ...((u = s?.left) != null ? u : []).filter(
                  (f) => !(r != null && r.includes(f)),
                ),
                ...r,
              ],
              right: ((g = s?.right) != null ? g : []).filter(
                (f) => !(r != null && r.includes(f)),
              ),
            };
          }
          return {
            left: ((o = s?.left) != null ? o : []).filter(
              (f) => !(r != null && r.includes(f)),
            ),
            right: ((i = s?.right) != null ? i : []).filter(
              (f) => !(r != null && r.includes(f)),
            ),
          };
        });
      }),
        (e.getCanPin = () =>
          e.getLeafColumns().some((r) => {
            var s, o, i;
            return (
              ((s = r.columnDef.enablePinning) != null ? s : !0) &&
              ((o =
                (i = t.options.enableColumnPinning) != null
                  ? i
                  : t.options.enablePinning) != null
                ? o
                : !0)
            );
          })),
        (e.getIsPinned = () => {
          const n = e.getLeafColumns().map((l) => l.id),
            { left: r, right: s } = t.getState().columnPinning,
            o = n.some((l) => r?.includes(l)),
            i = n.some((l) => s?.includes(l));
          return o ? 'left' : i ? 'right' : !1;
        }),
        (e.getPinnedIndex = () => {
          var n, r;
          const s = e.getIsPinned();
          return s
            ? (n =
                (r = t.getState().columnPinning) == null || (r = r[s]) == null
                  ? void 0
                  : r.indexOf(e.id)) != null
              ? n
              : -1
            : 0;
        }));
    },
    createRow: (e, t) => {
      ((e.getCenterVisibleCells = j(
        () => [
          e._getAllVisibleCells(),
          t.getState().columnPinning.left,
          t.getState().columnPinning.right,
        ],
        (n, r, s) => {
          const o = [...(r ?? []), ...(s ?? [])];
          return n.filter((i) => !o.includes(i.column.id));
        },
        P(t.options, 'debugRows'),
      )),
        (e.getLeftVisibleCells = j(
          () => [e._getAllVisibleCells(), t.getState().columnPinning.left],
          (n, r) =>
            (r ?? [])
              .map((o) => n.find((i) => i.column.id === o))
              .filter(Boolean)
              .map((o) => ({ ...o, position: 'left' })),
          P(t.options, 'debugRows'),
        )),
        (e.getRightVisibleCells = j(
          () => [e._getAllVisibleCells(), t.getState().columnPinning.right],
          (n, r) =>
            (r ?? [])
              .map((o) => n.find((i) => i.column.id === o))
              .filter(Boolean)
              .map((o) => ({ ...o, position: 'right' })),
          P(t.options, 'debugRows'),
        )));
    },
    createTable: (e) => {
      ((e.setColumnPinning = (t) =>
        e.options.onColumnPinningChange == null
          ? void 0
          : e.options.onColumnPinningChange(t)),
        (e.resetColumnPinning = (t) => {
          var n, r;
          return e.setColumnPinning(
            t
              ? _t()
              : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) !=
                  null
                ? n
                : _t(),
          );
        }),
        (e.getIsSomeColumnsPinned = (t) => {
          var n;
          const r = e.getState().columnPinning;
          if (!t) {
            var s, o;
            return !!(
              ((s = r.left) != null && s.length) ||
              ((o = r.right) != null && o.length)
            );
          }
          return !!((n = r[t]) != null && n.length);
        }),
        (e.getLeftLeafColumns = j(
          () => [e.getAllLeafColumns(), e.getState().columnPinning.left],
          (t, n) =>
            (n ?? []).map((r) => t.find((s) => s.id === r)).filter(Boolean),
          P(e.options, 'debugColumns'),
        )),
        (e.getRightLeafColumns = j(
          () => [e.getAllLeafColumns(), e.getState().columnPinning.right],
          (t, n) =>
            (n ?? []).map((r) => t.find((s) => s.id === r)).filter(Boolean),
          P(e.options, 'debugColumns'),
        )),
        (e.getCenterLeafColumns = j(
          () => [
            e.getAllLeafColumns(),
            e.getState().columnPinning.left,
            e.getState().columnPinning.right,
          ],
          (t, n, r) => {
            const s = [...(n ?? []), ...(r ?? [])];
            return t.filter((o) => !s.includes(o.id));
          },
          P(e.options, 'debugColumns'),
        )));
    },
  };
function mo(e) {
  return e || (typeof document < 'u' ? document : null);
}
const Ze = { size: 150, minSize: 20, maxSize: Number.MAX_SAFE_INTEGER },
  bt = () => ({
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: !1,
    columnSizingStart: [],
  }),
  ho = {
    getDefaultColumnDef: () => Ze,
    getInitialState: (e) => ({
      columnSizing: {},
      columnSizingInfo: bt(),
      ...e,
    }),
    getDefaultOptions: (e) => ({
      columnResizeMode: 'onEnd',
      columnResizeDirection: 'ltr',
      onColumnSizingChange: ce('columnSizing', e),
      onColumnSizingInfoChange: ce('columnSizingInfo', e),
    }),
    createColumn: (e, t) => {
      ((e.getSize = () => {
        var n, r, s;
        const o = t.getState().columnSizing[e.id];
        return Math.min(
          Math.max(
            (n = e.columnDef.minSize) != null ? n : Ze.minSize,
            (r = o ?? e.columnDef.size) != null ? r : Ze.size,
          ),
          (s = e.columnDef.maxSize) != null ? s : Ze.maxSize,
        );
      }),
        (e.getStart = j(
          (n) => [n, ze(t, n), t.getState().columnSizing],
          (n, r) =>
            r.slice(0, e.getIndex(n)).reduce((s, o) => s + o.getSize(), 0),
          P(t.options, 'debugColumns'),
        )),
        (e.getAfter = j(
          (n) => [n, ze(t, n), t.getState().columnSizing],
          (n, r) =>
            r.slice(e.getIndex(n) + 1).reduce((s, o) => s + o.getSize(), 0),
          P(t.options, 'debugColumns'),
        )),
        (e.resetSize = () => {
          t.setColumnSizing((n) => {
            let { [e.id]: r, ...s } = n;
            return s;
          });
        }),
        (e.getCanResize = () => {
          var n, r;
          return (
            ((n = e.columnDef.enableResizing) != null ? n : !0) &&
            ((r = t.options.enableColumnResizing) != null ? r : !0)
          );
        }),
        (e.getIsResizing = () =>
          t.getState().columnSizingInfo.isResizingColumn === e.id));
    },
    createHeader: (e, t) => {
      ((e.getSize = () => {
        let n = 0;
        const r = (s) => {
          if (s.subHeaders.length) s.subHeaders.forEach(r);
          else {
            var o;
            n += (o = s.column.getSize()) != null ? o : 0;
          }
        };
        return (r(e), n);
      }),
        (e.getStart = () => {
          if (e.index > 0) {
            const n = e.headerGroup.headers[e.index - 1];
            return n.getStart() + n.getSize();
          }
          return 0;
        }),
        (e.getResizeHandler = (n) => {
          const r = t.getColumn(e.column.id),
            s = r?.getCanResize();
          return (o) => {
            if (
              !r ||
              !s ||
              (o.persist == null || o.persist(),
              Et(o) && o.touches && o.touches.length > 1)
            )
              return;
            const i = e.getSize(),
              l = e
                ? e
                    .getLeafHeaders()
                    .map((w) => [w.column.id, w.column.getSize()])
                : [[r.id, r.getSize()]],
              c = Et(o) ? Math.round(o.touches[0].clientX) : o.clientX,
              u = {},
              g = (w, b) => {
                typeof b == 'number' &&
                  (t.setColumnSizingInfo((E) => {
                    var I, R;
                    const v =
                        t.options.columnResizeDirection === 'rtl' ? -1 : 1,
                      N = (b - ((I = E?.startOffset) != null ? I : 0)) * v,
                      _ = Math.max(
                        N / ((R = E?.startSize) != null ? R : 0),
                        -0.999999,
                      );
                    return (
                      E.columnSizingStart.forEach((k) => {
                        let [H, W] = k;
                        u[H] = Math.round(Math.max(W + W * _, 0) * 100) / 100;
                      }),
                      { ...E, deltaOffset: N, deltaPercentage: _ }
                    );
                  }),
                  (t.options.columnResizeMode === 'onChange' || w === 'end') &&
                    t.setColumnSizing((E) => ({ ...E, ...u })));
              },
              f = (w) => g('move', w),
              p = (w) => {
                (g('end', w),
                  t.setColumnSizingInfo((b) => ({
                    ...b,
                    isResizingColumn: !1,
                    startOffset: null,
                    startSize: null,
                    deltaOffset: null,
                    deltaPercentage: null,
                    columnSizingStart: [],
                  })));
              },
              d = mo(n),
              m = {
                moveHandler: (w) => f(w.clientX),
                upHandler: (w) => {
                  (d?.removeEventListener('mousemove', m.moveHandler),
                    d?.removeEventListener('mouseup', m.upHandler),
                    p(w.clientX));
                },
              },
              h = {
                moveHandler: (w) => (
                  w.cancelable && (w.preventDefault(), w.stopPropagation()),
                  f(w.touches[0].clientX),
                  !1
                ),
                upHandler: (w) => {
                  var b;
                  (d?.removeEventListener('touchmove', h.moveHandler),
                    d?.removeEventListener('touchend', h.upHandler),
                    w.cancelable && (w.preventDefault(), w.stopPropagation()),
                    p((b = w.touches[0]) == null ? void 0 : b.clientX));
                },
              },
              y = xo() ? { passive: !1 } : !1;
            (Et(o)
              ? (d?.addEventListener('touchmove', h.moveHandler, y),
                d?.addEventListener('touchend', h.upHandler, y))
              : (d?.addEventListener('mousemove', m.moveHandler, y),
                d?.addEventListener('mouseup', m.upHandler, y)),
              t.setColumnSizingInfo((w) => ({
                ...w,
                startOffset: c,
                startSize: i,
                deltaOffset: 0,
                deltaPercentage: 0,
                columnSizingStart: l,
                isResizingColumn: r.id,
              })));
          };
        }));
    },
    createTable: (e) => {
      ((e.setColumnSizing = (t) =>
        e.options.onColumnSizingChange == null
          ? void 0
          : e.options.onColumnSizingChange(t)),
        (e.setColumnSizingInfo = (t) =>
          e.options.onColumnSizingInfoChange == null
            ? void 0
            : e.options.onColumnSizingInfoChange(t)),
        (e.resetColumnSizing = (t) => {
          var n;
          e.setColumnSizing(
            t ? {} : (n = e.initialState.columnSizing) != null ? n : {},
          );
        }),
        (e.resetHeaderSizeInfo = (t) => {
          var n;
          e.setColumnSizingInfo(
            t ? bt() : (n = e.initialState.columnSizingInfo) != null ? n : bt(),
          );
        }),
        (e.getTotalSize = () => {
          var t, n;
          return (t =
            (n = e.getHeaderGroups()[0]) == null
              ? void 0
              : n.headers.reduce((r, s) => r + s.getSize(), 0)) != null
            ? t
            : 0;
        }),
        (e.getLeftTotalSize = () => {
          var t, n;
          return (t =
            (n = e.getLeftHeaderGroups()[0]) == null
              ? void 0
              : n.headers.reduce((r, s) => r + s.getSize(), 0)) != null
            ? t
            : 0;
        }),
        (e.getCenterTotalSize = () => {
          var t, n;
          return (t =
            (n = e.getCenterHeaderGroups()[0]) == null
              ? void 0
              : n.headers.reduce((r, s) => r + s.getSize(), 0)) != null
            ? t
            : 0;
        }),
        (e.getRightTotalSize = () => {
          var t, n;
          return (t =
            (n = e.getRightHeaderGroups()[0]) == null
              ? void 0
              : n.headers.reduce((r, s) => r + s.getSize(), 0)) != null
            ? t
            : 0;
        }));
    },
  };
let et = null;
function xo() {
  if (typeof et == 'boolean') return et;
  let e = !1;
  try {
    const t = {
        get passive() {
          return ((e = !0), !1);
        },
      },
      n = () => {};
    (window.addEventListener('test', n, t),
      window.removeEventListener('test', n));
  } catch {
    e = !1;
  }
  return ((et = e), et);
}
function Et(e) {
  return e.type === 'touchstart';
}
const wo = {
  getInitialState: (e) => ({ columnVisibility: {}, ...e }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: ce('columnVisibility', e),
  }),
  createColumn: (e, t) => {
    ((e.toggleVisibility = (n) => {
      e.getCanHide() &&
        t.setColumnVisibility((r) => ({
          ...r,
          [e.id]: n ?? !e.getIsVisible(),
        }));
    }),
      (e.getIsVisible = () => {
        var n, r;
        const s = e.columns;
        return (n = s.length
          ? s.some((o) => o.getIsVisible())
          : (r = t.getState().columnVisibility) == null
            ? void 0
            : r[e.id]) != null
          ? n
          : !0;
      }),
      (e.getCanHide = () => {
        var n, r;
        return (
          ((n = e.columnDef.enableHiding) != null ? n : !0) &&
          ((r = t.options.enableHiding) != null ? r : !0)
        );
      }),
      (e.getToggleVisibilityHandler = () => (n) => {
        e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
      }));
  },
  createRow: (e, t) => {
    ((e._getAllVisibleCells = j(
      () => [e.getAllCells(), t.getState().columnVisibility],
      (n) => n.filter((r) => r.column.getIsVisible()),
      P(t.options, 'debugRows'),
    )),
      (e.getVisibleCells = j(
        () => [
          e.getLeftVisibleCells(),
          e.getCenterVisibleCells(),
          e.getRightVisibleCells(),
        ],
        (n, r, s) => [...n, ...r, ...s],
        P(t.options, 'debugRows'),
      )));
  },
  createTable: (e) => {
    const t = (n, r) =>
      j(
        () => [
          r(),
          r()
            .filter((s) => s.getIsVisible())
            .map((s) => s.id)
            .join('_'),
        ],
        (s) =>
          s.filter((o) => (o.getIsVisible == null ? void 0 : o.getIsVisible())),
        P(e.options, 'debugColumns'),
      );
    ((e.getVisibleFlatColumns = t('getVisibleFlatColumns', () =>
      e.getAllFlatColumns(),
    )),
      (e.getVisibleLeafColumns = t('getVisibleLeafColumns', () =>
        e.getAllLeafColumns(),
      )),
      (e.getLeftVisibleLeafColumns = t('getLeftVisibleLeafColumns', () =>
        e.getLeftLeafColumns(),
      )),
      (e.getRightVisibleLeafColumns = t('getRightVisibleLeafColumns', () =>
        e.getRightLeafColumns(),
      )),
      (e.getCenterVisibleLeafColumns = t('getCenterVisibleLeafColumns', () =>
        e.getCenterLeafColumns(),
      )),
      (e.setColumnVisibility = (n) =>
        e.options.onColumnVisibilityChange == null
          ? void 0
          : e.options.onColumnVisibilityChange(n)),
      (e.resetColumnVisibility = (n) => {
        var r;
        e.setColumnVisibility(
          n ? {} : (r = e.initialState.columnVisibility) != null ? r : {},
        );
      }),
      (e.toggleAllColumnsVisible = (n) => {
        var r;
        ((n = (r = n) != null ? r : !e.getIsAllColumnsVisible()),
          e.setColumnVisibility(
            e
              .getAllLeafColumns()
              .reduce(
                (s, o) => ({
                  ...s,
                  [o.id]: n || !(o.getCanHide != null && o.getCanHide()),
                }),
                {},
              ),
          ));
      }),
      (e.getIsAllColumnsVisible = () =>
        !e
          .getAllLeafColumns()
          .some((n) => !(n.getIsVisible != null && n.getIsVisible()))),
      (e.getIsSomeColumnsVisible = () =>
        e
          .getAllLeafColumns()
          .some((n) => (n.getIsVisible == null ? void 0 : n.getIsVisible()))),
      (e.getToggleAllColumnsVisibilityHandler = () => (n) => {
        var r;
        e.toggleAllColumnsVisible((r = n.target) == null ? void 0 : r.checked);
      }));
  },
};
function ze(e, t) {
  return t
    ? t === 'center'
      ? e.getCenterVisibleLeafColumns()
      : t === 'left'
        ? e.getLeftVisibleLeafColumns()
        : e.getRightVisibleLeafColumns()
    : e.getVisibleLeafColumns();
}
const vo = {
    createTable: (e) => {
      ((e._getGlobalFacetedRowModel =
        e.options.getFacetedRowModel &&
        e.options.getFacetedRowModel(e, '__global__')),
        (e.getGlobalFacetedRowModel = () =>
          e.options.manualFiltering || !e._getGlobalFacetedRowModel
            ? e.getPreFilteredRowModel()
            : e._getGlobalFacetedRowModel()),
        (e._getGlobalFacetedUniqueValues =
          e.options.getFacetedUniqueValues &&
          e.options.getFacetedUniqueValues(e, '__global__')),
        (e.getGlobalFacetedUniqueValues = () =>
          e._getGlobalFacetedUniqueValues
            ? e._getGlobalFacetedUniqueValues()
            : new Map()),
        (e._getGlobalFacetedMinMaxValues =
          e.options.getFacetedMinMaxValues &&
          e.options.getFacetedMinMaxValues(e, '__global__')),
        (e.getGlobalFacetedMinMaxValues = () => {
          if (e._getGlobalFacetedMinMaxValues)
            return e._getGlobalFacetedMinMaxValues();
        }));
    },
  },
  yo = {
    getInitialState: (e) => ({ globalFilter: void 0, ...e }),
    getDefaultOptions: (e) => ({
      onGlobalFilterChange: ce('globalFilter', e),
      globalFilterFn: 'auto',
      getColumnCanGlobalFilter: (t) => {
        var n;
        const r =
          (n = e.getCoreRowModel().flatRows[0]) == null ||
          (n = n._getAllCellsByColumnId()[t.id]) == null
            ? void 0
            : n.getValue();
        return typeof r == 'string' || typeof r == 'number';
      },
    }),
    createColumn: (e, t) => {
      e.getCanGlobalFilter = () => {
        var n, r, s, o;
        return (
          ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) &&
          ((r = t.options.enableGlobalFilter) != null ? r : !0) &&
          ((s = t.options.enableFilters) != null ? s : !0) &&
          ((o =
            t.options.getColumnCanGlobalFilter == null
              ? void 0
              : t.options.getColumnCanGlobalFilter(e)) != null
            ? o
            : !0) &&
          !!e.accessorFn
        );
      };
    },
    createTable: (e) => {
      ((e.getGlobalAutoFilterFn = () => Se.includesString),
        (e.getGlobalFilterFn = () => {
          var t, n;
          const { globalFilterFn: r } = e.options;
          return pt(r)
            ? r
            : r === 'auto'
              ? e.getGlobalAutoFilterFn()
              : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null
                ? t
                : Se[r];
        }),
        (e.setGlobalFilter = (t) => {
          e.options.onGlobalFilterChange == null ||
            e.options.onGlobalFilterChange(t);
        }),
        (e.resetGlobalFilter = (t) => {
          e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
        }));
    },
  },
  So = {
    getInitialState: (e) => ({ expanded: {}, ...e }),
    getDefaultOptions: (e) => ({
      onExpandedChange: ce('expanded', e),
      paginateExpandedRows: !0,
    }),
    createTable: (e) => {
      let t = !1,
        n = !1;
      ((e._autoResetExpanded = () => {
        var r, s;
        if (!t) {
          e._queue(() => {
            t = !0;
          });
          return;
        }
        if (
          (r =
            (s = e.options.autoResetAll) != null
              ? s
              : e.options.autoResetExpanded) != null
            ? r
            : !e.options.manualExpanding
        ) {
          if (n) return;
          ((n = !0),
            e._queue(() => {
              (e.resetExpanded(), (n = !1));
            }));
        }
      }),
        (e.setExpanded = (r) =>
          e.options.onExpandedChange == null
            ? void 0
            : e.options.onExpandedChange(r)),
        (e.toggleAllRowsExpanded = (r) => {
          (r ?? !e.getIsAllRowsExpanded())
            ? e.setExpanded(!0)
            : e.setExpanded({});
        }),
        (e.resetExpanded = (r) => {
          var s, o;
          e.setExpanded(
            r
              ? {}
              : (s = (o = e.initialState) == null ? void 0 : o.expanded) != null
                ? s
                : {},
          );
        }),
        (e.getCanSomeRowsExpand = () =>
          e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand())),
        (e.getToggleAllRowsExpandedHandler = () => (r) => {
          (r.persist == null || r.persist(), e.toggleAllRowsExpanded());
        }),
        (e.getIsSomeRowsExpanded = () => {
          const r = e.getState().expanded;
          return r === !0 || Object.values(r).some(Boolean);
        }),
        (e.getIsAllRowsExpanded = () => {
          const r = e.getState().expanded;
          return typeof r == 'boolean'
            ? r === !0
            : !(
                !Object.keys(r).length ||
                e.getRowModel().flatRows.some((s) => !s.getIsExpanded())
              );
        }),
        (e.getExpandedDepth = () => {
          let r = 0;
          return (
            (e.getState().expanded === !0
              ? Object.keys(e.getRowModel().rowsById)
              : Object.keys(e.getState().expanded)
            ).forEach((o) => {
              const i = o.split('.');
              r = Math.max(r, i.length);
            }),
            r
          );
        }),
        (e.getPreExpandedRowModel = () => e.getSortedRowModel()),
        (e.getExpandedRowModel = () => (
          !e._getExpandedRowModel &&
            e.options.getExpandedRowModel &&
            (e._getExpandedRowModel = e.options.getExpandedRowModel(e)),
          e.options.manualExpanding || !e._getExpandedRowModel
            ? e.getPreExpandedRowModel()
            : e._getExpandedRowModel()
        )));
    },
    createRow: (e, t) => {
      ((e.toggleExpanded = (n) => {
        t.setExpanded((r) => {
          var s;
          const o = r === !0 ? !0 : !!(r != null && r[e.id]);
          let i = {};
          if (
            (r === !0
              ? Object.keys(t.getRowModel().rowsById).forEach((l) => {
                  i[l] = !0;
                })
              : (i = r),
            (n = (s = n) != null ? s : !o),
            !o && n)
          )
            return { ...i, [e.id]: !0 };
          if (o && !n) {
            const { [e.id]: l, ...c } = i;
            return c;
          }
          return r;
        });
      }),
        (e.getIsExpanded = () => {
          var n;
          const r = t.getState().expanded;
          return !!((n =
            t.options.getIsRowExpanded == null
              ? void 0
              : t.options.getIsRowExpanded(e)) != null
            ? n
            : r === !0 || r?.[e.id]);
        }),
        (e.getCanExpand = () => {
          var n, r, s;
          return (n =
            t.options.getRowCanExpand == null
              ? void 0
              : t.options.getRowCanExpand(e)) != null
            ? n
            : ((r = t.options.enableExpanding) != null ? r : !0) &&
                !!((s = e.subRows) != null && s.length);
        }),
        (e.getIsAllParentsExpanded = () => {
          let n = !0,
            r = e;
          for (; n && r.parentId; )
            ((r = t.getRow(r.parentId, !0)), (n = r.getIsExpanded()));
          return n;
        }),
        (e.getToggleExpandedHandler = () => {
          const n = e.getCanExpand();
          return () => {
            n && e.toggleExpanded();
          };
        }));
    },
  },
  Ot = 0,
  Vt = 10,
  It = () => ({ pageIndex: Ot, pageSize: Vt }),
  Co = {
    getInitialState: (e) => ({
      ...e,
      pagination: { ...It(), ...e?.pagination },
    }),
    getDefaultOptions: (e) => ({ onPaginationChange: ce('pagination', e) }),
    createTable: (e) => {
      let t = !1,
        n = !1;
      ((e._autoResetPageIndex = () => {
        var r, s;
        if (!t) {
          e._queue(() => {
            t = !0;
          });
          return;
        }
        if (
          (r =
            (s = e.options.autoResetAll) != null
              ? s
              : e.options.autoResetPageIndex) != null
            ? r
            : !e.options.manualPagination
        ) {
          if (n) return;
          ((n = !0),
            e._queue(() => {
              (e.resetPageIndex(), (n = !1));
            }));
        }
      }),
        (e.setPagination = (r) => {
          const s = (o) => Ee(r, o);
          return e.options.onPaginationChange == null
            ? void 0
            : e.options.onPaginationChange(s);
        }),
        (e.resetPagination = (r) => {
          var s;
          e.setPagination(
            r ? It() : (s = e.initialState.pagination) != null ? s : It(),
          );
        }),
        (e.setPageIndex = (r) => {
          e.setPagination((s) => {
            let o = Ee(r, s.pageIndex);
            const i =
              typeof e.options.pageCount > 'u' || e.options.pageCount === -1
                ? Number.MAX_SAFE_INTEGER
                : e.options.pageCount - 1;
            return ((o = Math.max(0, Math.min(o, i))), { ...s, pageIndex: o });
          });
        }),
        (e.resetPageIndex = (r) => {
          var s, o;
          e.setPageIndex(
            r
              ? Ot
              : (s =
                    (o = e.initialState) == null || (o = o.pagination) == null
                      ? void 0
                      : o.pageIndex) != null
                ? s
                : Ot,
          );
        }),
        (e.resetPageSize = (r) => {
          var s, o;
          e.setPageSize(
            r
              ? Vt
              : (s =
                    (o = e.initialState) == null || (o = o.pagination) == null
                      ? void 0
                      : o.pageSize) != null
                ? s
                : Vt,
          );
        }),
        (e.setPageSize = (r) => {
          e.setPagination((s) => {
            const o = Math.max(1, Ee(r, s.pageSize)),
              i = s.pageSize * s.pageIndex,
              l = Math.floor(i / o);
            return { ...s, pageIndex: l, pageSize: o };
          });
        }),
        (e.setPageCount = (r) =>
          e.setPagination((s) => {
            var o;
            let i = Ee(r, (o = e.options.pageCount) != null ? o : -1);
            return (
              typeof i == 'number' && (i = Math.max(-1, i)),
              { ...s, pageCount: i }
            );
          })),
        (e.getPageOptions = j(
          () => [e.getPageCount()],
          (r) => {
            let s = [];
            return (
              r && r > 0 && (s = [...new Array(r)].fill(null).map((o, i) => i)),
              s
            );
          },
          P(e.options, 'debugTable'),
        )),
        (e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0),
        (e.getCanNextPage = () => {
          const { pageIndex: r } = e.getState().pagination,
            s = e.getPageCount();
          return s === -1 ? !0 : s === 0 ? !1 : r < s - 1;
        }),
        (e.previousPage = () => e.setPageIndex((r) => r - 1)),
        (e.nextPage = () => e.setPageIndex((r) => r + 1)),
        (e.firstPage = () => e.setPageIndex(0)),
        (e.lastPage = () => e.setPageIndex(e.getPageCount() - 1)),
        (e.getPrePaginationRowModel = () => e.getExpandedRowModel()),
        (e.getPaginationRowModel = () => (
          !e._getPaginationRowModel &&
            e.options.getPaginationRowModel &&
            (e._getPaginationRowModel = e.options.getPaginationRowModel(e)),
          e.options.manualPagination || !e._getPaginationRowModel
            ? e.getPrePaginationRowModel()
            : e._getPaginationRowModel()
        )),
        (e.getPageCount = () => {
          var r;
          return (r = e.options.pageCount) != null
            ? r
            : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
        }),
        (e.getRowCount = () => {
          var r;
          return (r = e.options.rowCount) != null
            ? r
            : e.getPrePaginationRowModel().rows.length;
        }));
    },
  },
  Nt = () => ({ top: [], bottom: [] }),
  Ro = {
    getInitialState: (e) => ({ rowPinning: Nt(), ...e }),
    getDefaultOptions: (e) => ({ onRowPinningChange: ce('rowPinning', e) }),
    createRow: (e, t) => {
      ((e.pin = (n, r, s) => {
        const o = r
            ? e.getLeafRows().map((c) => {
                let { id: u } = c;
                return u;
              })
            : [],
          i = s
            ? e.getParentRows().map((c) => {
                let { id: u } = c;
                return u;
              })
            : [],
          l = new Set([...i, e.id, ...o]);
        t.setRowPinning((c) => {
          var u, g;
          if (n === 'bottom') {
            var f, p;
            return {
              top: ((f = c?.top) != null ? f : []).filter(
                (h) => !(l != null && l.has(h)),
              ),
              bottom: [
                ...((p = c?.bottom) != null ? p : []).filter(
                  (h) => !(l != null && l.has(h)),
                ),
                ...Array.from(l),
              ],
            };
          }
          if (n === 'top') {
            var d, m;
            return {
              top: [
                ...((d = c?.top) != null ? d : []).filter(
                  (h) => !(l != null && l.has(h)),
                ),
                ...Array.from(l),
              ],
              bottom: ((m = c?.bottom) != null ? m : []).filter(
                (h) => !(l != null && l.has(h)),
              ),
            };
          }
          return {
            top: ((u = c?.top) != null ? u : []).filter(
              (h) => !(l != null && l.has(h)),
            ),
            bottom: ((g = c?.bottom) != null ? g : []).filter(
              (h) => !(l != null && l.has(h)),
            ),
          };
        });
      }),
        (e.getCanPin = () => {
          var n;
          const { enableRowPinning: r, enablePinning: s } = t.options;
          return typeof r == 'function' ? r(e) : (n = r ?? s) != null ? n : !0;
        }),
        (e.getIsPinned = () => {
          const n = [e.id],
            { top: r, bottom: s } = t.getState().rowPinning,
            o = n.some((l) => r?.includes(l)),
            i = n.some((l) => s?.includes(l));
          return o ? 'top' : i ? 'bottom' : !1;
        }),
        (e.getPinnedIndex = () => {
          var n, r;
          const s = e.getIsPinned();
          if (!s) return -1;
          const o =
            (n = s === 'top' ? t.getTopRows() : t.getBottomRows()) == null
              ? void 0
              : n.map((i) => {
                  let { id: l } = i;
                  return l;
                });
          return (r = o?.indexOf(e.id)) != null ? r : -1;
        }));
    },
    createTable: (e) => {
      ((e.setRowPinning = (t) =>
        e.options.onRowPinningChange == null
          ? void 0
          : e.options.onRowPinningChange(t)),
        (e.resetRowPinning = (t) => {
          var n, r;
          return e.setRowPinning(
            t
              ? Nt()
              : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) !=
                  null
                ? n
                : Nt(),
          );
        }),
        (e.getIsSomeRowsPinned = (t) => {
          var n;
          const r = e.getState().rowPinning;
          if (!t) {
            var s, o;
            return !!(
              ((s = r.top) != null && s.length) ||
              ((o = r.bottom) != null && o.length)
            );
          }
          return !!((n = r[t]) != null && n.length);
        }),
        (e._getPinnedRows = (t, n, r) => {
          var s;
          return (
            (s = e.options.keepPinnedRows) == null || s
              ? (n ?? []).map((i) => {
                  const l = e.getRow(i, !0);
                  return l.getIsAllParentsExpanded() ? l : null;
                })
              : (n ?? []).map((i) => t.find((l) => l.id === i))
          )
            .filter(Boolean)
            .map((i) => ({ ...i, position: r }));
        }),
        (e.getTopRows = j(
          () => [e.getRowModel().rows, e.getState().rowPinning.top],
          (t, n) => e._getPinnedRows(t, n, 'top'),
          P(e.options, 'debugRows'),
        )),
        (e.getBottomRows = j(
          () => [e.getRowModel().rows, e.getState().rowPinning.bottom],
          (t, n) => e._getPinnedRows(t, n, 'bottom'),
          P(e.options, 'debugRows'),
        )),
        (e.getCenterRows = j(
          () => [
            e.getRowModel().rows,
            e.getState().rowPinning.top,
            e.getState().rowPinning.bottom,
          ],
          (t, n, r) => {
            const s = new Set([...(n ?? []), ...(r ?? [])]);
            return t.filter((o) => !s.has(o.id));
          },
          P(e.options, 'debugRows'),
        )));
    },
  },
  _o = {
    getInitialState: (e) => ({ rowSelection: {}, ...e }),
    getDefaultOptions: (e) => ({
      onRowSelectionChange: ce('rowSelection', e),
      enableRowSelection: !0,
      enableMultiRowSelection: !0,
      enableSubRowSelection: !0,
    }),
    createTable: (e) => {
      ((e.setRowSelection = (t) =>
        e.options.onRowSelectionChange == null
          ? void 0
          : e.options.onRowSelectionChange(t)),
        (e.resetRowSelection = (t) => {
          var n;
          return e.setRowSelection(
            t ? {} : (n = e.initialState.rowSelection) != null ? n : {},
          );
        }),
        (e.toggleAllRowsSelected = (t) => {
          e.setRowSelection((n) => {
            t = typeof t < 'u' ? t : !e.getIsAllRowsSelected();
            const r = { ...n },
              s = e.getPreGroupedRowModel().flatRows;
            return (
              t
                ? s.forEach((o) => {
                    o.getCanSelect() && (r[o.id] = !0);
                  })
                : s.forEach((o) => {
                    delete r[o.id];
                  }),
              r
            );
          });
        }),
        (e.toggleAllPageRowsSelected = (t) =>
          e.setRowSelection((n) => {
            const r = typeof t < 'u' ? t : !e.getIsAllPageRowsSelected(),
              s = { ...n };
            return (
              e.getRowModel().rows.forEach((o) => {
                Lt(s, o.id, r, !0, e);
              }),
              s
            );
          })),
        (e.getPreSelectedRowModel = () => e.getCoreRowModel()),
        (e.getSelectedRowModel = j(
          () => [e.getState().rowSelection, e.getCoreRowModel()],
          (t, n) =>
            Object.keys(t).length
              ? jt(e, n)
              : { rows: [], flatRows: [], rowsById: {} },
          P(e.options, 'debugTable'),
        )),
        (e.getFilteredSelectedRowModel = j(
          () => [e.getState().rowSelection, e.getFilteredRowModel()],
          (t, n) =>
            Object.keys(t).length
              ? jt(e, n)
              : { rows: [], flatRows: [], rowsById: {} },
          P(e.options, 'debugTable'),
        )),
        (e.getGroupedSelectedRowModel = j(
          () => [e.getState().rowSelection, e.getSortedRowModel()],
          (t, n) =>
            Object.keys(t).length
              ? jt(e, n)
              : { rows: [], flatRows: [], rowsById: {} },
          P(e.options, 'debugTable'),
        )),
        (e.getIsAllRowsSelected = () => {
          const t = e.getFilteredRowModel().flatRows,
            { rowSelection: n } = e.getState();
          let r = !!(t.length && Object.keys(n).length);
          return (
            r && t.some((s) => s.getCanSelect() && !n[s.id]) && (r = !1),
            r
          );
        }),
        (e.getIsAllPageRowsSelected = () => {
          const t = e
              .getPaginationRowModel()
              .flatRows.filter((s) => s.getCanSelect()),
            { rowSelection: n } = e.getState();
          let r = !!t.length;
          return (r && t.some((s) => !n[s.id]) && (r = !1), r);
        }),
        (e.getIsSomeRowsSelected = () => {
          var t;
          const n = Object.keys(
            (t = e.getState().rowSelection) != null ? t : {},
          ).length;
          return n > 0 && n < e.getFilteredRowModel().flatRows.length;
        }),
        (e.getIsSomePageRowsSelected = () => {
          const t = e.getPaginationRowModel().flatRows;
          return e.getIsAllPageRowsSelected()
            ? !1
            : t
                .filter((n) => n.getCanSelect())
                .some((n) => n.getIsSelected() || n.getIsSomeSelected());
        }),
        (e.getToggleAllRowsSelectedHandler = () => (t) => {
          e.toggleAllRowsSelected(t.target.checked);
        }),
        (e.getToggleAllPageRowsSelectedHandler = () => (t) => {
          e.toggleAllPageRowsSelected(t.target.checked);
        }));
    },
    createRow: (e, t) => {
      ((e.toggleSelected = (n, r) => {
        const s = e.getIsSelected();
        t.setRowSelection((o) => {
          var i;
          if (((n = typeof n < 'u' ? n : !s), e.getCanSelect() && s === n))
            return o;
          const l = { ...o };
          return (
            Lt(l, e.id, n, (i = r?.selectChildren) != null ? i : !0, t),
            l
          );
        });
      }),
        (e.getIsSelected = () => {
          const { rowSelection: n } = t.getState();
          return ln(e, n);
        }),
        (e.getIsSomeSelected = () => {
          const { rowSelection: n } = t.getState();
          return zt(e, n) === 'some';
        }),
        (e.getIsAllSubRowsSelected = () => {
          const { rowSelection: n } = t.getState();
          return zt(e, n) === 'all';
        }),
        (e.getCanSelect = () => {
          var n;
          return typeof t.options.enableRowSelection == 'function'
            ? t.options.enableRowSelection(e)
            : (n = t.options.enableRowSelection) != null
              ? n
              : !0;
        }),
        (e.getCanSelectSubRows = () => {
          var n;
          return typeof t.options.enableSubRowSelection == 'function'
            ? t.options.enableSubRowSelection(e)
            : (n = t.options.enableSubRowSelection) != null
              ? n
              : !0;
        }),
        (e.getCanMultiSelect = () => {
          var n;
          return typeof t.options.enableMultiRowSelection == 'function'
            ? t.options.enableMultiRowSelection(e)
            : (n = t.options.enableMultiRowSelection) != null
              ? n
              : !0;
        }),
        (e.getToggleSelectedHandler = () => {
          const n = e.getCanSelect();
          return (r) => {
            var s;
            n && e.toggleSelected((s = r.target) == null ? void 0 : s.checked);
          };
        }));
    },
  },
  Lt = (e, t, n, r, s) => {
    var o;
    const i = s.getRow(t, !0);
    (n
      ? (i.getCanMultiSelect() || Object.keys(e).forEach((l) => delete e[l]),
        i.getCanSelect() && (e[t] = !0))
      : delete e[t],
      r &&
        (o = i.subRows) != null &&
        o.length &&
        i.getCanSelectSubRows() &&
        i.subRows.forEach((l) => Lt(e, l.id, n, r, s)));
  };
function jt(e, t) {
  const n = e.getState().rowSelection,
    r = [],
    s = {},
    o = function (i, l) {
      return i
        .map((c) => {
          var u;
          const g = ln(c, n);
          if (
            (g && (r.push(c), (s[c.id] = c)),
            (u = c.subRows) != null &&
              u.length &&
              (c = { ...c, subRows: o(c.subRows) }),
            g)
          )
            return c;
        })
        .filter(Boolean);
    };
  return { rows: o(t.rows), flatRows: r, rowsById: s };
}
function ln(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function zt(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let s = !0,
    o = !1;
  return (
    e.subRows.forEach((i) => {
      if (
        !(o && !s) &&
        (i.getCanSelect() && (ln(i, t) ? (o = !0) : (s = !1)),
        i.subRows && i.subRows.length)
      ) {
        const l = zt(i, t);
        l === 'all' ? (o = !0) : (l === 'some' && (o = !0), (s = !1));
      }
    }),
    s ? 'all' : o ? 'some' : !1
  );
}
const Ht = /([0-9]+)/gm,
  bo = (e, t, n) =>
    lr(Ne(e.getValue(n)).toLowerCase(), Ne(t.getValue(n)).toLowerCase()),
  Eo = (e, t, n) => lr(Ne(e.getValue(n)), Ne(t.getValue(n))),
  Io = (e, t, n) =>
    cn(Ne(e.getValue(n)).toLowerCase(), Ne(t.getValue(n)).toLowerCase()),
  No = (e, t, n) => cn(Ne(e.getValue(n)), Ne(t.getValue(n))),
  jo = (e, t, n) => {
    const r = e.getValue(n),
      s = t.getValue(n);
    return r > s ? 1 : r < s ? -1 : 0;
  },
  Po = (e, t, n) => cn(e.getValue(n), t.getValue(n));
function cn(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function Ne(e) {
  return typeof e == 'number'
    ? isNaN(e) || e === 1 / 0 || e === -1 / 0
      ? ''
      : String(e)
    : typeof e == 'string'
      ? e
      : '';
}
function lr(e, t) {
  const n = e.split(Ht).filter(Boolean),
    r = t.split(Ht).filter(Boolean);
  for (; n.length && r.length; ) {
    const s = n.shift(),
      o = r.shift(),
      i = parseInt(s, 10),
      l = parseInt(o, 10),
      c = [i, l].sort();
    if (isNaN(c[0])) {
      if (s > o) return 1;
      if (o > s) return -1;
      continue;
    }
    if (isNaN(c[1])) return isNaN(i) ? -1 : 1;
    if (i > l) return 1;
    if (l > i) return -1;
  }
  return n.length - r.length;
}
const Le = {
    alphanumeric: bo,
    alphanumericCaseSensitive: Eo,
    text: Io,
    textCaseSensitive: No,
    datetime: jo,
    basic: Po,
  },
  ko = {
    getInitialState: (e) => ({ sorting: [], ...e }),
    getDefaultColumnDef: () => ({ sortingFn: 'auto', sortUndefined: 1 }),
    getDefaultOptions: (e) => ({
      onSortingChange: ce('sorting', e),
      isMultiSortEvent: (t) => t.shiftKey,
    }),
    createColumn: (e, t) => {
      ((e.getAutoSortingFn = () => {
        const n = t.getFilteredRowModel().flatRows.slice(10);
        let r = !1;
        for (const s of n) {
          const o = s?.getValue(e.id);
          if (Object.prototype.toString.call(o) === '[object Date]')
            return Le.datetime;
          if (typeof o == 'string' && ((r = !0), o.split(Ht).length > 1))
            return Le.alphanumeric;
        }
        return r ? Le.text : Le.basic;
      }),
        (e.getAutoSortDir = () => {
          const n = t.getFilteredRowModel().flatRows[0];
          return typeof n?.getValue(e.id) == 'string' ? 'asc' : 'desc';
        }),
        (e.getSortingFn = () => {
          var n, r;
          if (!e) throw new Error();
          return pt(e.columnDef.sortingFn)
            ? e.columnDef.sortingFn
            : e.columnDef.sortingFn === 'auto'
              ? e.getAutoSortingFn()
              : (n =
                    (r = t.options.sortingFns) == null
                      ? void 0
                      : r[e.columnDef.sortingFn]) != null
                ? n
                : Le[e.columnDef.sortingFn];
        }),
        (e.toggleSorting = (n, r) => {
          const s = e.getNextSortingOrder(),
            o = typeof n < 'u' && n !== null;
          t.setSorting((i) => {
            const l = i?.find((d) => d.id === e.id),
              c = i?.findIndex((d) => d.id === e.id);
            let u = [],
              g,
              f = o ? n : s === 'desc';
            if (
              (i != null && i.length && e.getCanMultiSort() && r
                ? l
                  ? (g = 'toggle')
                  : (g = 'add')
                : i != null && i.length && c !== i.length - 1
                  ? (g = 'replace')
                  : l
                    ? (g = 'toggle')
                    : (g = 'replace'),
              g === 'toggle' && (o || s || (g = 'remove')),
              g === 'add')
            ) {
              var p;
              ((u = [...i, { id: e.id, desc: f }]),
                u.splice(
                  0,
                  u.length -
                    ((p = t.options.maxMultiSortColCount) != null
                      ? p
                      : Number.MAX_SAFE_INTEGER),
                ));
            } else
              g === 'toggle'
                ? (u = i.map((d) => (d.id === e.id ? { ...d, desc: f } : d)))
                : g === 'remove'
                  ? (u = i.filter((d) => d.id !== e.id))
                  : (u = [{ id: e.id, desc: f }]);
            return u;
          });
        }),
        (e.getFirstSortDir = () => {
          var n, r;
          return (
            (n =
              (r = e.columnDef.sortDescFirst) != null
                ? r
                : t.options.sortDescFirst) != null
              ? n
              : e.getAutoSortDir() === 'desc'
          )
            ? 'desc'
            : 'asc';
        }),
        (e.getNextSortingOrder = (n) => {
          var r, s;
          const o = e.getFirstSortDir(),
            i = e.getIsSorted();
          return i
            ? i !== o &&
              ((r = t.options.enableSortingRemoval) == null || r) &&
              (!(n && (s = t.options.enableMultiRemove) != null) || s)
              ? !1
              : i === 'desc'
                ? 'asc'
                : 'desc'
            : o;
        }),
        (e.getCanSort = () => {
          var n, r;
          return (
            ((n = e.columnDef.enableSorting) != null ? n : !0) &&
            ((r = t.options.enableSorting) != null ? r : !0) &&
            !!e.accessorFn
          );
        }),
        (e.getCanMultiSort = () => {
          var n, r;
          return (n =
            (r = e.columnDef.enableMultiSort) != null
              ? r
              : t.options.enableMultiSort) != null
            ? n
            : !!e.accessorFn;
        }),
        (e.getIsSorted = () => {
          var n;
          const r =
            (n = t.getState().sorting) == null
              ? void 0
              : n.find((s) => s.id === e.id);
          return r ? (r.desc ? 'desc' : 'asc') : !1;
        }),
        (e.getSortIndex = () => {
          var n, r;
          return (n =
            (r = t.getState().sorting) == null
              ? void 0
              : r.findIndex((s) => s.id === e.id)) != null
            ? n
            : -1;
        }),
        (e.clearSorting = () => {
          t.setSorting((n) =>
            n != null && n.length ? n.filter((r) => r.id !== e.id) : [],
          );
        }),
        (e.getToggleSortingHandler = () => {
          const n = e.getCanSort();
          return (r) => {
            n &&
              (r.persist == null || r.persist(),
              e.toggleSorting == null ||
                e.toggleSorting(
                  void 0,
                  e.getCanMultiSort()
                    ? t.options.isMultiSortEvent == null
                      ? void 0
                      : t.options.isMultiSortEvent(r)
                    : !1,
                ));
          };
        }));
    },
    createTable: (e) => {
      ((e.setSorting = (t) =>
        e.options.onSortingChange == null
          ? void 0
          : e.options.onSortingChange(t)),
        (e.resetSorting = (t) => {
          var n, r;
          e.setSorting(
            t
              ? []
              : (n = (r = e.initialState) == null ? void 0 : r.sorting) != null
                ? n
                : [],
          );
        }),
        (e.getPreSortedRowModel = () => e.getGroupedRowModel()),
        (e.getSortedRowModel = () => (
          !e._getSortedRowModel &&
            e.options.getSortedRowModel &&
            (e._getSortedRowModel = e.options.getSortedRowModel(e)),
          e.options.manualSorting || !e._getSortedRowModel
            ? e.getPreSortedRowModel()
            : e._getSortedRowModel()
        )));
    },
  },
  To = [Qs, wo, fo, po, Zs, eo, vo, yo, ko, uo, So, Co, Ro, _o, ho];
function Fo(e) {
  var t, n;
  const r = [...To, ...((t = e._features) != null ? t : [])];
  let s = { _features: r };
  const o = s._features.reduce(
      (p, d) =>
        Object.assign(
          p,
          d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(s),
        ),
      {},
    ),
    i = (p) =>
      s.options.mergeOptions ? s.options.mergeOptions(o, p) : { ...o, ...p };
  let c = { ...{}, ...((n = e.initialState) != null ? n : {}) };
  s._features.forEach((p) => {
    var d;
    c =
      (d = p.getInitialState == null ? void 0 : p.getInitialState(c)) != null
        ? d
        : c;
  });
  const u = [];
  let g = !1;
  const f = {
    _features: r,
    options: { ...o, ...e },
    initialState: c,
    _queue: (p) => {
      (u.push(p),
        g ||
          ((g = !0),
          Promise.resolve()
            .then(() => {
              for (; u.length; ) u.shift()();
              g = !1;
            })
            .catch((d) =>
              setTimeout(() => {
                throw d;
              }),
            )));
    },
    reset: () => {
      s.setState(s.initialState);
    },
    setOptions: (p) => {
      const d = Ee(p, s.options);
      s.options = i(d);
    },
    getState: () => s.options.state,
    setState: (p) => {
      s.options.onStateChange == null || s.options.onStateChange(p);
    },
    _getRowId: (p, d, m) => {
      var h;
      return (h =
        s.options.getRowId == null ? void 0 : s.options.getRowId(p, d, m)) !=
        null
        ? h
        : `${m ? [m.id, d].join('.') : d}`;
    },
    getCoreRowModel: () => (
      s._getCoreRowModel || (s._getCoreRowModel = s.options.getCoreRowModel(s)),
      s._getCoreRowModel()
    ),
    getRowModel: () => s.getPaginationRowModel(),
    getRow: (p, d) => {
      let m = (d ? s.getPrePaginationRowModel() : s.getRowModel()).rowsById[p];
      if (!m && ((m = s.getCoreRowModel().rowsById[p]), !m)) throw new Error();
      return m;
    },
    _getDefaultColumnDef: j(
      () => [s.options.defaultColumn],
      (p) => {
        var d;
        return (
          (p = (d = p) != null ? d : {}),
          {
            header: (m) => {
              const h = m.header.column.columnDef;
              return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
            },
            cell: (m) => {
              var h, y;
              return (h =
                (y = m.renderValue()) == null || y.toString == null
                  ? void 0
                  : y.toString()) != null
                ? h
                : null;
            },
            ...s._features.reduce(
              (m, h) =>
                Object.assign(
                  m,
                  h.getDefaultColumnDef == null
                    ? void 0
                    : h.getDefaultColumnDef(),
                ),
              {},
            ),
            ...p,
          }
        );
      },
      P(e, 'debugColumns'),
    ),
    _getColumnDefs: () => s.options.columns,
    getAllColumns: j(
      () => [s._getColumnDefs()],
      (p) => {
        const d = function (m, h, y) {
          return (
            y === void 0 && (y = 0),
            m.map((w) => {
              const b = Ks(s, w, y, h),
                E = w;
              return ((b.columns = E.columns ? d(E.columns, b, y + 1) : []), b);
            })
          );
        };
        return d(p);
      },
      P(e, 'debugColumns'),
    ),
    getAllFlatColumns: j(
      () => [s.getAllColumns()],
      (p) => p.flatMap((d) => d.getFlatColumns()),
      P(e, 'debugColumns'),
    ),
    _getAllFlatColumnsById: j(
      () => [s.getAllFlatColumns()],
      (p) => p.reduce((d, m) => ((d[m.id] = m), d), {}),
      P(e, 'debugColumns'),
    ),
    getAllLeafColumns: j(
      () => [s.getAllColumns(), s._getOrderColumnsFn()],
      (p, d) => {
        let m = p.flatMap((h) => h.getLeafColumns());
        return d(m);
      },
      P(e, 'debugColumns'),
    ),
    getColumn: (p) => s._getAllFlatColumnsById()[p],
  };
  Object.assign(s, f);
  for (let p = 0; p < s._features.length; p++) {
    const d = s._features[p];
    d == null || d.createTable == null || d.createTable(s);
  }
  return s;
}
function Do() {
  return (e) =>
    j(
      () => [e.options.data],
      (t) => {
        const n = { rows: [], flatRows: [], rowsById: {} },
          r = function (s, o, i) {
            o === void 0 && (o = 0);
            const l = [];
            for (let u = 0; u < s.length; u++) {
              const g = on(
                e,
                e._getRowId(s[u], u, i),
                s[u],
                u,
                o,
                void 0,
                i?.id,
              );
              if (
                (n.flatRows.push(g),
                (n.rowsById[g.id] = g),
                l.push(g),
                e.options.getSubRows)
              ) {
                var c;
                ((g.originalSubRows = e.options.getSubRows(s[u], u)),
                  (c = g.originalSubRows) != null &&
                    c.length &&
                    (g.subRows = r(g.originalSubRows, o + 1, g)));
              }
            }
            return l;
          };
        return ((n.rows = r(t)), n);
      },
      P(e.options, 'debugTable', 'getRowModel', () => e._autoResetPageIndex()),
    );
}
function Ao(e) {
  const t = [],
    n = (r) => {
      var s;
      (t.push(r),
        (s = r.subRows) != null &&
          s.length &&
          r.getIsExpanded() &&
          r.subRows.forEach(n));
    };
  return (
    e.rows.forEach(n),
    { rows: t, flatRows: e.flatRows, rowsById: e.rowsById }
  );
}
function Mo(e, t, n) {
  return n.options.filterFromLeafRows ? $o(e, t, n) : Oo(e, t, n);
}
function $o(e, t, n) {
  var r;
  const s = [],
    o = {},
    i = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100,
    l = function (c, u) {
      u === void 0 && (u = 0);
      const g = [];
      for (let p = 0; p < c.length; p++) {
        var f;
        let d = c[p];
        const m = on(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
        if (
          ((m.columnFilters = d.columnFilters),
          (f = d.subRows) != null && f.length && u < i)
        ) {
          if (
            ((m.subRows = l(d.subRows, u + 1)),
            (d = m),
            t(d) && !m.subRows.length)
          ) {
            (g.push(d), (o[d.id] = d), s.push(d));
            continue;
          }
          if (t(d) || m.subRows.length) {
            (g.push(d), (o[d.id] = d), s.push(d));
            continue;
          }
        } else ((d = m), t(d) && (g.push(d), (o[d.id] = d), s.push(d)));
      }
      return g;
    };
  return { rows: l(e), flatRows: s, rowsById: o };
}
function Oo(e, t, n) {
  var r;
  const s = [],
    o = {},
    i = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100,
    l = function (c, u) {
      u === void 0 && (u = 0);
      const g = [];
      for (let p = 0; p < c.length; p++) {
        let d = c[p];
        if (t(d)) {
          var f;
          if ((f = d.subRows) != null && f.length && u < i) {
            const h = on(
              n,
              d.id,
              d.original,
              d.index,
              d.depth,
              void 0,
              d.parentId,
            );
            ((h.subRows = l(d.subRows, u + 1)), (d = h));
          }
          (g.push(d), s.push(d), (o[d.id] = d));
        }
      }
      return g;
    };
  return { rows: l(e), flatRows: s, rowsById: o };
}
function Vo() {
  return (e) =>
    j(
      () => [
        e.getPreFilteredRowModel(),
        e.getState().columnFilters,
        e.getState().globalFilter,
      ],
      (t, n, r) => {
        if (!t.rows.length || (!(n != null && n.length) && !r)) {
          for (let p = 0; p < t.flatRows.length; p++)
            ((t.flatRows[p].columnFilters = {}),
              (t.flatRows[p].columnFiltersMeta = {}));
          return t;
        }
        const s = [],
          o = [];
        (n ?? []).forEach((p) => {
          var d;
          const m = e.getColumn(p.id);
          if (!m) return;
          const h = m.getFilterFn();
          h &&
            s.push({
              id: p.id,
              filterFn: h,
              resolvedValue:
                (d =
                  h.resolveFilterValue == null
                    ? void 0
                    : h.resolveFilterValue(p.value)) != null
                  ? d
                  : p.value,
            });
        });
        const i = (n ?? []).map((p) => p.id),
          l = e.getGlobalFilterFn(),
          c = e.getAllLeafColumns().filter((p) => p.getCanGlobalFilter());
        r &&
          l &&
          c.length &&
          (i.push('__global__'),
          c.forEach((p) => {
            var d;
            o.push({
              id: p.id,
              filterFn: l,
              resolvedValue:
                (d =
                  l.resolveFilterValue == null
                    ? void 0
                    : l.resolveFilterValue(r)) != null
                  ? d
                  : r,
            });
          }));
        let u, g;
        for (let p = 0; p < t.flatRows.length; p++) {
          const d = t.flatRows[p];
          if (((d.columnFilters = {}), s.length))
            for (let m = 0; m < s.length; m++) {
              u = s[m];
              const h = u.id;
              d.columnFilters[h] = u.filterFn(d, h, u.resolvedValue, (y) => {
                d.columnFiltersMeta[h] = y;
              });
            }
          if (o.length) {
            for (let m = 0; m < o.length; m++) {
              g = o[m];
              const h = g.id;
              if (
                g.filterFn(d, h, g.resolvedValue, (y) => {
                  d.columnFiltersMeta[h] = y;
                })
              ) {
                d.columnFilters.__global__ = !0;
                break;
              }
            }
            d.columnFilters.__global__ !== !0 &&
              (d.columnFilters.__global__ = !1);
          }
        }
        const f = (p) => {
          for (let d = 0; d < i.length; d++)
            if (p.columnFilters[i[d]] === !1) return !1;
          return !0;
        };
        return Mo(t.rows, f, e);
      },
      P(e.options, 'debugTable', 'getFilteredRowModel', () =>
        e._autoResetPageIndex(),
      ),
    );
}
function Lo(e) {
  return (t) =>
    j(
      () => [
        t.getState().pagination,
        t.getPrePaginationRowModel(),
        t.options.paginateExpandedRows ? void 0 : t.getState().expanded,
      ],
      (n, r) => {
        if (!r.rows.length) return r;
        const { pageSize: s, pageIndex: o } = n;
        let { rows: i, flatRows: l, rowsById: c } = r;
        const u = s * o,
          g = u + s;
        i = i.slice(u, g);
        let f;
        (t.options.paginateExpandedRows
          ? (f = { rows: i, flatRows: l, rowsById: c })
          : (f = Ao({ rows: i, flatRows: l, rowsById: c })),
          (f.flatRows = []));
        const p = (d) => {
          (f.flatRows.push(d), d.subRows.length && d.subRows.forEach(p));
        };
        return (f.rows.forEach(p), f);
      },
      P(t.options, 'debugTable'),
    );
}
function zo() {
  return (e) =>
    j(
      () => [e.getState().sorting, e.getPreSortedRowModel()],
      (t, n) => {
        if (!n.rows.length || !(t != null && t.length)) return n;
        const r = e.getState().sorting,
          s = [],
          o = r.filter((c) => {
            var u;
            return (u = e.getColumn(c.id)) == null ? void 0 : u.getCanSort();
          }),
          i = {};
        o.forEach((c) => {
          const u = e.getColumn(c.id);
          u &&
            (i[c.id] = {
              sortUndefined: u.columnDef.sortUndefined,
              invertSorting: u.columnDef.invertSorting,
              sortingFn: u.getSortingFn(),
            });
        });
        const l = (c) => {
          const u = c.map((g) => ({ ...g }));
          return (
            u.sort((g, f) => {
              for (let d = 0; d < o.length; d += 1) {
                var p;
                const m = o[d],
                  h = i[m.id],
                  y = h.sortUndefined,
                  w = (p = m?.desc) != null ? p : !1;
                let b = 0;
                if (y) {
                  const E = g.getValue(m.id),
                    I = f.getValue(m.id),
                    R = E === void 0,
                    v = I === void 0;
                  if (R || v) {
                    if (y === 'first') return R ? -1 : 1;
                    if (y === 'last') return R ? 1 : -1;
                    b = R && v ? 0 : R ? y : -y;
                  }
                }
                if ((b === 0 && (b = h.sortingFn(g, f, m.id)), b !== 0))
                  return (w && (b *= -1), h.invertSorting && (b *= -1), b);
              }
              return g.index - f.index;
            }),
            u.forEach((g) => {
              var f;
              (s.push(g),
                (f = g.subRows) != null &&
                  f.length &&
                  (g.subRows = l(g.subRows)));
            }),
            u
          );
        };
        return { rows: l(n.rows), flatRows: s, rowsById: n.rowsById };
      },
      P(e.options, 'debugTable', 'getSortedRowModel', () =>
        e._autoResetPageIndex(),
      ),
    );
}
function bn(e, t) {
  return e ? (Ho(e) ? x.createElement(e, t) : e) : null;
}
function Ho(e) {
  return Go(e) || typeof e == 'function' || Bo(e);
}
function Go(e) {
  return (
    typeof e == 'function' &&
    (() => {
      const t = Object.getPrototypeOf(e);
      return t.prototype && t.prototype.isReactComponent;
    })()
  );
}
function Bo(e) {
  return (
    typeof e == 'object' &&
    typeof e.$$typeof == 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(e.$$typeof.description)
  );
}
function qo(e) {
  const t = {
      state: {},
      onStateChange: () => {},
      renderFallbackValue: null,
      ...e,
    },
    [n] = x.useState(() => ({ current: Fo(t) })),
    [r, s] = x.useState(() => n.current.initialState);
  return (
    n.current.setOptions((o) => ({
      ...o,
      ...e,
      state: { ...r, ...e.state },
      onStateChange: (i) => {
        (s(i), e.onStateChange == null || e.onStateChange(i));
      },
    })),
    n.current
  );
}
var mt = 'Dialog',
  [cr] = Gn(mt),
  [Uo, pe] = cr(mt),
  ur = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: s,
        onOpenChange: o,
        modal: i = !0,
      } = e,
      l = x.useRef(null),
      c = x.useRef(null),
      [u, g] = Hn({ prop: r, defaultProp: s ?? !1, onChange: o, caller: mt });
    return a.jsx(Uo, {
      scope: t,
      triggerRef: l,
      contentRef: c,
      contentId: st(),
      titleId: st(),
      descriptionId: st(),
      open: u,
      onOpenChange: g,
      onOpenToggle: x.useCallback(() => g((f) => !f), [g]),
      modal: i,
      children: n,
    });
  };
ur.displayName = mt;
var dr = 'DialogTrigger',
  Jo = x.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = pe(dr, n),
      o = Xe(t, s.triggerRef);
    return a.jsx(Ve.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': s.open,
      'aria-controls': s.contentId,
      'data-state': gn(s.open),
      ...r,
      ref: o,
      onClick: ge(e.onClick, s.onOpenToggle),
    });
  });
Jo.displayName = dr;
var un = 'DialogPortal',
  [Wo, gr] = cr(un, { forceMount: void 0 }),
  fr = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: s } = e,
      o = pe(un, t);
    return a.jsx(Wo, {
      scope: t,
      forceMount: n,
      children: x.Children.map(r, (i) =>
        a.jsx(ut, {
          present: n || o.open,
          children: a.jsx(ls, { asChild: !0, container: s, children: i }),
        }),
      ),
    });
  };
fr.displayName = un;
var at = 'DialogOverlay',
  pr = x.forwardRef((e, t) => {
    const n = gr(at, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...s } = e,
      o = pe(at, e.__scopeDialog);
    return o.modal
      ? a.jsx(ut, {
          present: r || o.open,
          children: a.jsx(Xo, { ...s, ref: t }),
        })
      : null;
  });
pr.displayName = at;
var Yo = ds('DialogOverlay.RemoveScroll'),
  Xo = x.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = pe(at, n);
    return a.jsx(us, {
      as: Yo,
      allowPinchZoom: !0,
      shards: [s.contentRef],
      children: a.jsx(Ve.div, {
        'data-state': gn(s.open),
        ...r,
        ref: t,
        style: { pointerEvents: 'auto', ...r.style },
      }),
    });
  }),
  ke = 'DialogContent',
  mr = x.forwardRef((e, t) => {
    const n = gr(ke, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...s } = e,
      o = pe(ke, e.__scopeDialog);
    return a.jsx(ut, {
      present: r || o.open,
      children: o.modal
        ? a.jsx(Ko, { ...s, ref: t })
        : a.jsx(Qo, { ...s, ref: t }),
    });
  });
mr.displayName = ke;
var Ko = x.forwardRef((e, t) => {
    const n = pe(ke, e.__scopeDialog),
      r = x.useRef(null),
      s = Xe(t, n.contentRef, r);
    return (
      x.useEffect(() => {
        const o = r.current;
        if (o) return cs(o);
      }, []),
      a.jsx(hr, {
        ...e,
        ref: s,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ge(e.onCloseAutoFocus, (o) => {
          (o.preventDefault(), n.triggerRef.current?.focus());
        }),
        onPointerDownOutside: ge(e.onPointerDownOutside, (o) => {
          const i = o.detail.originalEvent,
            l = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || l) && o.preventDefault();
        }),
        onFocusOutside: ge(e.onFocusOutside, (o) => o.preventDefault()),
      })
    );
  }),
  Qo = x.forwardRef((e, t) => {
    const n = pe(ke, e.__scopeDialog),
      r = x.useRef(!1),
      s = x.useRef(!1);
    return a.jsx(hr, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (o) => {
        (e.onCloseAutoFocus?.(o),
          o.defaultPrevented ||
            (r.current || n.triggerRef.current?.focus(), o.preventDefault()),
          (r.current = !1),
          (s.current = !1));
      },
      onInteractOutside: (o) => {
        (e.onInteractOutside?.(o),
          o.defaultPrevented ||
            ((r.current = !0),
            o.detail.originalEvent.type === 'pointerdown' && (s.current = !0)));
        const i = o.target;
        (n.triggerRef.current?.contains(i) && o.preventDefault(),
          o.detail.originalEvent.type === 'focusin' &&
            s.current &&
            o.preventDefault());
      },
    });
  }),
  hr = x.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: s,
        onCloseAutoFocus: o,
        ...i
      } = e,
      l = pe(ke, n),
      c = x.useRef(null),
      u = Xe(t, c);
    return (
      gs(),
      a.jsxs(a.Fragment, {
        children: [
          a.jsx(fs, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: s,
            onUnmountAutoFocus: o,
            children: a.jsx(Bn, {
              role: 'dialog',
              id: l.contentId,
              'aria-describedby': l.descriptionId,
              'aria-labelledby': l.titleId,
              'data-state': gn(l.open),
              ...i,
              ref: u,
              onDismiss: () => l.onOpenChange(!1),
            }),
          }),
          a.jsxs(a.Fragment, {
            children: [
              a.jsx(Zo, { titleId: l.titleId }),
              a.jsx(ta, { contentRef: c, descriptionId: l.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  dn = 'DialogTitle',
  xr = x.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = pe(dn, n);
    return a.jsx(Ve.h2, { id: s.titleId, ...r, ref: t });
  });
xr.displayName = dn;
var wr = 'DialogDescription',
  vr = x.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = pe(wr, n);
    return a.jsx(Ve.p, { id: s.descriptionId, ...r, ref: t });
  });
vr.displayName = wr;
var yr = 'DialogClose',
  Sr = x.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      s = pe(yr, n);
    return a.jsx(Ve.button, {
      type: 'button',
      ...r,
      ref: t,
      onClick: ge(e.onClick, () => s.onOpenChange(!1)),
    });
  });
Sr.displayName = yr;
function gn(e) {
  return e ? 'open' : 'closed';
}
var Cr = 'DialogTitleWarning',
  [Cl, Rr] = ps(Cr, { contentName: ke, titleName: dn, docsSlug: 'dialog' }),
  Zo = ({ titleId: e }) => {
    const t = Rr(Cr),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      x.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  ea = 'DialogDescriptionWarning',
  ta = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Rr(ea).contentName}}.`;
    return (
      x.useEffect(() => {
        const s = e.current?.getAttribute('aria-describedby');
        t && s && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  na = ur,
  ra = fr,
  _r = pr,
  br = mr,
  Er = xr,
  Ir = vr,
  sa = Sr;
const Gt = na,
  oa = ra,
  Nr = x.forwardRef(({ className: e, ...t }, n) =>
    a.jsx(_r, {
      ref: n,
      className: Q(
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        e,
      ),
      ...t,
    }),
  );
Nr.displayName = _r.displayName;
const it = x.forwardRef(({ className: e, children: t, ...n }, r) =>
  a.jsxs(oa, {
    children: [
      a.jsx(Nr, {}),
      a.jsxs(br, {
        ref: r,
        className: Q(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          e,
        ),
        ...n,
        children: [
          t,
          a.jsxs(sa, {
            className:
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            children: [
              a.jsx(ms, { className: 'h-4 w-4' }),
              a.jsx('span', { className: 'sr-only', children: 'Close' }),
            ],
          }),
        ],
      }),
    ],
  }),
);
it.displayName = br.displayName;
const lt = ({ className: e, ...t }) =>
  a.jsx('div', {
    className: Q('flex flex-col space-y-1.5 text-center sm:text-left', e),
    ...t,
  });
lt.displayName = 'DialogHeader';
const fn = ({ className: e, ...t }) =>
  a.jsx('div', {
    className: Q(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      e,
    ),
    ...t,
  });
fn.displayName = 'DialogFooter';
const ct = x.forwardRef(({ className: e, ...t }, n) =>
  a.jsx(Er, {
    ref: n,
    className: Q('text-lg font-semibold leading-none tracking-tight', e),
    ...t,
  }),
);
ct.displayName = Er.displayName;
const aa = x.forwardRef(({ className: e, ...t }, n) =>
  a.jsx(Ir, { ref: n, className: Q('text-sm text-muted-foreground', e), ...t }),
);
aa.displayName = Ir.displayName;
function ia() {
  const { allTracks: e, suggestedTrackIds: t } = dt(),
    { createPlaylist: n, addTrackToPlaylist: r, fetchPlaylists: s } = hs(),
    {
      playingTrackId: o,
      isReady: i,
      isPlaying: l,
      togglePlayPause: c,
      initializePlayer: u,
      addToQueue: g,
    } = Me(),
    [f, p] = x.useState(null),
    [d, m] = x.useState(!0),
    [h, y] = x.useState(''),
    [w, b] = x.useState([]),
    [E, I] = x.useState({ pageIndex: 0, pageSize: 10 }),
    R = x.useRef(null),
    [v, N] = x.useState(null),
    [_, k] = x.useState([]),
    [H, W] = x.useState(!1),
    [K, Z] = x.useState(''),
    [B, T] = x.useState(null),
    [ee, re] = x.useState(!1),
    [U, te] = x.useState(null),
    [se, ue] = x.useState({}),
    [me, de] = x.useState([]),
    [ye, he] = x.useState(new Set()),
    [Te, xe] = x.useState(null),
    [_e, Fe] = x.useState(null);
  (x.useEffect(() => {
    u();
  }, [u]),
    x.useEffect(() => {
      (async () => {
        try {
          const C = await fetch('/api/music/favorites');
          if (C.ok) {
            const V = await C.json();
            he(new Set(V.favoriteTrackIds || []));
          }
        } catch (C) {
          console.error('Error fetching favorites:', C);
        }
      })();
    }, []));
  const we = async (S) => {
      if (!S.youtube_video_id) {
        G.error('No audio available for this track');
        return;
      }
      if (!i) {
        G.error('Player is still loading...');
        return;
      }
      try {
        const { queue: C, setQueue: V } = Me.getState();
        if (C.length === 0) {
          const A = e.findIndex((q) => q.id === S.id);
          (V(e, A), G.success(`Added ${e.length} tracks to queue`));
        }
        c(S);
      } catch (C) {
        (console.error('Error playing track:', C),
          G.error('Failed to play track'));
      }
    },
    De = (S) => {
      (g(S), G.success(`Added "${S.title}" to queue`));
    },
    O = async (S) => {
      if (!Te) {
        G.error('Favorites playlist not found');
        return;
      }
      Fe(S.id);
      try {
        ye.has(S.id)
          ? (
              await fetch('/api/music/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackId: S.id }),
              })
            ).ok
            ? (he((A) => {
                const q = new Set(A);
                return (q.delete(S.id), q);
              }),
              G.success('Removed from favorites'))
            : G.error('Failed to remove from favorites')
          : (
                await fetch('/api/music/favorites', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ trackId: S.id }),
                })
              ).ok
            ? (he((A) => new Set([...A, S.id])),
              G.success('Added to favorites'))
            : G.error('Failed to add to favorites');
      } catch (C) {
        (console.error('Error toggling favorite:', C),
          G.error('Failed to update favorite'));
      } finally {
        Fe(null);
      }
    };
  x.useEffect(() => {
    (async () => {
      try {
        const C = await s(),
          V = C.find((A) => A.is_favorites);
        (V && xe(V.id), k(C));
      } catch (C) {
        (console.error('Error fetching playlists:', C),
          p('Failed to fetch playlists'));
      }
    })();
  }, [s]);
  const F = async (S, C) => {
      try {
        const V = Date.now(),
          A = {
            type: 'addToPlaylist',
            data: { playlistId: S, trackId: C },
            timestamp: V,
          };
        (de((ne) => [...ne, A]), await r(S, C));
        const q = _.find((ne) => ne.id === S)?.name || 'playlist';
        G.success(`Added to ${q}`, {
          duration: 5e3,
          action: {
            label: 'Undo',
            onClick: () => {
              (G.info(`Removed from ${q}`),
                de((ne) => ne.filter((be) => be.timestamp !== V)));
            },
          },
        });
      } catch {
        G.error('Failed to add to playlist');
      }
    },
    $ = async () => {
      if (!(!K.trim() || ee || !B)) {
        re(!0);
        try {
          const S = await n(K),
            C = Date.now(),
            V = {
              type: 'createPlaylist',
              data: { playlistId: S, name: K, trackId: B.id },
              timestamp: C,
            };
          (de((A) => [...A, V]),
            await r(S, B.id),
            Z(''),
            W(!1),
            G.success(`Created playlist "${K}"`, {
              duration: 5e3,
              action: {
                label: 'Undo',
                onClick: () => {
                  (G.info(`Deleted playlist "${K}"`),
                    de((A) => A.filter((q) => q.timestamp !== C)));
                },
              },
            }));
        } catch {
          G.error('Failed to create playlist');
        } finally {
          (re(!1), T(null));
        }
      }
    };
  (x.useEffect(() => {
    e.length > 0 && m(!1);
  }, [e]),
    x.useEffect(() => {
      const S = (C) => {
        (C.metaKey || C.ctrlKey) &&
          C.key === 'k' &&
          (C.preventDefault(), R.current?.focus());
      };
      return (
        document.addEventListener('keydown', S),
        () => document.removeEventListener('keydown', S)
      );
    }, []));
  const L = (S, C) => (C ? `${S}, ${C}` : S),
    D = (S) => (S ? S.split(',').join(', ') : '-'),
    Y = Js(),
    ie = x.useMemo(
      () => [
        Y.display({
          id: 'favorite',
          header: '',
          cell: ({ row: S }) => {
            const C = S.original,
              V = ye.has(C.id),
              A = _e === C.id;
            return a.jsx(X, {
              variant: 'noShadow',
              size: 'icon',
              className: 'h-8 w-8',
              onClick: () => O(C),
              disabled: A,
              children: a.jsx(xs, {
                className: Q(
                  'h-4 w-4 transition-colors',
                  V
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-red-500',
                ),
              }),
            });
          },
        }),
        Y.display({
          id: 'playActions',
          header: 'Track',
          cell: ({ row: S }) => {
            const C = S.original,
              V = v === C.id;
            return a.jsxs('div', {
              className: 'flex items-center gap-3',
              children: [
                a.jsxs('div', {
                  className: 'relative',
                  children: [
                    a.jsx(X, {
                      variant: 'noShadow',
                      size: 'icon',
                      className: Q(
                        'h-8 w-8 relative z-10',
                        o === C.id && 'bg-main/20',
                      ),
                      onClick: () => we(C),
                      disabled: !C.youtube_video_id || !i,
                      children:
                        o === C.id && l
                          ? a.jsxs(a.Fragment, {
                              children: [
                                a.jsx(qn, { className: 'h-4 w-4' }),
                                a.jsx('span', {
                                  className:
                                    'absolute inset-0 rounded-full animate-pulse-light bg-main/30',
                                }),
                              ],
                            })
                          : a.jsx(Un, { className: 'h-4 w-4' }),
                    }),
                    o === C.id &&
                      a.jsx('div', {
                        className:
                          'absolute -bottom-1 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden',
                        children: a.jsx('div', {
                          className:
                            'h-full bg-main transition-all duration-300 ease-linear',
                          style: { width: `${se[C.id] || 0}%` },
                        }),
                      }),
                    C.position &&
                      a.jsx('span', {
                        className:
                          'absolute -top-2 -right-2 text-xs px-1 bg-gray-100 rounded-full text-gray-500',
                        children: C.position,
                      }),
                  ],
                }),
                C.artwork
                  ? a.jsx('div', {
                      className: 'h-10 w-10 flex-shrink-0',
                      children: a.jsx(ws, {
                        src: C.artwork,
                        alt: C.title,
                        width: 40,
                        height: 40,
                        className: 'h-10 w-10 rounded-sm object-cover',
                      }),
                    })
                  : a.jsx('div', {
                      className:
                        'h-10 w-10 flex-shrink-0 bg-gray-100 rounded-sm',
                    }),
                a.jsx('div', {
                  className:
                    'text-sm font-medium text-gray-900 max-w-[16rem] relative overflow-hidden',
                  children: a.jsx('div', {
                    className: Q(
                      'whitespace-nowrap',
                      V && C.title.length > 30 && 'hover-marquee',
                    ),
                    children: C.title,
                  }),
                }),
                V &&
                  a.jsxs('div', {
                    className:
                      'flex items-center ml-2 animate-fadeIn space-x-1',
                    children: [
                      a.jsx(X, {
                        variant: 'ghost',
                        size: 'sm',
                        className: 'h-8 w-8 p-0',
                        onClick: (A) => {
                          (A.stopPropagation(), De(C));
                        },
                        title: 'Add to queue',
                        children: a.jsx(Cn, { className: 'h-4 w-4' }),
                      }),
                      a.jsx(X, {
                        variant: 'ghost',
                        size: 'sm',
                        className: 'h-8 w-8 p-0',
                        onClick: (A) => {
                          (A.stopPropagation(), T(C), te(C.id));
                        },
                        title: 'Add to playlist',
                        children: a.jsx(Hs, { className: 'h-4 w-4' }),
                      }),
                    ],
                  }),
              ],
            });
          },
        }),
        Y.accessor((S) => S.artist, {
          id: 'artist',
          header: ({ column: S }) =>
            a.jsxs('div', {
              className: 'flex items-center cursor-pointer',
              onClick: () => S.toggleSorting(),
              children: [
                a.jsx('span', { children: 'Artist' }),
                a.jsx(St, { className: 'ml-2 h-4 w-4' }),
              ],
            }),
          cell: ({ row: S }) => {
            const C = S.original,
              V = v === C.id,
              A = L(C.artist, C.extra_artists);
            return a.jsx('div', {
              className: 'text-sm text-gray-500 max-w-[18rem] overflow-hidden',
              children: a.jsx('div', {
                className: Q(
                  'whitespace-nowrap',
                  V && A.length > 15 && 'marquee-text',
                ),
                children: a.jsx(la, { artist: C.artist, children: A }),
              }),
            });
          },
        }),
        Y.accessor((S) => S.genres, {
          id: 'genre_style',
          header: ({ column: S }) =>
            a.jsxs('div', {
              className: 'flex items-center cursor-pointer',
              onClick: () => S.toggleSorting(),
              children: [
                a.jsx('span', { children: 'Genre/Style' }),
                a.jsx(St, { className: 'ml-2 h-4 w-4' }),
              ],
            }),
          cell: ({ row: S }) => {
            const C = S.original,
              V = v === C.id,
              A = [C.genres && D(C.genres), C.styles && D(C.styles)]
                .filter(Boolean)
                .join(' / ');
            return a.jsx('div', {
              className:
                'text-sm text-gray-500 max-w-[18rem] relative overflow-hidden',
              children: a.jsx('div', {
                className: Q(
                  'whitespace-nowrap',
                  V && A.length > 20 && 'hover-marquee',
                ),
                children: A,
              }),
            });
          },
        }),
        Y.accessor((S) => S.duration, {
          id: 'duration',
          header: ({ column: S }) =>
            a.jsxs('div', {
              className: 'flex items-center cursor-pointer',
              onClick: () => S.toggleSorting(),
              children: [
                a.jsx('span', { children: 'Duration' }),
                a.jsx(St, { className: 'ml-2 h-4 w-4' }),
              ],
            }),
          cell: ({ getValue: S }) =>
            a.jsx('div', {
              className: 'text-sm text-gray-500',
              children: S() || '-',
            }),
        }),
      ],
      [o, i, l, v, we, F, _, ye, _e],
    ),
    M = qo({
      data: e,
      columns: ie,
      state: { sorting: w, globalFilter: h, pagination: E },
      globalFilterFn: (S, C, V) => {
        const A = V.toLowerCase(),
          q = S.original;
        return (
          q.title.toLowerCase().includes(A) ||
          q.artist.toLowerCase().includes(A) ||
          (q.genres?.toLowerCase() || '').includes(A) ||
          (q.styles?.toLowerCase() || '').includes(A)
        );
      },
      onSortingChange: b,
      onGlobalFilterChange: y,
      onPaginationChange: I,
      getCoreRowModel: Do(),
      getSortedRowModel: zo(),
      getFilteredRowModel: Vo(),
      getPaginationRowModel: Lo(),
      manualPagination: !1,
      debugTable: !1,
    });
  return (
    x.useEffect(() => {
      if (!o) return;
      se[o] || ue((C) => ({ ...C, [o]: 0 }));
      const S = setInterval(() => {
        ue((C) => {
          const V = C[o] || 0;
          return V >= 100 ? (clearInterval(S), C) : { ...C, [o]: V + 1 };
        });
      }, 1e3);
      return () => clearInterval(S);
    }, [o]),
    d && e.length === 0
      ? a.jsxs('div', {
          className: 'space-y-4 ml-8',
          children: [
            a.jsxs('div', {
              className: 'flex justify-between items-center mb-4',
              children: [
                a.jsx('div', {
                  className: 'w-40 h-9 bg-gray-200 animate-pulse rounded-md',
                }),
                a.jsx('div', {
                  className: 'w-64 h-9 bg-gray-200 animate-pulse rounded-md',
                }),
              ],
            }),
            a.jsx('div', {
              className: 'relative overflow-x-auto rounded-md border',
              children: a.jsxs('table', {
                className: 'min-w-full divide-y divide-gray-200',
                children: [
                  a.jsx('thead', {
                    className: 'bg-gray-50',
                    children: a.jsx('tr', {
                      children: Array.from({ length: 6 }).map((S, C) =>
                        a.jsx(
                          'th',
                          {
                            className: 'px-4 py-3',
                            children: a.jsx('div', {
                              className:
                                'h-4 bg-gray-200 rounded w-20 animate-pulse',
                            }),
                          },
                          C,
                        ),
                      ),
                    }),
                  }),
                  a.jsx('tbody', {
                    children: Array.from({ length: 8 }).map((S, C) =>
                      a.jsxs(
                        'tr',
                        {
                          className: 'border-b border-gray-100',
                          children: [
                            a.jsx('td', {
                              className: 'px-4 py-4',
                              children: a.jsx('div', {
                                className:
                                  'w-8 h-8 bg-gray-200 rounded-full animate-pulse',
                              }),
                            }),
                            a.jsx('td', {
                              className: 'px-4 py-4',
                              children: a.jsxs('div', {
                                className: 'flex items-center gap-3',
                                children: [
                                  a.jsx('div', {
                                    className:
                                      'w-8 h-8 bg-gray-200 rounded-full animate-pulse',
                                  }),
                                  a.jsx('div', {
                                    className:
                                      'h-10 w-10 bg-gray-200 rounded-sm animate-pulse',
                                  }),
                                  a.jsx('div', {
                                    className:
                                      'h-4 bg-gray-200 rounded w-40 animate-pulse',
                                  }),
                                ],
                              }),
                            }),
                            a.jsx('td', {
                              className: 'px-4 py-4',
                              children: a.jsx('div', {
                                className:
                                  'h-4 bg-gray-200 rounded w-24 animate-pulse',
                              }),
                            }),
                            a.jsx('td', {
                              className: 'px-4 py-4',
                              children: a.jsx('div', {
                                className:
                                  'h-4 bg-gray-200 rounded w-36 animate-pulse',
                              }),
                            }),
                            a.jsx('td', {
                              className: 'px-4 py-4',
                              children: a.jsx('div', {
                                className:
                                  'h-4 bg-gray-200 rounded w-10 animate-pulse',
                              }),
                            }),
                            a.jsx('td', {
                              className: 'px-4 py-4',
                              children: a.jsx('div', {
                                className:
                                  'h-4 bg-gray-200 rounded w-12 animate-pulse',
                              }),
                            }),
                          ],
                        },
                        C,
                      ),
                    ),
                  }),
                ],
              }),
            }),
          ],
        })
      : f
        ? a.jsx('div', { className: 'text-red-500', children: f })
        : a.jsxs('div', {
            className: 'space-y-4 ml-8',
            children: [
              a.jsx('style', {
                jsx: !0,
                children: `
    @keyframes limited-marquee {
      0% { transform: translateX(0); }
      20% { transform: translateX(0); }
      80% { transform: translateX(calc(-100% + 100%)); }
      100% { transform: translateX(0); }
    }
    
    .hover-marquee {
      animation: limited-marquee 3s ease-in-out;
      animation-iteration-count: 1;
      display: inline-block;
      position: relative;
      max-width: 100%;
    }

    @keyframes marquee-animation {
      0% { transform: translateX(0); }
      10% { transform: translateX(0); }
      90% { transform: translateX(max(-100%, -300px)); }
      100% { transform: translateX(0); }
    }
    
    .marquee-text {
      animation: marquee-animation 3s ease-in-out;
      display: inline-block;
      white-space: nowrap;
    }
    
    /* Ensure containers don't grow with content */
    [class*="max-w-"] {
      overflow: hidden;
    }
    
    /* Pulse animation for currently playing track */
    @keyframes pulse-light {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.7; }
    }
    
    .animate-pulse-light {
      animation: pulse-light 2s ease-in-out infinite;
    }
  `,
              }),
              a.jsxs('div', {
                className: 'flex justify-between items-center mb-4',
                children: [
                  a.jsx('div', {}),
                  a.jsx(Us, { ref: R, value: h, onChange: y }),
                ],
              }),
              a.jsx('div', {
                className: 'relative overflow-x-auto rounded-md border',
                children: a.jsxs('table', {
                  className: 'min-w-full divide-y divide-gray-200',
                  children: [
                    a.jsx('thead', {
                      className: 'bg-gray-50',
                      children: M.getHeaderGroups().map((S) =>
                        a.jsx(
                          'tr',
                          {
                            children: S.headers.map((C) =>
                              a.jsx(
                                'th',
                                {
                                  scope: 'col',
                                  className:
                                    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                  children: C.isPlaceholder
                                    ? null
                                    : bn(
                                        C.column.columnDef.header,
                                        C.getContext(),
                                      ),
                                },
                                C.id,
                              ),
                            ),
                          },
                          S.id,
                        ),
                      ),
                    }),
                    a.jsx('tbody', {
                      className: 'bg-white divide-y divide-gray-200',
                      children: M.getRowModel().rows.map((S) => {
                        const C = S.original,
                          V = t.has(C.id),
                          A =
                            V &&
                            (S.index === 0 ||
                              !t.has(
                                M.getRowModel().rows[S.index - 1]?.original.id,
                              )),
                          q =
                            V &&
                            (S.index === M.getRowModel().rows.length - 1 ||
                              !t.has(
                                M.getRowModel().rows[S.index + 1]?.original.id,
                              ));
                        return a.jsxs(
                          'tr',
                          {
                            className: Q(
                              'hover:bg-accent/5 group relative transition-all duration-300',
                              V && [
                                'bg-gradient-to-r from-main/[0.03] to-main/[0.07]',
                                'border-l-[3px] border-main/40',
                                'shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]',
                              ],
                              o === C.id && [
                                'bg-main/[0.03]',
                                'border-l-[3px] border-main/60',
                                'shadow-[inset_0_0_30px_rgba(0,0,0,0.01)]',
                              ],
                            ),
                            onMouseEnter: () => N(C.id),
                            onMouseLeave: () => N(null),
                            children: [
                              S.getVisibleCells().map((ne) =>
                                a.jsx(
                                  'td',
                                  {
                                    className: 'px-4 py-4 whitespace-nowrap',
                                    children: bn(
                                      ne.column.columnDef.cell,
                                      ne.getContext(),
                                    ),
                                  },
                                  ne.id,
                                ),
                              ),
                              A &&
                                a.jsx('div', {
                                  className:
                                    'absolute -top-px left-0 right-0 h-px bg-main/10',
                                }),
                              q &&
                                a.jsx('div', {
                                  className:
                                    'absolute -bottom-px left-0 right-0 h-px bg-main/10',
                                }),
                            ],
                          },
                          C.id,
                        );
                      }),
                    }),
                  ],
                }),
              }),
              a.jsx(Gt, {
                open: H,
                onOpenChange: W,
                children: a.jsxs(it, {
                  children: [
                    a.jsx(lt, {
                      children: a.jsx(ct, { children: 'Create New Playlist' }),
                    }),
                    a.jsx('div', {
                      className: 'py-4',
                      children: a.jsx(gt, {
                        placeholder: 'Playlist name',
                        value: K,
                        onChange: (S) => Z(S.target.value),
                        onKeyDown: (S) => {
                          (S.key === 'Enter' && K.trim() && !ee && $(),
                            S.key === 'Escape' && W(!1));
                        },
                        disabled: ee,
                        autoFocus: !0,
                      }),
                    }),
                    a.jsxs(fn, {
                      children: [
                        a.jsx(X, {
                          variant: 'outline',
                          onClick: () => W(!1),
                          disabled: ee,
                          children: 'Cancel',
                        }),
                        a.jsx(X, {
                          onClick: $,
                          disabled: !K.trim() || ee,
                          children: ee ? 'Creating...' : 'Create',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              a.jsx(Gt, {
                open: U !== null,
                onOpenChange: (S) => !S && te(null),
                children: a.jsxs(it, {
                  className: 'sm:max-w-md',
                  children: [
                    a.jsx(lt, {
                      children: a.jsx(ct, { children: 'Add to Playlist' }),
                    }),
                    a.jsxs('div', {
                      className: 'grid gap-4 py-4',
                      children: [
                        _ && _.length > 0
                          ? a.jsx('div', {
                              className: 'grid gap-2',
                              children: _.map((S) =>
                                a.jsxs(
                                  X,
                                  {
                                    variant: 'outline',
                                    className: 'w-full justify-start',
                                    onClick: () => {
                                      B && U && (F(S.id, B.id), te(null));
                                    },
                                    children: [
                                      a.jsx(Cn, { className: 'mr-2 h-4 w-4' }),
                                      S.name,
                                    ],
                                  },
                                  S.id,
                                ),
                              ),
                            })
                          : a.jsx('div', {
                              className:
                                'text-center py-2 text-muted-foreground',
                              children: 'No playlists yet',
                            }),
                        a.jsxs(X, {
                          variant: 'outline',
                          className: 'w-full justify-start',
                          onClick: () => {
                            (W(!0), te(null));
                          },
                          children: [
                            a.jsx(He, { className: 'mr-2 h-4 w-4' }),
                            'Create New Playlist',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              a.jsxs('div', {
                className:
                  'flex items-center justify-between sticky bottom-4 bg-white border rounded-md p-2 shadow-sm',
                children: [
                  a.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      a.jsxs('p', {
                        className: 'text-sm text-gray-500',
                        children: [
                          'Page',
                          ' ',
                          a.jsxs('strong', {
                            children: [
                              M.getState().pagination.pageIndex + 1,
                              ' of',
                              ' ',
                              M.getPageCount(),
                            ],
                          }),
                        ],
                      }),
                      a.jsxs('p', {
                        className: 'text-sm text-gray-500 hidden md:block',
                        children: [
                          '| Displaying ',
                          M.getRowModel().rows.length,
                          ' of',
                          ' ',
                          M.getFilteredRowModel().rows.length,
                          ' tracks',
                        ],
                      }),
                    ],
                  }),
                  a.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      a.jsxs('div', {
                        className: 'flex items-center gap-1',
                        children: [
                          a.jsx('span', {
                            className: 'text-sm text-gray-500 hidden sm:inline',
                            children: 'Rows per page:',
                          }),
                          a.jsxs(Ds, {
                            value: String(M.getState().pagination.pageSize),
                            onValueChange: (S) => {
                              M.setPageSize(Number(S));
                            },
                            children: [
                              a.jsx(As, {
                                className: 'h-8 w-[70px]',
                                children: a.jsx(Ms, {
                                  placeholder: M.getState().pagination.pageSize,
                                }),
                              }),
                              a.jsx($s, {
                                children: [5, 10, 20, 30, 50].map((S) =>
                                  a.jsx(
                                    Os,
                                    { value: String(S), children: S },
                                    S,
                                  ),
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                      a.jsxs('div', {
                        className: 'flex items-center gap-1',
                        children: [
                          a.jsxs(X, {
                            variant: 'outline',
                            size: 'sm',
                            onClick: () => M.setPageIndex(0),
                            disabled: !M.getCanPreviousPage(),
                            className: 'hidden sm:flex h-8 w-8 p-0 lg:flex',
                            children: [
                              a.jsx('span', {
                                className: 'sr-only',
                                children: 'Go to first page',
                              }),
                              a.jsx(Ct, { className: 'h-4 w-4' }),
                              a.jsx(Ct, { className: 'h-4 w-4' }),
                            ],
                          }),
                          a.jsxs(X, {
                            variant: 'outline',
                            size: 'sm',
                            onClick: () => M.previousPage(),
                            disabled: !M.getCanPreviousPage(),
                            className: 'h-8 w-8 p-0',
                            children: [
                              a.jsx('span', {
                                className: 'sr-only',
                                children: 'Go to previous page',
                              }),
                              a.jsx(Ct, { className: 'h-4 w-4' }),
                            ],
                          }),
                          a.jsxs(X, {
                            variant: 'outline',
                            size: 'sm',
                            onClick: () => M.nextPage(),
                            disabled: !M.getCanNextPage(),
                            className: 'h-8 w-8 p-0',
                            children: [
                              a.jsx('span', {
                                className: 'sr-only',
                                children: 'Go to next page',
                              }),
                              a.jsx(yt, { className: 'h-4 w-4' }),
                            ],
                          }),
                          a.jsxs(X, {
                            variant: 'outline',
                            size: 'sm',
                            onClick: () => M.setPageIndex(M.getPageCount() - 1),
                            disabled: !M.getCanNextPage(),
                            className: 'hidden sm:flex h-8 w-8 p-0 lg:flex',
                            children: [
                              a.jsx('span', {
                                className: 'sr-only',
                                children: 'Go to last page',
                              }),
                              a.jsx(yt, { className: 'h-4 w-4' }),
                              a.jsx(yt, { className: 'h-4 w-4' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
  );
}
function la({ artist: e, children: t }) {
  return a.jsxs('div', {
    className: 'relative group inline-block',
    children: [
      a.jsx('span', {
        className:
          'cursor-pointer hover:text-primary hover:underline underline-offset-2',
        children: t,
      }),
      a.jsx('div', {
        className:
          'absolute left-0 top-full mt-2 w-64 rounded-md bg-background/95 p-3 shadow-lg ring-1 ring-border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300',
        children: a.jsxs('div', {
          className: 'flex flex-col space-y-2',
          children: [
            a.jsx('h4', { className: 'text-sm font-semibold', children: e }),
            a.jsxs('div', {
              className: 'flex items-center',
              children: [
                a.jsx('span', {
                  className:
                    'bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mr-2',
                  children: 'Artist',
                }),
                a.jsx('span', {
                  className: 'text-xs text-muted-foreground',
                  children: 'View all tracks',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
var [ht] = Gn('Tooltip', [Jn]),
  xt = Jn(),
  jr = 'TooltipProvider',
  ca = 700,
  Bt = 'tooltip.open',
  [ua, pn] = ht(jr),
  Pr = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: n = ca,
        skipDelayDuration: r = 300,
        disableHoverableContent: s = !1,
        children: o,
      } = e,
      i = x.useRef(!0),
      l = x.useRef(!1),
      c = x.useRef(0);
    return (
      x.useEffect(() => {
        const u = c.current;
        return () => window.clearTimeout(u);
      }, []),
      a.jsx(ua, {
        scope: t,
        isOpenDelayedRef: i,
        delayDuration: n,
        onOpen: x.useCallback(() => {
          (window.clearTimeout(c.current), (i.current = !1));
        }, []),
        onClose: x.useCallback(() => {
          (window.clearTimeout(c.current),
            (c.current = window.setTimeout(() => (i.current = !0), r)));
        }, [r]),
        isPointerInTransitRef: l,
        onPointerInTransitChange: x.useCallback((u) => {
          l.current = u;
        }, []),
        disableHoverableContent: s,
        children: o,
      })
    );
  };
Pr.displayName = jr;
var Ge = 'Tooltip',
  [da, wt] = ht(Ge),
  kr = (e) => {
    const {
        __scopeTooltip: t,
        children: n,
        open: r,
        defaultOpen: s,
        onOpenChange: o,
        disableHoverableContent: i,
        delayDuration: l,
      } = e,
      c = pn(Ge, e.__scopeTooltip),
      u = xt(t),
      [g, f] = x.useState(null),
      p = st(),
      d = x.useRef(0),
      m = i ?? c.disableHoverableContent,
      h = l ?? c.delayDuration,
      y = x.useRef(!1),
      [w, b] = Hn({
        prop: r,
        defaultProp: s ?? !1,
        onChange: (N) => {
          (N
            ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Bt)))
            : c.onClose(),
            o?.(N));
        },
        caller: Ge,
      }),
      E = x.useMemo(
        () => (w ? (y.current ? 'delayed-open' : 'instant-open') : 'closed'),
        [w],
      ),
      I = x.useCallback(() => {
        (window.clearTimeout(d.current),
          (d.current = 0),
          (y.current = !1),
          b(!0));
      }, [b]),
      R = x.useCallback(() => {
        (window.clearTimeout(d.current), (d.current = 0), b(!1));
      }, [b]),
      v = x.useCallback(() => {
        (window.clearTimeout(d.current),
          (d.current = window.setTimeout(() => {
            ((y.current = !0), b(!0), (d.current = 0));
          }, h)));
      }, [h, b]);
    return (
      x.useEffect(
        () => () => {
          d.current && (window.clearTimeout(d.current), (d.current = 0));
        },
        [],
      ),
      a.jsx(vs, {
        ...u,
        children: a.jsx(da, {
          scope: t,
          contentId: p,
          open: w,
          stateAttribute: E,
          trigger: g,
          onTriggerChange: f,
          onTriggerEnter: x.useCallback(() => {
            c.isOpenDelayedRef.current ? v() : I();
          }, [c.isOpenDelayedRef, v, I]),
          onTriggerLeave: x.useCallback(() => {
            m ? R() : (window.clearTimeout(d.current), (d.current = 0));
          }, [R, m]),
          onOpen: I,
          onClose: R,
          disableHoverableContent: m,
          children: n,
        }),
      })
    );
  };
kr.displayName = Ge;
var qt = 'TooltipTrigger',
  Tr = x.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      s = wt(qt, n),
      o = pn(qt, n),
      i = xt(n),
      l = x.useRef(null),
      c = Xe(t, l, s.onTriggerChange),
      u = x.useRef(!1),
      g = x.useRef(!1),
      f = x.useCallback(() => (u.current = !1), []);
    return (
      x.useEffect(
        () => () => document.removeEventListener('pointerup', f),
        [f],
      ),
      a.jsx(ys, {
        asChild: !0,
        ...i,
        children: a.jsx(Ve.button, {
          'aria-describedby': s.open ? s.contentId : void 0,
          'data-state': s.stateAttribute,
          ...r,
          ref: c,
          onPointerMove: ge(e.onPointerMove, (p) => {
            p.pointerType !== 'touch' &&
              !g.current &&
              !o.isPointerInTransitRef.current &&
              (s.onTriggerEnter(), (g.current = !0));
          }),
          onPointerLeave: ge(e.onPointerLeave, () => {
            (s.onTriggerLeave(), (g.current = !1));
          }),
          onPointerDown: ge(e.onPointerDown, () => {
            (s.open && s.onClose(),
              (u.current = !0),
              document.addEventListener('pointerup', f, { once: !0 }));
          }),
          onFocus: ge(e.onFocus, () => {
            u.current || s.onOpen();
          }),
          onBlur: ge(e.onBlur, s.onClose),
          onClick: ge(e.onClick, s.onClose),
        }),
      })
    );
  });
Tr.displayName = qt;
var ga = 'TooltipPortal',
  [Rl, fa] = ht(ga, { forceMount: void 0 }),
  $e = 'TooltipContent',
  Fr = x.forwardRef((e, t) => {
    const n = fa($e, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: s = 'top', ...o } = e,
      i = wt($e, e.__scopeTooltip);
    return a.jsx(ut, {
      present: r || i.open,
      children: i.disableHoverableContent
        ? a.jsx(Dr, { side: s, ...o, ref: t })
        : a.jsx(pa, { side: s, ...o, ref: t }),
    });
  }),
  pa = x.forwardRef((e, t) => {
    const n = wt($e, e.__scopeTooltip),
      r = pn($e, e.__scopeTooltip),
      s = x.useRef(null),
      o = Xe(t, s),
      [i, l] = x.useState(null),
      { trigger: c, onClose: u } = n,
      g = s.current,
      { onPointerInTransitChange: f } = r,
      p = x.useCallback(() => {
        (l(null), f(!1));
      }, [f]),
      d = x.useCallback(
        (m, h) => {
          const y = m.currentTarget,
            w = { x: m.clientX, y: m.clientY },
            b = va(w, y.getBoundingClientRect()),
            E = ya(w, b),
            I = Sa(h.getBoundingClientRect()),
            R = Ra([...E, ...I]);
          (l(R), f(!0));
        },
        [f],
      );
    return (
      x.useEffect(() => () => p(), [p]),
      x.useEffect(() => {
        if (c && g) {
          const m = (y) => d(y, g),
            h = (y) => d(y, c);
          return (
            c.addEventListener('pointerleave', m),
            g.addEventListener('pointerleave', h),
            () => {
              (c.removeEventListener('pointerleave', m),
                g.removeEventListener('pointerleave', h));
            }
          );
        }
      }, [c, g, d, p]),
      x.useEffect(() => {
        if (i) {
          const m = (h) => {
            const y = h.target,
              w = { x: h.clientX, y: h.clientY },
              b = c?.contains(y) || g?.contains(y),
              E = !Ca(w, i);
            b ? p() : E && (p(), u());
          };
          return (
            document.addEventListener('pointermove', m),
            () => document.removeEventListener('pointermove', m)
          );
        }
      }, [c, g, i, u, p]),
      a.jsx(Dr, { ...e, ref: o })
    );
  }),
  [ma, ha] = ht(Ge, { isInside: !1 }),
  xa = Cs('TooltipContent'),
  Dr = x.forwardRef((e, t) => {
    const {
        __scopeTooltip: n,
        children: r,
        'aria-label': s,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        ...l
      } = e,
      c = wt($e, n),
      u = xt(n),
      { onClose: g } = c;
    return (
      x.useEffect(
        () => (
          document.addEventListener(Bt, g),
          () => document.removeEventListener(Bt, g)
        ),
        [g],
      ),
      x.useEffect(() => {
        if (c.trigger) {
          const f = (p) => {
            p.target?.contains(c.trigger) && g();
          };
          return (
            window.addEventListener('scroll', f, { capture: !0 }),
            () => window.removeEventListener('scroll', f, { capture: !0 })
          );
        }
      }, [c.trigger, g]),
      a.jsx(Bn, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: g,
        children: a.jsxs(Ss, {
          'data-state': c.stateAttribute,
          ...u,
          ...l,
          ref: t,
          style: {
            ...l.style,
            '--radix-tooltip-content-transform-origin':
              'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width':
              'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height':
              'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height':
              'var(--radix-popper-anchor-height)',
          },
          children: [
            a.jsx(xa, { children: r }),
            a.jsx(ma, {
              scope: n,
              isInside: !0,
              children: a.jsx(Vs, {
                id: c.contentId,
                role: 'tooltip',
                children: s || r,
              }),
            }),
          ],
        }),
      })
    );
  });
Fr.displayName = $e;
var Ar = 'TooltipArrow',
  wa = x.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      s = xt(n);
    return ha(Ar, n).isInside ? null : a.jsx(Rs, { ...s, ...r, ref: t });
  });
wa.displayName = Ar;
function va(e, t) {
  const n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    s = Math.abs(t.right - e.x),
    o = Math.abs(t.left - e.x);
  switch (Math.min(n, r, s, o)) {
    case o:
      return 'left';
    case s:
      return 'right';
    case n:
      return 'top';
    case r:
      return 'bottom';
    default:
      throw new Error('unreachable');
  }
}
function ya(e, t, n = 5) {
  const r = [];
  switch (t) {
    case 'top':
      r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
      break;
    case 'bottom':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
      break;
    case 'left':
      r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
      break;
    case 'right':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
      break;
  }
  return r;
}
function Sa(e) {
  const { top: t, right: n, bottom: r, left: s } = e;
  return [
    { x: s, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: s, y: r },
  ];
}
function Ca(e, t) {
  const { x: n, y: r } = e;
  let s = !1;
  for (let o = 0, i = t.length - 1; o < t.length; i = o++) {
    const l = t[o],
      c = t[i],
      u = l.x,
      g = l.y,
      f = c.x,
      p = c.y;
    g > r != p > r && n < ((f - u) * (r - g)) / (p - g) + u && (s = !s);
  }
  return s;
}
function Ra(e) {
  const t = e.slice();
  return (
    t.sort((n, r) =>
      n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0,
    ),
    _a(t)
  );
}
function _a(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    for (; t.length >= 2; ) {
      const o = t[t.length - 1],
        i = t[t.length - 2];
      if ((o.x - i.x) * (s.y - i.y) >= (o.y - i.y) * (s.x - i.x)) t.pop();
      else break;
    }
    t.push(s);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const s = e[r];
    for (; n.length >= 2; ) {
      const o = n[n.length - 1],
        i = n[n.length - 2];
      if ((o.x - i.x) * (s.y - i.y) >= (o.y - i.y) * (s.x - i.x)) n.pop();
      else break;
    }
    n.push(s);
  }
  return (
    n.pop(),
    t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y
      ? t
      : t.concat(n)
  );
}
var ba = Pr,
  Ea = kr,
  Ia = Tr,
  Mr = Fr;
const Na = ba,
  ja = Ea,
  Pa = Ia,
  $r = x.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
    a.jsx(Mr, {
      ref: r,
      sideOffset: t,
      className: Q(
        'z-50 overflow-hidden rounded-md bg-main border-2 border-black px-3 py-1.5 text-xs text-black animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-light',
        e,
      ),
      ...n,
    }),
  );
$r.displayName = Mr.displayName;
var Or = 'vercel.ai.error',
  ka = Symbol.for(Or),
  Vr,
  Ta = class Lr extends Error {
    constructor({ name: t, message: n, cause: r }) {
      (super(n), (this[Vr] = !0), (this.name = t), (this.cause = r));
    }
    static isInstance(t) {
      return Lr.hasMarker(t, Or);
    }
    static hasMarker(t, n) {
      const r = Symbol.for(n);
      return (
        t != null &&
        typeof t == 'object' &&
        r in t &&
        typeof t[r] == 'boolean' &&
        t[r] === !0
      );
    }
  };
Vr = ka;
var Oe = Ta;
function zr(e) {
  return e == null
    ? 'unknown error'
    : typeof e == 'string'
      ? e
      : e instanceof Error
        ? e.message
        : JSON.stringify(e);
}
var Hr = 'AI_InvalidArgumentError',
  Gr = `vercel.ai.error.${Hr}`,
  Fa = Symbol.for(Gr),
  Br,
  Da = class extends Oe {
    constructor({ message: e, cause: t, argument: n }) {
      (super({ name: Hr, message: e, cause: t }),
        (this[Br] = !0),
        (this.argument = n));
    }
    static isInstance(e) {
      return Oe.hasMarker(e, Gr);
    }
  };
Br = Fa;
var qr = 'AI_JSONParseError',
  Ur = `vercel.ai.error.${qr}`,
  Aa = Symbol.for(Ur),
  Jr,
  En = class extends Oe {
    constructor({ text: e, cause: t }) {
      (super({
        name: qr,
        message: `JSON parsing failed: Text: ${e}.
Error message: ${zr(t)}`,
        cause: t,
      }),
        (this[Jr] = !0),
        (this.text = e));
    }
    static isInstance(e) {
      return Oe.hasMarker(e, Ur);
    }
  };
Jr = Aa;
var Wr = 'AI_TypeValidationError',
  Yr = `vercel.ai.error.${Wr}`,
  Ma = Symbol.for(Yr),
  Xr,
  $a = class Ut extends Oe {
    constructor({ value: t, cause: n }) {
      (super({
        name: Wr,
        message: `Type validation failed: Value: ${JSON.stringify(t)}.
Error message: ${zr(n)}`,
        cause: n,
      }),
        (this[Xr] = !0),
        (this.value = t));
    }
    static isInstance(t) {
      return Oe.hasMarker(t, Yr);
    }
    static wrap({ value: t, cause: n }) {
      return Ut.isInstance(n) && n.value === t
        ? n
        : new Ut({ value: t, cause: n });
    }
  };
Xr = Ma;
var In = $a;
let Oa =
  (e, t = 21) =>
  (n = t) => {
    let r = '',
      s = n | 0;
    for (; s--; ) r += e[(Math.random() * e.length) | 0];
    return r;
  };
var Pe = { exports: {} },
  Nn;
function Va() {
  if (Nn) return Pe.exports;
  Nn = 1;
  const e = typeof Buffer < 'u',
    t =
      /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/,
    n =
      /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function r(l, c, u) {
    (u == null && c !== null && typeof c == 'object' && ((u = c), (c = void 0)),
      e && Buffer.isBuffer(l) && (l = l.toString()),
      l && l.charCodeAt(0) === 65279 && (l = l.slice(1)));
    const g = JSON.parse(l, c);
    if (g === null || typeof g != 'object') return g;
    const f = (u && u.protoAction) || 'error',
      p = (u && u.constructorAction) || 'error';
    if (f === 'ignore' && p === 'ignore') return g;
    if (f !== 'ignore' && p !== 'ignore') {
      if (t.test(l) === !1 && n.test(l) === !1) return g;
    } else if (f !== 'ignore' && p === 'ignore') {
      if (t.test(l) === !1) return g;
    } else if (n.test(l) === !1) return g;
    return s(g, { protoAction: f, constructorAction: p, safe: u && u.safe });
  }
  function s(
    l,
    { protoAction: c = 'error', constructorAction: u = 'error', safe: g } = {},
  ) {
    let f = [l];
    for (; f.length; ) {
      const p = f;
      f = [];
      for (const d of p) {
        if (
          c !== 'ignore' &&
          Object.prototype.hasOwnProperty.call(d, '__proto__')
        ) {
          if (g === !0) return null;
          if (c === 'error')
            throw new SyntaxError(
              'Object contains forbidden prototype property',
            );
          delete d.__proto__;
        }
        if (
          u !== 'ignore' &&
          Object.prototype.hasOwnProperty.call(d, 'constructor') &&
          Object.prototype.hasOwnProperty.call(d.constructor, 'prototype')
        ) {
          if (g === !0) return null;
          if (u === 'error')
            throw new SyntaxError(
              'Object contains forbidden prototype property',
            );
          delete d.constructor;
        }
        for (const m in d) {
          const h = d[m];
          h && typeof h == 'object' && f.push(h);
        }
      }
    }
    return l;
  }
  function o(l, c, u) {
    const g = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return r(l, c, u);
    } finally {
      Error.stackTraceLimit = g;
    }
  }
  function i(l, c) {
    const u = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return r(l, c, { safe: !0 });
    } catch {
      return null;
    } finally {
      Error.stackTraceLimit = u;
    }
  }
  return (
    (Pe.exports = o),
    (Pe.exports.default = o),
    (Pe.exports.parse = o),
    (Pe.exports.safeParse = i),
    (Pe.exports.scan = s),
    Pe.exports
  );
}
var La = Va();
const za = Wn(La);
var Ha = ({
    prefix: e,
    size: t = 16,
    alphabet:
      n = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    separator: r = '-',
  } = {}) => {
    const s = Oa(n, t);
    if (e == null) return s;
    if (n.includes(r))
      throw new Da({
        argument: 'separator',
        message: `The separator "${r}" must not be part of the alphabet "${n}".`,
      });
    return (o) => `${e}${r}${s(o)}`;
  },
  mn = Ha(),
  Jt = Symbol.for('vercel.ai.validator');
function Ga(e) {
  return { [Jt]: !0, validate: e };
}
function Ba(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    Jt in e &&
    e[Jt] === !0 &&
    'validate' in e
  );
}
function qa(e) {
  return Ba(e) ? e : Ua(e);
}
function Ua(e) {
  return Ga((t) => {
    const n = e.safeParse(t);
    return n.success
      ? { success: !0, value: n.data }
      : { success: !1, error: n.error };
  });
}
function Ja({ value: e, schema: t }) {
  const n = qa(t);
  try {
    if (n.validate == null) return { success: !0, value: e };
    const r = n.validate(e);
    return r.success
      ? r
      : { success: !1, error: In.wrap({ value: e, cause: r.error }) };
  } catch (r) {
    return { success: !1, error: In.wrap({ value: e, cause: r }) };
  }
}
function jn({ text: e, schema: t }) {
  try {
    const n = za.parse(e);
    if (t == null) return { success: !0, value: n, rawValue: n };
    const r = Ja({ value: n, schema: t });
    return r.success ? { ...r, rawValue: n } : r;
  } catch (n) {
    return {
      success: !1,
      error: En.isInstance(n) ? n : new En({ text: e, cause: n }),
    };
  }
}
new Set('ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789');
var Be = {
    code: '0',
    name: 'text',
    parse: (e) => {
      if (typeof e != 'string')
        throw new Error('"text" parts expect a string value.');
      return { type: 'text', value: e };
    },
  },
  qe = {
    code: '3',
    name: 'error',
    parse: (e) => {
      if (typeof e != 'string')
        throw new Error('"error" parts expect a string value.');
      return { type: 'error', value: e };
    },
  },
  Ue = {
    code: '4',
    name: 'assistant_message',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('id' in e) ||
        !('role' in e) ||
        !('content' in e) ||
        typeof e.id != 'string' ||
        typeof e.role != 'string' ||
        e.role !== 'assistant' ||
        !Array.isArray(e.content) ||
        !e.content.every(
          (t) =>
            t != null &&
            typeof t == 'object' &&
            'type' in t &&
            t.type === 'text' &&
            'text' in t &&
            t.text != null &&
            typeof t.text == 'object' &&
            'value' in t.text &&
            typeof t.text.value == 'string',
        )
      )
        throw new Error(
          '"assistant_message" parts expect an object with an "id", "role", and "content" property.',
        );
      return { type: 'assistant_message', value: e };
    },
  },
  Je = {
    code: '5',
    name: 'assistant_control_data',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('threadId' in e) ||
        !('messageId' in e) ||
        typeof e.threadId != 'string' ||
        typeof e.messageId != 'string'
      )
        throw new Error(
          '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.',
        );
      return {
        type: 'assistant_control_data',
        value: { threadId: e.threadId, messageId: e.messageId },
      };
    },
  },
  We = {
    code: '6',
    name: 'data_message',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('role' in e) ||
        !('data' in e) ||
        typeof e.role != 'string' ||
        e.role !== 'data'
      )
        throw new Error(
          '"data_message" parts expect an object with a "role" and "data" property.',
        );
      return { type: 'data_message', value: e };
    },
  },
  Wa = [Be, qe, Ue, Je, We];
(Be.code + '', qe.code + '', Ue.code + '', Je.code + '', We.code + '');
(Be.name + '',
  Be.code,
  qe.name + '',
  qe.code,
  Ue.name + '',
  Ue.code,
  Je.name + '',
  Je.code,
  We.name + '',
  We.code);
Wa.map((e) => e.code);
function Ya({ promptTokens: e, completionTokens: t }) {
  return { promptTokens: e, completionTokens: t, totalTokens: e + t };
}
function Xa(e) {
  const t = ['ROOT'];
  let n = -1,
    r = null;
  function s(c, u, g) {
    switch (c) {
      case '"': {
        ((n = u), t.pop(), t.push(g), t.push('INSIDE_STRING'));
        break;
      }
      case 'f':
      case 't':
      case 'n': {
        ((n = u), (r = u), t.pop(), t.push(g), t.push('INSIDE_LITERAL'));
        break;
      }
      case '-': {
        (t.pop(), t.push(g), t.push('INSIDE_NUMBER'));
        break;
      }
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        ((n = u), t.pop(), t.push(g), t.push('INSIDE_NUMBER'));
        break;
      }
      case '{': {
        ((n = u), t.pop(), t.push(g), t.push('INSIDE_OBJECT_START'));
        break;
      }
      case '[': {
        ((n = u), t.pop(), t.push(g), t.push('INSIDE_ARRAY_START'));
        break;
      }
    }
  }
  function o(c, u) {
    switch (c) {
      case ',': {
        (t.pop(), t.push('INSIDE_OBJECT_AFTER_COMMA'));
        break;
      }
      case '}': {
        ((n = u), t.pop());
        break;
      }
    }
  }
  function i(c, u) {
    switch (c) {
      case ',': {
        (t.pop(), t.push('INSIDE_ARRAY_AFTER_COMMA'));
        break;
      }
      case ']': {
        ((n = u), t.pop());
        break;
      }
    }
  }
  for (let c = 0; c < e.length; c++) {
    const u = e[c];
    switch (t[t.length - 1]) {
      case 'ROOT':
        s(u, c, 'FINISH');
        break;
      case 'INSIDE_OBJECT_START': {
        switch (u) {
          case '"': {
            (t.pop(), t.push('INSIDE_OBJECT_KEY'));
            break;
          }
          case '}': {
            ((n = c), t.pop());
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_AFTER_COMMA': {
        switch (u) {
          case '"': {
            (t.pop(), t.push('INSIDE_OBJECT_KEY'));
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_KEY': {
        switch (u) {
          case '"': {
            (t.pop(), t.push('INSIDE_OBJECT_AFTER_KEY'));
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_AFTER_KEY': {
        switch (u) {
          case ':': {
            (t.pop(), t.push('INSIDE_OBJECT_BEFORE_VALUE'));
            break;
          }
        }
        break;
      }
      case 'INSIDE_OBJECT_BEFORE_VALUE': {
        s(u, c, 'INSIDE_OBJECT_AFTER_VALUE');
        break;
      }
      case 'INSIDE_OBJECT_AFTER_VALUE': {
        o(u, c);
        break;
      }
      case 'INSIDE_STRING': {
        switch (u) {
          case '"': {
            (t.pop(), (n = c));
            break;
          }
          case '\\': {
            t.push('INSIDE_STRING_ESCAPE');
            break;
          }
          default:
            n = c;
        }
        break;
      }
      case 'INSIDE_ARRAY_START': {
        switch (u) {
          case ']': {
            ((n = c), t.pop());
            break;
          }
          default: {
            ((n = c), s(u, c, 'INSIDE_ARRAY_AFTER_VALUE'));
            break;
          }
        }
        break;
      }
      case 'INSIDE_ARRAY_AFTER_VALUE': {
        switch (u) {
          case ',': {
            (t.pop(), t.push('INSIDE_ARRAY_AFTER_COMMA'));
            break;
          }
          case ']': {
            ((n = c), t.pop());
            break;
          }
          default: {
            n = c;
            break;
          }
        }
        break;
      }
      case 'INSIDE_ARRAY_AFTER_COMMA': {
        s(u, c, 'INSIDE_ARRAY_AFTER_VALUE');
        break;
      }
      case 'INSIDE_STRING_ESCAPE': {
        (t.pop(), (n = c));
        break;
      }
      case 'INSIDE_NUMBER': {
        switch (u) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9': {
            n = c;
            break;
          }
          case 'e':
          case 'E':
          case '-':
          case '.':
            break;
          case ',': {
            (t.pop(),
              t[t.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(u, c),
              t[t.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE' && o(u, c));
            break;
          }
          case '}': {
            (t.pop(),
              t[t.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE' && o(u, c));
            break;
          }
          case ']': {
            (t.pop(),
              t[t.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(u, c));
            break;
          }
          default: {
            t.pop();
            break;
          }
        }
        break;
      }
      case 'INSIDE_LITERAL': {
        const f = e.substring(r, c + 1);
        !'false'.startsWith(f) && !'true'.startsWith(f) && !'null'.startsWith(f)
          ? (t.pop(),
            t[t.length - 1] === 'INSIDE_OBJECT_AFTER_VALUE'
              ? o(u, c)
              : t[t.length - 1] === 'INSIDE_ARRAY_AFTER_VALUE' && i(u, c))
          : (n = c);
        break;
      }
    }
  }
  let l = e.slice(0, n + 1);
  for (let c = t.length - 1; c >= 0; c--)
    switch (t[c]) {
      case 'INSIDE_STRING': {
        l += '"';
        break;
      }
      case 'INSIDE_OBJECT_KEY':
      case 'INSIDE_OBJECT_AFTER_KEY':
      case 'INSIDE_OBJECT_AFTER_COMMA':
      case 'INSIDE_OBJECT_START':
      case 'INSIDE_OBJECT_BEFORE_VALUE':
      case 'INSIDE_OBJECT_AFTER_VALUE': {
        l += '}';
        break;
      }
      case 'INSIDE_ARRAY_START':
      case 'INSIDE_ARRAY_AFTER_COMMA':
      case 'INSIDE_ARRAY_AFTER_VALUE': {
        l += ']';
        break;
      }
      case 'INSIDE_LITERAL': {
        const g = e.substring(r, e.length);
        'true'.startsWith(g)
          ? (l += 'true'.slice(g.length))
          : 'false'.startsWith(g)
            ? (l += 'false'.slice(g.length))
            : 'null'.startsWith(g) && (l += 'null'.slice(g.length));
      }
    }
  return l;
}
function Ka(e) {
  if (e === void 0) return { value: void 0, state: 'undefined-input' };
  let t = jn({ text: e });
  return t.success
    ? { value: t.value, state: 'successful-parse' }
    : ((t = jn({ text: Xa(e) })),
      t.success
        ? { value: t.value, state: 'repaired-parse' }
        : { value: void 0, state: 'failed-parse' });
}
var Qa = {
    code: '0',
    name: 'text',
    parse: (e) => {
      if (typeof e != 'string')
        throw new Error('"text" parts expect a string value.');
      return { type: 'text', value: e };
    },
  },
  Za = {
    code: '2',
    name: 'data',
    parse: (e) => {
      if (!Array.isArray(e))
        throw new Error('"data" parts expect an array value.');
      return { type: 'data', value: e };
    },
  },
  ei = {
    code: '3',
    name: 'error',
    parse: (e) => {
      if (typeof e != 'string')
        throw new Error('"error" parts expect a string value.');
      return { type: 'error', value: e };
    },
  },
  ti = {
    code: '8',
    name: 'message_annotations',
    parse: (e) => {
      if (!Array.isArray(e))
        throw new Error('"message_annotations" parts expect an array value.');
      return { type: 'message_annotations', value: e };
    },
  },
  ni = {
    code: '9',
    name: 'tool_call',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('toolName' in e) ||
        typeof e.toolName != 'string' ||
        !('args' in e) ||
        typeof e.args != 'object'
      )
        throw new Error(
          '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.',
        );
      return { type: 'tool_call', value: e };
    },
  },
  ri = {
    code: 'a',
    name: 'tool_result',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('result' in e)
      )
        throw new Error(
          '"tool_result" parts expect an object with a "toolCallId" and a "result" property.',
        );
      return { type: 'tool_result', value: e };
    },
  },
  si = {
    code: 'b',
    name: 'tool_call_streaming_start',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('toolName' in e) ||
        typeof e.toolName != 'string'
      )
        throw new Error(
          '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.',
        );
      return { type: 'tool_call_streaming_start', value: e };
    },
  },
  oi = {
    code: 'c',
    name: 'tool_call_delta',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('toolCallId' in e) ||
        typeof e.toolCallId != 'string' ||
        !('argsTextDelta' in e) ||
        typeof e.argsTextDelta != 'string'
      )
        throw new Error(
          '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.',
        );
      return { type: 'tool_call_delta', value: e };
    },
  },
  ai = {
    code: 'd',
    name: 'finish_message',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('finishReason' in e) ||
        typeof e.finishReason != 'string'
      )
        throw new Error(
          '"finish_message" parts expect an object with a "finishReason" property.',
        );
      const t = { finishReason: e.finishReason };
      return (
        'usage' in e &&
          e.usage != null &&
          typeof e.usage == 'object' &&
          'promptTokens' in e.usage &&
          'completionTokens' in e.usage &&
          (t.usage = {
            promptTokens:
              typeof e.usage.promptTokens == 'number'
                ? e.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof e.usage.completionTokens == 'number'
                ? e.usage.completionTokens
                : Number.NaN,
          }),
        { type: 'finish_message', value: t }
      );
    },
  },
  ii = {
    code: 'e',
    name: 'finish_step',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('finishReason' in e) ||
        typeof e.finishReason != 'string'
      )
        throw new Error(
          '"finish_step" parts expect an object with a "finishReason" property.',
        );
      const t = { finishReason: e.finishReason, isContinued: !1 };
      return (
        'usage' in e &&
          e.usage != null &&
          typeof e.usage == 'object' &&
          'promptTokens' in e.usage &&
          'completionTokens' in e.usage &&
          (t.usage = {
            promptTokens:
              typeof e.usage.promptTokens == 'number'
                ? e.usage.promptTokens
                : Number.NaN,
            completionTokens:
              typeof e.usage.completionTokens == 'number'
                ? e.usage.completionTokens
                : Number.NaN,
          }),
        'isContinued' in e &&
          typeof e.isContinued == 'boolean' &&
          (t.isContinued = e.isContinued),
        { type: 'finish_step', value: t }
      );
    },
  },
  li = {
    code: 'f',
    name: 'start_step',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('messageId' in e) ||
        typeof e.messageId != 'string'
      )
        throw new Error(
          '"start_step" parts expect an object with an "id" property.',
        );
      return { type: 'start_step', value: { messageId: e.messageId } };
    },
  },
  ci = {
    code: 'g',
    name: 'reasoning',
    parse: (e) => {
      if (typeof e != 'string')
        throw new Error('"reasoning" parts expect a string value.');
      return { type: 'reasoning', value: e };
    },
  },
  ui = {
    code: 'h',
    name: 'source',
    parse: (e) => {
      if (e == null || typeof e != 'object')
        throw new Error('"source" parts expect a Source object.');
      return { type: 'source', value: e };
    },
  },
  di = {
    code: 'i',
    name: 'redacted_reasoning',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('data' in e) ||
        typeof e.data != 'string'
      )
        throw new Error(
          '"redacted_reasoning" parts expect an object with a "data" property.',
        );
      return { type: 'redacted_reasoning', value: { data: e.data } };
    },
  },
  gi = {
    code: 'j',
    name: 'reasoning_signature',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('signature' in e) ||
        typeof e.signature != 'string'
      )
        throw new Error(
          '"reasoning_signature" parts expect an object with a "signature" property.',
        );
      return { type: 'reasoning_signature', value: { signature: e.signature } };
    },
  },
  fi = {
    code: 'k',
    name: 'file',
    parse: (e) => {
      if (
        e == null ||
        typeof e != 'object' ||
        !('data' in e) ||
        typeof e.data != 'string' ||
        !('mimeType' in e) ||
        typeof e.mimeType != 'string'
      )
        throw new Error(
          '"file" parts expect an object with a "data" and "mimeType" property.',
        );
      return { type: 'file', value: e };
    },
  },
  hn = [Qa, Za, ei, ti, ni, ri, si, oi, ai, ii, li, ci, ui, di, gi, fi],
  pi = Object.fromEntries(hn.map((e) => [e.code, e]));
Object.fromEntries(hn.map((e) => [e.name, e.code]));
var mi = hn.map((e) => e.code),
  hi = (e) => {
    const t = e.indexOf(':');
    if (t === -1)
      throw new Error('Failed to parse stream string. No separator found.');
    const n = e.slice(0, t);
    if (!mi.includes(n))
      throw new Error(`Failed to parse stream string. Invalid code ${n}.`);
    const r = n,
      s = e.slice(t + 1),
      o = JSON.parse(s);
    return pi[r].parse(o);
  },
  xi = 10;
function wi(e, t) {
  const n = new Uint8Array(t);
  let r = 0;
  for (const s of e) (n.set(s, r), (r += s.length));
  return ((e.length = 0), n);
}
async function vi({
  stream: e,
  onTextPart: t,
  onReasoningPart: n,
  onReasoningSignaturePart: r,
  onRedactedReasoningPart: s,
  onSourcePart: o,
  onFilePart: i,
  onDataPart: l,
  onErrorPart: c,
  onToolCallStreamingStartPart: u,
  onToolCallDeltaPart: g,
  onToolCallPart: f,
  onToolResultPart: p,
  onMessageAnnotationsPart: d,
  onFinishMessagePart: m,
  onFinishStepPart: h,
  onStartStepPart: y,
}) {
  const w = e.getReader(),
    b = new TextDecoder(),
    E = [];
  let I = 0;
  for (;;) {
    const { value: R } = await w.read();
    if (R && (E.push(R), (I += R.length), R[R.length - 1] !== xi)) continue;
    if (E.length === 0) break;
    const v = wi(E, I);
    I = 0;
    const N = b
      .decode(v, { stream: !0 })
      .split(
        `
`,
      )
      .filter((_) => _ !== '')
      .map(hi);
    for (const { type: _, value: k } of N)
      switch (_) {
        case 'text':
          await t?.(k);
          break;
        case 'reasoning':
          await n?.(k);
          break;
        case 'reasoning_signature':
          await r?.(k);
          break;
        case 'redacted_reasoning':
          await s?.(k);
          break;
        case 'file':
          await i?.(k);
          break;
        case 'source':
          await o?.(k);
          break;
        case 'data':
          await l?.(k);
          break;
        case 'error':
          await c?.(k);
          break;
        case 'message_annotations':
          await d?.(k);
          break;
        case 'tool_call_streaming_start':
          await u?.(k);
          break;
        case 'tool_call_delta':
          await g?.(k);
          break;
        case 'tool_call':
          await f?.(k);
          break;
        case 'tool_result':
          await p?.(k);
          break;
        case 'finish_message':
          await m?.(k);
          break;
        case 'finish_step':
          await h?.(k);
          break;
        case 'start_step':
          await y?.(k);
          break;
        default: {
          const H = _;
          throw new Error(`Unknown stream part type: ${H}`);
        }
      }
  }
}
async function yi({
  stream: e,
  update: t,
  onToolCall: n,
  onFinish: r,
  generateId: s = mn,
  getCurrentDate: o = () => new Date(),
  lastMessage: i,
}) {
  var l, c;
  const u = i?.role === 'assistant';
  let g = u
    ? 1 +
      ((c =
        (l = i.toolInvocations) == null
          ? void 0
          : l.reduce((v, N) => {
              var _;
              return Math.max(v, (_ = N.step) != null ? _ : 0);
            }, 0)) != null
        ? c
        : 0)
    : 0;
  const f = u
    ? structuredClone(i)
    : { id: s(), createdAt: o(), role: 'assistant', content: '', parts: [] };
  let p, d, m;
  function h(v, N) {
    const _ = f.parts.find(
      (k) => k.type === 'tool-invocation' && k.toolInvocation.toolCallId === v,
    );
    _ != null
      ? (_.toolInvocation = N)
      : f.parts.push({ type: 'tool-invocation', toolInvocation: N });
  }
  const y = [];
  let w = u ? i?.annotations : void 0;
  const b = {};
  let E = { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
    I = 'unknown';
  function R() {
    const v = [...y];
    w?.length && (f.annotations = w);
    const N = { ...structuredClone(f), revisionId: s() };
    t({ message: N, data: v, replaceLastMessage: u });
  }
  (await vi({
    stream: e,
    onTextPart(v) {
      (p == null
        ? ((p = { type: 'text', text: v }), f.parts.push(p))
        : (p.text += v),
        (f.content += v),
        R());
    },
    onReasoningPart(v) {
      var N;
      (m == null
        ? ((m = { type: 'text', text: v }), d?.details.push(m))
        : (m.text += v),
        d == null
          ? ((d = { type: 'reasoning', reasoning: v, details: [m] }),
            f.parts.push(d))
          : (d.reasoning += v),
        (f.reasoning = ((N = f.reasoning) != null ? N : '') + v),
        R());
    },
    onReasoningSignaturePart(v) {
      m != null && (m.signature = v.signature);
    },
    onRedactedReasoningPart(v) {
      (d == null &&
        ((d = { type: 'reasoning', reasoning: '', details: [] }),
        f.parts.push(d)),
        d.details.push({ type: 'redacted', data: v.data }),
        (m = void 0),
        R());
    },
    onFilePart(v) {
      (f.parts.push({ type: 'file', mimeType: v.mimeType, data: v.data }), R());
    },
    onSourcePart(v) {
      (f.parts.push({ type: 'source', source: v }), R());
    },
    onToolCallStreamingStartPart(v) {
      (f.toolInvocations == null && (f.toolInvocations = []),
        (b[v.toolCallId] = {
          text: '',
          step: g,
          toolName: v.toolName,
          index: f.toolInvocations.length,
        }));
      const N = {
        state: 'partial-call',
        step: g,
        toolCallId: v.toolCallId,
        toolName: v.toolName,
        args: void 0,
      };
      (f.toolInvocations.push(N), h(v.toolCallId, N), R());
    },
    onToolCallDeltaPart(v) {
      const N = b[v.toolCallId];
      N.text += v.argsTextDelta;
      const { value: _ } = Ka(N.text),
        k = {
          state: 'partial-call',
          step: N.step,
          toolCallId: v.toolCallId,
          toolName: N.toolName,
          args: _,
        };
      ((f.toolInvocations[N.index] = k), h(v.toolCallId, k), R());
    },
    async onToolCallPart(v) {
      const N = { state: 'call', step: g, ...v };
      if (
        (b[v.toolCallId] != null
          ? (f.toolInvocations[b[v.toolCallId].index] = N)
          : (f.toolInvocations == null && (f.toolInvocations = []),
            f.toolInvocations.push(N)),
        h(v.toolCallId, N),
        R(),
        n)
      ) {
        const _ = await n({ toolCall: v });
        if (_ != null) {
          const k = { state: 'result', step: g, ...v, result: _ };
          ((f.toolInvocations[f.toolInvocations.length - 1] = k),
            h(v.toolCallId, k),
            R());
        }
      }
    },
    onToolResultPart(v) {
      const N = f.toolInvocations;
      if (N == null)
        throw new Error('tool_result must be preceded by a tool_call');
      const _ = N.findIndex((H) => H.toolCallId === v.toolCallId);
      if (_ === -1)
        throw new Error(
          'tool_result must be preceded by a tool_call with the same toolCallId',
        );
      const k = { ...N[_], state: 'result', ...v };
      ((N[_] = k), h(v.toolCallId, k), R());
    },
    onDataPart(v) {
      (y.push(...v), R());
    },
    onMessageAnnotationsPart(v) {
      (w == null ? (w = [...v]) : w.push(...v), R());
    },
    onFinishStepPart(v) {
      ((g += 1), (p = v.isContinued ? p : void 0), (d = void 0), (m = void 0));
    },
    onStartStepPart(v) {
      (u || (f.id = v.messageId), f.parts.push({ type: 'step-start' }), R());
    },
    onFinishMessagePart(v) {
      ((I = v.finishReason), v.usage != null && (E = Ya(v.usage)));
    },
    onErrorPart(v) {
      throw new Error(v);
    },
  }),
    r?.({ message: f, finishReason: I, usage: E }));
}
async function Si({ stream: e, onTextPart: t }) {
  const n = e.pipeThrough(new TextDecoderStream()).getReader();
  for (;;) {
    const { done: r, value: s } = await n.read();
    if (r) break;
    await t(s);
  }
}
async function Ci({
  stream: e,
  update: t,
  onFinish: n,
  getCurrentDate: r = () => new Date(),
  generateId: s = mn,
}) {
  const o = { type: 'text', text: '' },
    i = { id: s(), createdAt: r(), role: 'assistant', content: '', parts: [o] };
  (await Si({
    stream: e,
    onTextPart: (l) => {
      ((i.content += l),
        (o.text += l),
        t({ message: { ...i }, data: [], replaceLastMessage: !1 }));
    },
  }),
    n?.(i, {
      usage: { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
      finishReason: 'unknown',
    }));
}
var Ri = () => fetch;
async function _i({
  api: e,
  body: t,
  streamProtocol: n = 'data',
  credentials: r,
  headers: s,
  abortController: o,
  restoreMessagesOnFailure: i,
  onResponse: l,
  onUpdate: c,
  onFinish: u,
  onToolCall: g,
  generateId: f,
  fetch: p = Ri(),
  lastMessage: d,
  requestType: m = 'generate',
}) {
  var h, y, w;
  const E = await (
    m === 'resume'
      ? p(`${e}?chatId=${t.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', ...s },
          signal: (h = o?.()) == null ? void 0 : h.signal,
          credentials: r,
        })
      : p(e, {
          method: 'POST',
          body: JSON.stringify(t),
          headers: { 'Content-Type': 'application/json', ...s },
          signal: (y = o?.()) == null ? void 0 : y.signal,
          credentials: r,
        })
  ).catch((I) => {
    throw (i(), I);
  });
  if (l)
    try {
      await l(E);
    } catch (I) {
      throw I;
    }
  if (!E.ok)
    throw (
      i(),
      new Error(
        (w = await E.text()) != null ? w : 'Failed to fetch the chat response.',
      )
    );
  if (!E.body) throw new Error('The response body is empty.');
  switch (n) {
    case 'text': {
      await Ci({ stream: E.body, update: c, onFinish: u, generateId: f });
      return;
    }
    case 'data': {
      await yi({
        stream: E.body,
        update: c,
        lastMessage: d,
        onToolCall: g,
        onFinish({ message: I, finishReason: R, usage: v }) {
          u && I != null && u(I, { usage: v, finishReason: R });
        },
        generateId: f,
      });
      return;
    }
    default: {
      const I = n;
      throw new Error(`Unknown stream protocol: ${I}`);
    }
  }
}
function Wt(e) {
  return e?.reduce((t, n) => {
    var r;
    return Math.max(t, (r = n.step) != null ? r : 0);
  }, 0);
}
function Kr(e) {
  var t;
  return (t = e.parts) != null
    ? t
    : [
        ...(e.toolInvocations
          ? e.toolInvocations.map((n) => ({
              type: 'tool-invocation',
              toolInvocation: n,
            }))
          : []),
        ...(e.reasoning
          ? [
              {
                type: 'reasoning',
                reasoning: e.reasoning,
                details: [{ type: 'text', text: e.reasoning }],
              },
            ]
          : []),
        ...(e.content ? [{ type: 'text', text: e.content }] : []),
      ];
}
function Pt(e) {
  return e.map((t) => ({ ...t, parts: Kr(t) }));
}
function Yt(e, t) {
  if (e === t) return !0;
  if (e == null || t == null) return !1;
  if (typeof e != 'object' && typeof t != 'object') return e === t;
  if (e.constructor !== t.constructor) return !1;
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  if (Array.isArray(e)) {
    if (e.length !== t.length) return !1;
    for (let s = 0; s < e.length; s++) if (!Yt(e[s], t[s])) return !1;
    return !0;
  }
  const n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (const s of n) if (!r.includes(s) || !Yt(e[s], t[s])) return !1;
  return !0;
}
async function Pn(e) {
  if (!e) return [];
  if (globalThis.FileList && e instanceof globalThis.FileList)
    return Promise.all(
      Array.from(e).map(async (t) => {
        const { name: n, type: r } = t,
          s = await new Promise((o, i) => {
            const l = new FileReader();
            ((l.onload = (c) => {
              var u;
              o((u = c.target) == null ? void 0 : u.result);
            }),
              (l.onerror = (c) => i(c)),
              l.readAsDataURL(t));
          });
        return { name: n, contentType: r, url: s };
      }),
    );
  if (Array.isArray(e)) return e;
  throw new Error('Invalid attachments type');
}
function bi({
  originalMaxToolInvocationStep: e,
  originalMessageCount: t,
  maxSteps: n,
  messages: r,
}) {
  var s;
  const o = r[r.length - 1];
  return (
    n > 1 &&
    o != null &&
    (r.length > t || Wt(o.toolInvocations) !== e) &&
    Qr(o) &&
    ((s = Wt(o.toolInvocations)) != null ? s : 0) < n
  );
}
function Qr(e) {
  if (e.role !== 'assistant') return !1;
  const t = e.parts.reduce((r, s, o) => (s.type === 'step-start' ? o : r), -1),
    n = e.parts.slice(t + 1).filter((r) => r.type === 'tool-invocation');
  return n.length > 0 && n.every((r) => 'result' in r.toolInvocation);
}
function Ei({ messages: e, toolCallId: t, toolResult: n }) {
  var r;
  const s = e[e.length - 1],
    o = s.parts.find(
      (l) => l.type === 'tool-invocation' && l.toolInvocation.toolCallId === t,
    );
  if (o == null) return;
  const i = { ...o.toolInvocation, state: 'result', result: n };
  ((o.toolInvocation = i),
    (s.toolInvocations =
      (r = s.toolInvocations) == null
        ? void 0
        : r.map((l) => (l.toolCallId === t ? i : l))));
}
const Zr = 0,
  es = 1,
  ts = 2,
  kn = 3;
var Tn = Object.prototype.hasOwnProperty;
function Xt(e, t) {
  var n, r;
  if (e === t) return !0;
  if (e && t && (n = e.constructor) === t.constructor) {
    if (n === Date) return e.getTime() === t.getTime();
    if (n === RegExp) return e.toString() === t.toString();
    if (n === Array) {
      if ((r = e.length) === t.length) for (; r-- && Xt(e[r], t[r]); );
      return r === -1;
    }
    if (!n || typeof e == 'object') {
      r = 0;
      for (n in e)
        if (
          (Tn.call(e, n) && ++r && !Tn.call(t, n)) ||
          !(n in t) ||
          !Xt(e[n], t[n])
        )
          return !1;
      return Object.keys(t).length === r;
    }
  }
  return e !== e && t !== t;
}
const Ce = new WeakMap(),
  Ie = () => {},
  ae = Ie(),
  Kt = Object,
  z = (e) => e === ae,
  ve = (e) => typeof e == 'function',
  je = (e, t) => ({ ...e, ...t }),
  ns = (e) => ve(e.then),
  kt = {},
  tt = {},
  xn = 'undefined',
  Ke = typeof window != xn,
  Qt = typeof document != xn,
  Ii = Ke && 'Deno' in window,
  Ni = () => Ke && typeof window.requestAnimationFrame != xn,
  rs = (e, t) => {
    const n = Ce.get(e);
    return [
      () => (!z(t) && e.get(t)) || kt,
      (r) => {
        if (!z(t)) {
          const s = e.get(t);
          (t in tt || (tt[t] = s), n[5](t, je(s, r), s || kt));
        }
      },
      n[6],
      () => (!z(t) && t in tt ? tt[t] : (!z(t) && e.get(t)) || kt),
    ];
  };
let Zt = !0;
const ji = () => Zt,
  [en, tn] =
    Ke && window.addEventListener
      ? [
          window.addEventListener.bind(window),
          window.removeEventListener.bind(window),
        ]
      : [Ie, Ie],
  Pi = () => {
    const e = Qt && document.visibilityState;
    return z(e) || e !== 'hidden';
  },
  ki = (e) => (
    Qt && document.addEventListener('visibilitychange', e),
    en('focus', e),
    () => {
      (Qt && document.removeEventListener('visibilitychange', e),
        tn('focus', e));
    }
  ),
  Ti = (e) => {
    const t = () => {
        ((Zt = !0), e());
      },
      n = () => {
        Zt = !1;
      };
    return (
      en('online', t),
      en('offline', n),
      () => {
        (tn('online', t), tn('offline', n));
      }
    );
  },
  Fi = { isOnline: ji, isVisible: Pi },
  Di = { initFocus: ki, initReconnect: Ti },
  Fn = !sn.useId,
  Ye = !Ke || Ii,
  Ai = (e) => (Ni() ? window.requestAnimationFrame(e) : setTimeout(e, 1)),
  Tt = Ye ? x.useEffect : x.useLayoutEffect,
  Ft = typeof navigator < 'u' && navigator.connection,
  Dn =
    !Ye && Ft && (['slow-2g', '2g'].includes(Ft.effectiveType) || Ft.saveData),
  nt = new WeakMap(),
  Mi = (e) => Kt.prototype.toString.call(e),
  Dt = (e, t) => e === `[object ${t}]`;
let $i = 0;
const nn = (e) => {
    const t = typeof e,
      n = Mi(e),
      r = Dt(n, 'Date'),
      s = Dt(n, 'RegExp'),
      o = Dt(n, 'Object');
    let i, l;
    if (Kt(e) === e && !r && !s) {
      if (((i = nt.get(e)), i)) return i;
      if (((i = ++$i + '~'), nt.set(e, i), Array.isArray(e))) {
        for (i = '@', l = 0; l < e.length; l++) i += nn(e[l]) + ',';
        nt.set(e, i);
      }
      if (o) {
        i = '#';
        const c = Kt.keys(e).sort();
        for (; !z((l = c.pop())); ) z(e[l]) || (i += l + ':' + nn(e[l]) + ',');
        nt.set(e, i);
      }
    } else
      i = r
        ? e.toJSON()
        : t == 'symbol'
          ? e.toString()
          : t == 'string'
            ? JSON.stringify(e)
            : '' + e;
    return i;
  },
  wn = (e) => {
    if (ve(e))
      try {
        e = e();
      } catch {
        e = '';
      }
    const t = e;
    return (
      (e =
        typeof e == 'string'
          ? e
          : (Array.isArray(e) ? e.length : e)
            ? nn(e)
            : ''),
      [e, t]
    );
  };
let Oi = 0;
const rn = () => ++Oi;
async function ss(...e) {
  const [t, n, r, s] = e,
    o = je(
      { populateCache: !0, throwOnError: !0 },
      typeof s == 'boolean' ? { revalidate: s } : s || {},
    );
  let i = o.populateCache;
  const l = o.rollbackOnError;
  let c = o.optimisticData;
  const u = (p) => (typeof l == 'function' ? l(p) : l !== !1),
    g = o.throwOnError;
  if (ve(n)) {
    const p = n,
      d = [],
      m = t.keys();
    for (const h of m) !/^\$(inf|sub)\$/.test(h) && p(t.get(h)._k) && d.push(h);
    return Promise.all(d.map(f));
  }
  return f(n);
  async function f(p) {
    const [d] = wn(p);
    if (!d) return;
    const [m, h] = rs(t, d),
      [y, w, b, E] = Ce.get(t),
      I = () => {
        const B = y[d];
        return (ve(o.revalidate)
          ? o.revalidate(m().data, p)
          : o.revalidate !== !1) && (delete b[d], delete E[d], B && B[0])
          ? B[0](ts).then(() => m().data)
          : m().data;
      };
    if (e.length < 3) return I();
    let R = r,
      v,
      N = !1;
    const _ = rn();
    w[d] = [_, 0];
    const k = !z(c),
      H = m(),
      W = H.data,
      K = H._c,
      Z = z(K) ? W : K;
    if ((k && ((c = ve(c) ? c(Z, W) : c), h({ data: c, _c: Z })), ve(R)))
      try {
        R = R(Z);
      } catch (B) {
        ((v = B), (N = !0));
      }
    if (R && ns(R))
      if (
        ((R = await R.catch((B) => {
          ((v = B), (N = !0));
        })),
        _ !== w[d][0])
      ) {
        if (N) throw v;
        return R;
      } else N && k && u(v) && ((i = !0), h({ data: Z, _c: ae }));
    if (i && !N)
      if (ve(i)) {
        const B = i(R, Z);
        h({ data: B, error: ae, _c: ae });
      } else h({ data: R, error: ae, _c: ae });
    if (
      ((w[d][1] = rn()),
      Promise.resolve(I()).then(() => {
        h({ _c: ae });
      }),
      N)
    ) {
      if (g) throw v;
      return;
    }
    return R;
  }
}
const An = (e, t) => {
    for (const n in e) e[n][0] && e[n][0](t);
  },
  Vi = (e, t) => {
    if (!Ce.has(e)) {
      const n = je(Di, t),
        r = Object.create(null),
        s = ss.bind(ae, e);
      let o = Ie;
      const i = Object.create(null),
        l = (g, f) => {
          const p = i[g] || [];
          return ((i[g] = p), p.push(f), () => p.splice(p.indexOf(f), 1));
        },
        c = (g, f, p) => {
          e.set(g, f);
          const d = i[g];
          if (d) for (const m of d) m(f, p);
        },
        u = () => {
          if (
            !Ce.has(e) &&
            (Ce.set(e, [
              r,
              Object.create(null),
              Object.create(null),
              Object.create(null),
              s,
              c,
              l,
            ]),
            !Ye)
          ) {
            const g = n.initFocus(setTimeout.bind(ae, An.bind(ae, r, Zr))),
              f = n.initReconnect(setTimeout.bind(ae, An.bind(ae, r, es)));
            o = () => {
              (g && g(), f && f(), Ce.delete(e));
            };
          }
        };
      return (u(), [e, s, u, o]);
    }
    return [e, Ce.get(e)[4]];
  },
  Li = (e, t, n, r, s) => {
    const o = n.errorRetryCount,
      i = s.retryCount,
      l =
        ~~((Math.random() + 0.5) * (1 << (i < 8 ? i : 8))) *
        n.errorRetryInterval;
    (!z(o) && i > o) || setTimeout(r, l, s);
  },
  zi = Xt,
  [os, Hi] = Vi(new Map()),
  Gi = je(
    {
      onLoadingSlow: Ie,
      onSuccess: Ie,
      onError: Ie,
      onErrorRetry: Li,
      onDiscarded: Ie,
      revalidateOnFocus: !0,
      revalidateOnReconnect: !0,
      revalidateIfStale: !0,
      shouldRetryOnError: !0,
      errorRetryInterval: Dn ? 1e4 : 5e3,
      focusThrottleInterval: 5 * 1e3,
      dedupingInterval: 2 * 1e3,
      loadingTimeout: Dn ? 5e3 : 3e3,
      compare: zi,
      isPaused: () => !1,
      cache: os,
      mutate: Hi,
      fallback: {},
    },
    Fi,
  ),
  Bi = (e, t) => {
    const n = je(e, t);
    if (t) {
      const { use: r, fallback: s } = e,
        { use: o, fallback: i } = t;
      (r && o && (n.use = r.concat(o)), s && i && (n.fallback = je(s, i)));
    }
    return n;
  },
  qi = x.createContext({}),
  Ui = '$inf$',
  as = Ke && window.__SWR_DEVTOOLS_USE__,
  Ji = as ? window.__SWR_DEVTOOLS_USE__ : [],
  Wi = () => {
    as && (window.__SWR_DEVTOOLS_REACT__ = sn);
  },
  Yi = (e) =>
    ve(e[1])
      ? [e[0], e[1], e[2] || {}]
      : [e[0], null, (e[1] === null ? e[2] : e[1]) || {}],
  Xi = () => {
    const e = x.useContext(qi);
    return x.useMemo(() => je(Gi, e), [e]);
  },
  Ki = (e) => (t, n, r) =>
    e(
      t,
      n &&
        ((...o) => {
          const [i] = wn(t),
            [, , , l] = Ce.get(os);
          if (i.startsWith(Ui)) return n(...o);
          const c = l[i];
          return z(c) ? n(...o) : (delete l[i], c);
        }),
      r,
    ),
  Qi = Ji.concat(Ki),
  Zi = (e) =>
    function (...n) {
      const r = Xi(),
        [s, o, i] = Yi(n),
        l = Bi(r, i);
      let c = e;
      const { use: u } = l,
        g = (u || []).concat(Qi);
      for (let f = g.length; f--; ) c = g[f](c);
      return c(s, o || l.fetcher || null, l);
    },
  el = (e, t, n) => {
    const r = t[e] || (t[e] = []);
    return (
      r.push(n),
      () => {
        const s = r.indexOf(n);
        s >= 0 && ((r[s] = r[r.length - 1]), r.pop());
      }
    );
  };
Wi();
const At =
    sn.use ||
    ((e) => {
      switch (e.status) {
        case 'pending':
          throw e;
        case 'fulfilled':
          return e.value;
        case 'rejected':
          throw e.reason;
        default:
          throw (
            (e.status = 'pending'),
            e.then(
              (t) => {
                ((e.status = 'fulfilled'), (e.value = t));
              },
              (t) => {
                ((e.status = 'rejected'), (e.reason = t));
              },
            ),
            e
          );
      }
    }),
  Mt = { dedupe: !0 },
  Mn = Promise.resolve(ae),
  tl = (e, t, n) => {
    const {
        cache: r,
        compare: s,
        suspense: o,
        fallbackData: i,
        revalidateOnMount: l,
        revalidateIfStale: c,
        refreshInterval: u,
        refreshWhenHidden: g,
        refreshWhenOffline: f,
        keepPreviousData: p,
      } = n,
      [d, m, h, y] = Ce.get(r),
      [w, b] = wn(e),
      E = x.useRef(!1),
      I = x.useRef(!1),
      R = x.useRef(w),
      v = x.useRef(t),
      N = x.useRef(n),
      _ = () => N.current,
      k = () => _().isVisible() && _().isOnline(),
      [H, W, K, Z] = rs(r, w),
      B = x.useRef({}).current,
      T = z(i) ? (z(n.fallback) ? ae : n.fallback[w]) : i,
      ee = (F, $) => {
        for (const L in B) {
          const D = L;
          if (D === 'data') {
            if (!s(F[D], $[D]) && (!z(F[D]) || !s(he, $[D]))) return !1;
          } else if ($[D] !== F[D]) return !1;
        }
        return !0;
      },
      re = x.useMemo(() => {
        const F =
            !w || !t ? !1 : z(l) ? (_().isPaused() || o ? !1 : c !== !1) : l,
          $ = (M) => {
            const le = je(M);
            return (
              delete le._k,
              F ? { isValidating: !0, isLoading: !0, ...le } : le
            );
          },
          L = H(),
          D = Z(),
          Y = $(L),
          ie = L === D ? Y : $(D);
        let J = Y;
        return [
          () => {
            const M = $(H());
            return ee(M, J)
              ? ((J.data = M.data),
                (J.isLoading = M.isLoading),
                (J.isValidating = M.isValidating),
                (J.error = M.error),
                J)
              : ((J = M), M);
          },
          () => ie,
        ];
      }, [r, w]),
      U = _s.useSyncExternalStore(
        x.useCallback(
          (F) =>
            K(w, ($, L) => {
              ee(L, $) || F();
            }),
          [r, w],
        ),
        re[0],
        re[1],
      ),
      te = !E.current,
      se = d[w] && d[w].length > 0,
      ue = U.data,
      me = z(ue) ? (T && ns(T) ? At(T) : T) : ue,
      de = U.error,
      ye = x.useRef(me),
      he = p ? (z(ue) ? (z(ye.current) ? me : ye.current) : ue) : me,
      Te =
        se && !z(de)
          ? !1
          : te && !z(l)
            ? l
            : _().isPaused()
              ? !1
              : o
                ? z(me)
                  ? !1
                  : c
                : z(me) || c,
      xe = !!(w && t && te && Te),
      _e = z(U.isValidating) ? xe : U.isValidating,
      Fe = z(U.isLoading) ? xe : U.isLoading,
      we = x.useCallback(
        async (F) => {
          const $ = v.current;
          if (!w || !$ || I.current || _().isPaused()) return !1;
          let L,
            D,
            Y = !0;
          const ie = F || {},
            J = !h[w] || !ie.dedupe,
            M = () =>
              Fn ? !I.current && w === R.current && E.current : w === R.current,
            le = { isValidating: !1, isLoading: !1 },
            S = () => {
              W(le);
            },
            C = () => {
              const A = h[w];
              A && A[1] === D && delete h[w];
            },
            V = { isValidating: !0 };
          z(H().data) && (V.isLoading = !0);
          try {
            if (
              (J &&
                (W(V),
                n.loadingTimeout &&
                  z(H().data) &&
                  setTimeout(() => {
                    Y && M() && _().onLoadingSlow(w, n);
                  }, n.loadingTimeout),
                (h[w] = [$(b), rn()])),
              ([L, D] = h[w]),
              (L = await L),
              J && setTimeout(C, n.dedupingInterval),
              !h[w] || h[w][1] !== D)
            )
              return (J && M() && _().onDiscarded(w), !1);
            le.error = ae;
            const A = m[w];
            if (!z(A) && (D <= A[0] || D <= A[1] || A[1] === 0))
              return (S(), J && M() && _().onDiscarded(w), !1);
            const q = H().data;
            ((le.data = s(q, L) ? q : L), J && M() && _().onSuccess(L, w, n));
          } catch (A) {
            C();
            const q = _(),
              { shouldRetryOnError: ne } = q;
            q.isPaused() ||
              ((le.error = A),
              J &&
                M() &&
                (q.onError(A, w, q),
                (ne === !0 || (ve(ne) && ne(A))) &&
                  (!_().revalidateOnFocus ||
                    !_().revalidateOnReconnect ||
                    k()) &&
                  q.onErrorRetry(
                    A,
                    w,
                    q,
                    (be) => {
                      const Ae = d[w];
                      Ae && Ae[0] && Ae[0](kn, be);
                    },
                    { retryCount: (ie.retryCount || 0) + 1, dedupe: !0 },
                  )));
          }
          return ((Y = !1), S(), !0);
        },
        [w, r],
      ),
      De = x.useCallback((...F) => ss(r, R.current, ...F), []);
    if (
      (Tt(() => {
        ((v.current = t), (N.current = n), z(ue) || (ye.current = ue));
      }),
      Tt(() => {
        if (!w) return;
        const F = we.bind(ae, Mt);
        let $ = 0;
        _().revalidateOnFocus && ($ = Date.now() + _().focusThrottleInterval);
        const D = el(w, d, (Y, ie = {}) => {
          if (Y == Zr) {
            const J = Date.now();
            _().revalidateOnFocus &&
              J > $ &&
              k() &&
              (($ = J + _().focusThrottleInterval), F());
          } else if (Y == es) _().revalidateOnReconnect && k() && F();
          else {
            if (Y == ts) return we();
            if (Y == kn) return we(ie);
          }
        });
        return (
          (I.current = !1),
          (R.current = w),
          (E.current = !0),
          W({ _k: b }),
          Te && (h[w] || (z(me) || Ye ? F() : Ai(F))),
          () => {
            ((I.current = !0), D());
          }
        );
      }, [w]),
      Tt(() => {
        let F;
        function $() {
          const D = ve(u) ? u(H().data) : u;
          D && F !== -1 && (F = setTimeout(L, D));
        }
        function L() {
          !H().error && (g || _().isVisible()) && (f || _().isOnline())
            ? we(Mt).then($)
            : $();
        }
        return (
          $(),
          () => {
            F && (clearTimeout(F), (F = -1));
          }
        );
      }, [u, g, f, w]),
      x.useDebugValue(he),
      o)
    ) {
      const F = w && z(me);
      if (!Fn && Ye && F)
        throw new Error(
          'Fallback data is required when using Suspense in SSR.',
        );
      F && ((v.current = t), (N.current = n), (I.current = !1));
      const $ = y[w],
        L = !z($) && F ? De($) : Mn;
      if ((At(L), !z(de) && F)) throw de;
      const D = F ? we(Mt) : Mn;
      (!z(he) && F && ((D.status = 'fulfilled'), (D.value = !0)), At(D));
    }
    return {
      mutate: De,
      get data() {
        return ((B.data = !0), he);
      },
      get error() {
        return ((B.error = !0), de);
      },
      get isValidating() {
        return ((B.isValidating = !0), _e);
      },
      get isLoading() {
        return ((B.isLoading = !0), Fe);
      },
    };
  },
  rt = Zi(tl);
var $t, $n;
function nl() {
  if ($n) return $t;
  $n = 1;
  function e(t, n) {
    if (typeof t != 'function')
      throw new TypeError(
        `Expected the first argument to be a \`function\`, got \`${typeof t}\`.`,
      );
    let r,
      s = 0;
    return function (...i) {
      clearTimeout(r);
      const l = Date.now(),
        c = l - s,
        u = n - c;
      u <= 0
        ? ((s = l), t.apply(this, i))
        : (r = setTimeout(() => {
            ((s = Date.now()), t.apply(this, i));
          }, u));
    };
  }
  return (($t = e), $t);
}
var rl = nl();
const sl = Wn(rl);
function On(e, t) {
  return t != null ? sl(e, t) : e;
}
function ol(e) {
  const [t, n] = x.useState(e);
  return (
    x.useEffect(() => {
      Yt(e, t) || n(e);
    }, [e, t]),
    t
  );
}
function al({
  api: e = '/api/chat',
  id: t,
  initialMessages: n,
  initialInput: r = '',
  sendExtraMessageFields: s,
  onToolCall: o,
  experimental_prepareRequestBody: i,
  maxSteps: l = 1,
  streamProtocol: c = 'data',
  onResponse: u,
  onFinish: g,
  onError: f,
  credentials: p,
  headers: d,
  body: m,
  generateId: h = mn,
  fetch: y,
  keepLastMessageOnError: w = !0,
  experimental_throttle: b,
} = {}) {
  const [E] = x.useState(h),
    I = t ?? E,
    R = typeof e == 'string' ? [e, I] : I,
    v = ol(n ?? []),
    N = x.useMemo(() => Pt(v), [v]),
    { data: _, mutate: k } = rt([R, 'messages'], null, { fallbackData: N }),
    H = x.useRef(_ || []);
  x.useEffect(() => {
    H.current = _ || [];
  }, [_]);
  const { data: W, mutate: K } = rt([R, 'streamData'], null),
    Z = x.useRef(W);
  x.useEffect(() => {
    Z.current = W;
  }, [W]);
  const { data: B = 'ready', mutate: T } = rt([R, 'status'], null),
    { data: ee = void 0, mutate: re } = rt([R, 'error'], null),
    U = x.useRef(null),
    te = x.useRef({ credentials: p, headers: d, body: m });
  x.useEffect(() => {
    te.current = { credentials: p, headers: d, body: m };
  }, [p, d, m]);
  const se = x.useCallback(
      async (O, F = 'generate') => {
        var $, L;
        (T('submitted'), re(void 0));
        const D = Pt(O.messages),
          Y = D.length,
          ie = Wt(($ = D[D.length - 1]) == null ? void 0 : $.toolInvocations);
        try {
          const M = new AbortController();
          U.current = M;
          const le = On(k, b),
            S = On(K, b),
            C = H.current;
          le(D, !1);
          const V = s
              ? D
              : D.map(
                  ({
                    role: q,
                    content: ne,
                    experimental_attachments: be,
                    data: Ae,
                    annotations: vn,
                    toolInvocations: yn,
                    parts: Sn,
                  }) => ({
                    role: q,
                    content: ne,
                    ...(be !== void 0 && { experimental_attachments: be }),
                    ...(Ae !== void 0 && { data: Ae }),
                    ...(vn !== void 0 && { annotations: vn }),
                    ...(yn !== void 0 && { toolInvocations: yn }),
                    ...(Sn !== void 0 && { parts: Sn }),
                  }),
                ),
            A = Z.current;
          (await _i({
            api: e,
            body:
              (L = i?.({
                id: I,
                messages: D,
                requestData: O.data,
                requestBody: O.body,
              })) != null
                ? L
                : {
                    id: I,
                    messages: V,
                    data: O.data,
                    ...te.current.body,
                    ...O.body,
                  },
            streamProtocol: c,
            credentials: te.current.credentials,
            headers: { ...te.current.headers, ...O.headers },
            abortController: () => U.current,
            restoreMessagesOnFailure() {
              w || le(C, !1);
            },
            onResponse: u,
            onUpdate({ message: q, data: ne, replaceLastMessage: be }) {
              (T('streaming'),
                le([...(be ? D.slice(0, D.length - 1) : D), q], !1),
                ne?.length && S([...(A ?? []), ...ne], !1));
            },
            onToolCall: o,
            onFinish: g,
            generateId: h,
            fetch: y,
            lastMessage: D[D.length - 1],
            requestType: F,
          }),
            (U.current = null),
            T('ready'));
        } catch (M) {
          if (M.name === 'AbortError')
            return ((U.current = null), T('ready'), null);
          (f && M instanceof Error && f(M), re(M), T('error'));
        }
        const J = H.current;
        bi({
          originalMaxToolInvocationStep: ie,
          originalMessageCount: Y,
          maxSteps: l,
          messages: J,
        }) && (await se({ messages: J }));
      },
      [k, T, e, te, u, g, f, re, K, Z, c, s, i, o, l, H, U, h, y, w, b, I],
    ),
    ue = x.useCallback(
      async (
        O,
        {
          data: F,
          headers: $,
          body: L,
          experimental_attachments: D = O.experimental_attachments,
        } = {},
      ) => {
        var Y, ie;
        const J = await Pn(D),
          M = H.current.concat({
            ...O,
            id: (Y = O.id) != null ? Y : h(),
            createdAt: (ie = O.createdAt) != null ? ie : new Date(),
            experimental_attachments: J.length > 0 ? J : void 0,
            parts: Kr(O),
          });
        return se({ messages: M, headers: $, body: L, data: F });
      },
      [se, h],
    ),
    me = x.useCallback(
      async ({ data: O, headers: F, body: $ } = {}) => {
        const L = H.current;
        if (L.length === 0) return null;
        const D = L[L.length - 1];
        return se({
          messages: D.role === 'assistant' ? L.slice(0, -1) : L,
          headers: F,
          body: $,
          data: O,
        });
      },
      [se],
    ),
    de = x.useCallback(() => {
      U.current && (U.current.abort(), (U.current = null));
    }, []),
    ye = x.useCallback(async () => {
      const O = H.current;
      se({ messages: O }, 'resume');
    }, [se]),
    he = x.useCallback(
      (O) => {
        typeof O == 'function' && (O = O(H.current));
        const F = Pt(O);
        (k(F, !1), (H.current = F));
      },
      [k],
    ),
    Te = x.useCallback(
      (O) => {
        (typeof O == 'function' && (O = O(Z.current)),
          K(O, !1),
          (Z.current = O));
      },
      [K],
    ),
    [xe, _e] = x.useState(r),
    Fe = x.useCallback(
      async (O, F = {}, $) => {
        var L;
        if (
          ((L = O?.preventDefault) == null || L.call(O),
          !xe && !F.allowEmptySubmit)
        )
          return;
        $ && (te.current = { ...te.current, ...$ });
        const D = await Pn(F.experimental_attachments),
          ie = {
            messages: H.current.concat({
              id: h(),
              createdAt: new Date(),
              role: 'user',
              content: xe,
              experimental_attachments: D.length > 0 ? D : void 0,
              parts: [{ type: 'text', text: xe }],
            }),
            headers: F.headers,
            body: F.body,
            data: F.data,
          };
        (se(ie), _e(''));
      },
      [xe, h, se],
    ),
    we = (O) => {
      _e(O.target.value);
    },
    De = x.useCallback(
      ({ toolCallId: O, result: F }) => {
        const $ = H.current;
        if (
          (Ei({ messages: $, toolCallId: O, toolResult: F }),
          k([...$.slice(0, $.length - 1), { ...$[$.length - 1] }], !1),
          B === 'submitted' || B === 'streaming')
        )
          return;
        const L = $[$.length - 1];
        Qr(L) && se({ messages: $ });
      },
      [k, B, se],
    );
  return {
    messages: _ ?? [],
    id: I,
    setMessages: he,
    data: W,
    setData: Te,
    error: ee,
    append: ue,
    reload: me,
    stop: de,
    experimental_resume: ye,
    input: xe,
    setInput: _e,
    handleInputChange: we,
    handleSubmit: Fe,
    isLoading: B === 'submitted' || B === 'streaming',
    status: B,
    addToolResult: De,
  };
}
var il = al;
function ll(e) {
  const { suggestedTrackIds: t } = dt(),
    [n, r] = x.useState({ orderBy: 'manual', direction: 'asc' }),
    [s, o] = x.useState(!1);
  return {
    sortedTracks: x.useMemo(() => {
      o(!0);
      const l = e.filter((f) => t.has(f.id)),
        c = e.filter((f) => !t.has(f.id)),
        u = (f) => {
          switch (n.orderBy) {
            case 'bpm':
              return f.sort((p, d) => {
                const m = Number(p.bpm) - Number(d.bpm);
                return n.direction === 'asc' ? m : -m;
              });
            case 'genre':
              return f.sort((p, d) => {
                const m = (p.genres?.[0] || '').toLowerCase(),
                  h = (d.genres?.[0] || '').toLowerCase(),
                  y = m.localeCompare(h);
                return n.direction === 'asc' ? y : -y;
              });
            case 'suggested':
              return f;
            default:
              return f;
          }
        },
        g = t.size > 0 ? [...u(l), ...c] : u([...l, ...c]);
      return (setTimeout(() => o(!1), 100), g);
    }, [e, t, n]),
    orderingConfig: n,
    setOrderingConfig: r,
  };
}
function cl({
  isOpen: e,
  onClose: t,
  suggestedTracks: n,
  onPlaylistCreated: r,
}) {
  const [s, o] = x.useState(''),
    [i, l] = x.useState(''),
    [c, u] = x.useState(new Set(n.map((m) => m.id))),
    [g, f] = x.useState(!1),
    p = (m) => {
      const h = new Set(c);
      (h.has(m) ? h.delete(m) : h.add(m), u(h));
    },
    d = async () => {
      if (!s.trim()) {
        G.error('Please enter a playlist name');
        return;
      }
      if (c.size === 0) {
        G.error('Please select at least one track');
        return;
      }
      f(!0);
      try {
        const m = await fetch('/api/music/playlists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: s,
            description: i || `AI-generated playlist with ${c.size} tracks`,
          }),
        });
        if (!m.ok) throw new Error('Failed to create playlist');
        const h = await m.json(),
          y = Array.from(c).map((w) =>
            fetch(`/api/music/playlists/${h.id}/tracks`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ trackId: w }),
            }),
          );
        (await Promise.all(y),
          G.success(`Created playlist "${s}" with ${c.size} tracks`),
          r?.(h.id),
          t(),
          o(''),
          l(''),
          u(new Set(n.map((w) => w.id))));
      } catch (m) {
        (console.error('Error creating playlist:', m),
          G.error('Failed to create playlist. Please try again.'));
      } finally {
        f(!1);
      }
    };
  return a.jsx(Gt, {
    open: e,
    onOpenChange: t,
    children: a.jsxs(it, {
      className:
        'max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-bg border-2 border-black shadow-light',
      children: [
        a.jsx(lt, {
          children: a.jsx(ct, {
            className: 'text-text font-heading',
            children: 'Create Playlist from AI Suggestions',
          }),
        }),
        a.jsxs('div', {
          className: 'space-y-4 flex-1 overflow-hidden flex flex-col',
          children: [
            a.jsxs('div', {
              className: 'space-y-3',
              children: [
                a.jsxs('div', {
                  children: [
                    a.jsx(vt, {
                      htmlFor: 'playlist-name',
                      className: 'text-text font-medium',
                      children: 'Playlist Name',
                    }),
                    a.jsx(gt, {
                      id: 'playlist-name',
                      value: s,
                      onChange: (m) => o(m.target.value),
                      placeholder: 'Enter playlist name...',
                      className:
                        'mt-1 border-2 border-black bg-white focus:ring-main focus:border-main',
                    }),
                  ],
                }),
                a.jsxs('div', {
                  children: [
                    a.jsx(vt, {
                      htmlFor: 'playlist-description',
                      className: 'text-text font-medium',
                      children: 'Description (Optional)',
                    }),
                    a.jsx('textarea', {
                      id: 'playlist-description',
                      value: i,
                      onChange: (m) => l(m.target.value),
                      placeholder: 'Describe your playlist...',
                      className:
                        'mt-1 resize-none flex min-h-[60px] w-full rounded-base border-2 border-black bg-white px-3 py-2 text-sm text-text placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main',
                      rows: 2,
                    }),
                  ],
                }),
              ],
            }),
            a.jsxs('div', {
              className: 'flex-1 overflow-hidden flex flex-col',
              children: [
                a.jsxs('div', {
                  className: 'flex items-center justify-between mb-3',
                  children: [
                    a.jsxs(vt, {
                      className: 'text-text font-medium',
                      children: ['Select Tracks (', c.size, '/', n.length, ')'],
                    }),
                    a.jsxs('div', {
                      className: 'flex space-x-2',
                      children: [
                        a.jsx(X, {
                          variant: 'outline',
                          size: 'sm',
                          onClick: () => u(new Set(n.map((m) => m.id))),
                          className:
                            'border-2 border-black bg-white hover:bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all',
                          children: 'Select All',
                        }),
                        a.jsx(X, {
                          variant: 'outline',
                          size: 'sm',
                          onClick: () => u(new Set()),
                          className:
                            'border-2 border-black bg-white hover:bg-red-100 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light transition-all',
                          children: 'Clear All',
                        }),
                      ],
                    }),
                  ],
                }),
                a.jsx('div', {
                  className:
                    'flex-1 overflow-y-auto space-y-2 border-2 border-black rounded-base p-3 bg-white',
                  children: n.map((m) => {
                    const h = c.has(m.id);
                    return a.jsx(
                      ot,
                      {
                        className: `cursor-pointer transition-all border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none ${h ? 'bg-main' : 'bg-white hover:bg-bg'}`,
                        onClick: () => p(m.id),
                        children: a.jsx(Yn, {
                          className: 'p-3',
                          children: a.jsxs('div', {
                            className: 'flex items-center space-x-3',
                            children: [
                              a.jsx('div', {
                                className:
                                  'w-10 h-10 bg-mainAccent border-2 border-black rounded-base flex items-center justify-center',
                                children: h
                                  ? a.jsx(Ls, {
                                      className: 'w-5 h-5 text-black',
                                    })
                                  : a.jsx(Xn, {
                                      className: 'w-5 h-5 text-black',
                                    }),
                              }),
                              a.jsxs('div', {
                                className: 'flex-1 min-w-0',
                                children: [
                                  a.jsx('h4', {
                                    className:
                                      'font-medium text-sm truncate text-text font-heading',
                                    children: m.title,
                                  }),
                                  a.jsx('p', {
                                    className: 'text-xs text-gray-600 truncate',
                                    children: m.artist,
                                  }),
                                  a.jsxs('div', {
                                    className:
                                      'flex items-center space-x-2 mt-1',
                                    children: [
                                      m.bpm &&
                                        a.jsxs('span', {
                                          className:
                                            'bg-white border border-black text-xs px-2 py-0.5 rounded-base text-text font-mono',
                                          children: [m.bpm, ' BPM'],
                                        }),
                                      m.genres &&
                                        m.genres.length > 0 &&
                                        a.jsx('span', {
                                          className:
                                            'border border-black text-xs px-2 py-0.5 rounded-base text-text',
                                          children: m.genres[0],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      },
                      m.id,
                    );
                  }),
                }),
              ],
            }),
          ],
        }),
        a.jsxs(fn, {
          children: [
            a.jsx(X, {
              variant: 'outline',
              onClick: t,
              disabled: g,
              className:
                'border-2 border-black bg-white hover:bg-gray-100 text-text shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all',
              children: 'Cancel',
            }),
            a.jsx(X, {
              onClick: d,
              disabled: g,
              className:
                'bg-main hover:bg-mainAccent border-2 border-black text-text font-medium shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all',
              children: g
                ? a.jsxs(a.Fragment, {
                    children: [
                      a.jsx(He, { className: 'w-4 h-4 mr-2 animate-spin' }),
                      'Creating...',
                    ],
                  })
                : a.jsxs(a.Fragment, {
                    children: [
                      a.jsx(He, { className: 'w-4 h-4 mr-2' }),
                      'Create Playlist',
                    ],
                  }),
            }),
          ],
        }),
      ],
    }),
  });
}
const ul = (e) => {
    try {
      if (e.includes('{') && e.includes('}')) {
        const r = e.match(/\{[\s\S]*\}/);
        if (r) {
          const s = JSON.parse(r[0]);
          if (s.tracks) return s;
        }
      }
      const t = e.matchAll(
          /["'](.+?)["']\s*-\s*(.+?)\s*(?:\(|$)(\d+)?\s*(?:BPM)?(?:\)|$)/gi,
        ),
        n = Array.from(t).map((r) => ({
          title: r[1].trim(),
          artist: r[2].trim(),
          bpm: r[3] ? parseInt(r[3]) : void 0,
        }));
      return n.length > 0
        ? { tracks: n, explanation: e, context: 'track_suggestions' }
        : null;
    } catch (t) {
      return (console.error('Failed to parse tracks:', t), null);
    }
  },
  dl = (e, t) => {
    let n = t.find(
      (r) => r.title.toLowerCase().trim() === e.title.toLowerCase().trim(),
    );
    return n ||
      ((n = t.find(
        (r) =>
          r.title.toLowerCase().includes(e.title.toLowerCase()) &&
          r.artist.toLowerCase().includes(e.artist.toLowerCase()),
      )),
      n)
      ? n
      : ((n = t.find((r) => {
          const s = e.title.toLowerCase().split(' '),
            o = r.title.toLowerCase();
          return s.some((i) => o.includes(i) && i.length > 2);
        })),
        n || null);
  },
  gl = [
    'Find tracks around 128 BPM for a house set',
    'Suggest tracks that mix well with techno',
    'Show me tracks for a chill downtempo session',
    'Find high-energy tracks above 140 BPM',
    'What tracks work well for peak time?',
    'Suggest tracks with similar vibes to deep house',
  ],
  fl = () =>
    a.jsxs('div', {
      className: 'flex items-center space-x-2 p-4',
      children: [
        a.jsx('div', {
          className:
            'w-8 h-8 bg-main border-2 border-black rounded-base flex items-center justify-center',
          children: a.jsx(ft, { className: 'w-4 h-4 text-black' }),
        }),
        a.jsxs('div', {
          className:
            'flex items-center space-x-1 bg-white border-2 border-black rounded-base px-4 py-2 shadow-light',
          children: [
            a.jsxs('div', {
              className: 'flex space-x-1',
              children: [
                a.jsx('div', {
                  className:
                    'w-2 h-2 bg-mainAccent rounded-full animate-bounce [animation-delay:-0.3s]',
                }),
                a.jsx('div', {
                  className:
                    'w-2 h-2 bg-mainAccent rounded-full animate-bounce [animation-delay:-0.15s]',
                }),
                a.jsx('div', {
                  className:
                    'w-2 h-2 bg-mainAccent rounded-full animate-bounce',
                }),
              ],
            }),
            a.jsx('span', {
              className: 'text-sm text-text ml-2 font-medium',
              children: 'DJ Assistant is thinking...',
            }),
          ],
        }),
      ],
    }),
  pl = ({ track: e, onPlay: t, onAddToPlaylist: n }) => {
    const { isPlaying: r, playingTrackId: s, isReady: o } = Me(),
      i = s === e.id && r,
      l = e.youtube_video_id;
    return a.jsx(ot, {
      className:
        'mb-4 transition-all border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none bg-white w-full',
      children: a.jsx(Yn, {
        className: 'p-4',
        children: a.jsxs('div', {
          className: 'flex items-center justify-between gap-4',
          children: [
            a.jsxs('div', {
              className: 'flex items-center space-x-4 flex-1 min-w-0',
              children: [
                a.jsx('div', {
                  className:
                    'w-12 h-12 bg-mainAccent border-2 border-black rounded-base flex items-center justify-center flex-shrink-0',
                  children: a.jsx(Xn, { className: 'w-6 h-6 text-black' }),
                }),
                a.jsxs('div', {
                  className: 'flex-1 min-w-0',
                  children: [
                    a.jsx('h4', {
                      className:
                        'font-medium text-sm truncate text-text font-heading mb-1',
                      children: e.title,
                    }),
                    a.jsx('p', {
                      className: 'text-xs text-gray-600 truncate mb-2',
                      children: e.artist,
                    }),
                    a.jsxs('div', {
                      className: 'flex items-center gap-2 flex-wrap',
                      children: [
                        e.bpm &&
                          a.jsxs('span', {
                            className:
                              'bg-white border border-black text-xs px-2 py-1 rounded-base text-text font-mono',
                            children: [e.bpm, ' BPM'],
                          }),
                        e.genres &&
                          e.genres.length > 0 &&
                          a.jsx('span', {
                            className:
                              'border border-black text-xs px-2 py-1 rounded-base text-text',
                            children: e.genres[0],
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            a.jsxs('div', {
              className: 'flex items-center space-x-3 flex-shrink-0',
              children: [
                a.jsx(X, {
                  size: 'sm',
                  variant: 'ghost',
                  onClick: t,
                  disabled: !l || !o,
                  className: Q(
                    'h-8 w-8 p-0 border border-black rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light',
                    l && o
                      ? 'bg-main hover:bg-mainAccent'
                      : 'bg-gray-200 cursor-not-allowed',
                  ),
                  children: i
                    ? a.jsx(qn, { className: 'w-4 h-4 text-black' })
                    : a.jsx(Un, { className: 'w-4 h-4 text-black' }),
                }),
                a.jsxs(js, {
                  children: [
                    a.jsx(Ps, {
                      asChild: !0,
                      children: a.jsx(X, {
                        size: 'sm',
                        variant: 'ghost',
                        className:
                          'h-8 w-8 p-0 bg-white hover:bg-bg border border-black rounded-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none shadow-light',
                        children: a.jsx(Qn, {
                          className: 'w-4 h-4 text-black',
                        }),
                      }),
                    }),
                    a.jsx(ks, {
                      align: 'end',
                      className:
                        'bg-bg border-2 border-black rounded-base shadow-light',
                      children: a.jsxs(Ts, {
                        onClick: n,
                        className: 'hover:bg-main text-text',
                        children: [
                          a.jsx(He, { className: 'w-4 h-4 mr-2' }),
                          'Add to Playlist',
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  Vn = ({
    message: e,
    userAvatar: t,
    matchedTracks: n = [],
    onTrackPlay: r,
    onTrackAddToPlaylist: s,
    onCreatePlaylist: o,
  }) => {
    const i = e.role === 'user';
    return a.jsx('div', {
      className: `flex ${i ? 'justify-end' : 'justify-start'} mb-8 w-full`,
      children: a.jsxs('div', {
        className: `flex items-start space-x-4 max-w-full ${i ? 'flex-row-reverse space-x-reverse' : ''}`,
        children: [
          a.jsx('div', {
            className: 'w-8 h-8 flex-shrink-0',
            children: i
              ? a.jsxs(Es, {
                  className: 'w-8 h-8',
                  children: [
                    a.jsx(Is, { src: t }),
                    a.jsx(Ns, {
                      className:
                        'bg-mainAccent text-black border-2 border-black text-sm',
                      children: t?.charAt(0)?.toUpperCase() || 'U',
                    }),
                  ],
                })
              : a.jsx('div', {
                  className:
                    'w-8 h-8 bg-main border-2 border-black rounded-base flex items-center justify-center',
                  children: a.jsx(ft, { className: 'w-4 h-4 text-black' }),
                }),
          }),
          a.jsxs('div', {
            className: `space-y-3 ${i ? 'items-end' : 'items-start'} flex flex-col flex-1 min-w-0`,
            children: [
              a.jsx('div', {
                className: Q(
                  'rounded-base px-4 py-3 max-w-full break-words border-2 border-black shadow-light',
                  i ? 'bg-main text-text' : 'bg-white text-text',
                ),
                children: a.jsx('div', {
                  className: 'whitespace-pre-wrap text-sm leading-relaxed',
                  children: e.content,
                }),
              }),
              !i &&
                n.length > 0 &&
                a.jsxs('div', {
                  className: 'w-full space-y-3 max-w-full',
                  children: [
                    a.jsxs('div', {
                      className:
                        'flex items-center justify-between p-3 bg-bg border-2 border-black rounded-base',
                      children: [
                        a.jsxs('div', {
                          className:
                            'flex items-center space-x-2 text-sm text-text',
                          children: [
                            a.jsx(Zn, {
                              className: 'w-4 h-4 text-mainAccent2',
                            }),
                            a.jsxs('span', {
                              className: 'font-medium',
                              children: [
                                'Found ',
                                n.length,
                                ' matching tracks',
                              ],
                            }),
                          ],
                        }),
                        a.jsxs(X, {
                          size: 'sm',
                          variant: 'outline',
                          onClick: () => o(n),
                          className:
                            'h-8 text-xs bg-main hover:bg-mainAccent border-2 border-black text-text shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all flex-shrink-0',
                          children: [
                            a.jsx(He, { className: 'w-3 h-3 mr-1' }),
                            'Create Playlist',
                          ],
                        }),
                      ],
                    }),
                    a.jsx('div', {
                      className: 'space-y-3 max-w-full overflow-hidden',
                      children: n.map((l) =>
                        a.jsx(
                          pl,
                          {
                            track: l,
                            onPlay: () => r(l),
                            onAddToPlaylist: () => s(l),
                          },
                          l.id,
                        ),
                      ),
                    }),
                  ],
                }),
            ],
          }),
        ],
      }),
    });
  };
function Ln({ tracks: e, onTracksFilter: t, isOpen: n, onClose: r }) {
  const s = x.useRef(null),
    { userIdentity: o } = bs(),
    { setSuggestedTracks: i } = dt(),
    { setOrderingConfig: l } = ll(e),
    { togglePlayPause: c, initializePlayer: u, isReady: g } = Me(),
    [f, p] = x.useState(!0),
    [d, m] = x.useState(new Map()),
    [h, y] = x.useState(!1),
    [w, b] = x.useState([]);
  x.useEffect(() => {
    g || u();
  }, [u, g]);
  const E = x.useCallback(
      (T, ee) => {
        try {
          const re = ul(T);
          if (re) {
            const U = re.tracks.map((te) => dl(te, e)).filter(Boolean);
            U.length > 0
              ? (m((te) => new Map(te.set(ee, U))),
                i(U),
                l({ orderBy: 'suggested', direction: 'asc' }),
                t(U),
                G.success(
                  `Found ${U.length} matching tracks in your collection`,
                ))
              : G.error('No matching tracks found in your collection');
          }
        } catch (re) {
          (console.error('Failed to process track suggestions:', re),
            G.error('Failed to process track suggestions'));
        }
      },
      [e, t, l, i],
    ),
    {
      messages: I,
      input: R,
      handleInputChange: v,
      handleSubmit: N,
      isLoading: _,
    } = il({
      api: '/api/ai/chat',
      body: {
        tracks: e.map((T) => ({
          title: T.title,
          artist: T.artist,
          bpm: T.bpm,
          genres: T.genres,
        })),
      },
      onFinish: (T) => {
        E(T.content, T.id);
      },
      onError: (T) => {
        (console.error('Chat error:', T),
          G.error('Failed to get AI response. Please try again.'));
      },
    }),
    k = x.useCallback(() => {
      s.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);
  x.useEffect(() => {
    k();
  }, [I, _, k]);
  const H = (T) => {
      (v({ target: { value: T } }), p(!1));
    },
    W = async (T) => {
      if (!g) {
        G.error('Player is still loading...');
        return;
      }
      if (!T.youtube_video_id) {
        G.error('No audio available for this track');
        return;
      }
      try {
        const { playingTrackId: ee } = Me.getState(),
          re = ee === T.id;
        (c(T), G.success(`${re ? 'Pausing' : 'Playing'} ${T.title}`));
      } catch (ee) {
        (console.error('Error playing track:', ee),
          G.error('Failed to play track'));
      }
    },
    K = (T) => {
      (b([T]), y(!0));
    },
    Z = (T) => {
      (b(T), y(!0));
    },
    B = (T) => {
      (T.preventDefault(), R.trim() && (p(!1), N(T)));
    };
  return a.jsxs('div', {
    className: 'flex flex-col h-full bg-bg max-w-full overflow-hidden',
    children: [
      a.jsx('div', {
        className:
          'p-4 border-b-2 border-black bg-bg flex-shrink-0 sticky top-0 z-10',
        children: a.jsxs('div', {
          className: 'flex items-center justify-between',
          children: [
            a.jsxs('div', {
              className: 'flex items-center space-x-3 flex-1 min-w-0',
              children: [
                a.jsx('div', {
                  className:
                    'w-10 h-10 bg-main border-2 border-black rounded-base flex items-center justify-center shadow-light flex-shrink-0',
                  children: a.jsx(ft, { className: 'w-5 h-5 text-black' }),
                }),
                a.jsxs('div', {
                  className: 'min-w-0',
                  children: [
                    a.jsx('h2', {
                      className: 'font-semibold text-sm text-text font-heading',
                      children: 'DJ Assistant',
                    }),
                    a.jsxs('p', {
                      className: 'text-xs text-gray-600',
                      children: [e.length, ' tracks loaded • Ready to help'],
                    }),
                  ],
                }),
              ],
            }),
            a.jsx(X, {
              variant: 'ghost',
              size: 'sm',
              onClick: r,
              className:
                'h-8 w-8 p-0 hover:bg-mainAccent border border-black rounded-base flex-shrink-0',
              children: a.jsx(Qn, { className: 'w-4 h-4 text-black' }),
            }),
          ],
        }),
      }),
      a.jsx('div', {
        className: 'flex-1 overflow-y-auto overflow-x-hidden',
        children: a.jsxs('div', {
          className: 'p-4 space-y-2 max-w-full',
          children: [
            I.length === 0 &&
              a.jsxs('div', {
                className: 'mb-10',
                children: [
                  a.jsx(Vn, {
                    message: {
                      role: 'assistant',
                      content: `Hey there! 👋 I'm your AI DJ assistant. I can help you find perfect tracks for your sets, suggest mixing ideas, and analyze your collection.

I know about all ${e.length} tracks in your library. What would you like to explore today?`,
                    },
                    matchedTracks: [],
                    onTrackPlay: W,
                    onTrackAddToPlaylist: K,
                    onCreatePlaylist: Z,
                  }),
                  f &&
                    a.jsxs('div', {
                      className: 'space-y-4 mt-8 max-w-full',
                      children: [
                        a.jsxs('div', {
                          className:
                            'flex items-center space-x-2 text-sm text-gray-600',
                          children: [
                            a.jsx(Zn, {
                              className: 'w-4 h-4 text-mainAccent2',
                            }),
                            a.jsx('span', {
                              className: 'font-medium',
                              children: 'Try asking me about:',
                            }),
                          ],
                        }),
                        a.jsx('div', {
                          className: 'grid grid-cols-1 gap-3 max-w-full',
                          children: gl.map((T, ee) =>
                            a.jsxs(
                              X,
                              {
                                variant: 'outline',
                                size: 'sm',
                                className:
                                  'h-auto p-4 text-left justify-start text-wrap bg-white hover:bg-main border-2 border-black rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all text-text w-full',
                                onClick: () => H(T),
                                children: [
                                  a.jsx(Bs, {
                                    className: 'w-4 h-4 mr-3 flex-shrink-0',
                                  }),
                                  a.jsx('span', {
                                    className: 'text-sm text-left',
                                    children: T,
                                  }),
                                ],
                              },
                              ee,
                            ),
                          ),
                        }),
                      ],
                    }),
                ],
              }),
            I.map((T) =>
              a.jsx(
                Vn,
                {
                  message: T,
                  userAvatar: o?.avatarUrl,
                  matchedTracks: d.get(T.id) || [],
                  onTrackPlay: W,
                  onTrackAddToPlaylist: K,
                  onCreatePlaylist: Z,
                },
                T.id,
              ),
            ),
            _ && a.jsx(fl, {}),
            a.jsx('div', { ref: s }),
          ],
        }),
      }),
      a.jsx('div', {
        className:
          'p-4 border-t-2 border-black bg-bg flex-shrink-0 sticky bottom-0 z-10',
        children: a.jsxs('form', {
          onSubmit: B,
          className: 'flex space-x-3',
          children: [
            a.jsx(gt, {
              value: R,
              onChange: v,
              placeholder: 'Ask about tracks, mixing tips, or BPM matching...',
              disabled: _,
              className:
                'flex-1 border-2 border-black bg-white focus:ring-main focus:border-main text-text h-11 rounded-base',
            }),
            a.jsx(Na, {
              children: a.jsxs(ja, {
                children: [
                  a.jsx(Pa, {
                    asChild: !0,
                    children: a.jsx(X, {
                      type: 'submit',
                      disabled: _ || !R.trim(),
                      className:
                        'h-11 px-4 bg-main hover:bg-mainAccent border-2 border-black text-text shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all flex-shrink-0 rounded-base',
                      children: a.jsx(qs, { className: 'w-4 h-4' }),
                    }),
                  }),
                  a.jsx($r, {
                    className: 'bg-bg border-2 border-black text-text',
                    children: a.jsx('p', { children: 'Send message' }),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      a.jsx(cl, {
        isOpen: h,
        onClose: () => y(!1),
        suggestedTracks: w,
        onPlaylistCreated: (T) => {
          G.success('Playlist created successfully!');
        },
      }),
    ],
  });
}
function ml({ children: e }) {
  const [t, n] = x.useState(!1),
    [r, s] = x.useState(!0),
    [o, i] = x.useState(!1),
    [l, c] = x.useState('sidebar'),
    { allTracks: u, setAllTracks: g } = dt(),
    { initializePlayer: f } = Me();
  (x.useEffect(() => {
    f();
  }, [f]),
    x.useEffect(() => {
      const h = () => {
        const y = window.innerWidth < 768,
          w = window.innerWidth < 1024;
        (i(y), c(y ? 'overlay' : w ? 'bottom' : 'sidebar'));
      };
      return (
        h(),
        window.addEventListener('resize', h),
        () => window.removeEventListener('resize', h)
      );
    }, []),
    x.useEffect(() => {
      async function h() {
        try {
          const y = await fetch('/api/music/tracks', {
            credentials: 'include',
          });
          if (!y.ok) throw new Error('Failed to fetch tracks');
          const w = await y.json();
          if (!w.tracks) throw new Error('No tracks data received');
          g(w.tracks);
        } catch (y) {
          (console.error('Error fetching tracks:', y),
            G.error('Failed to load tracks for AI assistant'));
        } finally {
          s(!1);
        }
      }
      u.length === 0 ? h() : s(!1);
    }, [g, u.length]));
  const p = (h) => {
      h.length > 0 && G.success(`AI found ${h.length} matching tracks`);
    },
    d = () => {
      n(!t);
    },
    m = () => {
      n(!1);
    };
  return (
    x.useEffect(() => {
      const h = (y) => {
        ((y.metaKey || y.ctrlKey) && y.key === '/' && (y.preventDefault(), d()),
          y.key === 'Escape' && t && m());
      };
      return (
        window.addEventListener('keydown', h),
        () => window.removeEventListener('keydown', h)
      );
    }, [t]),
    r
      ? a.jsx('div', {
          className: 'flex items-center justify-center min-h-[400px]',
          children: a.jsxs('div', {
            className: 'flex flex-col items-center space-y-4',
            children: [
              a.jsx(Fs, { className: 'h-8 w-8 animate-spin text-primary' }),
              a.jsx('p', {
                className: 'text-sm text-muted-foreground',
                children: 'Loading AI assistant...',
              }),
            ],
          }),
        })
      : a.jsx(Kn, {
          children: a.jsxs('div', {
            className: 'relative min-h-screen',
            children: [
              a.jsx('div', {
                className: Q(
                  'transition-all duration-300 ease-in-out pb-20 min-h-screen',
                  l === 'sidebar' && t && 'lg:mr-[450px] xl:mr-[500px]',
                  l === 'bottom' && t && 'pb-[420px]',
                ),
                children: e,
              }),
              o &&
                t &&
                a.jsx('div', {
                  className: 'fixed inset-0 bg-black/50 z-40 md:hidden',
                  onClick: m,
                }),
              l !== 'bottom' &&
                a.jsx(ot, {
                  className: Q(
                    'fixed right-0 transition-all duration-300 ease-in-out z-50',
                    'border-l-2 border-black shadow-light bg-bg',
                    {
                      'top-16 bottom-20 w-full sm:w-[450px] xl:w-[500px]':
                        t && l === 'sidebar',
                      'top-16 bottom-20 w-full': t && l === 'overlay',
                      'translate-x-0': t,
                      'translate-x-full': !t,
                    },
                  ),
                  children:
                    t &&
                    a.jsx(Ln, {
                      tracks: u,
                      onTracksFilter: p,
                      isOpen: t,
                      onClose: m,
                    }),
                }),
              l === 'bottom' &&
                a.jsx(ot, {
                  className: Q(
                    'fixed bottom-20 left-0 right-0 transition-all duration-300 ease-in-out z-50',
                    'border-t-2 border-black shadow-light bg-bg',
                    {
                      'h-[400px]': t,
                      'translate-y-0': t,
                      'translate-y-full': !t,
                    },
                  ),
                  children:
                    t &&
                    a.jsx(Ln, {
                      tracks: u,
                      onTracksFilter: p,
                      isOpen: t,
                      onClose: m,
                    }),
                }),
              a.jsxs('div', {
                className:
                  'fixed bottom-28 right-6 z-50 flex flex-col items-end space-y-3',
                children: [
                  !t &&
                    u.length > 0 &&
                    a.jsx('div', {
                      className:
                        'bg-bg border-2 border-black rounded-base px-3 py-2 shadow-light animate-in fade-in-50 slide-in-from-right-2',
                      children: a.jsxs('div', {
                        className: 'flex items-center space-x-2',
                        children: [
                          a.jsx(ft, { className: 'w-4 h-4 text-black' }),
                          a.jsxs('span', {
                            className: 'text-sm font-medium text-text',
                            children: [u.length, ' tracks ready'],
                          }),
                        ],
                      }),
                    }),
                  a.jsx(X, {
                    onClick: d,
                    className: Q(
                      'h-14 w-14 rounded-base shadow-light border-2 border-black transition-all duration-200',
                      'bg-main hover:bg-mainAccent text-black font-medium',
                      'hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
                      'animate-in fade-in-50 slide-in-from-right-2',
                      t && 'rotate-180',
                    ),
                    children: t
                      ? a.jsx(zn, { className: 'h-6 w-6' })
                      : a.jsx(Gs, { className: 'h-6 w-6' }),
                  }),
                ],
              }),
              !t &&
                a.jsx('div', {
                  className: 'fixed bottom-28 right-24 z-40 hidden lg:block',
                  children: a.jsx('div', {
                    className:
                      'bg-bg border-2 border-black rounded-base px-3 py-2 shadow-light opacity-80 hover:opacity-100 transition-opacity animate-in fade-in-50 slide-in-from-right-2 delay-300',
                    children: a.jsxs('div', {
                      className:
                        'flex items-center space-x-2 text-xs text-text whitespace-nowrap',
                      children: [
                        a.jsx('span', { children: 'Press' }),
                        a.jsx('kbd', {
                          className:
                            'px-1.5 py-0.5 bg-white border border-black rounded-base text-xs font-mono',
                          children: '⌘/',
                        }),
                        a.jsx('span', { children: 'to open chat' }),
                      ],
                    }),
                  }),
                }),
            ],
          }),
        })
  );
}
function _l() {
  return a.jsxs(Kn, {
    children: [
      a.jsx(zs, {
        title: 'Track Collection',
        description: 'Browse and manage your music tracks',
      }),
      a.jsx(ml, {
        children: a.jsx('div', {
          className: 'mx-auto py-8 px-4 lg:px-8 overflow-visible',
          children: a.jsx(ia, {}),
        }),
      }),
    ],
  });
}
export { _l as component };
