import { createMemoryHistory } from '@tanstack/history';
import { splitSetCookieString as splitSetCookieString$1 } from 'cookie-es';
import {
  defaultSerovalPlugins as defaultSerovalPlugins$1,
  makeSerovalPlugin,
  rootRouteId,
  isNotFound,
  createSerializationAdapter,
  isRedirect,
  isResolvedRedirect,
  executeRewriteInput,
} from '@tanstack/router-core';
import invariant from 'tiny-invariant';
import { AsyncLocalStorage } from 'node:async_hooks';
import { jsx } from 'react/jsx-runtime';
import {
  defineHandlerCallback,
  renderRouterToStream,
} from '@tanstack/react-router/ssr/server';
import { RouterProvider } from '@tanstack/react-router';
function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
const defaultStreamHandler = defineHandlerCallback(
  ({ request, router, responseHeaders }) =>
    renderRouterToStream({
      request,
      router,
      responseHeaders,
      children: /* @__PURE__ */ jsx(StartServer, { router }),
    }),
);
function toHeadersInstance(init) {
  if (init instanceof Headers) {
    return new Headers(init);
  } else if (Array.isArray(init)) {
    return new Headers(init);
  } else if (typeof init === 'object') {
    return new Headers(init);
  } else {
    return new Headers();
  }
}
function mergeHeaders(...headers) {
  return headers.reduce((acc, header) => {
    const headersInstance = toHeadersInstance(header);
    for (const [key, value] of headersInstance.entries()) {
      if (key === 'set-cookie') {
        const splitCookies = splitSetCookieString$1(value);
        splitCookies.forEach((cookie) => acc.append('set-cookie', cookie));
      } else {
        acc.set(key, value);
      }
    }
    return acc;
  }, new Headers());
}
function json(payload, init) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: mergeHeaders(
      { 'content-type': 'application/json' },
      init?.headers,
    ),
  });
}
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = 'pending';
  controlledPromise.resolve = (value) => {
    controlledPromise.status = 'resolved';
    controlledPromise.value = value;
    resolveLoadPromise(value);
  };
  controlledPromise.reject = (e) => {
    controlledPromise.status = 'rejected';
    rejectLoadPromise(e);
  };
  return controlledPromise;
}
const TSS_FORMDATA_CONTEXT = '__TSS_CONTEXT';
const TSS_SERVER_FUNCTION = Symbol.for('TSS_SERVER_FUNCTION');
const X_TSS_SERIALIZED = 'x-tss-serialized';
const X_TSS_RAW_RESPONSE = 'x-tss-raw';
const startStorage = new AsyncLocalStorage();
async function runWithStartContext(context, fn2) {
  return startStorage.run(context, fn2);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && opts?.throwIfNotFound !== false) {
    throw new Error(
      `No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`,
    );
  }
  return context;
}
const getStartOptions = () => getStartContext().startOptions;
function flattenMiddlewares(middlewares) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware) => {
    middleware.forEach((m2) => {
      if (m2.options.middleware) {
        recurse(m2.options.middleware);
      }
      if (!seen.has(m2)) {
        seen.add(m2);
        flattened.push(m2);
      }
    });
  };
  recurse(middlewares);
  return flattened;
}
function getDefaultSerovalPlugins() {
  const start = getStartOptions();
  const adapters = start?.serializationAdapters;
  return [
    ...(adapters?.map(makeSerovalPlugin) ?? []),
    ...defaultSerovalPlugins$1,
  ];
}
var K = ((s) => (
  (s[(s.AggregateError = 1)] = 'AggregateError'),
  (s[(s.ArrowFunction = 2)] = 'ArrowFunction'),
  (s[(s.ErrorPrototypeStack = 4)] = 'ErrorPrototypeStack'),
  (s[(s.ObjectAssign = 8)] = 'ObjectAssign'),
  (s[(s.BigIntTypedArray = 16)] = 'BigIntTypedArray'),
  s
))(K || {});
var b = Symbol.asyncIterator,
  lr = Symbol.hasInstance,
  P$1 = Symbol.isConcatSpreadable,
  A = Symbol.iterator,
  ur = Symbol.match,
  cr = Symbol.matchAll,
  fr = Symbol.replace,
  Sr = Symbol.search,
  pr = Symbol.species,
  dr = Symbol.split,
  mr = Symbol.toPrimitive,
  x = Symbol.toStringTag,
  gr = Symbol.unscopables;
var Zr = {
    0: 'Symbol.asyncIterator',
    1: 'Symbol.hasInstance',
    2: 'Symbol.isConcatSpreadable',
    3: 'Symbol.iterator',
    4: 'Symbol.match',
    5: 'Symbol.matchAll',
    6: 'Symbol.replace',
    7: 'Symbol.search',
    8: 'Symbol.species',
    9: 'Symbol.split',
    10: 'Symbol.toPrimitive',
    11: 'Symbol.toStringTag',
    12: 'Symbol.unscopables',
  },
  ge = {
    [b]: 0,
    [lr]: 1,
    [P$1]: 2,
    [A]: 3,
    [ur]: 4,
    [cr]: 5,
    [fr]: 6,
    [Sr]: 7,
    [pr]: 8,
    [dr]: 9,
    [mr]: 10,
    [x]: 11,
    [gr]: 12,
  },
  Jr = {
    0: b,
    1: lr,
    2: P$1,
    3: A,
    4: ur,
    5: cr,
    6: fr,
    7: Sr,
    8: pr,
    9: dr,
    10: mr,
    11: x,
    12: gr,
  },
  Hr = {
    2: '!0',
    3: '!1',
    1: 'void 0',
    0: 'null',
    4: '-0',
    5: '1/0',
    6: '-1/0',
    7: '0/0',
  },
  $r = {
    2: true,
    3: false,
    1: void 0,
    0: null,
    4: -0,
    5: Number.POSITIVE_INFINITY,
    6: Number.NEGATIVE_INFINITY,
    7: Number.NaN,
  };
var ye = {
    0: 'Error',
    1: 'EvalError',
    2: 'RangeError',
    3: 'ReferenceError',
    4: 'SyntaxError',
    5: 'TypeError',
    6: 'URIError',
  },
  qr = {
    0: Error,
    1: EvalError,
    2: RangeError,
    3: ReferenceError,
    4: SyntaxError,
    5: TypeError,
    6: URIError,
  },
  o = void 0;
function c(e, r, t, n, a, s, i, l, u2, g, S, d) {
  return {
    t: e,
    i: r,
    s: t,
    l: n,
    c: a,
    m: s,
    p: i,
    e: l,
    a: u2,
    f: g,
    b: S,
    o: d,
  };
}
function _(e) {
  return c(2, o, e, o, o, o, o, o, o, o, o, o);
}
var Z = _(2),
  J = _(3),
  Ne = _(1),
  Ce = _(0),
  Xr = _(4),
  Qr = _(5),
  et = _(6),
  rt = _(7);
function Qt(e) {
  switch (e) {
    case '"':
      return '\\"';
    case '\\':
      return '\\\\';
    case `
`:
      return '\\n';
    case '\r':
      return '\\r';
    case '\b':
      return '\\b';
    case '	':
      return '\\t';
    case '\f':
      return '\\f';
    case '<':
      return '\\x3C';
    case '\u2028':
      return '\\u2028';
    case '\u2029':
      return '\\u2029';
    default:
      return;
  }
}
function y(e) {
  let r = '',
    t = 0,
    n;
  for (let a = 0, s = e.length; a < s; a++)
    ((n = Qt(e[a])), n && ((r += e.slice(t, a) + n), (t = a + 1)));
  return (t === 0 ? (r = e) : (r += e.slice(t)), r);
}
function en(e) {
  switch (e) {
    case '\\\\':
      return '\\';
    case '\\"':
      return '"';
    case '\\n':
      return `
`;
    case '\\r':
      return '\r';
    case '\\b':
      return '\b';
    case '\\t':
      return '	';
    case '\\f':
      return '\f';
    case '\\x3C':
      return '<';
    case '\\u2028':
      return '\u2028';
    case '\\u2029':
      return '\u2029';
    default:
      return e;
  }
}
function z(e) {
  return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, en);
}
var B = '__SEROVAL_REFS__',
  ie = '$R',
  ve = `self.${ie}`;
function rn(e) {
  return e == null ? `${ve}=${ve}||[]` : `(${ve}=${ve}||{})["${y(e)}"]=[]`;
}
var yr = /* @__PURE__ */ new Map(),
  V = /* @__PURE__ */ new Map();
function Nr(e) {
  return yr.has(e);
}
function nn(e) {
  return V.has(e);
}
function tt(e) {
  if (Nr(e)) return yr.get(e);
  throw new be(e);
}
function nt(e) {
  if (nn(e)) return V.get(e);
  throw new Ae(e);
}
typeof globalThis != 'undefined'
  ? Object.defineProperty(globalThis, B, {
      value: V,
      configurable: true,
      writable: false,
      enumerable: false,
    })
  : typeof window != 'undefined'
    ? Object.defineProperty(window, B, {
        value: V,
        configurable: true,
        writable: false,
        enumerable: false,
      })
    : typeof self != 'undefined'
      ? Object.defineProperty(self, B, {
          value: V,
          configurable: true,
          writable: false,
          enumerable: false,
        })
      : typeof global != 'undefined' &&
        Object.defineProperty(global, B, {
          value: V,
          configurable: true,
          writable: false,
          enumerable: false,
        });
function Re(e) {
  return e instanceof EvalError
    ? 1
    : e instanceof RangeError
      ? 2
      : e instanceof ReferenceError
        ? 3
        : e instanceof SyntaxError
          ? 4
          : e instanceof TypeError
            ? 5
            : e instanceof URIError
              ? 6
              : 0;
}
function on(e) {
  let r = ye[Re(e)];
  return e.name !== r
    ? { name: e.name }
    : e.constructor.name !== r
      ? { name: e.constructor.name }
      : {};
}
function H(e, r) {
  let t = on(e),
    n = Object.getOwnPropertyNames(e);
  for (let a = 0, s = n.length, i; a < s; a++)
    ((i = n[a]),
      i !== 'name' &&
        i !== 'message' &&
        (i === 'stack'
          ? r & 4 && ((t = t || {}), (t[i] = e[i]))
          : ((t = t || {}), (t[i] = e[i]))));
  return t;
}
function Ie(e) {
  return Object.isFrozen(e)
    ? 3
    : Object.isSealed(e)
      ? 2
      : Object.isExtensible(e)
        ? 0
        : 1;
}
function Ee(e) {
  switch (e) {
    case Number.POSITIVE_INFINITY:
      return Qr;
    case Number.NEGATIVE_INFINITY:
      return et;
  }
  return e !== e
    ? rt
    : Object.is(e, -0)
      ? Xr
      : c(0, o, e, o, o, o, o, o, o, o, o, o);
}
function $(e) {
  return c(1, o, y(e), o, o, o, o, o, o, o, o, o);
}
function Pe(e) {
  return c(3, o, '' + e, o, o, o, o, o, o, o, o, o);
}
function at(e) {
  return c(4, e, o, o, o, o, o, o, o, o, o, o);
}
function xe(e, r) {
  let t = r.valueOf();
  return c(5, e, t !== t ? '' : r.toISOString(), o, o, o, o, o, o, o, o, o);
}
function Te(e, r) {
  return c(6, e, o, o, y(r.source), r.flags, o, o, o, o, o, o);
}
function st(e, r) {
  return c(17, e, ge[r], o, o, o, o, o, o, o, o, o);
}
function it(e, r) {
  return c(18, e, y(tt(r)), o, o, o, o, o, o, o, o, o);
}
function le(e, r, t) {
  return c(25, e, t, o, y(r), o, o, o, o, o, o, o);
}
function Oe(e, r, t) {
  return c(9, e, o, r.length, o, o, o, o, t, o, o, Ie(r));
}
function he(e, r) {
  return c(21, e, o, o, o, o, o, o, o, r, o, o);
}
function we(e, r, t) {
  return c(
    15,
    e,
    o,
    r.length,
    r.constructor.name,
    o,
    o,
    o,
    o,
    t,
    r.byteOffset,
    o,
  );
}
function ze(e, r, t) {
  return c(
    16,
    e,
    o,
    r.length,
    r.constructor.name,
    o,
    o,
    o,
    o,
    t,
    r.byteOffset,
    o,
  );
}
function ke(e, r, t) {
  return c(20, e, o, r.byteLength, o, o, o, o, o, t, r.byteOffset, o);
}
function _e(e, r, t) {
  return c(13, e, Re(r), o, o, y(r.message), t, o, o, o, o, o);
}
function De(e, r, t) {
  return c(14, e, Re(r), o, o, y(r.message), t, o, o, o, o, o);
}
function Fe(e, r, t) {
  return c(7, e, o, r, o, o, o, o, t, o, o, o);
}
function Be(e, r) {
  return c(28, o, o, o, o, o, o, o, [e, r], o, o, o);
}
function Ve(e, r) {
  return c(30, o, o, o, o, o, o, o, [e, r], o, o, o);
}
function Me(e, r, t) {
  return c(31, e, o, o, o, o, o, o, t, r, o, o);
}
function je(e, r) {
  return c(32, e, o, o, o, o, o, o, o, r, o, o);
}
function Ue(e, r) {
  return c(33, e, o, o, o, o, o, o, o, r, o, o);
}
function Le(e, r) {
  return c(34, e, o, o, o, o, o, o, o, r, o, o);
}
var an = { parsing: 1, serialization: 2, deserialization: 3 };
function sn(e) {
  return `Seroval Error (step: ${an[e]})`;
}
var ln = (e, r) => sn(e),
  ue = class extends Error {
    constructor(t, n) {
      super(ln(t));
      this.cause = n;
    }
  },
  h = class extends ue {
    constructor(r) {
      super('parsing', r);
    }
  },
  Ye = class extends ue {
    constructor(r) {
      super('deserialization', r);
    }
  };
function M(e) {
  return `Seroval Error (specific: ${e})`;
}
var E = class extends Error {
    constructor(t) {
      super(M(1));
      this.value = t;
    }
  },
  k = class extends Error {
    constructor(r) {
      super(M(2));
    }
  },
  q = class extends Error {
    constructor(r) {
      super(M(3));
    }
  },
  D = class extends Error {
    constructor(r) {
      super(M(4));
    }
  },
  be = class extends Error {
    constructor(t) {
      super(M(5));
      this.value = t;
    }
  },
  Ae = class extends Error {
    constructor(r) {
      super(M(6));
    }
  },
  We = class extends Error {
    constructor(r) {
      super(M(7));
    }
  };
var j = class {
  constructor(r, t) {
    this.value = r;
    this.replacement = t;
  }
};
var X = () => {
    let e = { p: 0, s: 0, f: 0 };
    return (
      (e.p = new Promise((r, t) => {
        ((e.s = r), (e.f = t));
      })),
      e
    );
  },
  un = (e, r) => {
    (e.s(r), (e.p.s = 1), (e.p.v = r));
  },
  cn = (e, r) => {
    (e.f(r), (e.p.s = 2), (e.p.v = r));
  },
  lt = X.toString(),
  ut = un.toString(),
  ct = cn.toString(),
  vr = () => {
    let e = [],
      r = [],
      t = true,
      n = false,
      a = 0,
      s = (u2, g, S) => {
        for (S = 0; S < a; S++) r[S] && r[S][g](u2);
      },
      i = (u2, g, S, d) => {
        for (g = 0, S = e.length; g < S; g++)
          ((d = e[g]),
            !t && g === S - 1 ? u2[n ? 'return' : 'throw'](d) : u2.next(d));
      },
      l = (u2, g) => (
        t && ((g = a++), (r[g] = u2)),
        i(u2),
        () => {
          t && ((r[g] = r[a]), (r[a--] = void 0));
        }
      );
    return {
      __SEROVAL_STREAM__: true,
      on: (u2) => l(u2),
      next: (u2) => {
        t && (e.push(u2), s(u2, 'next'));
      },
      throw: (u2) => {
        t &&
          (e.push(u2),
          s(u2, 'throw'),
          (t = false),
          (n = false),
          (r.length = 0));
      },
      return: (u2) => {
        t &&
          (e.push(u2),
          s(u2, 'return'),
          (t = false),
          (n = true),
          (r.length = 0));
      },
    };
  },
  ft = vr.toString(),
  br = (e) => (r) => () => {
    let t = 0,
      n = {
        [e]: () => n,
        next: () => {
          if (t > r.d) return { done: true, value: void 0 };
          let a = t++,
            s = r.v[a];
          if (a === r.t) throw s;
          return { done: a === r.d, value: s };
        },
      };
    return n;
  },
  St = br.toString(),
  Ar = (e, r) => (t) => () => {
    let n = 0,
      a = -1,
      s = false,
      i = [],
      l = [],
      u2 = (S = 0, d = l.length) => {
        for (; S < d; S++) l[S].s({ done: true, value: void 0 });
      };
    t.on({
      next: (S) => {
        let d = l.shift();
        (d && d.s({ done: false, value: S }), i.push(S));
      },
      throw: (S) => {
        let d = l.shift();
        (d && d.f(S), u2(), (a = i.length), (s = true), i.push(S));
      },
      return: (S) => {
        let d = l.shift();
        (d && d.s({ done: true, value: S }), u2(), (a = i.length), i.push(S));
      },
    });
    let g = {
      [e]: () => g,
      next: () => {
        if (a === -1) {
          let W = n++;
          if (W >= i.length) {
            let Gr = r();
            return (l.push(Gr), Gr.p);
          }
          return { done: false, value: i[W] };
        }
        if (n > a) return { done: true, value: void 0 };
        let S = n++,
          d = i[S];
        if (S !== a) return { done: false, value: d };
        if (s) throw d;
        return { done: true, value: d };
      },
    };
    return g;
  },
  pt = Ar.toString(),
  Rr = (e, r) => {
    let t = atob(r),
      n = new Uint8Array(e);
    for (let a = 0; a < e; a++) n[a] = t.charCodeAt(a);
    return n.buffer;
  },
  dt = Rr.toString();
var mt = {},
  gt = {};
var yt = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
  Nt = { 0: '[]', 1: lt, 2: ut, 3: ct, 4: ft, 5: dt };
function Ke(e) {
  return '__SEROVAL_STREAM__' in e;
}
function Q() {
  return vr();
}
function Ge(e) {
  let r = Q(),
    t = e[b]();
  async function n() {
    try {
      let a = await t.next();
      a.done ? r.return(a.value) : (r.next(a.value), await n());
    } catch (a) {
      r.throw(a);
    }
  }
  return (n().catch(() => {}), r);
}
var fn = Ar(b, X);
function Ct(e) {
  return fn(e);
}
function Ze(e) {
  let r = [],
    t = -1,
    n = -1,
    a = e[A]();
  for (;;)
    try {
      let s = a.next();
      if ((r.push(s.value), s.done)) {
        n = r.length - 1;
        break;
      }
    } catch (s) {
      ((t = r.length), r.push(s));
    }
  return { v: r, t, d: n };
}
var Sn = br(A);
function vt(e) {
  return Sn(e);
}
async function Ir(e) {
  try {
    return [1, await e];
  } catch (r) {
    return [0, r];
  }
}
function ce(e, r) {
  return {
    plugins: r.plugins,
    mode: e,
    marked: /* @__PURE__ */ new Set(),
    features: 31 ^ (r.disabledFeatures || 0),
    refs: r.refs || /* @__PURE__ */ new Map(),
  };
}
function fe(e, r) {
  e.marked.add(r);
}
function Er(e, r) {
  let t = e.refs.size;
  return (e.refs.set(r, t), t);
}
function Je(e, r) {
  let t = e.refs.get(r);
  return t != null
    ? (fe(e, t), { type: 1, value: at(t) })
    : { type: 0, value: Er(e, r) };
}
function U(e, r) {
  let t = Je(e, r);
  return t.type === 1 ? t : Nr(r) ? { type: 2, value: it(t.value, r) } : t;
}
function I(e, r) {
  let t = U(e, r);
  if (t.type !== 0) return t.value;
  if (r in ge) return st(t.value, r);
  throw new E(r);
}
function w$1(e, r) {
  let t = Je(e, yt[r]);
  return t.type === 1 ? t.value : c(26, t.value, r, o, o, o, o, o, o, o, o, o);
}
function He(e) {
  let r = Je(e, mt);
  return r.type === 1
    ? r.value
    : c(27, r.value, o, o, o, o, o, o, o, I(e, A), o, o);
}
function $e(e) {
  let r = Je(e, gt);
  return r.type === 1
    ? r.value
    : c(29, r.value, o, o, o, o, o, o, [w$1(e, 1), I(e, b)], o, o, o);
}
function qe(e, r, t, n) {
  return c(t ? 11 : 10, e, o, o, o, o, n, o, o, o, o, Ie(r));
}
function Xe(e, r, t, n, a) {
  return c(8, r, o, o, o, o, o, { k: t, v: n, s: a }, o, w$1(e, 0), o, o);
}
function At(e, r, t) {
  return c(22, r, t, o, o, o, o, o, o, w$1(e, 1), o, o);
}
function Qe(e, r, t) {
  let n = new Uint8Array(t),
    a = n.length,
    s = '';
  for (let i = 0; i < a; i++) s += String.fromCharCode(n[i]);
  return c(19, r, y(btoa(s)), a, o, o, o, o, o, w$1(e, 5), o, o);
}
function ee$1(e, r) {
  return { base: ce(e, r), child: void 0 };
}
var xr = class {
  constructor(r) {
    this._p = r;
  }
  parse(r) {
    return N(this._p, r);
  }
};
async function mn(e, r) {
  let t = [];
  for (let n = 0, a = r.length; n < a; n++) n in r && (t[n] = await N(e, r[n]));
  return t;
}
async function gn(e, r, t) {
  return Oe(r, t, await mn(e, t));
}
async function Tr(e, r) {
  let t = Object.entries(r),
    n = [],
    a = [];
  for (let s = 0, i = t.length; s < i; s++)
    (n.push(y(t[s][0])), a.push(await N(e, t[s][1])));
  return (
    A in r && (n.push(I(e.base, A)), a.push(Be(He(e.base), await N(e, Ze(r))))),
    b in r && (n.push(I(e.base, b)), a.push(Ve($e(e.base), await N(e, Ge(r))))),
    x in r && (n.push(I(e.base, x)), a.push($(r[x]))),
    P$1 in r && (n.push(I(e.base, P$1)), a.push(r[P$1] ? Z : J)),
    { k: n, v: a, s: n.length }
  );
}
async function Pr(e, r, t, n) {
  return qe(r, t, n, await Tr(e, t));
}
async function yn(e, r, t) {
  return he(r, await N(e, t.valueOf()));
}
async function Nn(e, r, t) {
  return we(r, t, await N(e, t.buffer));
}
async function Cn(e, r, t) {
  return ze(r, t, await N(e, t.buffer));
}
async function vn(e, r, t) {
  return ke(r, t, await N(e, t.buffer));
}
async function Rt(e, r, t) {
  let n = H(t, e.base.features);
  return _e(r, t, n ? await Tr(e, n) : o);
}
async function bn(e, r, t) {
  let n = H(t, e.base.features);
  return De(r, t, n ? await Tr(e, n) : o);
}
async function An(e, r, t) {
  let n = [],
    a = [];
  for (let [s, i] of t.entries())
    (n.push(await N(e, s)), a.push(await N(e, i)));
  return Xe(e.base, r, n, a, t.size);
}
async function Rn(e, r, t) {
  let n = [];
  for (let a of t.keys()) n.push(await N(e, a));
  return Fe(r, t.size, n);
}
async function It(e, r, t) {
  let n = e.base.plugins;
  if (n)
    for (let a = 0, s = n.length; a < s; a++) {
      let i = n[a];
      if (i.parse.async && i.test(t))
        return (
          e.child == null && (e.child = new xr(e)),
          le(r, i.tag, await i.parse.async(t, e.child, { id: r }))
        );
    }
  return o;
}
async function In(e, r, t) {
  let [n, a] = await Ir(t);
  return c(12, r, n, o, o, o, o, o, o, await N(e, a), o, o);
}
function En(e, r, t, n) {
  let a = [],
    s = r.on({
      next: (i) => {
        (fe(this.base, e),
          N(this, i).then(
            (l) => {
              a.push(je(e, l));
            },
            (l) => {
              (n(l), s());
            },
          ));
      },
      throw: (i) => {
        (fe(this.base, e),
          N(this, i).then(
            (l) => {
              (a.push(Ue(e, l)), t(a), s());
            },
            (l) => {
              (n(l), s());
            },
          ));
      },
      return: (i) => {
        (fe(this.base, e),
          N(this, i).then(
            (l) => {
              (a.push(Le(e, l)), t(a), s());
            },
            (l) => {
              (n(l), s());
            },
          ));
      },
    });
}
async function Pn(e, r, t) {
  return Me(r, w$1(e.base, 4), await new Promise(En.bind(e, r, t)));
}
async function xn(e, r, t) {
  if (Array.isArray(t)) return gn(e, r, t);
  if (Ke(t)) return Pn(e, r, t);
  let n = t.constructor;
  if (n === j) return N(e, t.replacement);
  let a = await It(e, r, t);
  if (a) return a;
  switch (n) {
    case Object:
      return Pr(e, r, t, false);
    case o:
      return Pr(e, r, t, true);
    case Date:
      return xe(r, t);
    case RegExp:
      return Te(r, t);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return Rt(e, r, t);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return yn(e, r, t);
    case ArrayBuffer:
      return Qe(e.base, r, t);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return Nn(e, r, t);
    case DataView:
      return vn(e, r, t);
    case Map:
      return An(e, r, t);
    case Set:
      return Rn(e, r, t);
  }
  if (n === Promise || t instanceof Promise) return In(e, r, t);
  let s = e.base.features;
  if (s & 16)
    switch (n) {
      case BigInt64Array:
      case BigUint64Array:
        return Cn(e, r, t);
    }
  if (
    s & 1 &&
    typeof AggregateError != 'undefined' &&
    (n === AggregateError || t instanceof AggregateError)
  )
    return bn(e, r, t);
  if (t instanceof Error) return Rt(e, r, t);
  if (A in t || b in t) return Pr(e, r, t, !!n);
  throw new E(t);
}
async function Tn(e, r) {
  let t = U(e.base, r);
  if (t.type !== 0) return t.value;
  let n = await It(e, t.value, r);
  if (n) return n;
  throw new E(r);
}
async function N(e, r) {
  switch (typeof r) {
    case 'boolean':
      return r ? Z : J;
    case 'undefined':
      return Ne;
    case 'string':
      return $(r);
    case 'number':
      return Ee(r);
    case 'bigint':
      return Pe(r);
    case 'object': {
      if (r) {
        let t = U(e.base, r);
        return t.type === 0 ? await xn(e, t.value, r) : t.value;
      }
      return Ce;
    }
    case 'symbol':
      return I(e.base, r);
    case 'function':
      return Tn(e, r);
    default:
      throw new E(r);
  }
}
async function re$1(e, r) {
  try {
    return await N(e, r);
  } catch (t) {
    throw t instanceof h ? t : new h(t);
  }
}
var te = ((t) => (
  (t[(t.Vanilla = 1)] = 'Vanilla'),
  (t[(t.Cross = 2)] = 'Cross'),
  t
))(te || {});
function _s(e) {
  return e;
}
function Et(e, r) {
  for (let t = 0, n = r.length; t < n; t++) {
    let a = r[t];
    e.has(a) || (e.add(a), a.extends && Et(e, a.extends));
  }
}
function v(e) {
  if (e) {
    let r = /* @__PURE__ */ new Set();
    return (Et(r, e), [...r]);
  }
}
function Pt(e) {
  switch (e) {
    case 'Int8Array':
      return Int8Array;
    case 'Int16Array':
      return Int16Array;
    case 'Int32Array':
      return Int32Array;
    case 'Uint8Array':
      return Uint8Array;
    case 'Uint16Array':
      return Uint16Array;
    case 'Uint32Array':
      return Uint32Array;
    case 'Uint8ClampedArray':
      return Uint8ClampedArray;
    case 'Float32Array':
      return Float32Array;
    case 'Float64Array':
      return Float64Array;
    case 'BigInt64Array':
      return BigInt64Array;
    case 'BigUint64Array':
      return BigUint64Array;
    default:
      throw new We(e);
  }
}
function xt(e, r) {
  switch (r) {
    case 3:
      return Object.freeze(e);
    case 1:
      return Object.preventExtensions(e);
    case 2:
      return Object.seal(e);
    default:
      return e;
  }
}
function Tt(e, r) {
  return {
    mode: e,
    plugins: r.plugins,
    refs: r.refs || /* @__PURE__ */ new Map(),
  };
}
function Ot(e) {
  return {
    mode: 1,
    base: Tt(1, e),
    child: void 0,
    state: { marked: new Set(e.markedRefs) },
  };
}
var Or = class {
  constructor(r) {
    this._p = r;
  }
  deserialize(r) {
    return m(this._p, r);
  }
};
function On(e, r, t) {
  return (e.state.marked.has(r) && e.base.refs.set(r, t), t);
}
function hn(e, r, t) {
  return (e.base.refs.has(r) || e.base.refs.set(r, t), t);
}
function C(e, r, t) {
  return e.mode === 1 ? On(e, r, t) : hn(e, r, t);
}
function wn(e, r) {
  return C(e, r.i, nt(z(r.s)));
}
function zn(e, r) {
  let t = r.l,
    n = C(e, r.i, new Array(t)),
    a;
  for (let s = 0; s < t; s++) ((a = r.a[s]), a && (n[s] = m(e, a)));
  return (xt(n, r.o), n);
}
function wt(e, r, t) {
  let n = r.s;
  if (n) {
    let a = r.k,
      s = r.v;
    for (let i = 0, l; i < n; i++)
      ((l = a[i]),
        typeof l == 'string'
          ? (t[z(l)] = m(e, s[i]))
          : (t[m(e, l)] = m(e, s[i])));
  }
  return t;
}
function kn(e, r) {
  let t = C(e, r.i, r.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
  return (wt(e, r.p, t), xt(t, r.o), t);
}
function _n(e, r) {
  return C(e, r.i, new Date(r.s));
}
function Dn(e, r) {
  return C(e, r.i, new RegExp(z(r.c), r.m));
}
function Fn(e, r) {
  let t = C(e, r.i, /* @__PURE__ */ new Set()),
    n = r.a;
  for (let a = 0, s = r.l; a < s; a++) t.add(m(e, n[a]));
  return t;
}
function Bn(e, r) {
  let t = C(e, r.i, /* @__PURE__ */ new Map()),
    n = r.e.k,
    a = r.e.v;
  for (let s = 0, i = r.e.s; s < i; s++) t.set(m(e, n[s]), m(e, a[s]));
  return t;
}
function Vn(e, r) {
  return C(e, r.i, Rr(r.l, z(r.s)));
}
function Mn(e, r) {
  let t = Pt(r.c),
    n = m(e, r.f);
  return C(e, r.i, new t(n, r.b, r.l));
}
function jn(e, r) {
  let t = m(e, r.f);
  return C(e, r.i, new DataView(t, r.b, r.l));
}
function zt(e, r, t) {
  if (r.p) {
    let n = wt(e, r.p, {});
    Object.assign(t, n);
  }
  return t;
}
function Un(e, r) {
  let t = C(e, r.i, new AggregateError([], z(r.m)));
  return zt(e, r, t);
}
function Ln(e, r) {
  let t = qr[r.s],
    n = C(e, r.i, new t(z(r.m)));
  return zt(e, r, n);
}
function Yn(e, r) {
  let t = X(),
    n = C(e, r.i, t.p),
    a = m(e, r.f);
  return (r.s ? t.s(a) : t.f(a), n);
}
function Wn(e, r) {
  return C(e, r.i, Object(m(e, r.f)));
}
function Kn(e, r) {
  let t = e.base.plugins;
  if (t) {
    let n = z(r.c);
    for (let a = 0, s = t.length; a < s; a++) {
      let i = t[a];
      if (i.tag === n)
        return (
          e.child == null && (e.child = new Or(e)),
          C(e, r.i, i.deserialize(r.s, e.child, { id: r.i }))
        );
    }
  }
  throw new q(r.c);
}
function Gn(e, r) {
  return C(e, r.i, C(e, r.s, X()).p);
}
function Zn(e, r) {
  let t = e.base.refs.get(r.i);
  if (t) {
    t.s(m(e, r.a[1]));
    return;
  }
  throw new D('Promise');
}
function Jn(e, r) {
  let t = e.base.refs.get(r.i);
  if (t) {
    t.f(m(e, r.a[1]));
    return;
  }
  throw new D('Promise');
}
function Hn(e, r) {
  m(e, r.a[0]);
  let t = m(e, r.a[1]);
  return vt(t);
}
function $n(e, r) {
  m(e, r.a[0]);
  let t = m(e, r.a[1]);
  return Ct(t);
}
function qn(e, r) {
  let t = C(e, r.i, Q()),
    n = r.a.length;
  if (n) for (let a = 0; a < n; a++) m(e, r.a[a]);
  return t;
}
function Xn(e, r) {
  let t = e.base.refs.get(r.i);
  if (t) {
    t.next(m(e, r.f));
    return;
  }
  throw new D('Stream');
}
function Qn(e, r) {
  let t = e.base.refs.get(r.i);
  if (t) {
    t.throw(m(e, r.f));
    return;
  }
  throw new D('Stream');
}
function eo(e, r) {
  let t = e.base.refs.get(r.i);
  if (t) {
    t.return(m(e, r.f));
    return;
  }
  throw new D('Stream');
}
function ro(e, r) {
  m(e, r.f);
}
function to(e, r) {
  m(e, r.a[1]);
}
function m(e, r) {
  switch (r.t) {
    case 2:
      return $r[r.s];
    case 0:
      return r.s;
    case 1:
      return z(r.s);
    case 3:
      return BigInt(r.s);
    case 4:
      return e.base.refs.get(r.i);
    case 18:
      return wn(e, r);
    case 9:
      return zn(e, r);
    case 10:
    case 11:
      return kn(e, r);
    case 5:
      return _n(e, r);
    case 6:
      return Dn(e, r);
    case 7:
      return Fn(e, r);
    case 8:
      return Bn(e, r);
    case 19:
      return Vn(e, r);
    case 16:
    case 15:
      return Mn(e, r);
    case 20:
      return jn(e, r);
    case 14:
      return Un(e, r);
    case 13:
      return Ln(e, r);
    case 12:
      return Yn(e, r);
    case 17:
      return Jr[r.s];
    case 21:
      return Wn(e, r);
    case 25:
      return Kn(e, r);
    case 22:
      return Gn(e, r);
    case 23:
      return Zn(e, r);
    case 24:
      return Jn(e, r);
    case 28:
      return Hn(e, r);
    case 30:
      return $n(e, r);
    case 31:
      return qn(e, r);
    case 32:
      return Xn(e, r);
    case 33:
      return Qn(e, r);
    case 34:
      return eo(e, r);
    case 27:
      return ro(e, r);
    case 29:
      return to(e, r);
    default:
      throw new k(r);
  }
}
function er(e, r) {
  try {
    return m(e, r);
  } catch (t) {
    throw new Ye(t);
  }
}
var no = () => T,
  oo = no.toString(),
  kt = /=>/.test(oo);
function rr(e, r) {
  return kt
    ? (e.length === 1 ? e[0] : '(' + e.join(',') + ')') +
        '=>' +
        (r.startsWith('{') ? '(' + r + ')' : r)
    : 'function(' + e.join(',') + '){return ' + r + '}';
}
function _t(e, r) {
  return kt
    ? (e.length === 1 ? e[0] : '(' + e.join(',') + ')') + '=>{' + r + '}'
    : 'function(' + e.join(',') + '){' + r + '}';
}
var Bt = 'hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_',
  Dt = Bt.length,
  Vt = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_',
  Ft = Vt.length;
function hr(e) {
  let r = e % Dt,
    t = Bt[r];
  for (e = (e - r) / Dt; e > 0; )
    ((r = e % Ft), (t += Vt[r]), (e = (e - r) / Ft));
  return t;
}
var ao = /^[$A-Z_][0-9A-Z_$]*$/i;
function wr(e) {
  let r = e[0];
  return (
    (r === '$' ||
      r === '_' ||
      (r >= 'A' && r <= 'Z') ||
      (r >= 'a' && r <= 'z')) &&
    ao.test(e)
  );
}
function pe(e) {
  switch (e.t) {
    case 0:
      return e.s + '=' + e.v;
    case 2:
      return e.s + '.set(' + e.k + ',' + e.v + ')';
    case 1:
      return e.s + '.add(' + e.v + ')';
    case 3:
      return e.s + '.delete(' + e.k + ')';
  }
}
function so(e) {
  let r = [],
    t = e[0];
  for (let n = 1, a = e.length, s, i = t; n < a; n++)
    ((s = e[n]),
      s.t === 0 && s.v === i.v
        ? (t = { t: 0, s: s.s, k: o, v: pe(t) })
        : s.t === 2 && s.s === i.s
          ? (t = { t: 2, s: pe(t), k: s.k, v: s.v })
          : s.t === 1 && s.s === i.s
            ? (t = { t: 1, s: pe(t), k: o, v: s.v })
            : s.t === 3 && s.s === i.s
              ? (t = { t: 3, s: pe(t), k: s.k, v: o })
              : (r.push(t), (t = s)),
      (i = s));
  return (r.push(t), r);
}
function Wt(e) {
  if (e.length) {
    let r = '',
      t = so(e);
    for (let n = 0, a = t.length; n < a; n++) r += pe(t[n]) + ',';
    return r;
  }
  return o;
}
var io = 'Object.create(null)',
  lo = 'new Set',
  uo = 'new Map',
  co = 'Promise.resolve',
  fo = 'Promise.reject',
  So = {
    3: 'Object.freeze',
    2: 'Object.seal',
    1: 'Object.preventExtensions',
    0: o,
  };
function Kt(e, r) {
  return {
    mode: e,
    plugins: r.plugins,
    features: r.features,
    marked: new Set(r.markedRefs),
    stack: [],
    flags: [],
    assignments: [],
  };
}
function nr(e) {
  return { mode: 2, base: Kt(2, e), state: e, child: void 0 };
}
var zr = class {
  constructor(r) {
    this._p = r;
  }
  serialize(r) {
    return f(this._p, r);
  }
};
function mo(e, r) {
  let t = e.valid.get(r);
  t == null && ((t = e.valid.size), e.valid.set(r, t));
  let n = e.vars[t];
  return (n == null && ((n = hr(t)), (e.vars[t] = n)), n);
}
function go(e) {
  return ie + '[' + e + ']';
}
function p$1(e, r) {
  return e.mode === 1 ? mo(e.state, r) : go(r);
}
function O(e, r) {
  e.marked.add(r);
}
function kr(e, r) {
  return e.marked.has(r);
}
function Dr(e, r, t) {
  r !== 0 && (O(e.base, t), e.base.flags.push({ type: r, value: p$1(e, t) }));
}
function yo(e) {
  let r = '';
  for (let t = 0, n = e.flags, a = n.length; t < a; t++) {
    let s = n[t];
    r += So[s.type] + '(' + s.value + '),';
  }
  return r;
}
function Gt(e) {
  let r = Wt(e.assignments),
    t = yo(e);
  return r ? (t ? r + t : r) : t;
}
function Zt(e, r, t) {
  e.assignments.push({ t: 0, s: r, k: o, v: t });
}
function No(e, r, t) {
  e.base.assignments.push({ t: 1, s: p$1(e, r), k: o, v: t });
}
function Se(e, r, t, n) {
  e.base.assignments.push({ t: 2, s: p$1(e, r), k: t, v: n });
}
function Mt(e, r, t) {
  e.base.assignments.push({ t: 3, s: p$1(e, r), k: t, v: o });
}
function de(e, r, t, n) {
  Zt(e.base, p$1(e, r) + '[' + t + ']', n);
}
function _r(e, r, t, n) {
  Zt(e.base, p$1(e, r) + '.' + t, n);
}
function F(e, r) {
  return r.t === 4 && e.stack.includes(r.i);
}
function ne(e, r, t) {
  return e.mode === 1 && !kr(e.base, r) ? t : p$1(e, r) + '=' + t;
}
function Co(e) {
  return B + '.get("' + e.s + '")';
}
function jt(e, r, t, n) {
  return t
    ? F(e.base, t)
      ? (O(e.base, r), de(e, r, n, p$1(e, t.i)), '')
      : f(e, t)
    : '';
}
function vo(e, r) {
  let t = r.i;
  if (r.l) {
    e.base.stack.push(t);
    let n = r.a,
      a = jt(e, t, n[0], 0),
      s = a === '';
    for (let i = 1, l = r.l, u2; i < l; i++)
      ((u2 = jt(e, t, n[i], i)), (a += ',' + u2), (s = u2 === ''));
    return (e.base.stack.pop(), Dr(e, r.o, r.i), '[' + a + (s ? ',]' : ']'));
  }
  return '[]';
}
function Ut(e, r, t, n) {
  if (typeof t == 'string') {
    let a = Number(t),
      s = (a >= 0 && a.toString() === t) || wr(t);
    if (F(e.base, n)) {
      let i = p$1(e, n.i);
      return (
        O(e.base, r.i),
        s && a !== a ? _r(e, r.i, t, i) : de(e, r.i, s ? t : '"' + t + '"', i),
        ''
      );
    }
    return (s ? t : '"' + t + '"') + ':' + f(e, n);
  }
  return '[' + f(e, t) + ']:' + f(e, n);
}
function Jt(e, r, t) {
  let n = t.s;
  if (n) {
    let a = t.k,
      s = t.v;
    e.base.stack.push(r.i);
    let i = Ut(e, r, a[0], s[0]);
    for (let l = 1, u2 = i; l < n; l++)
      ((u2 = Ut(e, r, a[l], s[l])), (i += (u2 && i && ',') + u2));
    return (e.base.stack.pop(), '{' + i + '}');
  }
  return '{}';
}
function bo(e, r) {
  return (Dr(e, r.o, r.i), Jt(e, r, r.p));
}
function Ao(e, r, t, n) {
  let a = Jt(e, r, t);
  return a !== '{}' ? 'Object.assign(' + n + ',' + a + ')' : n;
}
function Ro(e, r, t, n, a) {
  let s = e.base,
    i = f(e, a),
    l = Number(n),
    u2 = (l >= 0 && l.toString() === n) || wr(n);
  if (F(s, a))
    u2 && l !== l ? _r(e, r.i, n, i) : de(e, r.i, u2 ? n : '"' + n + '"', i);
  else {
    let g = s.assignments;
    ((s.assignments = t),
      u2 && l !== l ? _r(e, r.i, n, i) : de(e, r.i, u2 ? n : '"' + n + '"', i),
      (s.assignments = g));
  }
}
function Io(e, r, t, n, a) {
  if (typeof n == 'string') Ro(e, r, t, n, a);
  else {
    let s = e.base,
      i = s.stack;
    s.stack = [];
    let l = f(e, a);
    s.stack = i;
    let u2 = s.assignments;
    ((s.assignments = t), de(e, r.i, f(e, n), l), (s.assignments = u2));
  }
}
function Eo(e, r, t) {
  let n = t.s;
  if (n) {
    let a = [],
      s = t.k,
      i = t.v;
    e.base.stack.push(r.i);
    for (let l = 0; l < n; l++) Io(e, r, a, s[l], i[l]);
    return (e.base.stack.pop(), Wt(a));
  }
  return o;
}
function Fr(e, r, t) {
  if (r.p) {
    let n = e.base;
    if (n.features & 8) t = Ao(e, r, r.p, t);
    else {
      O(n, r.i);
      let a = Eo(e, r, r.p);
      if (a) return '(' + ne(e, r.i, t) + ',' + a + p$1(e, r.i) + ')';
    }
  }
  return t;
}
function Po(e, r) {
  return (Dr(e, r.o, r.i), Fr(e, r, io));
}
function xo(e) {
  return 'new Date("' + e.s + '")';
}
function To(e) {
  return '/' + e.c + '/' + e.m;
}
function Lt(e, r, t) {
  let n = e.base;
  return F(n, t) ? (O(n, r), No(e, r, p$1(e, t.i)), '') : f(e, t);
}
function Oo(e, r) {
  let t = lo,
    n = r.l,
    a = r.i;
  if (n) {
    let s = r.a;
    e.base.stack.push(a);
    let i = Lt(e, a, s[0]);
    for (let l = 1, u2 = i; l < n; l++)
      ((u2 = Lt(e, a, s[l])), (i += (u2 && i && ',') + u2));
    (e.base.stack.pop(), i && (t += '([' + i + '])'));
  }
  return t;
}
function Yt(e, r, t, n, a) {
  let s = e.base;
  if (F(s, t)) {
    let i = p$1(e, t.i);
    if ((O(s, r), F(s, n))) {
      let u2 = p$1(e, n.i);
      return (Se(e, r, i, u2), '');
    }
    if (n.t !== 4 && n.i != null && kr(s, n.i)) {
      let u2 = '(' + f(e, n) + ',[' + a + ',' + a + '])';
      return (Se(e, r, i, p$1(e, n.i)), Mt(e, r, a), u2);
    }
    let l = s.stack;
    return ((s.stack = []), Se(e, r, i, f(e, n)), (s.stack = l), '');
  }
  if (F(s, n)) {
    let i = p$1(e, n.i);
    if ((O(s, r), t.t !== 4 && t.i != null && kr(s, t.i))) {
      let u2 = '(' + f(e, t) + ',[' + a + ',' + a + '])';
      return (Se(e, r, p$1(e, t.i), i), Mt(e, r, a), u2);
    }
    let l = s.stack;
    return ((s.stack = []), Se(e, r, f(e, t), i), (s.stack = l), '');
  }
  return '[' + f(e, t) + ',' + f(e, n) + ']';
}
function ho(e, r) {
  let t = uo,
    n = r.e.s,
    a = r.i,
    s = r.f,
    i = p$1(e, s.i),
    l = e.base;
  if (n) {
    let u2 = r.e.k,
      g = r.e.v;
    l.stack.push(a);
    let S = Yt(e, a, u2[0], g[0], i);
    for (let d = 1, W = S; d < n; d++)
      ((W = Yt(e, a, u2[d], g[d], i)), (S += (W && S && ',') + W));
    (l.stack.pop(), S && (t += '([' + S + '])'));
  }
  return (s.t === 26 && (O(l, s.i), (t = '(' + f(e, s) + ',' + t + ')')), t);
}
function wo(e, r) {
  return L(e, r.f) + '(' + r.l + ',"' + r.s + '")';
}
function zo(e, r) {
  return 'new ' + r.c + '(' + f(e, r.f) + ',' + r.b + ',' + r.l + ')';
}
function ko(e, r) {
  return 'new DataView(' + f(e, r.f) + ',' + r.b + ',' + r.l + ')';
}
function _o(e, r) {
  let t = r.i;
  e.base.stack.push(t);
  let n = Fr(e, r, 'new AggregateError([],"' + r.m + '")');
  return (e.base.stack.pop(), n);
}
function Do(e, r) {
  return Fr(e, r, 'new ' + ye[r.s] + '("' + r.m + '")');
}
function Fo(e, r) {
  let t,
    n = r.f,
    a = r.i,
    s = r.s ? co : fo,
    i = e.base;
  if (F(i, n)) {
    let l = p$1(e, n.i);
    t =
      s +
      (r.s
        ? '().then(' + rr([], l) + ')'
        : '().catch(' + _t([], 'throw ' + l) + ')');
  } else {
    i.stack.push(a);
    let l = f(e, n);
    (i.stack.pop(), (t = s + '(' + l + ')'));
  }
  return t;
}
function Bo(e, r) {
  return 'Object(' + f(e, r.f) + ')';
}
function L(e, r) {
  let t = f(e, r);
  return r.t === 4 ? t : '(' + t + ')';
}
function Vo(e, r) {
  if (e.mode === 1) throw new k(r);
  return '(' + ne(e, r.s, L(e, r.f) + '()') + ').p';
}
function Mo(e, r) {
  if (e.mode === 1) throw new k(r);
  return L(e, r.a[0]) + '(' + p$1(e, r.i) + ',' + f(e, r.a[1]) + ')';
}
function jo(e, r) {
  if (e.mode === 1) throw new k(r);
  return L(e, r.a[0]) + '(' + p$1(e, r.i) + ',' + f(e, r.a[1]) + ')';
}
function Uo(e, r) {
  let t = e.base.plugins;
  if (t)
    for (let n = 0, a = t.length; n < a; n++) {
      let s = t[n];
      if (s.tag === r.c)
        return (
          e.child == null && (e.child = new zr(e)),
          s.serialize(r.s, e.child, { id: r.i })
        );
    }
  throw new q(r.c);
}
function Lo(e, r) {
  let t = '',
    n = false;
  return (
    r.f.t !== 4 && (O(e.base, r.f.i), (t = '(' + f(e, r.f) + ','), (n = true)),
    (t += ne(e, r.i, '(' + St + ')(' + p$1(e, r.f.i) + ')')),
    n && (t += ')'),
    t
  );
}
function Yo(e, r) {
  return L(e, r.a[0]) + '(' + f(e, r.a[1]) + ')';
}
function Wo(e, r) {
  let t = r.a[0],
    n = r.a[1],
    a = e.base,
    s = '';
  (t.t !== 4 && (O(a, t.i), (s += '(' + f(e, t))),
    n.t !== 4 && (O(a, n.i), (s += (s ? ',' : '(') + f(e, n))),
    s && (s += ','));
  let i = ne(e, r.i, '(' + pt + ')(' + p$1(e, n.i) + ',' + p$1(e, t.i) + ')');
  return s ? s + i + ')' : i;
}
function Ko(e, r) {
  return L(e, r.a[0]) + '(' + f(e, r.a[1]) + ')';
}
function Go(e, r) {
  let t = ne(e, r.i, L(e, r.f) + '()'),
    n = r.a.length;
  if (n) {
    let a = f(e, r.a[0]);
    for (let s = 1; s < n; s++) a += ',' + f(e, r.a[s]);
    return '(' + t + ',' + a + ',' + p$1(e, r.i) + ')';
  }
  return t;
}
function Zo(e, r) {
  return p$1(e, r.i) + '.next(' + f(e, r.f) + ')';
}
function Jo(e, r) {
  return p$1(e, r.i) + '.throw(' + f(e, r.f) + ')';
}
function Ho(e, r) {
  return p$1(e, r.i) + '.return(' + f(e, r.f) + ')';
}
function $o(e, r) {
  switch (r.t) {
    case 17:
      return Zr[r.s];
    case 18:
      return Co(r);
    case 9:
      return vo(e, r);
    case 10:
      return bo(e, r);
    case 11:
      return Po(e, r);
    case 5:
      return xo(r);
    case 6:
      return To(r);
    case 7:
      return Oo(e, r);
    case 8:
      return ho(e, r);
    case 19:
      return wo(e, r);
    case 16:
    case 15:
      return zo(e, r);
    case 20:
      return ko(e, r);
    case 14:
      return _o(e, r);
    case 13:
      return Do(e, r);
    case 12:
      return Fo(e, r);
    case 21:
      return Bo(e, r);
    case 22:
      return Vo(e, r);
    case 25:
      return Uo(e, r);
    case 26:
      return Nt[r.s];
    default:
      throw new k(r);
  }
}
function f(e, r) {
  switch (r.t) {
    case 2:
      return Hr[r.s];
    case 0:
      return '' + r.s;
    case 1:
      return '"' + r.s + '"';
    case 3:
      return r.s + 'n';
    case 4:
      return p$1(e, r.i);
    case 23:
      return Mo(e, r);
    case 24:
      return jo(e, r);
    case 27:
      return Lo(e, r);
    case 28:
      return Yo(e, r);
    case 29:
      return Wo(e, r);
    case 30:
      return Ko(e, r);
    case 31:
      return Go(e, r);
    case 32:
      return Zo(e, r);
    case 33:
      return Jo(e, r);
    case 34:
      return Ho(e, r);
    default:
      return ne(e, r.i, $o(e, r));
  }
}
function ar(e, r) {
  let t = f(e, r),
    n = r.i;
  if (n == null) return t;
  let a = Gt(e.base),
    s = p$1(e, n),
    i = e.state.scopeId,
    l = i == null ? '' : ie,
    u2 = a ? '(' + t + ',' + a + s + ')' : t;
  if (l === '') return r.t === 10 && !a ? '(' + u2 + ')' : u2;
  let g = i == null ? '()' : '(' + ie + '["' + y(i) + '"])';
  return '(' + rr([l], u2) + ')' + g;
}
var Vr = class {
    constructor(r) {
      this._p = r;
    }
    parse(r) {
      return R(this._p, r);
    }
  },
  Mr = class {
    constructor(r) {
      this._p = r;
    }
    parse(r) {
      return R(this._p, r);
    }
    parseWithError(r) {
      return Y(this._p, r);
    }
    isAlive() {
      return this._p.state.alive;
    }
    pushPendingState() {
      Wr(this._p);
    }
    popPendingState() {
      me(this._p);
    }
    onParse(r) {
      oe(this._p, r);
    }
    onError(r) {
      Lr(this._p, r);
    }
  };
function qo(e) {
  return {
    alive: true,
    pending: 0,
    initial: true,
    buffer: [],
    onParse: e.onParse,
    onError: e.onError,
    onDone: e.onDone,
  };
}
function jr(e) {
  return { type: 2, base: ce(2, e), child: void 0, state: qo(e) };
}
function Xo(e, r) {
  let t = [];
  for (let n = 0, a = r.length; n < a; n++) n in r && (t[n] = R(e, r[n]));
  return t;
}
function Qo(e, r, t) {
  return Oe(r, t, Xo(e, t));
}
function Ur(e, r) {
  let t = Object.entries(r),
    n = [],
    a = [];
  for (let s = 0, i = t.length; s < i; s++)
    (n.push(y(t[s][0])), a.push(R(e, t[s][1])));
  return (
    A in r && (n.push(I(e.base, A)), a.push(Be(He(e.base), R(e, Ze(r))))),
    b in r &&
      (n.push(I(e.base, b)),
      a.push(Ve($e(e.base), R(e, e.type === 1 ? Q() : Ge(r))))),
    x in r && (n.push(I(e.base, x)), a.push($(r[x]))),
    P$1 in r && (n.push(I(e.base, P$1)), a.push(r[P$1] ? Z : J)),
    { k: n, v: a, s: n.length }
  );
}
function Br(e, r, t, n) {
  return qe(r, t, n, Ur(e, t));
}
function ea(e, r, t) {
  return he(r, R(e, t.valueOf()));
}
function ra(e, r, t) {
  return we(r, t, R(e, t.buffer));
}
function ta(e, r, t) {
  return ze(r, t, R(e, t.buffer));
}
function na(e, r, t) {
  return ke(r, t, R(e, t.buffer));
}
function Ht(e, r, t) {
  let n = H(t, e.base.features);
  return _e(r, t, n ? Ur(e, n) : o);
}
function oa(e, r, t) {
  let n = H(t, e.base.features);
  return De(r, t, n ? Ur(e, n) : o);
}
function aa(e, r, t) {
  let n = [],
    a = [];
  for (let [s, i] of t.entries()) (n.push(R(e, s)), a.push(R(e, i)));
  return Xe(e.base, r, n, a, t.size);
}
function sa(e, r, t) {
  let n = [];
  for (let a of t.keys()) n.push(R(e, a));
  return Fe(r, t.size, n);
}
function ia(e, r, t) {
  let n = Me(r, w$1(e.base, 4), []);
  return (
    e.type === 1 ||
      (Wr(e),
      t.on({
        next: (a) => {
          if (e.state.alive) {
            let s = Y(e, a);
            s && oe(e, je(r, s));
          }
        },
        throw: (a) => {
          if (e.state.alive) {
            let s = Y(e, a);
            s && oe(e, Ue(r, s));
          }
          me(e);
        },
        return: (a) => {
          if (e.state.alive) {
            let s = Y(e, a);
            s && oe(e, Le(r, s));
          }
          me(e);
        },
      })),
    n
  );
}
function la(e, r) {
  if (this.state.alive) {
    let t = Y(this, r);
    (t && oe(this, c(23, e, o, o, o, o, o, o, [w$1(this.base, 2), t], o, o, o)),
      me(this));
  }
}
function ua(e, r) {
  if (this.state.alive) {
    let t = Y(this, r);
    t && oe(this, c(24, e, o, o, o, o, o, o, [w$1(this.base, 3), t], o, o, o));
  }
  me(this);
}
function ca(e, r, t) {
  let n = Er(e.base, {});
  return (
    e.type === 2 && (Wr(e), t.then(la.bind(e, n), ua.bind(e, n))),
    At(e.base, r, n)
  );
}
function fa(e, r, t, n) {
  for (let a = 0, s = n.length; a < s; a++) {
    let i = n[a];
    if (i.parse.sync && i.test(t))
      return (
        e.child == null && (e.child = new Vr(e)),
        le(r, i.tag, i.parse.sync(t, e.child, { id: r }))
      );
  }
}
function Sa(e, r, t, n) {
  for (let a = 0, s = n.length; a < s; a++) {
    let i = n[a];
    if (i.parse.stream && i.test(t))
      return (
        e.child == null && (e.child = new Mr(e)),
        le(r, i.tag, i.parse.stream(t, e.child, { id: r }))
      );
  }
}
function $t(e, r, t) {
  let n = e.base.plugins;
  if (n) return e.type === 1 ? fa(e, r, t, n) : Sa(e, r, t, n);
}
function pa(e, r, t, n) {
  switch (n) {
    case Object:
      return Br(e, r, t, false);
    case void 0:
      return Br(e, r, t, true);
    case Date:
      return xe(r, t);
    case RegExp:
      return Te(r, t);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return Ht(e, r, t);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return ea(e, r, t);
    case ArrayBuffer:
      return Qe(e.base, r, t);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return ra(e, r, t);
    case DataView:
      return na(e, r, t);
    case Map:
      return aa(e, r, t);
    case Set:
      return sa(e, r, t);
  }
  if (n === Promise || t instanceof Promise) return ca(e, r, t);
  let a = e.base.features;
  if (a & 16)
    switch (n) {
      case BigInt64Array:
      case BigUint64Array:
        return ta(e, r, t);
    }
  if (
    a & 1 &&
    typeof AggregateError != 'undefined' &&
    (n === AggregateError || t instanceof AggregateError)
  )
    return oa(e, r, t);
  if (t instanceof Error) return Ht(e, r, t);
  if (A in t || b in t) return Br(e, r, t, !!n);
  throw new E(t);
}
function da(e, r, t) {
  if (Array.isArray(t)) return Qo(e, r, t);
  if (Ke(t)) return ia(e, r, t);
  let n = t.constructor;
  if (n === j) return R(e, t.replacement);
  let a = $t(e, r, t);
  return a || pa(e, r, t, n);
}
function ma(e, r) {
  let t = U(e.base, r);
  if (t.type !== 0) return t.value;
  let n = $t(e, t.value, r);
  if (n) return n;
  throw new E(r);
}
function R(e, r) {
  switch (typeof r) {
    case 'boolean':
      return r ? Z : J;
    case 'undefined':
      return Ne;
    case 'string':
      return $(r);
    case 'number':
      return Ee(r);
    case 'bigint':
      return Pe(r);
    case 'object': {
      if (r) {
        let t = U(e.base, r);
        return t.type === 0 ? da(e, t.value, r) : t.value;
      }
      return Ce;
    }
    case 'symbol':
      return I(e.base, r);
    case 'function':
      return ma(e, r);
    default:
      throw new E(r);
  }
}
function oe(e, r) {
  e.state.initial ? e.state.buffer.push(r) : Yr(e, r, false);
}
function Lr(e, r) {
  if (e.state.onError) e.state.onError(r);
  else throw r instanceof h ? r : new h(r);
}
function qt(e) {
  e.state.onDone && e.state.onDone();
}
function Yr(e, r, t) {
  try {
    e.state.onParse(r, t);
  } catch (n) {
    Lr(e, n);
  }
}
function Wr(e) {
  e.state.pending++;
}
function me(e) {
  --e.state.pending <= 0 && qt(e);
}
function Y(e, r) {
  try {
    return R(e, r);
  } catch (t) {
    return (Lr(e, t), o);
  }
}
function Kr(e, r) {
  let t = Y(e, r);
  t &&
    (Yr(e, t, true),
    (e.state.initial = false),
    ga(e, e.state),
    e.state.pending <= 0 && sr(e));
}
function ga(e, r) {
  for (let t = 0, n = r.buffer.length; t < n; t++) Yr(e, r.buffer[t], false);
}
function sr(e) {
  e.state.alive && (qt(e), (e.state.alive = false));
}
async function ki(e, r = {}) {
  let t = v(r.plugins),
    n = ee$1(2, {
      plugins: t,
      disabledFeatures: r.disabledFeatures,
      refs: r.refs,
    });
  return await re$1(n, e);
}
function Xt(e, r) {
  let t = v(r.plugins),
    n = jr({
      plugins: t,
      refs: r.refs,
      disabledFeatures: r.disabledFeatures,
      onParse(a, s) {
        let i = nr({
            plugins: t,
            features: n.base.features,
            scopeId: r.scopeId,
            markedRefs: n.base.marked,
          }),
          l;
        try {
          l = ar(i, a);
        } catch (u2) {
          r.onError && r.onError(u2);
          return;
        }
        r.onSerialize(l, s);
      },
      onError: r.onError,
      onDone: r.onDone,
    });
  return (Kr(n, e), sr.bind(null, n));
}
function _i(e, r) {
  let t = v(r.plugins),
    n = jr({
      plugins: t,
      refs: r.refs,
      disabledFeatures: r.disabledFeatures,
      onParse: r.onParse,
      onError: r.onError,
      onDone: r.onDone,
    });
  return (Kr(n, e), sr.bind(null, n));
}
function Xi(e, r = {}) {
  let t = v(r.plugins),
    n = Ot({ plugins: t, markedRefs: e.m });
  return er(n, e.t);
}
const minifiedTsrBootStrapScript =
  'self.$_TSR={c(){document.querySelectorAll(".\\\\$tsr").forEach(e=>{e.remove()}),this.hydrated&&this.streamEnd&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]};\n';
const GLOBAL_TSR = '$_TSR';
var p = {},
  P = (e) =>
    new ReadableStream({
      start: (r) => {
        e.on({
          next: (a) => {
            try {
              r.enqueue(a);
            } catch (t) {}
          },
          throw: (a) => {
            r.error(a);
          },
          return: () => {
            try {
              r.close();
            } catch (a) {}
          },
        });
      },
    }),
  ee = _s({
    tag: 'seroval-plugins/web/ReadableStreamFactory',
    test(e) {
      return e === p;
    },
    parse: {
      sync() {},
      async async() {
        return await Promise.resolve(void 0);
      },
      stream() {},
    },
    serialize() {
      return P.toString();
    },
    deserialize() {
      return p;
    },
  });
function w(e) {
  let r = Q(),
    a = e.getReader();
  async function t() {
    try {
      let n = await a.read();
      n.done ? r.return(n.value) : (r.next(n.value), await t());
    } catch (n) {
      r.throw(n);
    }
  }
  return (t().catch(() => {}), r);
}
var re = _s({
    tag: 'seroval/plugins/web/ReadableStream',
    extends: [ee],
    test(e) {
      return typeof ReadableStream == 'undefined'
        ? false
        : e instanceof ReadableStream;
    },
    parse: {
      sync(e, r) {
        return { factory: r.parse(p), stream: r.parse(Q()) };
      },
      async async(e, r) {
        return { factory: await r.parse(p), stream: await r.parse(w(e)) };
      },
      stream(e, r) {
        return { factory: r.parse(p), stream: r.parse(w(e)) };
      },
    },
    serialize(e, r) {
      return '(' + r.serialize(e.factory) + ')(' + r.serialize(e.stream) + ')';
    },
    deserialize(e, r) {
      let a = r.deserialize(e.stream);
      return P(a);
    },
  }),
  u = re;
const ShallowErrorPlugin = /* @__PURE__ */ _s({
  tag: '$TSR/Error',
  test(value) {
    return value instanceof Error;
  },
  parse: {
    sync(value, ctx) {
      return {
        message: ctx.parse(value.message),
      };
    },
    async async(value, ctx) {
      return {
        message: await ctx.parse(value.message),
      };
    },
    stream(value, ctx) {
      return {
        message: ctx.parse(value.message),
      };
    },
  },
  serialize(node, ctx) {
    return 'new Error(' + ctx.serialize(node.message) + ')';
  },
  deserialize(node, ctx) {
    return new Error(ctx.deserialize(node.message));
  },
});
const defaultSerovalPlugins = [
  ShallowErrorPlugin,
  // ReadableStreamNode is not exported by seroval
  u,
];
function makeSsrSerovalPlugin(serializationAdapter, options) {
  return _s({
    tag: '$TSR/t/' + serializationAdapter.key,
    test: serializationAdapter.test,
    parse: {
      stream(value, ctx) {
        return ctx.parse(serializationAdapter.toSerializable(value));
      },
    },
    serialize(node, ctx) {
      options.didRun = true;
      return (
        GLOBAL_TSR +
        '.t.get("' +
        serializationAdapter.key +
        '")(' +
        ctx.serialize(node) +
        ')'
      );
    },
    // we never deserialize on the server during SSR
    deserialize: void 0,
  });
}
const TSR_SCRIPT_BARRIER_ID = '$tsr-stream-barrier';
const SCOPE_ID = 'tsr';
function dehydrateMatch(match) {
  const dehydratedMatch = {
    i: match.id,
    u: match.updatedAt,
    s: match.status,
  };
  const properties = [
    ['__beforeLoadContext', 'b'],
    ['loaderData', 'l'],
    ['error', 'e'],
    ['ssr', 'ssr'],
  ];
  for (const [key, shorthand] of properties) {
    if (match[key] !== void 0) {
      dehydratedMatch[shorthand] = match[key];
    }
  }
  return dehydratedMatch;
}
const INITIAL_SCRIPTS = [rn(SCOPE_ID), minifiedTsrBootStrapScript];
class ScriptBuffer {
  constructor(router) {
    this.router = router;
    this._queue = [...INITIAL_SCRIPTS];
    this._scriptBarrierLifted = false;
  }
  enqueue(script) {
    if (this._scriptBarrierLifted && this._queue.length === 0) {
      queueMicrotask(() => {
        this.injectBufferedScripts();
      });
    }
    this._queue.push(script);
  }
  liftBarrier() {
    if (this._scriptBarrierLifted) return;
    this._scriptBarrierLifted = true;
    if (this._queue.length > 0) {
      queueMicrotask(() => {
        this.injectBufferedScripts();
      });
    }
  }
  takeAll() {
    const bufferedScripts = this._queue;
    this._queue = [];
    if (bufferedScripts.length === 0) {
      return void 0;
    }
    bufferedScripts.push(`${GLOBAL_TSR}.c()`);
    const joinedScripts = bufferedScripts.join(';');
    return joinedScripts;
  }
  injectBufferedScripts() {
    const scriptsToInject = this.takeAll();
    if (scriptsToInject) {
      this.router.serverSsr.injectScript(() => scriptsToInject);
    }
  }
}
function attachRouterServerSsrUtils({ router, manifest: manifest2 }) {
  router.ssr = {
    manifest: manifest2,
  };
  let _dehydrated = false;
  const listeners = [];
  const scriptBuffer = new ScriptBuffer(router);
  router.serverSsr = {
    injectedHtml: [],
    injectHtml: (getHtml) => {
      const promise = Promise.resolve().then(getHtml);
      router.serverSsr.injectedHtml.push(promise);
      router.emit({
        type: 'onInjectedHtml',
        promise,
      });
      return promise.then(() => {});
    },
    injectScript: (getScript) => {
      return router.serverSsr.injectHtml(async () => {
        const script = await getScript();
        if (!script) {
          return '';
        }
        return `<script${router.options.ssr?.nonce ? `nonce='${router.options.ssr.nonce}' ` : ''} class='$tsr'>${script}<\/script>`;
      });
    },
    dehydrate: async () => {
      invariant(!_dehydrated, 'router is already dehydrated!');
      let matchesToDehydrate = router.state.matches;
      if (router.isShell()) {
        matchesToDehydrate = matchesToDehydrate.slice(0, 1);
      }
      const matches = matchesToDehydrate.map(dehydrateMatch);
      let manifestToDehydrate = void 0;
      if (manifest2) {
        const filteredRoutes = Object.fromEntries(
          router.state.matches.map((k2) => [
            k2.routeId,
            manifest2.routes[k2.routeId],
          ]),
        );
        manifestToDehydrate = {
          routes: filteredRoutes,
        };
      }
      const dehydratedRouter = {
        manifest: manifestToDehydrate,
        matches,
      };
      const lastMatchId = matchesToDehydrate[matchesToDehydrate.length - 1]?.id;
      if (lastMatchId) {
        dehydratedRouter.lastMatchId = lastMatchId;
      }
      const dehydratedData = await router.options.dehydrate?.();
      if (dehydratedData) {
        dehydratedRouter.dehydratedData = dehydratedData;
      }
      _dehydrated = true;
      const p2 = createControlledPromise();
      const trackPlugins = { didRun: false };
      const plugins =
        router.options.serializationAdapters?.map((t) =>
          makeSsrSerovalPlugin(t, trackPlugins),
        ) ?? [];
      Xt(dehydratedRouter, {
        refs: /* @__PURE__ */ new Map(),
        plugins: [...plugins, ...defaultSerovalPlugins],
        onSerialize: (data, initial) => {
          let serialized = initial ? GLOBAL_TSR + '.router=' + data : data;
          if (trackPlugins.didRun) {
            serialized = GLOBAL_TSR + '.p(()=>' + serialized + ')';
          }
          scriptBuffer.enqueue(serialized);
        },
        scopeId: SCOPE_ID,
        onDone: () => {
          scriptBuffer.enqueue(GLOBAL_TSR + '.streamEnd=true');
          p2.resolve('');
        },
        onError: (err) => p2.reject(err),
      });
      router.serverSsr.injectHtml(() => p2);
    },
    isDehydrated() {
      return _dehydrated;
    },
    onRenderFinished: (listener) => listeners.push(listener),
    setRenderFinished: () => {
      listeners.forEach((l) => l());
      scriptBuffer.liftBarrier();
    },
    takeBufferedScripts() {
      const scripts = scriptBuffer.takeAll();
      const serverBufferedScript = {
        tag: 'script',
        attrs: {
          nonce: router.options.ssr?.nonce,
          className: '$tsr',
          id: TSR_SCRIPT_BARRIER_ID,
        },
        children: scripts,
      };
      return serverBufferedScript;
    },
    liftScriptBarrier() {
      scriptBuffer.liftBarrier();
    },
  };
}
function getOrigin(request) {
  const originHeader = request.headers.get('Origin');
  if (originHeader) {
    try {
      new URL(originHeader);
      return originHeader;
    } catch {}
  }
  try {
    return new URL(request.url).origin;
  } catch {}
  return 'http://localhost';
}
const NullProtoObj = /* @__PURE__ */ (() => {
  const e = function () {};
  return (
    (e.prototype = /* @__PURE__ */ Object.create(null)),
    Object.freeze(e.prototype),
    e
  );
})();
function splitSetCookieString(cookiesString) {
  if (Array.isArray(cookiesString))
    return cookiesString.flatMap((c2) => splitSetCookieString(c2));
  if (typeof cookiesString !== 'string') return [];
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)))
      pos += 1;
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== '=' && ch !== ';' && ch !== ',';
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ',') {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) pos += 1;
        if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else pos = lastComma + 1;
      } else pos += 1;
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length)
      cookiesStrings.push(cookiesString.slice(start));
  }
  return cookiesStrings;
}
function lazyInherit(target, source, sourceKey) {
  for (const key of Object.getOwnPropertyNames(source)) {
    if (key === 'constructor') continue;
    const targetDesc = Object.getOwnPropertyDescriptor(target, key);
    const desc = Object.getOwnPropertyDescriptor(source, key);
    let modified = false;
    if (desc.get) {
      modified = true;
      desc.get =
        targetDesc?.get ||
        function () {
          return this[sourceKey][key];
        };
    }
    if (desc.set) {
      modified = true;
      desc.set =
        targetDesc?.set ||
        function (value) {
          this[sourceKey][key] = value;
        };
    }
    if (typeof desc.value === 'function') {
      modified = true;
      desc.value = function (...args) {
        return this[sourceKey][key](...args);
      };
    }
    if (modified) Object.defineProperty(target, key, desc);
  }
}
const FastURL = /* @__PURE__ */ (() => {
  const NativeURL = globalThis.URL;
  const FastURL$1 = class URL {
    #url;
    #href;
    #protocol;
    #host;
    #pathname;
    #search;
    #searchParams;
    #pos;
    constructor(url) {
      if (typeof url === 'string') this.#href = url;
      else {
        this.#protocol = url.protocol;
        this.#host = url.host;
        this.#pathname = url.pathname;
        this.#search = url.search;
      }
    }
    get _url() {
      if (this.#url) return this.#url;
      this.#url = new NativeURL(this.href);
      this.#href = void 0;
      this.#protocol = void 0;
      this.#host = void 0;
      this.#pathname = void 0;
      this.#search = void 0;
      this.#searchParams = void 0;
      this.#pos = void 0;
      return this.#url;
    }
    get href() {
      if (this.#url) return this.#url.href;
      if (!this.#href)
        this.#href = `${this.#protocol || 'http:'}//${this.#host || 'localhost'}${this.#pathname || '/'}${this.#search || ''}`;
      return this.#href;
    }
    #getPos() {
      if (!this.#pos) {
        const url = this.href;
        const protoIndex = url.indexOf('://');
        const pathnameIndex =
          protoIndex === -1 ? -1 : url.indexOf('/', protoIndex + 4);
        const qIndex =
          pathnameIndex === -1 ? -1 : url.indexOf('?', pathnameIndex);
        this.#pos = [protoIndex, pathnameIndex, qIndex];
      }
      return this.#pos;
    }
    get pathname() {
      if (this.#url) return this.#url.pathname;
      if (this.#pathname === void 0) {
        const [, pathnameIndex, queryIndex] = this.#getPos();
        if (pathnameIndex === -1) return this._url.pathname;
        this.#pathname = this.href.slice(
          pathnameIndex,
          queryIndex === -1 ? void 0 : queryIndex,
        );
      }
      return this.#pathname;
    }
    get search() {
      if (this.#url) return this.#url.search;
      if (this.#search === void 0) {
        const [, pathnameIndex, queryIndex] = this.#getPos();
        if (pathnameIndex === -1) return this._url.search;
        const url = this.href;
        this.#search =
          queryIndex === -1 || queryIndex === url.length - 1
            ? ''
            : url.slice(queryIndex);
      }
      return this.#search;
    }
    get searchParams() {
      if (this.#url) return this.#url.searchParams;
      if (!this.#searchParams)
        this.#searchParams = new URLSearchParams(this.search);
      return this.#searchParams;
    }
    get protocol() {
      if (this.#url) return this.#url.protocol;
      if (this.#protocol === void 0) {
        const [protocolIndex] = this.#getPos();
        if (protocolIndex === -1) return this._url.protocol;
        const url = this.href;
        this.#protocol = url.slice(0, protocolIndex + 1);
      }
      return this.#protocol;
    }
    toString() {
      return this.href;
    }
    toJSON() {
      return this.href;
    }
  };
  lazyInherit(FastURL$1.prototype, NativeURL.prototype, '_url');
  Object.setPrototypeOf(FastURL$1.prototype, NativeURL.prototype);
  Object.setPrototypeOf(FastURL$1, NativeURL);
  return FastURL$1;
})();
const NodeResponse = /* @__PURE__ */ (() => {
  const NativeResponse = globalThis.Response;
  const STATUS_CODES =
    globalThis.process?.getBuiltinModule?.('node:http')?.STATUS_CODES || {};
  class NodeResponse$1 {
    #body;
    #init;
    #headers;
    #response;
    constructor(body, init) {
      this.#body = body;
      this.#init = init;
    }
    get status() {
      return this.#response?.status || this.#init?.status || 200;
    }
    get statusText() {
      return (
        this.#response?.statusText ||
        this.#init?.statusText ||
        STATUS_CODES[this.status] ||
        ''
      );
    }
    get headers() {
      if (this.#response) return this.#response.headers;
      if (this.#headers) return this.#headers;
      const initHeaders = this.#init?.headers;
      return (this.#headers =
        initHeaders instanceof Headers
          ? initHeaders
          : new Headers(initHeaders));
    }
    get ok() {
      if (this.#response) return this.#response.ok;
      const status = this.status;
      return status >= 200 && status < 300;
    }
    get _response() {
      if (this.#response) return this.#response;
      this.#response = new NativeResponse(
        this.#body,
        this.#headers
          ? {
              ...this.#init,
              headers: this.#headers,
            }
          : this.#init,
      );
      this.#init = void 0;
      this.#headers = void 0;
      this.#body = void 0;
      return this.#response;
    }
    nodeResponse() {
      const status = this.status;
      const statusText = this.statusText;
      let body;
      let contentType;
      let contentLength;
      if (this.#response) body = this.#response.body;
      else if (this.#body)
        if (this.#body instanceof ReadableStream) body = this.#body;
        else if (typeof this.#body === 'string') {
          body = this.#body;
          contentType = 'text/plain; charset=UTF-8';
          contentLength = Buffer.byteLength(this.#body);
        } else if (this.#body instanceof ArrayBuffer) {
          body = Buffer.from(this.#body);
          contentLength = this.#body.byteLength;
        } else if (this.#body instanceof Uint8Array) {
          body = this.#body;
          contentLength = this.#body.byteLength;
        } else if (this.#body instanceof DataView) {
          body = Buffer.from(this.#body.buffer);
          contentLength = this.#body.byteLength;
        } else if (this.#body instanceof Blob) {
          body = this.#body.stream();
          contentType = this.#body.type;
          contentLength = this.#body.size;
        } else if (typeof this.#body.pipe === 'function') body = this.#body;
        else body = this._response.body;
      const rawNodeHeaders = [];
      const initHeaders = this.#init?.headers;
      const headerEntries =
        this.#response?.headers ||
        this.#headers ||
        (initHeaders
          ? Array.isArray(initHeaders)
            ? initHeaders
            : initHeaders?.entries
              ? initHeaders.entries()
              : Object.entries(initHeaders).map(([k2, v2]) => [
                  k2.toLowerCase(),
                  v2,
                ])
          : void 0);
      let hasContentTypeHeader;
      let hasContentLength;
      if (headerEntries)
        for (const [key, value] of headerEntries) {
          if (key === 'set-cookie') {
            for (const setCookie of splitSetCookieString(value))
              rawNodeHeaders.push(['set-cookie', setCookie]);
            continue;
          }
          rawNodeHeaders.push([key, value]);
          if (key === 'content-type') hasContentTypeHeader = true;
          else if (key === 'content-length') hasContentLength = true;
        }
      if (contentType && !hasContentTypeHeader)
        rawNodeHeaders.push(['content-type', contentType]);
      if (contentLength && !hasContentLength)
        rawNodeHeaders.push(['content-length', String(contentLength)]);
      this.#init = void 0;
      this.#headers = void 0;
      this.#response = void 0;
      this.#body = void 0;
      return {
        status,
        statusText,
        headers: rawNodeHeaders,
        body,
      };
    }
  }
  lazyInherit(NodeResponse$1.prototype, NativeResponse.prototype, '_response');
  Object.setPrototypeOf(NodeResponse$1, NativeResponse);
  Object.setPrototypeOf(NodeResponse$1.prototype, NativeResponse.prototype);
  return NodeResponse$1;
})();
var H3Event = class {
  /**
   * Access to the H3 application instance.
   */
  app;
  /**
   * Incoming HTTP request info.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Request)
   */
  req;
  /**
   * Access to the parsed request URL.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/URL)
   */
  url;
  /**
   * Event context.
   */
  context;
  /**
   * @internal
   */
  static __is_event__ = true;
  /**
   * @internal
   */
  _res;
  constructor(req, context, app) {
    this.context = context || req.context || new NullProtoObj();
    this.req = req;
    this.app = app;
    const _url = req._url;
    this.url = _url && _url instanceof URL ? _url : new FastURL(req.url);
  }
  /**
   * Prepared HTTP response.
   */
  get res() {
    if (!this._res) this._res = new H3EventResponse();
    return this._res;
  }
  /**
   * Access to runtime specific additional context.
   *
   */
  get runtime() {
    return this.req.runtime;
  }
  /**
   * Tell the runtime about an ongoing operation that shouldn't close until the promise resolves.
   */
  waitUntil(promise) {
    this.req.waitUntil?.(promise);
  }
  toString() {
    return `[${this.req.method}] ${this.req.url}`;
  }
  toJSON() {
    return this.toString();
  }
  /**
   * Access to the raw Node.js req/res objects.
   *
   * @deprecated Use `event.runtime.{node|deno|bun|...}.` instead.
   */
  get node() {
    return this.req.runtime?.node;
  }
  /**
   * Access to the incoming request headers.
   *
   * @deprecated Use `event.req.headers` instead.
   *
   */
  get headers() {
    return this.req.headers;
  }
  /**
   * Access to the incoming request url (pathname+search).
   *
   * @deprecated Use `event.url.pathname + event.url.search` instead.
   *
   * Example: `/api/hello?name=world`
   * */
  get path() {
    return this.url.pathname + this.url.search;
  }
  /**
   * Access to the incoming request method.
   *
   * @deprecated Use `event.req.method` instead.
   */
  get method() {
    return this.req.method;
  }
};
var H3EventResponse = class {
  status;
  statusText;
  _headers;
  get headers() {
    if (!this._headers) this._headers = new Headers();
    return this._headers;
  }
};
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = '') {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, '');
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) return defaultStatusCode;
  if (typeof statusCode === 'string') statusCode = +statusCode;
  if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
  return statusCode;
}
var HTTPError = class HTTPError2 extends Error {
  get name() {
    return 'HTTPError';
  }
  /**
   * HTTP status code in range [200...599]
   */
  status;
  /**
   * HTTP status text
   *
   * **NOTE:** This should be short (max 512 to 1024 characters).
   * Allowed characters are tabs, spaces, visible ASCII characters, and extended characters (byte value 128–255).
   *
   * **TIP:** Use `message` for longer error descriptions in JSON body.
   */
  statusText;
  /**
   * Additional HTTP headers to be sent in error response.
   */
  headers;
  /**
   * Original error object that caused this error.
   */
  cause;
  /**
   * Additional data attached in the error JSON body under `data` key.
   */
  data;
  /**
   * Additional top level JSON body properties to attach in the error JSON body.
   */
  body;
  /**
   * Flag to indicate that the error was not handled by the application.
   *
   * Unhandled error stack trace, data and message are hidden in non debug mode for security reasons.
   */
  unhandled;
  /**
   * Check if the input is an instance of HTTPError using its constructor name.
   *
   * It is safer than using `instanceof` because it works across different contexts (e.g., if the error was thrown in a different module).
   */
  static isError(input) {
    return input instanceof Error && input?.name === 'HTTPError';
  }
  /**
   * Create a new HTTPError with the given status code and optional status text and details.
   *
   * @example
   *
   * HTTPError.status(404)
   * HTTPError.status(418, "I'm a teapot")
   * HTTPError.status(403, "Forbidden", { message: "Not authenticated" })
   */
  static status(status, statusText, details) {
    return new HTTPError2({
      ...details,
      statusText,
      status,
    });
  }
  constructor(arg1, arg2) {
    let messageInput;
    let details;
    if (typeof arg1 === 'string') {
      messageInput = arg1;
      details = arg2;
    } else details = arg1;
    const status = sanitizeStatusCode(
      details?.status ||
        details?.cause?.status ||
        details?.status ||
        details?.statusCode,
      500,
    );
    const statusText = sanitizeStatusMessage(
      details?.statusText ||
        details?.cause?.statusText ||
        details?.statusText ||
        details?.statusMessage,
    );
    const message =
      messageInput ||
      details?.message ||
      details?.cause?.message ||
      details?.statusText ||
      details?.statusMessage ||
      ['HTTPError', status, statusText].filter(Boolean).join(' ');
    super(message, { cause: details });
    this.cause = details;
    Error.captureStackTrace?.(this, this.constructor);
    this.status = status;
    this.statusText = statusText || void 0;
    const rawHeaders = details?.headers || details?.cause?.headers;
    this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
    this.unhandled = details?.unhandled ?? details?.cause?.unhandled ?? void 0;
    this.data = details?.data;
    this.body = details?.body;
  }
  /**
   * @deprecated Use `status`
   */
  get statusCode() {
    return this.status;
  }
  /**
   * @deprecated Use `statusText`
   */
  get statusMessage() {
    return this.statusText;
  }
  toJSON() {
    const unhandled = this.unhandled;
    return {
      status: this.status,
      statusText: this.statusText,
      unhandled,
      message: unhandled ? 'HTTPError' : this.message,
      data: unhandled ? void 0 : this.data,
      ...(unhandled ? void 0 : this.body),
    };
  }
};
function isJSONSerializable(value, _type) {
  if (value === null || value === void 0) return true;
  if (_type !== 'object')
    return _type === 'boolean' || _type === 'number' || _type === 'string';
  if (typeof value.toJSON === 'function') return true;
  if (Array.isArray(value)) return true;
  if (typeof value.pipe === 'function' || typeof value.pipeTo === 'function')
    return false;
  if (value instanceof NullProtoObj) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
const kNotFound = /* @__PURE__ */ Symbol.for('h3.notFound');
const kHandled = /* @__PURE__ */ Symbol.for('h3.handled');
function toResponse(val, event, config = {}) {
  if (typeof val?.then === 'function')
    return (val.catch?.((error) => error) || Promise.resolve(val)).then(
      (resolvedVal) => toResponse(resolvedVal, event, config),
    );
  const response = prepareResponse(val, event, config);
  if (typeof response?.then === 'function')
    return toResponse(response, event, config);
  const { onResponse: onResponse$1 } = config;
  return onResponse$1
    ? Promise.resolve(onResponse$1(response, event)).then(() => response)
    : response;
}
function prepareResponse(val, event, config, nested) {
  if (val === kHandled) return new NodeResponse(null);
  if (val === kNotFound)
    val = new HTTPError({
      status: 404,
      message: `Cannot find any route matching [${event.req.method}] ${event.url}`,
    });
  if (val && val instanceof Error) {
    const isHTTPError = HTTPError.isError(val);
    const error = isHTTPError ? val : new HTTPError(val);
    if (!isHTTPError) {
      error.unhandled = true;
      if (val?.stack) error.stack = val.stack;
    }
    if (error.unhandled && !config.silent) console.error(error);
    const { onError: onError$1 } = config;
    return onError$1 && !nested
      ? Promise.resolve(onError$1(error, event))
          .catch((error$1) => error$1)
          .then((newVal) => prepareResponse(newVal ?? val, event, config, true))
      : errorResponse(error, config.debug);
  }
  const eventHeaders = event.res._headers;
  if (!(val instanceof Response)) {
    const res = prepareResponseBody(val, event, config);
    const status = event.res.status;
    return new NodeResponse(
      nullBody(event.req.method, status) ? null : res.body,
      {
        status,
        statusText: event.res.statusText,
        headers:
          res.headers && eventHeaders
            ? mergeHeaders$1(res.headers, eventHeaders)
            : res.headers || eventHeaders,
      },
    );
  }
  if (!eventHeaders) return val;
  return new NodeResponse(
    nullBody(event.req.method, val.status) ? null : val.body,
    {
      status: val.status,
      statusText: val.statusText,
      headers: mergeHeaders$1(eventHeaders, val.headers),
    },
  );
}
function mergeHeaders$1(base, merge) {
  const mergedHeaders = new Headers(base);
  for (const [name, value] of merge)
    if (name === 'set-cookie') mergedHeaders.append(name, value);
    else mergedHeaders.set(name, value);
  return mergedHeaders;
}
const emptyHeaders = /* @__PURE__ */ new Headers({ 'content-length': '0' });
const jsonHeaders = /* @__PURE__ */ new Headers({
  'content-type': 'application/json;charset=UTF-8',
});
function prepareResponseBody(val, event, config) {
  if (val === null || val === void 0)
    return {
      body: '',
      headers: emptyHeaders,
    };
  const valType = typeof val;
  if (valType === 'string') return { body: val };
  if (val instanceof Uint8Array) {
    event.res.headers.set('content-length', val.byteLength.toString());
    return { body: val };
  }
  if (isJSONSerializable(val, valType))
    return {
      body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
      headers: jsonHeaders,
    };
  if (valType === 'bigint')
    return {
      body: val.toString(),
      headers: jsonHeaders,
    };
  if (val instanceof Blob) {
    const headers = {
      'content-type': val.type,
      'content-length': val.size.toString(),
    };
    let filename = val.name;
    if (filename) {
      filename = encodeURIComponent(filename);
      headers['content-disposition'] =
        `filename="${filename}"; filename*=UTF-8''${filename}`;
    }
    return {
      body: val.stream(),
      headers,
    };
  }
  if (valType === 'symbol') return { body: val.toString() };
  if (valType === 'function') return { body: `${val.name}()` };
  return { body: val };
}
function nullBody(method, status) {
  return (
    method === 'HEAD' ||
    status === 100 ||
    status === 101 ||
    status === 102 ||
    status === 204 ||
    status === 205 ||
    status === 304
  );
}
function errorResponse(error, debug) {
  return new NodeResponse(
    JSON.stringify(
      {
        ...error.toJSON(),
        stack:
          debug && error.stack
            ? error.stack.split('\n').map((l) => l.trim())
            : void 0,
      },
      void 0,
      debug ? 2 : void 0,
    ),
    {
      status: error.status,
      statusText: error.statusText,
      headers: error.headers
        ? mergeHeaders$1(jsonHeaders, error.headers)
        : jsonHeaders,
    },
  );
}
const eventStorage = new AsyncLocalStorage();
function requestHandler(handler) {
  return (request, requestOpts) => {
    const h3Event = new H3Event(request);
    const response = eventStorage.run({ h3Event }, () =>
      handler(request, requestOpts),
    );
    return toResponse(response, h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) {
    throw new Error(
      `No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`,
    );
  }
  return event.h3Event;
}
function getResponse() {
  const event = getH3Event();
  return event._res;
}
async function getStartManifest() {
  const { tsrStartManifest } = await import(
    './assets/_tanstack-start-manifest_v-DQ9gNh77.js'
  );
  const startManifest = tsrStartManifest();
  const rootRoute = (startManifest.routes[rootRouteId] =
    startManifest.routes[rootRouteId] || {});
  rootRoute.assets = rootRoute.assets || [];
  let script = `import('${startManifest.clientEntry}')`;
  rootRoute.assets.push({
    tag: 'script',
    attrs: {
      type: 'module',
      async: true,
    },
    children: script,
  });
  const manifest2 = {
    routes: Object.fromEntries(
      Object.entries(startManifest.routes).map(([k2, v2]) => {
        const result = {};
        let hasData = false;
        if (v2.preloads && v2.preloads.length > 0) {
          result['preloads'] = v2.preloads;
          hasData = true;
        }
        if (v2.assets && v2.assets.length > 0) {
          result['assets'] = v2.assets;
          hasData = true;
        }
        if (!hasData) {
          return [];
        }
        return [k2, result];
      }),
    ),
  };
  return manifest2;
}
const manifest = {};
async function getServerFnById(id) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) {
    throw new Error('Server function info not found for ' + id);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info('serverFnInfo', serverFnInfo);
    throw new Error('Server function module not resolved for ' + id);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info('serverFnInfo', serverFnInfo);
    console.info('fnModule', fnModule);
    throw new Error(
      `Server function module export not resolved for serverFn ID: ${id}`,
    );
  }
  return action;
}
let regex = void 0;
const handleServerAction = async ({ request, context }) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abort = () => controller.abort();
  request.signal.addEventListener('abort', abort);
  if (regex === void 0) {
    regex = new RegExp(`${'/_serverFn/'}([^/?#]+)`);
  }
  const method = request.method;
  const url = new URL(request.url, 'http://localhost:3000');
  const match = url.pathname.match(regex);
  const serverFnId = match ? match[1] : null;
  const search = Object.fromEntries(url.searchParams.entries());
  const isCreateServerFn = 'createServerFn' in search;
  if (typeof serverFnId !== 'string') {
    throw new Error(
      'Invalid server action param for serverFnId: ' + serverFnId,
    );
  }
  const action = await getServerFnById(serverFnId);
  const formDataContentTypes = [
    'multipart/form-data',
    'application/x-www-form-urlencoded',
  ];
  const contentType = request.headers.get('Content-Type');
  const serovalPlugins = getDefaultSerovalPlugins();
  function parsePayload(payload) {
    const parsedPayload = Xi(payload, { plugins: serovalPlugins });
    return parsedPayload;
  }
  const response = await (async () => {
    try {
      let result = await (async () => {
        if (
          formDataContentTypes.some(
            (type) => contentType && contentType.includes(type),
          )
        ) {
          invariant(
            method.toLowerCase() !== 'get',
            'GET requests with FormData payloads are not supported',
          );
          const formData = await request.formData();
          const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
          formData.delete(TSS_FORMDATA_CONTEXT);
          const params = {
            context,
            data: formData,
          };
          if (typeof serializedContext === 'string') {
            try {
              const parsedContext = JSON.parse(serializedContext);
              const deserializedContext = Xi(parsedContext, {
                plugins: serovalPlugins,
              });
              if (
                typeof deserializedContext === 'object' &&
                deserializedContext
              ) {
                params.context = { ...context, ...deserializedContext };
              }
            } catch {}
          }
          return await action(params, signal);
        }
        if (method.toLowerCase() === 'get') {
          invariant(
            isCreateServerFn,
            'expected GET request to originate from createServerFn',
          );
          let payload = search.payload;
          payload = payload ? parsePayload(JSON.parse(payload)) : {};
          payload.context = { ...context, ...payload.context };
          return await action(payload, signal);
        }
        if (method.toLowerCase() !== 'post') {
          throw new Error('expected POST method');
        }
        let jsonPayload;
        if (contentType?.includes('application/json')) {
          jsonPayload = await request.json();
        }
        if (isCreateServerFn) {
          const payload = jsonPayload ? parsePayload(jsonPayload) : {};
          payload.context = { ...payload.context, ...context };
          return await action(payload, signal);
        }
        return await action(...jsonPayload);
      })();
      if (result.result instanceof Response) {
        result.result.headers.set(X_TSS_RAW_RESPONSE, 'true');
        return result.result;
      }
      if (!isCreateServerFn) {
        result = result.result;
        if (result instanceof Response) {
          return result;
        }
      }
      if (isNotFound(result)) {
        return isNotFoundResponse(result);
      }
      const response2 = getResponse();
      let nonStreamingBody = void 0;
      if (result !== void 0) {
        let done = false;
        const callbacks = {
          onParse: (value) => {
            nonStreamingBody = value;
          },
          onDone: () => {
            done = true;
          },
          onError: (error) => {
            throw error;
          },
        };
        _i(result, {
          refs: /* @__PURE__ */ new Map(),
          plugins: serovalPlugins,
          onParse(value) {
            callbacks.onParse(value);
          },
          onDone() {
            callbacks.onDone();
          },
          onError: (error) => {
            callbacks.onError(error);
          },
        });
        if (done) {
          return new Response(
            nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0,
            {
              status: response2?.status,
              statusText: response2?.statusText,
              headers: {
                'Content-Type': 'application/json',
                [X_TSS_SERIALIZED]: 'true',
              },
            },
          );
        }
        const stream = new ReadableStream({
          start(controller2) {
            callbacks.onParse = (value) =>
              controller2.enqueue(JSON.stringify(value) + '\n');
            callbacks.onDone = () => {
              try {
                controller2.close();
              } catch (error) {
                controller2.error(error);
              }
            };
            callbacks.onError = (error) => controller2.error(error);
            if (nonStreamingBody !== void 0) {
              callbacks.onParse(nonStreamingBody);
            }
          },
        });
        return new Response(stream, {
          status: response2?.status,
          statusText: response2?.statusText,
          headers: {
            'Content-Type': 'application/x-ndjson',
            [X_TSS_SERIALIZED]: 'true',
          },
        });
      }
      return new Response(void 0, {
        status: response2?.status,
        statusText: response2?.statusText,
      });
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      if (isNotFound(error)) {
        return isNotFoundResponse(error);
      }
      console.info();
      console.info('Server Fn Error!');
      console.info();
      console.error(error);
      console.info();
      const serializedError = JSON.stringify(
        await Promise.resolve(
          ki(error, {
            refs: /* @__PURE__ */ new Map(),
            plugins: serovalPlugins,
          }),
        ),
      );
      const response2 = getResponse();
      return new Response(serializedError, {
        status: response2?.status ?? 500,
        statusText: response2?.statusText,
        headers: {
          'Content-Type': 'application/json',
          [X_TSS_SERIALIZED]: 'true',
        },
      });
    }
  })();
  request.signal.removeEventListener('abort', abort);
  return response;
};
function isNotFoundResponse(error) {
  const { headers, ...rest } = error;
  return new Response(JSON.stringify(rest), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
  });
}
const HEADERS = {
  TSS_SHELL: 'X-TSS_SHELL',
};
const createServerRpc = (functionId, splitImportFn) => {
  return Object.assign(splitImportFn, {
    functionId,
    [TSS_SERVER_FUNCTION]: true,
  });
};
const ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: '$TSS/serverfn',
  test: (v2) => {
    if (typeof v2 !== 'function') return false;
    if (!(TSS_SERVER_FUNCTION in v2)) return false;
    return !!v2[TSS_SERVER_FUNCTION];
  },
  toSerializable: ({ functionId }) => ({ functionId }),
  fromSerializable: ({ functionId }) => {
    const fn2 = async (opts, signal) => {
      const serverFn = await getServerFnById(functionId);
      const result = await serverFn(opts ?? {}, signal);
      return result.result;
    };
    return createServerRpc(functionId, fn2);
  },
});
function getStartResponseHeaders(opts) {
  const headers = mergeHeaders(
    {
      'Content-Type': 'text/html; charset=utf-8',
    },
    ...opts.router.state.matches.map((match) => {
      return match.headers;
    }),
  );
  return headers;
}
function createStartHandler(cb) {
  const ROUTER_BASEPATH = '/';
  let startRoutesManifest = null;
  let startEntry = null;
  let routerEntry = null;
  const getEntries = async () => {
    if (routerEntry === null) {
      routerEntry = await import('./assets/router-1d_kQrZ6.js').then(
        (n) => n.r,
      );
    }
    if (startEntry === null) {
      startEntry = await import('./assets/start-HYkvq4Ni.js');
    }
    return {
      startEntry,
      routerEntry,
    };
  };
  const startRequestResolver = async (request, requestOpts) => {
    let router = null;
    try {
      const origin = getOrigin(request);
      const url = new URL(request.url);
      const href = url.href.replace(url.origin, '');
      const startOptions =
        (await (await getEntries()).startEntry.startInstance?.getOptions()) ||
        {};
      const serializationAdapters = [
        ...(startOptions.serializationAdapters || []),
        ServerFunctionSerializationAdapter,
      ];
      const requestStartOptions = {
        ...startOptions,
        serializationAdapters,
      };
      const getRouter = async () => {
        if (router) return router;
        router = await (await getEntries()).routerEntry.getRouter();
        const isPrerendering = process.env.TSS_PRERENDERING === 'true';
        let isShell = process.env.TSS_SHELL === 'true';
        if (isPrerendering && !isShell) {
          isShell = request.headers.get(HEADERS.TSS_SHELL) === 'true';
        }
        const history = createMemoryHistory({
          initialEntries: [href],
        });
        router.update({
          history,
          isShell,
          isPrerendering,
          origin: router.options.origin ?? origin,
          ...{
            defaultSsr: requestStartOptions.defaultSsr,
            serializationAdapters: [
              ...requestStartOptions.serializationAdapters,
              ...(router.options.serializationAdapters || []),
            ],
          },
          basepath: ROUTER_BASEPATH,
        });
        return router;
      };
      const requestHandlerMiddleware = handlerToMiddleware(
        async ({ context }) => {
          const response2 = await runWithStartContext(
            {
              getRouter,
              startOptions: requestStartOptions,
              contextAfterGlobalMiddlewares: context,
              request,
            },
            async () => {
              try {
                if (href.startsWith('/_serverFn/')) {
                  return await handleServerAction({
                    request,
                    context: requestOpts?.context,
                  });
                }
                const executeRouter = async ({ serverContext }) => {
                  const requestAcceptHeader =
                    request.headers.get('Accept') || '*/*';
                  const splitRequestAcceptHeader =
                    requestAcceptHeader.split(',');
                  const supportedMimeTypes = ['*/*', 'text/html'];
                  const isRouterAcceptSupported = supportedMimeTypes.some(
                    (mimeType) =>
                      splitRequestAcceptHeader.some((acceptedMimeType) =>
                        acceptedMimeType.trim().startsWith(mimeType),
                      ),
                  );
                  if (!isRouterAcceptSupported) {
                    return json(
                      {
                        error: 'Only HTML requests are supported here',
                      },
                      {
                        status: 500,
                      },
                    );
                  }
                  if (startRoutesManifest === null) {
                    startRoutesManifest = await getStartManifest();
                  }
                  const router2 = await getRouter();
                  attachRouterServerSsrUtils({
                    router: router2,
                    manifest: startRoutesManifest,
                  });
                  router2.update({ additionalContext: { serverContext } });
                  await router2.load();
                  if (router2.state.redirect) {
                    return router2.state.redirect;
                  }
                  await router2.serverSsr.dehydrate();
                  const responseHeaders = getStartResponseHeaders({
                    router: router2,
                  });
                  const response4 = await cb({
                    request,
                    router: router2,
                    responseHeaders,
                  });
                  return response4;
                };
                const response3 = await handleServerRoutes({
                  getRouter,
                  request,
                  executeRouter,
                  context,
                });
                return response3;
              } catch (err) {
                if (err instanceof Response) {
                  return err;
                }
                throw err;
              }
            },
          );
          return response2;
        },
      );
      const flattenedMiddlewares = startOptions.requestMiddleware
        ? flattenMiddlewares(startOptions.requestMiddleware)
        : [];
      const middlewares = flattenedMiddlewares.map((d) => d.options.server);
      const ctx = await executeMiddleware(
        [...middlewares, requestHandlerMiddleware],
        {
          request,
          context: requestOpts?.context || {},
        },
      );
      const response = ctx.response;
      if (isRedirect(response)) {
        if (isResolvedRedirect(response)) {
          if (request.headers.get('x-tsr-redirect') === 'manual') {
            return json(
              {
                ...response.options,
                isSerializedRedirect: true,
              },
              {
                headers: response.headers,
              },
            );
          }
          return response;
        }
        if (
          response.options.to &&
          typeof response.options.to === 'string' &&
          !response.options.to.startsWith('/')
        ) {
          throw new Error(
            `Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(response.options)}`,
          );
        }
        if (
          ['params', 'search', 'hash'].some(
            (d) => typeof response.options[d] === 'function',
          )
        ) {
          throw new Error(
            `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
              response.options,
            )
              .filter((d) => typeof response.options[d] === 'function')
              .map((d) => `"${d}"`)
              .join(', ')}`,
          );
        }
        const router2 = await getRouter();
        const redirect = router2.resolveRedirect(response);
        if (request.headers.get('x-tsr-redirect') === 'manual') {
          return json(
            {
              ...response.options,
              isSerializedRedirect: true,
            },
            {
              headers: response.headers,
            },
          );
        }
        return redirect;
      }
      return response;
    } finally {
      if (router) {
        router = null;
      }
    }
  };
  return requestHandler(startRequestResolver);
}
async function handleServerRoutes({
  getRouter,
  request,
  executeRouter,
  context,
}) {
  const router = await getRouter();
  let url = new URL(request.url);
  url = executeRewriteInput(router.rewrite, url);
  const pathname = url.pathname;
  const { matchedRoutes, foundRoute, routeParams } =
    router.getMatchedRoutes(pathname);
  const middlewares = flattenMiddlewares(
    matchedRoutes.flatMap((r) => r.options.server?.middleware).filter(Boolean),
  ).map((d) => d.options.server);
  const server2 = foundRoute?.options.server;
  if (server2) {
    if (server2.handlers) {
      const handlers =
        typeof server2.handlers === 'function'
          ? server2.handlers({
              createHandlers: (d) => d,
            })
          : server2.handlers;
      const requestMethod = request.method.toUpperCase();
      const handler = handlers[requestMethod] ?? handlers['ANY'];
      if (handler) {
        const mayDefer = !!foundRoute.options.component;
        if (typeof handler === 'function') {
          middlewares.push(handlerToMiddleware(handler, mayDefer));
        } else {
          const { middleware } = handler;
          if (middleware && middleware.length) {
            middlewares.push(
              ...flattenMiddlewares(middleware).map((d) => d.options.server),
            );
          }
          if (handler.handler) {
            middlewares.push(handlerToMiddleware(handler.handler, mayDefer));
          }
        }
      }
    }
  }
  middlewares.push(
    handlerToMiddleware((ctx2) =>
      executeRouter({ serverContext: ctx2.context }),
    ),
  );
  const ctx = await executeMiddleware(middlewares, {
    request,
    context,
    params: routeParams,
    pathname,
  });
  const response = ctx.response;
  return response;
}
function throwRouteHandlerError() {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.`,
    );
  }
  throw new Error('Internal Server Error');
}
function throwIfMayNotDefer() {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `You cannot defer to the app router if there is no component defined on this route.`,
    );
  }
  throw new Error('Internal Server Error');
}
function handlerToMiddleware(handler, mayDefer = false) {
  if (mayDefer) {
    return handler;
  }
  return async ({ next: _next, ...rest }) => {
    const response = await handler({ ...rest, next: throwIfMayNotDefer });
    if (!response) {
      throwRouteHandlerError();
    }
    return response;
  };
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (ctx2) => {
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx2;
    let result;
    try {
      result = await middleware({
        ...ctx2,
        // Allow the middleware to call the next middleware in the chain
        next: async (nextCtx) => {
          const nextResult = await next({
            ...ctx2,
            ...nextCtx,
            context: {
              ...ctx2.context,
              ...(nextCtx?.context || {}),
            },
          });
          return Object.assign(ctx2, handleCtxResult(nextResult));
        },
        // Allow the middleware result to extend the return context
      });
    } catch (err) {
      if (isSpecialResponse(err)) {
        result = {
          response: err,
        };
      } else {
        throw err;
      }
    }
    return Object.assign(ctx2, handleCtxResult(result));
  };
  return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) {
    return {
      response: result,
    };
  }
  return result;
}
function isSpecialResponse(err) {
  return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
  return response instanceof Response;
}
const fetch$1 = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
  return {
    async fetch(...args) {
      return await entry.fetch(...args);
    },
  };
}
const server = createServerEntry({ fetch: fetch$1 });
export { createServerEntry, server as default };
