const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/WaitlistForm-fmR3sx0P.js',
      'assets/main-rZFLPwin.js',
      'assets/input-DLULWS28.js',
      'assets/select-Bm5-cKGb.js',
      'assets/index-yOxD40BC.js',
    ]),
) => i.map((i) => d[i]);
import {
  c as Zr,
  j as R,
  X as Lr,
  R as S,
  r as pe,
  a as rt,
  S as Mr,
  _ as $r,
} from './main-rZFLPwin.js';
import './input-DLULWS28.js';
import { L as Pr } from './select-Bm5-cKGb.js';
const Ur = Zr('Github', [
    [
      'path',
      {
        d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
        key: 'tonef',
      },
    ],
    ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: '9comsn' }],
  ]),
  Br = () =>
    R.jsxs('div', {
      children: [
        R.jsxs('header', {
          className:
            'bg-white text-black p-6 flex justify-between items-center shadow-lg',
          style: {
            backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          },
          children: [
            R.jsx('div', {
              className: 'flex items-center',
              children: R.jsx('img', {
                src: '/logo.svg',
                alt: 'Crate Logo',
                width: 64,
                height: 64,
                className: 'w-16 h-16',
              }),
            }),
            R.jsxs('div', {
              className: 'flex items-center space-x-4',
              children: [
                R.jsx('a', {
                  href: 'https://github.com/orgs/Crate-AI/repositories',
                  className:
                    'transition-transform duration-300 hover:scale-110',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: R.jsx('div', {
                    className:
                      'p-2 rounded-md border-2 border-black shadow-light dark:shadow-dark',
                    children: R.jsx(Ur, { className: 'w-8 h-8' }),
                  }),
                }),
                R.jsx('a', {
                  href: 'https://x.com/zpaprikaf',
                  className:
                    'transition-transform duration-300 hover:scale-110',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  children: R.jsx('div', {
                    className:
                      'p-2 rounded-md border-2 border-black shadow-light dark:shadow-dark',
                    children: R.jsx(Lr, { className: 'w-8 h-8' }),
                  }),
                }),
              ],
            }),
          ],
        }),
        R.jsx(Hs, {}),
      ],
    });
var We = (r) => r.type === 'checkbox',
  Ve = (r) => r instanceof Date,
  K = (r) => r == null;
const fr = (r) => typeof r == 'object';
var q = (r) => !K(r) && !Array.isArray(r) && fr(r) && !Ve(r),
  hr = (r) =>
    q(r) && r.target ? (We(r.target) ? r.target.checked : r.target.value) : r,
  zr = (r) => r.substring(0, r.search(/\.\d+(\.|$)/)) || r,
  mr = (r, e) => r.has(zr(e)),
  Wr = (r) => {
    const e = r.constructor && r.constructor.prototype;
    return q(e) && e.hasOwnProperty('isPrototypeOf');
  },
  bt =
    typeof window < 'u' &&
    typeof window.HTMLElement < 'u' &&
    typeof document < 'u';
function H(r) {
  let e;
  const t = Array.isArray(r),
    s = typeof FileList < 'u' ? r instanceof FileList : !1;
  if (r instanceof Date) e = new Date(r);
  else if (!(bt && (r instanceof Blob || s)) && (t || q(r)))
    if (((e = t ? [] : Object.create(Object.getPrototypeOf(r))), !t && !Wr(r)))
      e = r;
    else for (const a in r) r.hasOwnProperty(a) && (e[a] = H(r[a]));
  else return r;
  return e;
}
var st = (r) => /^\w*$/.test(r),
  U = (r) => r === void 0,
  kt = (r) => (Array.isArray(r) ? r.filter(Boolean) : []),
  wt = (r) => kt(r.replace(/["|']|\]/g, '').split(/\.|\[/)),
  p = (r, e, t) => {
    if (!e || !q(r)) return t;
    const s = (st(e) ? [e] : wt(e)).reduce((a, n) => (K(a) ? a : a[n]), r);
    return U(s) || s === r ? (U(r[e]) ? t : r[e]) : s;
  },
  te = (r) => typeof r == 'boolean',
  $ = (r, e, t) => {
    let s = -1;
    const a = st(e) ? [e] : wt(e),
      n = a.length,
      o = n - 1;
    for (; ++s < n; ) {
      const d = a[s];
      let h = t;
      if (s !== o) {
        const m = r[d];
        h = q(m) || Array.isArray(m) ? m : isNaN(+a[s + 1]) ? {} : [];
      }
      if (d === '__proto__' || d === 'constructor' || d === 'prototype') return;
      ((r[d] = h), (r = r[d]));
    }
  };
const Je = { BLUR: 'blur', FOCUS_OUT: 'focusout', CHANGE: 'change' },
  oe = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
  },
  ge = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
  },
  Ct = S.createContext(null);
Ct.displayName = 'HookFormContext';
const at = () => S.useContext(Ct),
  qr = (r) => {
    const { children: e, ...t } = r;
    return S.createElement(Ct.Provider, { value: t }, e);
  };
var yr = (r, e, t, s = !0) => {
  const a = { defaultValues: e._defaultValues };
  for (const n in r)
    Object.defineProperty(a, n, {
      get: () => {
        const o = n;
        return (
          e._proxyFormState[o] !== oe.all &&
            (e._proxyFormState[o] = !s || oe.all),
          t && (t[o] = !0),
          r[o]
        );
      },
    });
  return a;
};
const At = typeof window < 'u' ? S.useLayoutEffect : S.useEffect;
function Hr(r) {
  const e = at(),
    { control: t = e.control, disabled: s, name: a, exact: n } = r || {},
    [o, d] = S.useState(t._formState),
    h = S.useRef({
      isDirty: !1,
      isLoading: !1,
      dirtyFields: !1,
      touchedFields: !1,
      validatingFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    });
  return (
    At(
      () =>
        t._subscribe({
          name: a,
          formState: h.current,
          exact: n,
          callback: (m) => {
            !s && d({ ...t._formState, ...m });
          },
        }),
      [a, s, n],
    ),
    S.useEffect(() => {
      h.current.isValid && t._setValid(!0);
    }, [t]),
    S.useMemo(() => yr(o, t, h.current, !1), [o, t])
  );
}
var re = (r) => typeof r == 'string',
  ht = (r, e, t, s, a) =>
    re(r)
      ? (s && e.watch.add(r), p(t, r, a))
      : Array.isArray(r)
        ? r.map((n) => (s && e.watch.add(n), p(t, n)))
        : (s && (e.watchAll = !0), t),
  mt = (r) => K(r) || !fr(r);
function de(r, e, t = new WeakSet()) {
  if (mt(r) || mt(e)) return Object.is(r, e);
  if (Ve(r) && Ve(e)) return r.getTime() === e.getTime();
  const s = Object.keys(r),
    a = Object.keys(e);
  if (s.length !== a.length) return !1;
  if (t.has(r) || t.has(e)) return !0;
  (t.add(r), t.add(e));
  for (const n of s) {
    const o = r[n];
    if (!a.includes(n)) return !1;
    if (n !== 'ref') {
      const d = e[n];
      if (
        (Ve(o) && Ve(d)) ||
        (q(o) && q(d)) ||
        (Array.isArray(o) && Array.isArray(d))
          ? !de(o, d, t)
          : !Object.is(o, d)
      )
        return !1;
    }
  }
  return !0;
}
function Jr(r) {
  const e = at(),
    {
      control: t = e.control,
      name: s,
      defaultValue: a,
      disabled: n,
      exact: o,
      compute: d,
    } = r || {},
    h = S.useRef(a),
    m = S.useRef(d),
    g = S.useRef(void 0),
    T = S.useRef(t),
    w = S.useRef(s);
  m.current = d;
  const [ue, X] = S.useState(() => {
      const D = t._getWatch(s, h.current);
      return m.current ? m.current(D) : D;
    }),
    P = S.useCallback(
      (D) => {
        const I = ht(s, t._names, D || t._formValues, !1, h.current);
        return m.current ? m.current(I) : I;
      },
      [t._formValues, t._names, s],
    ),
    J = S.useCallback(
      (D) => {
        if (!n) {
          const I = ht(s, t._names, D || t._formValues, !1, h.current);
          if (m.current) {
            const ee = m.current(I);
            de(ee, g.current) || (X(ee), (g.current = ee));
          } else X(I);
        }
      },
      [t._formValues, t._names, n, s],
    );
  (At(
    () => (
      (T.current !== t || !de(w.current, s)) &&
        ((T.current = t), (w.current = s), J()),
      t._subscribe({
        name: s,
        formState: { values: !0 },
        exact: o,
        callback: (D) => {
          J(D.values);
        },
      })
    ),
    [t, o, s, J],
  ),
    S.useEffect(() => t._removeUnmounted()));
  const ce = T.current !== t,
    O = w.current,
    L = S.useMemo(() => {
      if (n) return null;
      const D = !ce && !de(O, s);
      return ce || D ? P() : null;
    }, [n, ce, s, O, P]);
  return L !== null ? L : ue;
}
function Gr(r) {
  const e = at(),
    {
      name: t,
      disabled: s,
      control: a = e.control,
      shouldUnregister: n,
      defaultValue: o,
    } = r,
    d = mr(a._names.array, t),
    h = S.useMemo(
      () => p(a._formValues, t, p(a._defaultValues, t, o)),
      [a, t, o],
    ),
    m = Jr({ control: a, name: t, defaultValue: h, exact: !0 }),
    g = Hr({ control: a, name: t, exact: !0 }),
    T = S.useRef(r),
    w = S.useRef(void 0),
    ue = S.useRef(
      a.register(t, {
        ...r.rules,
        value: m,
        ...(te(r.disabled) ? { disabled: r.disabled } : {}),
      }),
    );
  T.current = r;
  const X = S.useMemo(
      () =>
        Object.defineProperties(
          {},
          {
            invalid: { enumerable: !0, get: () => !!p(g.errors, t) },
            isDirty: { enumerable: !0, get: () => !!p(g.dirtyFields, t) },
            isTouched: { enumerable: !0, get: () => !!p(g.touchedFields, t) },
            isValidating: {
              enumerable: !0,
              get: () => !!p(g.validatingFields, t),
            },
            error: { enumerable: !0, get: () => p(g.errors, t) },
          },
        ),
      [g, t],
    ),
    P = S.useCallback(
      (L) =>
        ue.current.onChange({
          target: { value: hr(L), name: t },
          type: Je.CHANGE,
        }),
      [t],
    ),
    J = S.useCallback(
      () =>
        ue.current.onBlur({
          target: { value: p(a._formValues, t), name: t },
          type: Je.BLUR,
        }),
      [t, a._formValues],
    ),
    ce = S.useCallback(
      (L) => {
        const D = p(a._fields, t);
        D &&
          L &&
          (D._f.ref = {
            focus: () => L.focus && L.focus(),
            select: () => L.select && L.select(),
            setCustomValidity: (I) => L.setCustomValidity(I),
            reportValidity: () => L.reportValidity(),
          });
      },
      [a._fields, t],
    ),
    O = S.useMemo(
      () => ({
        name: t,
        value: m,
        ...(te(s) || g.disabled ? { disabled: g.disabled || s } : {}),
        onChange: P,
        onBlur: J,
        ref: ce,
      }),
      [t, s, g.disabled, P, J, ce, m],
    );
  return (
    S.useEffect(() => {
      const L = a._options.shouldUnregister || n,
        D = w.current;
      (D && D !== t && !d && a.unregister(D),
        a.register(t, {
          ...T.current.rules,
          ...(te(T.current.disabled) ? { disabled: T.current.disabled } : {}),
        }));
      const I = (ee, fe) => {
        const Ae = p(a._fields, ee);
        Ae && Ae._f && (Ae._f.mount = fe);
      };
      if ((I(t, !0), L)) {
        const ee = H(p(a._options.defaultValues, t, T.current.defaultValue));
        ($(a._defaultValues, t, ee),
          U(p(a._formValues, t)) && $(a._formValues, t, ee));
      }
      return (
        !d && a.register(t),
        (w.current = t),
        () => {
          (d ? L && !a._state.action : L) ? a.unregister(t) : I(t, !1);
        }
      );
    }, [t, a, d, n]),
    S.useEffect(() => {
      a._setDisabledField({ disabled: s, name: t });
    }, [s, t, a]),
    S.useMemo(() => ({ field: O, formState: g, fieldState: X }), [O, g, X])
  );
}
const Yr = (r) => r.render(Gr(r));
var Xr = (r, e, t, s, a) =>
    e
      ? {
          ...t[r],
          types: { ...(t[r] && t[r].types ? t[r].types : {}), [s]: a || !0 },
        }
      : {},
  $e = (r) => (Array.isArray(r) ? r : [r]),
  Mt = () => {
    let r = [];
    return {
      get observers() {
        return r;
      },
      next: (a) => {
        for (const n of r) n.next && n.next(a);
      },
      subscribe: (a) => (
        r.push(a),
        {
          unsubscribe: () => {
            r = r.filter((n) => n !== a);
          },
        }
      ),
      unsubscribe: () => {
        r = [];
      },
    };
  };
function pr(r, e) {
  const t = {};
  for (const s in r)
    if (r.hasOwnProperty(s)) {
      const a = r[s],
        n = e[s];
      if (a && q(a) && n) {
        const o = pr(a, n);
        q(o) && (t[s] = o);
      } else r[s] && (t[s] = n);
    }
  return t;
}
var Y = (r) => q(r) && !Object.keys(r).length,
  St = (r) => r.type === 'file',
  le = (r) => typeof r == 'function',
  Ge = (r) => {
    if (!bt) return !1;
    const e = r ? r.ownerDocument : 0;
    return (
      r instanceof
      (e && e.defaultView ? e.defaultView.HTMLElement : HTMLElement)
    );
  },
  gr = (r) => r.type === 'select-multiple',
  Vt = (r) => r.type === 'radio',
  Qr = (r) => Vt(r) || We(r),
  ct = (r) => Ge(r) && r.isConnected;
function Kr(r, e) {
  const t = e.slice(0, -1).length;
  let s = 0;
  for (; s < t; ) r = U(r) ? s++ : r[e[s++]];
  return r;
}
function es(r) {
  for (const e in r) if (r.hasOwnProperty(e) && !U(r[e])) return !1;
  return !0;
}
function z(r, e) {
  const t = Array.isArray(e) ? e : st(e) ? [e] : wt(e),
    s = t.length === 1 ? r : Kr(r, t),
    a = t.length - 1,
    n = t[a];
  return (
    s && delete s[n],
    a !== 0 &&
      ((q(s) && Y(s)) || (Array.isArray(s) && es(s))) &&
      z(r, t.slice(0, -1)),
    r
  );
}
var ts = (r) => {
  for (const e in r) if (le(r[e])) return !0;
  return !1;
};
function _r(r) {
  return Array.isArray(r) || (q(r) && !ts(r));
}
function yt(r, e = {}) {
  for (const t in r) {
    const s = r[t];
    _r(s)
      ? ((e[t] = Array.isArray(s) ? [] : {}), yt(s, e[t]))
      : U(s) || (e[t] = !0);
  }
  return e;
}
function Fe(r, e, t) {
  t || (t = yt(e));
  for (const s in r) {
    const a = r[s];
    if (_r(a))
      U(e) || mt(t[s])
        ? (t[s] = yt(a, Array.isArray(a) ? [] : {}))
        : Fe(a, K(e) ? {} : e[s], t[s]);
    else {
      const n = e[s];
      t[s] = !de(a, n);
    }
  }
  return t;
}
const $t = { value: !1, isValid: !1 },
  Pt = { value: !0, isValid: !0 };
var vr = (r) => {
    if (Array.isArray(r)) {
      if (r.length > 1) {
        const e = r
          .filter((t) => t && t.checked && !t.disabled)
          .map((t) => t.value);
        return { value: e, isValid: !!e.length };
      }
      return r[0].checked && !r[0].disabled
        ? r[0].attributes && !U(r[0].attributes.value)
          ? U(r[0].value) || r[0].value === ''
            ? Pt
            : { value: r[0].value, isValid: !0 }
          : Pt
        : $t;
    }
    return $t;
  },
  xr = (r, { valueAsNumber: e, valueAsDate: t, setValueAs: s }) =>
    U(r)
      ? r
      : e
        ? r === ''
          ? NaN
          : r && +r
        : t && re(r)
          ? new Date(r)
          : s
            ? s(r)
            : r;
const Ut = { isValid: !1, value: null };
var br = (r) =>
  Array.isArray(r)
    ? r.reduce(
        (e, t) =>
          t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e,
        Ut,
      )
    : Ut;
function Bt(r) {
  const e = r.ref;
  return St(e)
    ? e.files
    : Vt(e)
      ? br(r.refs).value
      : gr(e)
        ? [...e.selectedOptions].map(({ value: t }) => t)
        : We(e)
          ? vr(r.refs).value
          : xr(U(e.value) ? r.ref.value : e.value, r);
}
var rs = (r, e, t, s) => {
    const a = {};
    for (const n of r) {
      const o = p(e, n);
      o && $(a, n, o._f);
    }
    return {
      criteriaMode: t,
      names: [...r],
      fields: a,
      shouldUseNativeValidation: s,
    };
  },
  Ye = (r) => r instanceof RegExp,
  Le = (r) =>
    U(r)
      ? r
      : Ye(r)
        ? r.source
        : q(r)
          ? Ye(r.value)
            ? r.value.source
            : r.value
          : r,
  zt = (r) => ({
    isOnSubmit: !r || r === oe.onSubmit,
    isOnBlur: r === oe.onBlur,
    isOnChange: r === oe.onChange,
    isOnAll: r === oe.all,
    isOnTouch: r === oe.onTouched,
  });
const Wt = 'AsyncFunction';
var ss = (r) =>
    !!r &&
    !!r.validate &&
    !!(
      (le(r.validate) && r.validate.constructor.name === Wt) ||
      (q(r.validate) &&
        Object.values(r.validate).find((e) => e.constructor.name === Wt))
    ),
  as = (r) =>
    r.mount &&
    (r.required ||
      r.min ||
      r.max ||
      r.maxLength ||
      r.minLength ||
      r.pattern ||
      r.validate),
  qt = (r, e, t) =>
    !t &&
    (e.watchAll ||
      e.watch.has(r) ||
      [...e.watch].some(
        (s) => r.startsWith(s) && /^\.\w+/.test(r.slice(s.length)),
      ));
const Pe = (r, e, t, s) => {
  for (const a of t || Object.keys(r)) {
    const n = p(r, a);
    if (n) {
      const { _f: o, ...d } = n;
      if (o) {
        if (o.refs && o.refs[0] && e(o.refs[0], a) && !s) return !0;
        if (o.ref && e(o.ref, o.name) && !s) return !0;
        if (Pe(d, e)) break;
      } else if (q(d) && Pe(d, e)) break;
    }
  }
};
function Ht(r, e, t) {
  const s = p(r, t);
  if (s || st(t)) return { error: s, name: t };
  const a = t.split('.');
  for (; a.length; ) {
    const n = a.join('.'),
      o = p(e, n),
      d = p(r, n);
    if (o && !Array.isArray(o) && t !== n) return { name: t };
    if (d && d.type) return { name: n, error: d };
    if (d && d.root && d.root.type) return { name: `${n}.root`, error: d.root };
    a.pop();
  }
  return { name: t };
}
var ns = (r, e, t, s) => {
    t(r);
    const { name: a, ...n } = r;
    return (
      Y(n) ||
      Object.keys(n).length >= Object.keys(e).length ||
      Object.keys(n).find((o) => e[o] === (!s || oe.all))
    );
  },
  is = (r, e, t) =>
    !r ||
    !e ||
    r === e ||
    $e(r).some((s) => s && (t ? s === e : s.startsWith(e) || e.startsWith(s))),
  os = (r, e, t, s, a) =>
    a.isOnAll
      ? !1
      : !t && a.isOnTouch
        ? !(e || r)
        : (t ? s.isOnBlur : a.isOnBlur)
          ? !r
          : (t ? s.isOnChange : a.isOnChange)
            ? r
            : !0,
  ds = (r, e) => !kt(p(r, e)).length && z(r, e),
  ls = (r, e, t) => {
    const s = $e(p(r, t));
    return ($(s, 'root', e[t]), $(r, t, s), r);
  };
function Jt(r, e, t = 'validate') {
  if (re(r) || (Array.isArray(r) && r.every(re)) || (te(r) && !r))
    return { type: t, message: re(r) ? r : '', ref: e };
}
var Ne = (r) => (q(r) && !Ye(r) ? r : { value: r, message: '' }),
  Gt = async (r, e, t, s, a, n) => {
    const {
        ref: o,
        refs: d,
        required: h,
        maxLength: m,
        minLength: g,
        min: T,
        max: w,
        pattern: ue,
        validate: X,
        name: P,
        valueAsNumber: J,
        mount: ce,
      } = r._f,
      O = p(t, P);
    if (!ce || e.has(P)) return {};
    const L = d ? d[0] : o,
      D = (F) => {
        a &&
          L.reportValidity &&
          (L.setCustomValidity(te(F) ? '' : F || ''), L.reportValidity());
      },
      I = {},
      ee = Vt(o),
      fe = We(o),
      Ae = ee || fe,
      ie =
        ((J || St(o)) && U(o.value) && U(O)) ||
        (Ge(o) && o.value === '') ||
        O === '' ||
        (Array.isArray(O) && !O.length),
      Se = Xr.bind(null, P, s, I),
      he = (F, Z, B, G = ge.maxLength, Q = ge.minLength) => {
        const me = F ? Z : B;
        I[P] = { type: F ? G : Q, message: me, ref: o, ...Se(F ? G : Q, me) };
      };
    if (
      n
        ? !Array.isArray(O) || !O.length
        : h &&
          ((!Ae && (ie || K(O))) ||
            (te(O) && !O) ||
            (fe && !vr(d).isValid) ||
            (ee && !br(d).isValid))
    ) {
      const { value: F, message: Z } = re(h)
        ? { value: !!h, message: h }
        : Ne(h);
      if (
        F &&
        ((I[P] = {
          type: ge.required,
          message: Z,
          ref: L,
          ...Se(ge.required, Z),
        }),
        !s)
      )
        return (D(Z), I);
    }
    if (!ie && (!K(T) || !K(w))) {
      let F, Z;
      const B = Ne(w),
        G = Ne(T);
      if (!K(O) && !isNaN(O)) {
        const Q = o.valueAsNumber || (O && +O);
        (K(B.value) || (F = Q > B.value), K(G.value) || (Z = Q < G.value));
      } else {
        const Q = o.valueAsDate || new Date(O),
          me = (qe) => new Date(new Date().toDateString() + ' ' + qe),
          Ze = o.type == 'time',
          Te = o.type == 'week';
        (re(B.value) &&
          O &&
          (F = Ze
            ? me(O) > me(B.value)
            : Te
              ? O > B.value
              : Q > new Date(B.value)),
          re(G.value) &&
            O &&
            (Z = Ze
              ? me(O) < me(G.value)
              : Te
                ? O < G.value
                : Q < new Date(G.value)));
      }
      if ((F || Z) && (he(!!F, B.message, G.message, ge.max, ge.min), !s))
        return (D(I[P].message), I);
    }
    if ((m || g) && !ie && (re(O) || (n && Array.isArray(O)))) {
      const F = Ne(m),
        Z = Ne(g),
        B = !K(F.value) && O.length > +F.value,
        G = !K(Z.value) && O.length < +Z.value;
      if ((B || G) && (he(B, F.message, Z.message), !s))
        return (D(I[P].message), I);
    }
    if (ue && !ie && re(O)) {
      const { value: F, message: Z } = Ne(ue);
      if (
        Ye(F) &&
        !O.match(F) &&
        ((I[P] = {
          type: ge.pattern,
          message: Z,
          ref: o,
          ...Se(ge.pattern, Z),
        }),
        !s)
      )
        return (D(Z), I);
    }
    if (X) {
      if (le(X)) {
        const F = await X(O, t),
          Z = Jt(F, L);
        if (Z && ((I[P] = { ...Z, ...Se(ge.validate, Z.message) }), !s))
          return (D(Z.message), I);
      } else if (q(X)) {
        let F = {};
        for (const Z in X) {
          if (!Y(F) && !s) break;
          const B = Jt(await X[Z](O, t), L, Z);
          B &&
            ((F = { ...B, ...Se(Z, B.message) }),
            D(B.message),
            s && (I[P] = F));
        }
        if (!Y(F) && ((I[P] = { ref: L, ...F }), !s)) return I;
      }
    }
    return (D(!0), I);
  };
const us = {
  mode: oe.onSubmit,
  reValidateMode: oe.onChange,
  shouldFocusError: !0,
};
function cs(r = {}) {
  let e = { ...us, ...r },
    t = {
      submitCount: 0,
      isDirty: !1,
      isReady: !1,
      isLoading: le(e.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: e.errors || {},
      disabled: e.disabled || !1,
    },
    s = {},
    a =
      q(e.defaultValues) || q(e.values)
        ? H(e.defaultValues || e.values) || {}
        : {},
    n = e.shouldUnregister ? {} : H(a),
    o = { action: !1, mount: !1, watch: !1 },
    d = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
    },
    h,
    m = 0;
  const g = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1,
  };
  let T = { ...g };
  const w = { array: Mt(), state: Mt() },
    ue = e.criteriaMode === oe.all,
    X = (i) => (l) => {
      (clearTimeout(m), (m = setTimeout(i, l)));
    },
    P = async (i) => {
      if (!e.disabled && (g.isValid || T.isValid || i)) {
        const l = e.resolver ? Y((await fe()).errors) : await ie(s, !0);
        l !== t.isValid && w.state.next({ isValid: l });
      }
    },
    J = (i, l) => {
      !e.disabled &&
        (g.isValidating ||
          g.validatingFields ||
          T.isValidating ||
          T.validatingFields) &&
        ((i || Array.from(d.mount)).forEach((u) => {
          u && (l ? $(t.validatingFields, u, l) : z(t.validatingFields, u));
        }),
        w.state.next({
          validatingFields: t.validatingFields,
          isValidating: !Y(t.validatingFields),
        }));
    },
    ce = (i, l = [], u, v, y = !0, f = !0) => {
      if (v && u && !e.disabled) {
        if (((o.action = !0), f && Array.isArray(p(s, i)))) {
          const k = u(p(s, i), v.argA, v.argB);
          y && $(s, i, k);
        }
        if (f && Array.isArray(p(t.errors, i))) {
          const k = u(p(t.errors, i), v.argA, v.argB);
          (y && $(t.errors, i, k), ds(t.errors, i));
        }
        if (
          (g.touchedFields || T.touchedFields) &&
          f &&
          Array.isArray(p(t.touchedFields, i))
        ) {
          const k = u(p(t.touchedFields, i), v.argA, v.argB);
          y && $(t.touchedFields, i, k);
        }
        ((g.dirtyFields || T.dirtyFields) && (t.dirtyFields = Fe(a, n)),
          w.state.next({
            name: i,
            isDirty: he(i, l),
            dirtyFields: t.dirtyFields,
            errors: t.errors,
            isValid: t.isValid,
          }));
      } else $(n, i, l);
    },
    O = (i, l) => {
      ($(t.errors, i, l), w.state.next({ errors: t.errors }));
    },
    L = (i) => {
      ((t.errors = i), w.state.next({ errors: t.errors, isValid: !1 }));
    },
    D = (i, l, u, v) => {
      const y = p(s, i);
      if (y) {
        const f = p(n, i, U(u) ? p(a, i) : u);
        (U(f) || (v && v.defaultChecked) || l
          ? $(n, i, l ? f : Bt(y._f))
          : B(i, f),
          o.mount && !o.action && P());
      }
    },
    I = (i, l, u, v, y) => {
      let f = !1,
        k = !1;
      const j = { name: i };
      if (!e.disabled) {
        if (!u || v) {
          (g.isDirty || T.isDirty) &&
            ((k = t.isDirty),
            (t.isDirty = j.isDirty = he()),
            (f = k !== j.isDirty));
          const M = de(p(a, i), l);
          ((k = !!p(t.dirtyFields, i)),
            M ? z(t.dirtyFields, i) : $(t.dirtyFields, i, !0),
            (j.dirtyFields = t.dirtyFields),
            (f = f || ((g.dirtyFields || T.dirtyFields) && k !== !M)));
        }
        if (u) {
          const M = p(t.touchedFields, i);
          M ||
            ($(t.touchedFields, i, u),
            (j.touchedFields = t.touchedFields),
            (f = f || ((g.touchedFields || T.touchedFields) && M !== u)));
        }
        f && y && w.state.next(j);
      }
      return f ? j : {};
    },
    ee = (i, l, u, v) => {
      const y = p(t.errors, i),
        f = (g.isValid || T.isValid) && te(l) && t.isValid !== l;
      if (
        (e.delayError && u
          ? ((h = X(() => O(i, u))), h(e.delayError))
          : (clearTimeout(m),
            (h = null),
            u ? $(t.errors, i, u) : z(t.errors, i)),
        (u ? !de(y, u) : y) || !Y(v) || f)
      ) {
        const k = {
          ...v,
          ...(f && te(l) ? { isValid: l } : {}),
          errors: t.errors,
          name: i,
        };
        ((t = { ...t, ...k }), w.state.next(k));
      }
    },
    fe = async (i) => {
      J(i, !0);
      const l = await e.resolver(
        n,
        e.context,
        rs(i || d.mount, s, e.criteriaMode, e.shouldUseNativeValidation),
      );
      return (J(i), l);
    },
    Ae = async (i) => {
      const { errors: l } = await fe(i);
      if (i)
        for (const u of i) {
          const v = p(l, u);
          v ? $(t.errors, u, v) : z(t.errors, u);
        }
      else t.errors = l;
      return l;
    },
    ie = async (i, l, u = { valid: !0 }) => {
      for (const v in i) {
        const y = i[v];
        if (y) {
          const { _f: f, ...k } = y;
          if (f) {
            const j = d.array.has(f.name),
              M = y._f && ss(y._f);
            M && g.validatingFields && J([f.name], !0);
            const ae = await Gt(
              y,
              d.disabled,
              n,
              ue,
              e.shouldUseNativeValidation && !l,
              j,
            );
            if (
              (M && g.validatingFields && J([f.name]),
              ae[f.name] && ((u.valid = !1), l))
            )
              break;
            !l &&
              (p(ae, f.name)
                ? j
                  ? ls(t.errors, ae, f.name)
                  : $(t.errors, f.name, ae[f.name])
                : z(t.errors, f.name));
          }
          !Y(k) && (await ie(k, l, u));
        }
      }
      return u.valid;
    },
    Se = () => {
      for (const i of d.unMount) {
        const l = p(s, i);
        l &&
          (l._f.refs ? l._f.refs.every((u) => !ct(u)) : !ct(l._f.ref)) &&
          it(i);
      }
      d.unMount = new Set();
    },
    he = (i, l) => !e.disabled && (i && l && $(n, i, l), !de(qe(), a)),
    F = (i, l, u) =>
      ht(i, d, { ...(o.mount ? n : U(l) ? a : re(i) ? { [i]: l } : l) }, u, l),
    Z = (i) => kt(p(o.mount ? n : a, i, e.shouldUnregister ? p(a, i, []) : [])),
    B = (i, l, u = {}) => {
      const v = p(s, i);
      let y = l;
      if (v) {
        const f = v._f;
        f &&
          (!f.disabled && $(n, i, xr(l, f)),
          (y = Ge(f.ref) && K(l) ? '' : l),
          gr(f.ref)
            ? [...f.ref.options].forEach(
                (k) => (k.selected = y.includes(k.value)),
              )
            : f.refs
              ? We(f.ref)
                ? f.refs.forEach((k) => {
                    (!k.defaultChecked || !k.disabled) &&
                      (Array.isArray(y)
                        ? (k.checked = !!y.find((j) => j === k.value))
                        : (k.checked = y === k.value || !!y));
                  })
                : f.refs.forEach((k) => (k.checked = k.value === y))
              : St(f.ref)
                ? (f.ref.value = '')
                : ((f.ref.value = y),
                  f.ref.type || w.state.next({ name: i, values: H(n) })));
      }
      ((u.shouldDirty || u.shouldTouch) &&
        I(i, y, u.shouldTouch, u.shouldDirty, !0),
        u.shouldValidate && Te(i));
    },
    G = (i, l, u) => {
      for (const v in l) {
        if (!l.hasOwnProperty(v)) return;
        const y = l[v],
          f = i + '.' + v,
          k = p(s, f);
        (d.array.has(i) || q(y) || (k && !k._f)) && !Ve(y)
          ? G(f, y, u)
          : B(f, y, u);
      }
    },
    Q = (i, l, u = {}) => {
      const v = p(s, i),
        y = d.array.has(i),
        f = H(l);
      ($(n, i, f),
        y
          ? (w.array.next({ name: i, values: H(n) }),
            (g.isDirty || g.dirtyFields || T.isDirty || T.dirtyFields) &&
              u.shouldDirty &&
              w.state.next({
                name: i,
                dirtyFields: Fe(a, n),
                isDirty: he(i, f),
              }))
          : v && !v._f && !K(f)
            ? G(i, f, u)
            : B(i, f, u),
        qt(i, d) && w.state.next({ ...t, name: i }),
        w.state.next({ name: o.mount ? i : void 0, values: H(n) }));
    },
    me = async (i) => {
      o.mount = !0;
      const l = i.target;
      let u = l.name,
        v = !0;
      const y = p(s, u),
        f = (M) => {
          v =
            Number.isNaN(M) ||
            (Ve(M) && isNaN(M.getTime())) ||
            de(M, p(n, u, M));
        },
        k = zt(e.mode),
        j = zt(e.reValidateMode);
      if (y) {
        let M, ae;
        const He = l.type ? Bt(y._f) : hr(i),
          ve = i.type === Je.BLUR || i.type === Je.FOCUS_OUT,
          Ir =
            (!as(y._f) && !e.resolver && !p(t.errors, u) && !y._f.deps) ||
            os(ve, p(t.touchedFields, u), t.isSubmitted, j, k),
          lt = qt(u, d, ve);
        ($(n, u, He),
          ve
            ? (!l || !l.readOnly) && (y._f.onBlur && y._f.onBlur(i), h && h(0))
            : y._f.onChange && y._f.onChange(i));
        const ut = I(u, He, ve),
          jr = !Y(ut) || lt;
        if ((!ve && w.state.next({ name: u, type: i.type, values: H(n) }), Ir))
          return (
            (g.isValid || T.isValid) &&
              (e.mode === 'onBlur' ? ve && P() : ve || P()),
            jr && w.state.next({ name: u, ...(lt ? {} : ut) })
          );
        if ((!ve && lt && w.state.next({ ...t }), e.resolver)) {
          const { errors: Zt } = await fe([u]);
          if ((f(He), v)) {
            const Dr = Ht(t.errors, s, u),
              Lt = Ht(Zt, s, Dr.name || u);
            ((M = Lt.error), (u = Lt.name), (ae = Y(Zt)));
          }
        } else
          (J([u], !0),
            (M = (await Gt(y, d.disabled, n, ue, e.shouldUseNativeValidation))[
              u
            ]),
            J([u]),
            f(He),
            v &&
              (M
                ? (ae = !1)
                : (g.isValid || T.isValid) && (ae = await ie(s, !0))));
        v &&
          (y._f.deps &&
            (!Array.isArray(y._f.deps) || y._f.deps.length > 0) &&
            Te(y._f.deps),
          ee(u, ae, M, ut));
      }
    },
    Ze = (i, l) => {
      if (p(t.errors, l) && i.focus) return (i.focus(), 1);
    },
    Te = async (i, l = {}) => {
      let u, v;
      const y = $e(i);
      if (e.resolver) {
        const f = await Ae(U(i) ? i : y);
        ((u = Y(f)), (v = i ? !y.some((k) => p(f, k)) : u));
      } else
        i
          ? ((v = (
              await Promise.all(
                y.map(async (f) => {
                  const k = p(s, f);
                  return await ie(k && k._f ? { [f]: k } : k);
                }),
              )
            ).every(Boolean)),
            !(!v && !t.isValid) && P())
          : (v = u = await ie(s));
      return (
        w.state.next({
          ...(!re(i) || ((g.isValid || T.isValid) && u !== t.isValid)
            ? {}
            : { name: i }),
          ...(e.resolver || !i ? { isValid: u } : {}),
          errors: t.errors,
        }),
        l.shouldFocus && !v && Pe(s, Ze, i ? y : d.mount),
        v
      );
    },
    qe = (i, l) => {
      let u = { ...(o.mount ? n : a) };
      return (
        l && (u = pr(l.dirtyFields ? t.dirtyFields : t.touchedFields, u)),
        U(i) ? u : re(i) ? p(u, i) : i.map((v) => p(u, v))
      );
    },
    Tt = (i, l) => ({
      invalid: !!p((l || t).errors, i),
      isDirty: !!p((l || t).dirtyFields, i),
      error: p((l || t).errors, i),
      isValidating: !!p(t.validatingFields, i),
      isTouched: !!p((l || t).touchedFields, i),
    }),
    Vr = (i) => {
      (i && $e(i).forEach((l) => z(t.errors, l)),
        w.state.next({ errors: i ? t.errors : {} }));
    },
    Nt = (i, l, u) => {
      const v = (p(s, i, { _f: {} })._f || {}).ref,
        y = p(t.errors, i) || {},
        { ref: f, message: k, type: j, ...M } = y;
      ($(t.errors, i, { ...M, ...l, ref: v }),
        w.state.next({ name: i, errors: t.errors, isValid: !1 }),
        u && u.shouldFocus && v && v.focus && v.focus());
    },
    Or = (i, l) =>
      le(i)
        ? w.state.subscribe({
            next: (u) => 'values' in u && i(F(void 0, l), u),
          })
        : F(i, l, !0),
    Ft = (i) =>
      w.state.subscribe({
        next: (l) => {
          is(i.name, l.name, i.exact) &&
            ns(l, i.formState || g, Er, i.reRenderRoot) &&
            i.callback({ values: { ...n }, ...t, ...l, defaultValues: a });
        },
      }).unsubscribe,
    Tr = (i) => (
      (o.mount = !0),
      (T = { ...T, ...i.formState }),
      Ft({ ...i, formState: T })
    ),
    it = (i, l = {}) => {
      for (const u of i ? $e(i) : d.mount)
        (d.mount.delete(u),
          d.array.delete(u),
          l.keepValue || (z(s, u), z(n, u)),
          !l.keepError && z(t.errors, u),
          !l.keepDirty && z(t.dirtyFields, u),
          !l.keepTouched && z(t.touchedFields, u),
          !l.keepIsValidating && z(t.validatingFields, u),
          !e.shouldUnregister && !l.keepDefaultValue && z(a, u));
      (w.state.next({ values: H(n) }),
        w.state.next({ ...t, ...(l.keepDirty ? { isDirty: he() } : {}) }),
        !l.keepIsValid && P());
    },
    Rt = ({ disabled: i, name: l }) => {
      ((te(i) && o.mount) || i || d.disabled.has(l)) &&
        (i ? d.disabled.add(l) : d.disabled.delete(l));
    },
    ot = (i, l = {}) => {
      let u = p(s, i);
      const v = te(l.disabled) || te(e.disabled);
      return (
        $(s, i, {
          ...(u || {}),
          _f: {
            ...(u && u._f ? u._f : { ref: { name: i } }),
            name: i,
            mount: !0,
            ...l,
          },
        }),
        d.mount.add(i),
        u
          ? Rt({ disabled: te(l.disabled) ? l.disabled : e.disabled, name: i })
          : D(i, !0, l.value),
        {
          ...(v ? { disabled: l.disabled || e.disabled } : {}),
          ...(e.progressive
            ? {
                required: !!l.required,
                min: Le(l.min),
                max: Le(l.max),
                minLength: Le(l.minLength),
                maxLength: Le(l.maxLength),
                pattern: Le(l.pattern),
              }
            : {}),
          name: i,
          onChange: me,
          onBlur: me,
          ref: (y) => {
            if (y) {
              (ot(i, l), (u = p(s, i)));
              const f =
                  (U(y.value) &&
                    y.querySelectorAll &&
                    y.querySelectorAll('input,select,textarea')[0]) ||
                  y,
                k = Qr(f),
                j = u._f.refs || [];
              if (k ? j.find((M) => M === f) : f === u._f.ref) return;
              ($(s, i, {
                _f: {
                  ...u._f,
                  ...(k
                    ? {
                        refs: [
                          ...j.filter(ct),
                          f,
                          ...(Array.isArray(p(a, i)) ? [{}] : []),
                        ],
                        ref: { type: f.type, name: i },
                      }
                    : { ref: f }),
                },
              }),
                D(i, !1, void 0, f));
            } else
              ((u = p(s, i, {})),
                u._f && (u._f.mount = !1),
                (e.shouldUnregister || l.shouldUnregister) &&
                  !(mr(d.array, i) && o.action) &&
                  d.unMount.add(i));
          },
        }
      );
    },
    dt = () => e.shouldFocusError && Pe(s, Ze, d.mount),
    Nr = (i) => {
      te(i) &&
        (w.state.next({ disabled: i }),
        Pe(
          s,
          (l, u) => {
            const v = p(s, u);
            v &&
              ((l.disabled = v._f.disabled || i),
              Array.isArray(v._f.refs) &&
                v._f.refs.forEach((y) => {
                  y.disabled = v._f.disabled || i;
                }));
          },
          0,
          !1,
        ));
    },
    Et = (i, l) => async (u) => {
      let v;
      u && (u.preventDefault && u.preventDefault(), u.persist && u.persist());
      let y = H(n);
      if ((w.state.next({ isSubmitting: !0 }), e.resolver)) {
        const { errors: f, values: k } = await fe();
        ((t.errors = f), (y = H(k)));
      } else await ie(s);
      if (d.disabled.size) for (const f of d.disabled) z(y, f);
      if ((z(t.errors, 'root'), Y(t.errors))) {
        w.state.next({ errors: {} });
        try {
          await i(y, u);
        } catch (f) {
          v = f;
        }
      } else (l && (await l({ ...t.errors }, u)), dt(), setTimeout(dt));
      if (
        (w.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: Y(t.errors) && !v,
          submitCount: t.submitCount + 1,
          errors: t.errors,
        }),
        v)
      )
        throw v;
    },
    Fr = (i, l = {}) => {
      p(s, i) &&
        (U(l.defaultValue)
          ? Q(i, H(p(a, i)))
          : (Q(i, l.defaultValue), $(a, i, H(l.defaultValue))),
        l.keepTouched || z(t.touchedFields, i),
        l.keepDirty ||
          (z(t.dirtyFields, i),
          (t.isDirty = l.defaultValue ? he(i, H(p(a, i))) : he())),
        l.keepError || (z(t.errors, i), g.isValid && P()),
        w.state.next({ ...t }));
    },
    It = (i, l = {}) => {
      const u = i ? H(i) : a,
        v = H(u),
        y = Y(i),
        f = y ? a : v;
      if ((l.keepDefaultValues || (a = u), !l.keepValues)) {
        if (l.keepDirtyValues) {
          const k = new Set([...d.mount, ...Object.keys(Fe(a, n))]);
          for (const j of Array.from(k))
            p(t.dirtyFields, j) ? $(f, j, p(n, j)) : Q(j, p(f, j));
        } else {
          if (bt && U(i))
            for (const k of d.mount) {
              const j = p(s, k);
              if (j && j._f) {
                const M = Array.isArray(j._f.refs) ? j._f.refs[0] : j._f.ref;
                if (Ge(M)) {
                  const ae = M.closest('form');
                  if (ae) {
                    ae.reset();
                    break;
                  }
                }
              }
            }
          if (l.keepFieldsRef) for (const k of d.mount) Q(k, p(f, k));
          else s = {};
        }
        ((n = e.shouldUnregister ? (l.keepDefaultValues ? H(a) : {}) : H(f)),
          w.array.next({ values: { ...f } }),
          w.state.next({ values: { ...f } }));
      }
      ((d = {
        mount: l.keepDirtyValues ? d.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: '',
      }),
        (o.mount =
          !g.isValid ||
          !!l.keepIsValid ||
          !!l.keepDirtyValues ||
          (!e.shouldUnregister && !Y(f))),
        (o.watch = !!e.shouldUnregister),
        w.state.next({
          submitCount: l.keepSubmitCount ? t.submitCount : 0,
          isDirty: y
            ? !1
            : l.keepDirty
              ? t.isDirty
              : !!(l.keepDefaultValues && !de(i, a)),
          isSubmitted: l.keepIsSubmitted ? t.isSubmitted : !1,
          dirtyFields: y
            ? {}
            : l.keepDirtyValues
              ? l.keepDefaultValues && n
                ? Fe(a, n)
                : t.dirtyFields
              : l.keepDefaultValues && i
                ? Fe(a, i)
                : l.keepDirty
                  ? t.dirtyFields
                  : {},
          touchedFields: l.keepTouched ? t.touchedFields : {},
          errors: l.keepErrors ? t.errors : {},
          isSubmitSuccessful: l.keepIsSubmitSuccessful
            ? t.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
          defaultValues: a,
        }));
    },
    jt = (i, l) => It(le(i) ? i(n) : i, l),
    Rr = (i, l = {}) => {
      const u = p(s, i),
        v = u && u._f;
      if (v) {
        const y = v.refs ? v.refs[0] : v.ref;
        y.focus && (y.focus(), l.shouldSelect && le(y.select) && y.select());
      }
    },
    Er = (i) => {
      t = { ...t, ...i };
    },
    Dt = {
      control: {
        register: ot,
        unregister: it,
        getFieldState: Tt,
        handleSubmit: Et,
        setError: Nt,
        _subscribe: Ft,
        _runSchema: fe,
        _focusError: dt,
        _getWatch: F,
        _getDirty: he,
        _setValid: P,
        _setFieldArray: ce,
        _setDisabledField: Rt,
        _setErrors: L,
        _getFieldArray: Z,
        _reset: It,
        _resetDefaultValues: () =>
          le(e.defaultValues) &&
          e.defaultValues().then((i) => {
            (jt(i, e.resetOptions), w.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: Se,
        _disableForm: Nr,
        _subjects: w,
        _proxyFormState: g,
        get _fields() {
          return s;
        },
        get _formValues() {
          return n;
        },
        get _state() {
          return o;
        },
        set _state(i) {
          o = i;
        },
        get _defaultValues() {
          return a;
        },
        get _names() {
          return d;
        },
        set _names(i) {
          d = i;
        },
        get _formState() {
          return t;
        },
        get _options() {
          return e;
        },
        set _options(i) {
          e = { ...e, ...i };
        },
      },
      subscribe: Tr,
      trigger: Te,
      register: ot,
      handleSubmit: Et,
      watch: Or,
      setValue: Q,
      getValues: qe,
      reset: jt,
      resetField: Fr,
      clearErrors: Vr,
      unregister: it,
      setError: Nt,
      setFocus: Rr,
      getFieldState: Tt,
    };
  return { ...Dt, formControl: Dt };
}
function Ks(r = {}) {
  const e = S.useRef(void 0),
    t = S.useRef(void 0),
    [s, a] = S.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: le(r.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: r.errors || {},
      disabled: r.disabled || !1,
      isReady: !1,
      defaultValues: le(r.defaultValues) ? void 0 : r.defaultValues,
    });
  if (!e.current)
    if (r.formControl)
      ((e.current = { ...r.formControl, formState: s }),
        r.defaultValues &&
          !le(r.defaultValues) &&
          r.formControl.reset(r.defaultValues, r.resetOptions));
    else {
      const { formControl: o, ...d } = cs(r);
      e.current = { ...d, formState: s };
    }
  const n = e.current.control;
  return (
    (n._options = r),
    At(() => {
      const o = n._subscribe({
        formState: n._proxyFormState,
        callback: () => a({ ...n._formState }),
        reRenderRoot: !0,
      });
      return (
        a((d) => ({ ...d, isReady: !0 })),
        (n._formState.isReady = !0),
        o
      );
    }, [n]),
    S.useEffect(() => n._disableForm(r.disabled), [n, r.disabled]),
    S.useEffect(() => {
      (r.mode && (n._options.mode = r.mode),
        r.reValidateMode && (n._options.reValidateMode = r.reValidateMode));
    }, [n, r.mode, r.reValidateMode]),
    S.useEffect(() => {
      r.errors && (n._setErrors(r.errors), n._focusError());
    }, [n, r.errors]),
    S.useEffect(() => {
      r.shouldUnregister && n._subjects.state.next({ values: n._getWatch() });
    }, [n, r.shouldUnregister]),
    S.useEffect(() => {
      if (n._proxyFormState.isDirty) {
        const o = n._getDirty();
        o !== s.isDirty && n._subjects.state.next({ isDirty: o });
      }
    }, [n, s.isDirty]),
    S.useEffect(() => {
      var o;
      r.values && !de(r.values, t.current)
        ? (n._reset(r.values, {
            keepFieldsRef: !0,
            ...n._options.resetOptions,
          }),
          (!((o = n._options.resetOptions) === null || o === void 0) &&
            o.keepIsValid) ||
            n._setValid(),
          (t.current = r.values),
          a((d) => ({ ...d })))
        : n._resetDefaultValues();
    }, [n, r.values]),
    S.useEffect(() => {
      (n._state.mount || (n._setValid(), (n._state.mount = !0)),
        n._state.watch &&
          ((n._state.watch = !1), n._subjects.state.next({ ...n._formState })),
        n._removeUnmounted());
    }),
    (e.current.formState = yr(s, n)),
    e.current
  );
}
const ea = qr,
  kr = pe.createContext({}),
  ta = ({ ...r }) =>
    R.jsx(kr.Provider, {
      value: { name: r.name },
      children: R.jsx(Yr, { ...r }),
    }),
  nt = () => {
    const r = pe.useContext(kr),
      e = pe.useContext(wr),
      { getFieldState: t, formState: s } = at(),
      a = t(r.name, s);
    if (!r) throw new Error('useFormField should be used within <FormField>');
    const { id: n } = e;
    return {
      id: n,
      name: r.name,
      formItemId: `${n}-form-item`,
      formDescriptionId: `${n}-form-item-description`,
      formMessageId: `${n}-form-item-message`,
      ...a,
    };
  },
  wr = pe.createContext({}),
  fs = pe.forwardRef(({ className: r, ...e }, t) => {
    const s = pe.useId();
    return R.jsx(wr.Provider, {
      value: { id: s },
      children: R.jsx('div', { ref: t, className: rt('space-y-2', r), ...e }),
    });
  });
fs.displayName = 'FormItem';
const hs = pe.forwardRef(({ className: r, ...e }, t) => {
  const { error: s, formItemId: a } = nt();
  return R.jsx(Pr, {
    ref: t,
    className: rt('font-mono text-medium-title', s && 'text-red-500', r),
    htmlFor: a,
    ...e,
  });
});
hs.displayName = 'FormLabel';
const ms = pe.forwardRef(({ ...r }, e) => {
  const {
    error: t,
    formItemId: s,
    formDescriptionId: a,
    formMessageId: n,
  } = nt();
  return R.jsx(Mr, {
    ref: e,
    id: s,
    'aria-describedby': t ? `${a} ${n}` : `${a}`,
    'aria-invalid': !!t,
    className: 'font-mono text-small-title',
    ...r,
  });
});
ms.displayName = 'FormControl';
const ys = pe.forwardRef(({ className: r, ...e }, t) => {
  const { formDescriptionId: s } = nt();
  return R.jsx('p', {
    ref: t,
    id: s,
    className: rt(
      'text-small-subtitle font-mono text-text dark:text-darkText',
      r,
    ),
    ...e,
  });
});
ys.displayName = 'FormDescription';
const ps = pe.forwardRef(({ className: r, children: e, ...t }, s) => {
  const { error: a, formMessageId: n } = nt(),
    o = a ? String(a?.message) : e;
  return o
    ? R.jsx('p', {
        ref: s,
        id: n,
        className: rt('text-small-subtitle font-mono text-red-500', r),
        ...t,
        children: o,
      })
    : null;
});
ps.displayName = 'FormMessage';
var E;
(function (r) {
  r.assertEqual = (a) => {};
  function e(a) {}
  r.assertIs = e;
  function t(a) {
    throw new Error();
  }
  ((r.assertNever = t),
    (r.arrayToEnum = (a) => {
      const n = {};
      for (const o of a) n[o] = o;
      return n;
    }),
    (r.getValidEnumValues = (a) => {
      const n = r.objectKeys(a).filter((d) => typeof a[a[d]] != 'number'),
        o = {};
      for (const d of n) o[d] = a[d];
      return r.objectValues(o);
    }),
    (r.objectValues = (a) =>
      r.objectKeys(a).map(function (n) {
        return a[n];
      })),
    (r.objectKeys =
      typeof Object.keys == 'function'
        ? (a) => Object.keys(a)
        : (a) => {
            const n = [];
            for (const o in a)
              Object.prototype.hasOwnProperty.call(a, o) && n.push(o);
            return n;
          }),
    (r.find = (a, n) => {
      for (const o of a) if (n(o)) return o;
    }),
    (r.isInteger =
      typeof Number.isInteger == 'function'
        ? (a) => Number.isInteger(a)
        : (a) =>
            typeof a == 'number' && Number.isFinite(a) && Math.floor(a) === a));
  function s(a, n = ' | ') {
    return a.map((o) => (typeof o == 'string' ? `'${o}'` : o)).join(n);
  }
  ((r.joinValues = s),
    (r.jsonStringifyReplacer = (a, n) =>
      typeof n == 'bigint' ? n.toString() : n));
})(E || (E = {}));
var Yt;
(function (r) {
  r.mergeShapes = (e, t) => ({ ...e, ...t });
})(Yt || (Yt = {}));
const x = E.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]),
  xe = (r) => {
    switch (typeof r) {
      case 'undefined':
        return x.undefined;
      case 'string':
        return x.string;
      case 'number':
        return Number.isNaN(r) ? x.nan : x.number;
      case 'boolean':
        return x.boolean;
      case 'function':
        return x.function;
      case 'bigint':
        return x.bigint;
      case 'symbol':
        return x.symbol;
      case 'object':
        return Array.isArray(r)
          ? x.array
          : r === null
            ? x.null
            : r.then &&
                typeof r.then == 'function' &&
                r.catch &&
                typeof r.catch == 'function'
              ? x.promise
              : typeof Map < 'u' && r instanceof Map
                ? x.map
                : typeof Set < 'u' && r instanceof Set
                  ? x.set
                  : typeof Date < 'u' && r instanceof Date
                    ? x.date
                    : x.object;
      default:
        return x.unknown;
    }
  },
  c = E.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]);
class _e extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    (super(),
      (this.issues = []),
      (this.addIssue = (s) => {
        this.issues = [...this.issues, s];
      }),
      (this.addIssues = (s = []) => {
        this.issues = [...this.issues, ...s];
      }));
    const t = new.target.prototype;
    (Object.setPrototypeOf
      ? Object.setPrototypeOf(this, t)
      : (this.__proto__ = t),
      (this.name = 'ZodError'),
      (this.issues = e));
  }
  format(e) {
    const t =
        e ||
        function (n) {
          return n.message;
        },
      s = { _errors: [] },
      a = (n) => {
        for (const o of n.issues)
          if (o.code === 'invalid_union') o.unionErrors.map(a);
          else if (o.code === 'invalid_return_type') a(o.returnTypeError);
          else if (o.code === 'invalid_arguments') a(o.argumentsError);
          else if (o.path.length === 0) s._errors.push(t(o));
          else {
            let d = s,
              h = 0;
            for (; h < o.path.length; ) {
              const m = o.path[h];
              (h === o.path.length - 1
                ? ((d[m] = d[m] || { _errors: [] }), d[m]._errors.push(t(o)))
                : (d[m] = d[m] || { _errors: [] }),
                (d = d[m]),
                h++);
            }
          }
      };
    return (a(this), s);
  }
  static assert(e) {
    if (!(e instanceof _e)) throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, E.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {},
      s = [];
    for (const a of this.issues)
      if (a.path.length > 0) {
        const n = a.path[0];
        ((t[n] = t[n] || []), t[n].push(e(a)));
      } else s.push(e(a));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
_e.create = (r) => new _e(r);
const pt = (r, e) => {
  let t;
  switch (r.code) {
    case c.invalid_type:
      r.received === x.undefined
        ? (t = 'Required')
        : (t = `Expected ${r.expected}, received ${r.received}`);
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, E.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${E.joinValues(r.keys, ', ')}`;
      break;
    case c.invalid_union:
      t = 'Invalid input';
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${E.joinValues(r.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${E.joinValues(r.options)}, received '${r.received}'`;
      break;
    case c.invalid_arguments:
      t = 'Invalid function arguments';
      break;
    case c.invalid_return_type:
      t = 'Invalid function return type';
      break;
    case c.invalid_date:
      t = 'Invalid date';
      break;
    case c.invalid_string:
      typeof r.validation == 'object'
        ? 'includes' in r.validation
          ? ((t = `Invalid input: must include "${r.validation.includes}"`),
            typeof r.validation.position == 'number' &&
              (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`))
          : 'startsWith' in r.validation
            ? (t = `Invalid input: must start with "${r.validation.startsWith}"`)
            : 'endsWith' in r.validation
              ? (t = `Invalid input: must end with "${r.validation.endsWith}"`)
              : E.assertNever(r.validation)
        : r.validation !== 'regex'
          ? (t = `Invalid ${r.validation}`)
          : (t = 'Invalid');
      break;
    case c.too_small:
      r.type === 'array'
        ? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'more than'} ${r.minimum} element(s)`)
        : r.type === 'string'
          ? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'over'} ${r.minimum} character(s)`)
          : r.type === 'number'
            ? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
            : r.type === 'bigint'
              ? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
              : r.type === 'date'
                ? (t = `Date must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(r.minimum))}`)
                : (t = 'Invalid input');
      break;
    case c.too_big:
      r.type === 'array'
        ? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'less than'} ${r.maximum} element(s)`)
        : r.type === 'string'
          ? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'under'} ${r.maximum} character(s)`)
          : r.type === 'number'
            ? (t = `Number must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
            : r.type === 'bigint'
              ? (t = `BigInt must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
              : r.type === 'date'
                ? (t = `Date must be ${r.exact ? 'exactly' : r.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(r.maximum))}`)
                : (t = 'Invalid input');
      break;
    case c.custom:
      t = 'Invalid input';
      break;
    case c.invalid_intersection_types:
      t = 'Intersection results could not be merged';
      break;
    case c.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case c.not_finite:
      t = 'Number must be finite';
      break;
    default:
      ((t = e.defaultError), E.assertNever(r));
  }
  return { message: t };
};
let gs = pt;
function _s() {
  return gs;
}
const vs = (r) => {
  const { data: e, path: t, errorMaps: s, issueData: a } = r,
    n = [...t, ...(a.path || [])],
    o = { ...a, path: n };
  if (a.message !== void 0) return { ...a, path: n, message: a.message };
  let d = '';
  const h = s
    .filter((m) => !!m)
    .slice()
    .reverse();
  for (const m of h) d = m(o, { data: e, defaultError: d }).message;
  return { ...a, path: n, message: d };
};
function _(r, e) {
  const t = _s(),
    s = vs({
      issueData: e,
      data: r.data,
      path: r.path,
      errorMaps: [
        r.common.contextualErrorMap,
        r.schemaErrorMap,
        t,
        t === pt ? void 0 : pt,
      ].filter((a) => !!a),
    });
  r.common.issues.push(s);
}
class se {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    this.value === 'valid' && (this.value = 'dirty');
  }
  abort() {
    this.value !== 'aborted' && (this.value = 'aborted');
  }
  static mergeArray(e, t) {
    const s = [];
    for (const a of t) {
      if (a.status === 'aborted') return C;
      (a.status === 'dirty' && e.dirty(), s.push(a.value));
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const a of t) {
      const n = await a.key,
        o = await a.value;
      s.push({ key: n, value: o });
    }
    return se.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const a of t) {
      const { key: n, value: o } = a;
      if (n.status === 'aborted' || o.status === 'aborted') return C;
      (n.status === 'dirty' && e.dirty(),
        o.status === 'dirty' && e.dirty(),
        n.value !== '__proto__' &&
          (typeof o.value < 'u' || a.alwaysSet) &&
          (s[n.value] = o.value));
    }
    return { status: e.value, value: s };
  }
}
const C = Object.freeze({ status: 'aborted' }),
  Me = (r) => ({ status: 'dirty', value: r }),
  ne = (r) => ({ status: 'valid', value: r }),
  Xt = (r) => r.status === 'aborted',
  Qt = (r) => r.status === 'dirty',
  Ee = (r) => r.status === 'valid',
  Xe = (r) => typeof Promise < 'u' && r instanceof Promise;
var b;
(function (r) {
  ((r.errToObj = (e) => (typeof e == 'string' ? { message: e } : e || {})),
    (r.toString = (e) => (typeof e == 'string' ? e : e?.message)));
})(b || (b = {}));
class we {
  constructor(e, t, s, a) {
    ((this._cachedPath = []),
      (this.parent = e),
      (this.data = t),
      (this._path = s),
      (this._key = a));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key)
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const Kt = (r, e) => {
  if (Ee(e)) return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error('Validation failed but no issues detected.');
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const t = new _e(r.common.issues);
      return ((this._error = t), this._error);
    },
  };
};
function V(r) {
  if (!r) return {};
  const {
    errorMap: e,
    invalid_type_error: t,
    required_error: s,
    description: a,
  } = r;
  if (e && (t || s))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return e
    ? { errorMap: e, description: a }
    : {
        errorMap: (o, d) => {
          const { message: h } = r;
          return o.code === 'invalid_enum_value'
            ? { message: h ?? d.defaultError }
            : typeof d.data > 'u'
              ? { message: h ?? s ?? d.defaultError }
              : o.code !== 'invalid_type'
                ? { message: d.defaultError }
                : { message: h ?? t ?? d.defaultError };
        },
        description: a,
      };
}
class N {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return xe(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: xe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new se(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: xe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (Xe(t)) throw new Error('Synchronous parse encountered promise.');
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success) return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    const s = {
        common: {
          issues: [],
          async: t?.async ?? !1,
          contextualErrorMap: t?.errorMap,
        },
        path: t?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: xe(e),
      },
      a = this._parseSync({ data: e, path: s.path, parent: s });
    return Kt(s, a);
  }
  '~validate'(e) {
    const t = {
      common: { issues: [], async: !!this['~standard'].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: xe(e),
    };
    if (!this['~standard'].async)
      try {
        const s = this._parseSync({ data: e, path: [], parent: t });
        return Ee(s) ? { value: s.value } : { issues: t.common.issues };
      } catch (s) {
        (s?.message?.toLowerCase()?.includes('encountered') &&
          (this['~standard'].async = !0),
          (t.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then((s) =>
      Ee(s) ? { value: s.value } : { issues: t.common.issues },
    );
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success) return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
        common: { issues: [], contextualErrorMap: t?.errorMap, async: !0 },
        path: t?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: xe(e),
      },
      a = this._parse({ data: e, path: s.path, parent: s }),
      n = await (Xe(a) ? a : Promise.resolve(a));
    return Kt(s, n);
  }
  refine(e, t) {
    const s = (a) =>
      typeof t == 'string' || typeof t > 'u'
        ? { message: t }
        : typeof t == 'function'
          ? t(a)
          : t;
    return this._refinement((a, n) => {
      const o = e(a),
        d = () => n.addIssue({ code: c.custom, ...s(a) });
      return typeof Promise < 'u' && o instanceof Promise
        ? o.then((h) => (h ? !0 : (d(), !1)))
        : o
          ? !0
          : (d(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, a) =>
      e(s) ? !0 : (a.addIssue(typeof t == 'function' ? t(s, a) : t), !1),
    );
  }
  _refinement(e) {
    return new je({
      schema: this,
      typeName: A.ZodEffects,
      effect: { type: 'refinement', refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    ((this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this['~standard'] = {
        version: 1,
        vendor: 'zod',
        validate: (t) => this['~validate'](t),
      }));
  }
  optional() {
    return ke.create(this, this._def);
  }
  nullable() {
    return De.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ye.create(this);
  }
  promise() {
    return tt.create(this, this._def);
  }
  or(e) {
    return Ke.create([this, e], this._def);
  }
  and(e) {
    return et.create(this, e, this._def);
  }
  transform(e) {
    return new je({
      ...V(this._def),
      schema: this,
      typeName: A.ZodEffects,
      effect: { type: 'transform', transform: e },
    });
  }
  default(e) {
    const t = typeof e == 'function' ? e : () => e;
    return new _t({
      ...V(this._def),
      innerType: this,
      defaultValue: t,
      typeName: A.ZodDefault,
    });
  }
  brand() {
    return new Us({ typeName: A.ZodBranded, type: this, ...V(this._def) });
  }
  catch(e) {
    const t = typeof e == 'function' ? e : () => e;
    return new vt({
      ...V(this._def),
      innerType: this,
      catchValue: t,
      typeName: A.ZodCatch,
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({ ...this._def, description: e });
  }
  pipe(e) {
    return Ot.create(this, e);
  }
  readonly() {
    return xt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const xs = /^c[^\s-]{8,}$/i,
  bs = /^[0-9a-z]+$/,
  ks = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  ws =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  Cs = /^[a-z0-9_-]{21}$/i,
  As = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  Ss =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Vs =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  Os = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
let ft;
const Ts =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Ns =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  Fs =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  Rs =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Es = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Is = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Cr =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  js = new RegExp(`^${Cr}$`);
function Ar(r) {
  let e = '[0-5]\\d';
  r.precision
    ? (e = `${e}\\.\\d{${r.precision}}`)
    : r.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = r.precision ? '+' : '?';
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function Ds(r) {
  return new RegExp(`^${Ar(r)}$`);
}
function Zs(r) {
  let e = `${Cr}T${Ar(r)}`;
  const t = [];
  return (
    t.push(r.local ? 'Z?' : 'Z'),
    r.offset && t.push('([+-]\\d{2}:?\\d{2})'),
    (e = `${e}(${t.join('|')})`),
    new RegExp(`^${e}$`)
  );
}
function Ls(r, e) {
  return !!(
    ((e === 'v4' || !e) && Ts.test(r)) ||
    ((e === 'v6' || !e) && Fs.test(r))
  );
}
function Ms(r, e) {
  if (!As.test(r)) return !1;
  try {
    const [t] = r.split('.');
    if (!t) return !1;
    const s = t
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(t.length + ((4 - (t.length % 4)) % 4), '='),
      a = JSON.parse(atob(s));
    return !(
      typeof a != 'object' ||
      a === null ||
      ('typ' in a && a?.typ !== 'JWT') ||
      !a.alg ||
      (e && a.alg !== e)
    );
  } catch {
    return !1;
  }
}
function $s(r, e) {
  return !!(
    ((e === 'v4' || !e) && Ns.test(r)) ||
    ((e === 'v6' || !e) && Rs.test(r))
  );
}
class be extends N {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== x.string)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        _(n, {
          code: c.invalid_type,
          expected: x.string,
          received: n.parsedType,
        }),
        C
      );
    }
    const s = new se();
    let a;
    for (const n of this._def.checks)
      if (n.kind === 'min')
        e.data.length < n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            code: c.too_small,
            minimum: n.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'max')
        e.data.length > n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            code: c.too_big,
            maximum: n.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'length') {
        const o = e.data.length > n.value,
          d = e.data.length < n.value;
        (o || d) &&
          ((a = this._getOrReturnCtx(e, a)),
          o
            ? _(a, {
                code: c.too_big,
                maximum: n.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: n.message,
              })
            : d &&
              _(a, {
                code: c.too_small,
                minimum: n.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: n.message,
              }),
          s.dirty());
      } else if (n.kind === 'email')
        Vs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            validation: 'email',
            code: c.invalid_string,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'emoji')
        (ft || (ft = new RegExp(Os, 'u')),
          ft.test(e.data) ||
            ((a = this._getOrReturnCtx(e, a)),
            _(a, {
              validation: 'emoji',
              code: c.invalid_string,
              message: n.message,
            }),
            s.dirty()));
      else if (n.kind === 'uuid')
        ws.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            validation: 'uuid',
            code: c.invalid_string,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'nanoid')
        Cs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            validation: 'nanoid',
            code: c.invalid_string,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'cuid')
        xs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            validation: 'cuid',
            code: c.invalid_string,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'cuid2')
        bs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            validation: 'cuid2',
            code: c.invalid_string,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'ulid')
        ks.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            validation: 'ulid',
            code: c.invalid_string,
            message: n.message,
          }),
          s.dirty());
      else if (n.kind === 'url')
        try {
          new URL(e.data);
        } catch {
          ((a = this._getOrReturnCtx(e, a)),
            _(a, {
              validation: 'url',
              code: c.invalid_string,
              message: n.message,
            }),
            s.dirty());
        }
      else
        n.kind === 'regex'
          ? ((n.regex.lastIndex = 0),
            n.regex.test(e.data) ||
              ((a = this._getOrReturnCtx(e, a)),
              _(a, {
                validation: 'regex',
                code: c.invalid_string,
                message: n.message,
              }),
              s.dirty()))
          : n.kind === 'trim'
            ? (e.data = e.data.trim())
            : n.kind === 'includes'
              ? e.data.includes(n.value, n.position) ||
                ((a = this._getOrReturnCtx(e, a)),
                _(a, {
                  code: c.invalid_string,
                  validation: { includes: n.value, position: n.position },
                  message: n.message,
                }),
                s.dirty())
              : n.kind === 'toLowerCase'
                ? (e.data = e.data.toLowerCase())
                : n.kind === 'toUpperCase'
                  ? (e.data = e.data.toUpperCase())
                  : n.kind === 'startsWith'
                    ? e.data.startsWith(n.value) ||
                      ((a = this._getOrReturnCtx(e, a)),
                      _(a, {
                        code: c.invalid_string,
                        validation: { startsWith: n.value },
                        message: n.message,
                      }),
                      s.dirty())
                    : n.kind === 'endsWith'
                      ? e.data.endsWith(n.value) ||
                        ((a = this._getOrReturnCtx(e, a)),
                        _(a, {
                          code: c.invalid_string,
                          validation: { endsWith: n.value },
                          message: n.message,
                        }),
                        s.dirty())
                      : n.kind === 'datetime'
                        ? Zs(n).test(e.data) ||
                          ((a = this._getOrReturnCtx(e, a)),
                          _(a, {
                            code: c.invalid_string,
                            validation: 'datetime',
                            message: n.message,
                          }),
                          s.dirty())
                        : n.kind === 'date'
                          ? js.test(e.data) ||
                            ((a = this._getOrReturnCtx(e, a)),
                            _(a, {
                              code: c.invalid_string,
                              validation: 'date',
                              message: n.message,
                            }),
                            s.dirty())
                          : n.kind === 'time'
                            ? Ds(n).test(e.data) ||
                              ((a = this._getOrReturnCtx(e, a)),
                              _(a, {
                                code: c.invalid_string,
                                validation: 'time',
                                message: n.message,
                              }),
                              s.dirty())
                            : n.kind === 'duration'
                              ? Ss.test(e.data) ||
                                ((a = this._getOrReturnCtx(e, a)),
                                _(a, {
                                  validation: 'duration',
                                  code: c.invalid_string,
                                  message: n.message,
                                }),
                                s.dirty())
                              : n.kind === 'ip'
                                ? Ls(e.data, n.version) ||
                                  ((a = this._getOrReturnCtx(e, a)),
                                  _(a, {
                                    validation: 'ip',
                                    code: c.invalid_string,
                                    message: n.message,
                                  }),
                                  s.dirty())
                                : n.kind === 'jwt'
                                  ? Ms(e.data, n.alg) ||
                                    ((a = this._getOrReturnCtx(e, a)),
                                    _(a, {
                                      validation: 'jwt',
                                      code: c.invalid_string,
                                      message: n.message,
                                    }),
                                    s.dirty())
                                  : n.kind === 'cidr'
                                    ? $s(e.data, n.version) ||
                                      ((a = this._getOrReturnCtx(e, a)),
                                      _(a, {
                                        validation: 'cidr',
                                        code: c.invalid_string,
                                        message: n.message,
                                      }),
                                      s.dirty())
                                    : n.kind === 'base64'
                                      ? Es.test(e.data) ||
                                        ((a = this._getOrReturnCtx(e, a)),
                                        _(a, {
                                          validation: 'base64',
                                          code: c.invalid_string,
                                          message: n.message,
                                        }),
                                        s.dirty())
                                      : n.kind === 'base64url'
                                        ? Is.test(e.data) ||
                                          ((a = this._getOrReturnCtx(e, a)),
                                          _(a, {
                                            validation: 'base64url',
                                            code: c.invalid_string,
                                            message: n.message,
                                          }),
                                          s.dirty())
                                        : E.assertNever(n);
    return { status: s.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement((a) => e.test(a), {
      validation: t,
      code: c.invalid_string,
      ...b.errToObj(s),
    });
  }
  _addCheck(e) {
    return new be({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: 'email', ...b.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: 'url', ...b.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: 'emoji', ...b.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: 'uuid', ...b.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: 'nanoid', ...b.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: 'cuid', ...b.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: 'cuid2', ...b.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: 'ulid', ...b.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: 'base64', ...b.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({ kind: 'base64url', ...b.errToObj(e) });
  }
  jwt(e) {
    return this._addCheck({ kind: 'jwt', ...b.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: 'ip', ...b.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: 'cidr', ...b.errToObj(e) });
  }
  datetime(e) {
    return typeof e == 'string'
      ? this._addCheck({
          kind: 'datetime',
          precision: null,
          offset: !1,
          local: !1,
          message: e,
        })
      : this._addCheck({
          kind: 'datetime',
          precision: typeof e?.precision > 'u' ? null : e?.precision,
          offset: e?.offset ?? !1,
          local: e?.local ?? !1,
          ...b.errToObj(e?.message),
        });
  }
  date(e) {
    return this._addCheck({ kind: 'date', message: e });
  }
  time(e) {
    return typeof e == 'string'
      ? this._addCheck({ kind: 'time', precision: null, message: e })
      : this._addCheck({
          kind: 'time',
          precision: typeof e?.precision > 'u' ? null : e?.precision,
          ...b.errToObj(e?.message),
        });
  }
  duration(e) {
    return this._addCheck({ kind: 'duration', ...b.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: 'regex', regex: e, ...b.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: 'includes',
      value: e,
      position: t?.position,
      ...b.errToObj(t?.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: 'startsWith', value: e, ...b.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: 'endsWith', value: e, ...b.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: 'min', value: e, ...b.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: 'max', value: e, ...b.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: 'length', value: e, ...b.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, b.errToObj(e));
  }
  trim() {
    return new be({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }],
    });
  }
  toLowerCase() {
    return new be({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }],
    });
  }
  toUpperCase() {
    return new be({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === 'base64url');
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
be.create = (r) =>
  new be({
    checks: [],
    typeName: A.ZodString,
    coerce: r?.coerce ?? !1,
    ...V(r),
  });
function Ps(r, e) {
  const t = (r.toString().split('.')[1] || '').length,
    s = (e.toString().split('.')[1] || '').length,
    a = t > s ? t : s,
    n = Number.parseInt(r.toFixed(a).replace('.', '')),
    o = Number.parseInt(e.toFixed(a).replace('.', ''));
  return (n % o) / 10 ** a;
}
class Ue extends N {
  constructor() {
    (super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf));
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== x.number)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        _(n, {
          code: c.invalid_type,
          expected: x.number,
          received: n.parsedType,
        }),
        C
      );
    }
    let s;
    const a = new se();
    for (const n of this._def.checks)
      n.kind === 'int'
        ? E.isInteger(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          _(s, {
            code: c.invalid_type,
            expected: 'integer',
            received: 'float',
            message: n.message,
          }),
          a.dirty())
        : n.kind === 'min'
          ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
            ((s = this._getOrReturnCtx(e, s)),
            _(s, {
              code: c.too_small,
              minimum: n.value,
              type: 'number',
              inclusive: n.inclusive,
              exact: !1,
              message: n.message,
            }),
            a.dirty())
          : n.kind === 'max'
            ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
              ((s = this._getOrReturnCtx(e, s)),
              _(s, {
                code: c.too_big,
                maximum: n.value,
                type: 'number',
                inclusive: n.inclusive,
                exact: !1,
                message: n.message,
              }),
              a.dirty())
            : n.kind === 'multipleOf'
              ? Ps(e.data, n.value) !== 0 &&
                ((s = this._getOrReturnCtx(e, s)),
                _(s, {
                  code: c.not_multiple_of,
                  multipleOf: n.value,
                  message: n.message,
                }),
                a.dirty())
              : n.kind === 'finite'
                ? Number.isFinite(e.data) ||
                  ((s = this._getOrReturnCtx(e, s)),
                  _(s, { code: c.not_finite, message: n.message }),
                  a.dirty())
                : E.assertNever(n);
    return { status: a.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, b.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, b.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, b.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, b.toString(t));
  }
  setLimit(e, t, s, a) {
    return new Ue({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: s, message: b.toString(a) },
      ],
    });
  }
  _addCheck(e) {
    return new Ue({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: 'int', message: b.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !1,
      message: b.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !1,
      message: b.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !0,
      message: b.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !0,
      message: b.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: b.toString(t),
    });
  }
  finite(e) {
    return this._addCheck({ kind: 'finite', message: b.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: 'min',
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: b.toString(e),
    })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: b.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        e.kind === 'int' || (e.kind === 'multipleOf' && E.isInteger(e.value)),
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (const s of this._def.checks) {
      if (s.kind === 'finite' || s.kind === 'int' || s.kind === 'multipleOf')
        return !0;
      s.kind === 'min'
        ? (t === null || s.value > t) && (t = s.value)
        : s.kind === 'max' && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Ue.create = (r) =>
  new Ue({
    checks: [],
    typeName: A.ZodNumber,
    coerce: r?.coerce || !1,
    ...V(r),
  });
class Be extends N {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== x.bigint) return this._getInvalidInput(e);
    let s;
    const a = new se();
    for (const n of this._def.checks)
      n.kind === 'min'
        ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
          ((s = this._getOrReturnCtx(e, s)),
          _(s, {
            code: c.too_small,
            type: 'bigint',
            minimum: n.value,
            inclusive: n.inclusive,
            message: n.message,
          }),
          a.dirty())
        : n.kind === 'max'
          ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
            ((s = this._getOrReturnCtx(e, s)),
            _(s, {
              code: c.too_big,
              type: 'bigint',
              maximum: n.value,
              inclusive: n.inclusive,
              message: n.message,
            }),
            a.dirty())
          : n.kind === 'multipleOf'
            ? e.data % n.value !== BigInt(0) &&
              ((s = this._getOrReturnCtx(e, s)),
              _(s, {
                code: c.not_multiple_of,
                multipleOf: n.value,
                message: n.message,
              }),
              a.dirty())
            : E.assertNever(n);
    return { status: a.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return (
      _(t, {
        code: c.invalid_type,
        expected: x.bigint,
        received: t.parsedType,
      }),
      C
    );
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, b.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, b.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, b.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, b.toString(t));
  }
  setLimit(e, t, s, a) {
    return new Be({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: s, message: b.toString(a) },
      ],
    });
  }
  _addCheck(e) {
    return new Be({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !1,
      message: b.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !1,
      message: b.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !0,
      message: b.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !0,
      message: b.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: b.toString(t),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Be.create = (r) =>
  new Be({
    checks: [],
    typeName: A.ZodBigInt,
    coerce: r?.coerce ?? !1,
    ...V(r),
  });
class er extends N {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== x.boolean)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        _(s, {
          code: c.invalid_type,
          expected: x.boolean,
          received: s.parsedType,
        }),
        C
      );
    }
    return ne(e.data);
  }
}
er.create = (r) =>
  new er({ typeName: A.ZodBoolean, coerce: r?.coerce || !1, ...V(r) });
class Qe extends N {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== x.date)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        _(n, {
          code: c.invalid_type,
          expected: x.date,
          received: n.parsedType,
        }),
        C
      );
    }
    if (Number.isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return (_(n, { code: c.invalid_date }), C);
    }
    const s = new se();
    let a;
    for (const n of this._def.checks)
      n.kind === 'min'
        ? e.data.getTime() < n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          _(a, {
            code: c.too_small,
            message: n.message,
            inclusive: !0,
            exact: !1,
            minimum: n.value,
            type: 'date',
          }),
          s.dirty())
        : n.kind === 'max'
          ? e.data.getTime() > n.value &&
            ((a = this._getOrReturnCtx(e, a)),
            _(a, {
              code: c.too_big,
              message: n.message,
              inclusive: !0,
              exact: !1,
              maximum: n.value,
              type: 'date',
            }),
            s.dirty())
          : E.assertNever(n);
    return { status: s.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new Qe({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: 'min',
      value: e.getTime(),
      message: b.toString(t),
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: 'max',
      value: e.getTime(),
      message: b.toString(t),
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
Qe.create = (r) =>
  new Qe({ checks: [], coerce: r?.coerce || !1, typeName: A.ZodDate, ...V(r) });
class tr extends N {
  _parse(e) {
    if (this._getType(e) !== x.symbol) {
      const s = this._getOrReturnCtx(e);
      return (
        _(s, {
          code: c.invalid_type,
          expected: x.symbol,
          received: s.parsedType,
        }),
        C
      );
    }
    return ne(e.data);
  }
}
tr.create = (r) => new tr({ typeName: A.ZodSymbol, ...V(r) });
class rr extends N {
  _parse(e) {
    if (this._getType(e) !== x.undefined) {
      const s = this._getOrReturnCtx(e);
      return (
        _(s, {
          code: c.invalid_type,
          expected: x.undefined,
          received: s.parsedType,
        }),
        C
      );
    }
    return ne(e.data);
  }
}
rr.create = (r) => new rr({ typeName: A.ZodUndefined, ...V(r) });
class sr extends N {
  _parse(e) {
    if (this._getType(e) !== x.null) {
      const s = this._getOrReturnCtx(e);
      return (
        _(s, {
          code: c.invalid_type,
          expected: x.null,
          received: s.parsedType,
        }),
        C
      );
    }
    return ne(e.data);
  }
}
sr.create = (r) => new sr({ typeName: A.ZodNull, ...V(r) });
class ar extends N {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(e) {
    return ne(e.data);
  }
}
ar.create = (r) => new ar({ typeName: A.ZodAny, ...V(r) });
class nr extends N {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(e) {
    return ne(e.data);
  }
}
nr.create = (r) => new nr({ typeName: A.ZodUnknown, ...V(r) });
class Ce extends N {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return (
      _(t, { code: c.invalid_type, expected: x.never, received: t.parsedType }),
      C
    );
  }
}
Ce.create = (r) => new Ce({ typeName: A.ZodNever, ...V(r) });
class ir extends N {
  _parse(e) {
    if (this._getType(e) !== x.undefined) {
      const s = this._getOrReturnCtx(e);
      return (
        _(s, {
          code: c.invalid_type,
          expected: x.void,
          received: s.parsedType,
        }),
        C
      );
    }
    return ne(e.data);
  }
}
ir.create = (r) => new ir({ typeName: A.ZodVoid, ...V(r) });
class ye extends N {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e),
      a = this._def;
    if (t.parsedType !== x.array)
      return (
        _(t, {
          code: c.invalid_type,
          expected: x.array,
          received: t.parsedType,
        }),
        C
      );
    if (a.exactLength !== null) {
      const o = t.data.length > a.exactLength.value,
        d = t.data.length < a.exactLength.value;
      (o || d) &&
        (_(t, {
          code: o ? c.too_big : c.too_small,
          minimum: d ? a.exactLength.value : void 0,
          maximum: o ? a.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: a.exactLength.message,
        }),
        s.dirty());
    }
    if (
      (a.minLength !== null &&
        t.data.length < a.minLength.value &&
        (_(t, {
          code: c.too_small,
          minimum: a.minLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.minLength.message,
        }),
        s.dirty()),
      a.maxLength !== null &&
        t.data.length > a.maxLength.value &&
        (_(t, {
          code: c.too_big,
          maximum: a.maxLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.maxLength.message,
        }),
        s.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((o, d) => a.type._parseAsync(new we(t, o, t.path, d))),
      ).then((o) => se.mergeArray(s, o));
    const n = [...t.data].map((o, d) =>
      a.type._parseSync(new we(t, o, t.path, d)),
    );
    return se.mergeArray(s, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new ye({
      ...this._def,
      minLength: { value: e, message: b.toString(t) },
    });
  }
  max(e, t) {
    return new ye({
      ...this._def,
      maxLength: { value: e, message: b.toString(t) },
    });
  }
  length(e, t) {
    return new ye({
      ...this._def,
      exactLength: { value: e, message: b.toString(t) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ye.create = (r, e) =>
  new ye({
    type: r,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: A.ZodArray,
    ...V(e),
  });
function Re(r) {
  if (r instanceof W) {
    const e = {};
    for (const t in r.shape) {
      const s = r.shape[t];
      e[t] = ke.create(Re(s));
    }
    return new W({ ...r._def, shape: () => e });
  } else
    return r instanceof ye
      ? new ye({ ...r._def, type: Re(r.element) })
      : r instanceof ke
        ? ke.create(Re(r.unwrap()))
        : r instanceof De
          ? De.create(Re(r.unwrap()))
          : r instanceof Oe
            ? Oe.create(r.items.map((e) => Re(e)))
            : r;
}
class W extends N {
  constructor() {
    (super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const e = this._def.shape(),
      t = E.objectKeys(e);
    return ((this._cached = { shape: e, keys: t }), this._cached);
  }
  _parse(e) {
    if (this._getType(e) !== x.object) {
      const m = this._getOrReturnCtx(e);
      return (
        _(m, {
          code: c.invalid_type,
          expected: x.object,
          received: m.parsedType,
        }),
        C
      );
    }
    const { status: s, ctx: a } = this._processInputParams(e),
      { shape: n, keys: o } = this._getCached(),
      d = [];
    if (
      !(this._def.catchall instanceof Ce && this._def.unknownKeys === 'strip')
    )
      for (const m in a.data) o.includes(m) || d.push(m);
    const h = [];
    for (const m of o) {
      const g = n[m],
        T = a.data[m];
      h.push({
        key: { status: 'valid', value: m },
        value: g._parse(new we(a, T, a.path, m)),
        alwaysSet: m in a.data,
      });
    }
    if (this._def.catchall instanceof Ce) {
      const m = this._def.unknownKeys;
      if (m === 'passthrough')
        for (const g of d)
          h.push({
            key: { status: 'valid', value: g },
            value: { status: 'valid', value: a.data[g] },
          });
      else if (m === 'strict')
        d.length > 0 &&
          (_(a, { code: c.unrecognized_keys, keys: d }), s.dirty());
      else if (m !== 'strip')
        throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const m = this._def.catchall;
      for (const g of d) {
        const T = a.data[g];
        h.push({
          key: { status: 'valid', value: g },
          value: m._parse(new we(a, T, a.path, g)),
          alwaysSet: g in a.data,
        });
      }
    }
    return a.common.async
      ? Promise.resolve()
          .then(async () => {
            const m = [];
            for (const g of h) {
              const T = await g.key,
                w = await g.value;
              m.push({ key: T, value: w, alwaysSet: g.alwaysSet });
            }
            return m;
          })
          .then((m) => se.mergeObjectSync(s, m))
      : se.mergeObjectSync(s, h);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      b.errToObj,
      new W({
        ...this._def,
        unknownKeys: 'strict',
        ...(e !== void 0
          ? {
              errorMap: (t, s) => {
                const a = this._def.errorMap?.(t, s).message ?? s.defaultError;
                return t.code === 'unrecognized_keys'
                  ? { message: b.errToObj(e).message ?? a }
                  : { message: a };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new W({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new W({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(e) {
    return new W({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new W({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: A.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new W({ ...this._def, catchall: e });
  }
  pick(e) {
    const t = {};
    for (const s of E.objectKeys(e))
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    return new W({ ...this._def, shape: () => t });
  }
  omit(e) {
    const t = {};
    for (const s of E.objectKeys(this.shape)) e[s] || (t[s] = this.shape[s]);
    return new W({ ...this._def, shape: () => t });
  }
  deepPartial() {
    return Re(this);
  }
  partial(e) {
    const t = {};
    for (const s of E.objectKeys(this.shape)) {
      const a = this.shape[s];
      e && !e[s] ? (t[s] = a) : (t[s] = a.optional());
    }
    return new W({ ...this._def, shape: () => t });
  }
  required(e) {
    const t = {};
    for (const s of E.objectKeys(this.shape))
      if (e && !e[s]) t[s] = this.shape[s];
      else {
        let n = this.shape[s];
        for (; n instanceof ke; ) n = n._def.innerType;
        t[s] = n;
      }
    return new W({ ...this._def, shape: () => t });
  }
  keyof() {
    return Sr(E.objectKeys(this.shape));
  }
}
W.create = (r, e) =>
  new W({
    shape: () => r,
    unknownKeys: 'strip',
    catchall: Ce.create(),
    typeName: A.ZodObject,
    ...V(e),
  });
W.strictCreate = (r, e) =>
  new W({
    shape: () => r,
    unknownKeys: 'strict',
    catchall: Ce.create(),
    typeName: A.ZodObject,
    ...V(e),
  });
W.lazycreate = (r, e) =>
  new W({
    shape: r,
    unknownKeys: 'strip',
    catchall: Ce.create(),
    typeName: A.ZodObject,
    ...V(e),
  });
class Ke extends N {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = this._def.options;
    function a(n) {
      for (const d of n) if (d.result.status === 'valid') return d.result;
      for (const d of n)
        if (d.result.status === 'dirty')
          return (t.common.issues.push(...d.ctx.common.issues), d.result);
      const o = n.map((d) => new _e(d.ctx.common.issues));
      return (_(t, { code: c.invalid_union, unionErrors: o }), C);
    }
    if (t.common.async)
      return Promise.all(
        s.map(async (n) => {
          const o = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return {
            result: await n._parseAsync({
              data: t.data,
              path: t.path,
              parent: o,
            }),
            ctx: o,
          };
        }),
      ).then(a);
    {
      let n;
      const o = [];
      for (const h of s) {
        const m = { ...t, common: { ...t.common, issues: [] }, parent: null },
          g = h._parseSync({ data: t.data, path: t.path, parent: m });
        if (g.status === 'valid') return g;
        (g.status === 'dirty' && !n && (n = { result: g, ctx: m }),
          m.common.issues.length && o.push(m.common.issues));
      }
      if (n) return (t.common.issues.push(...n.ctx.common.issues), n.result);
      const d = o.map((h) => new _e(h));
      return (_(t, { code: c.invalid_union, unionErrors: d }), C);
    }
  }
  get options() {
    return this._def.options;
  }
}
Ke.create = (r, e) => new Ke({ options: r, typeName: A.ZodUnion, ...V(e) });
function gt(r, e) {
  const t = xe(r),
    s = xe(e);
  if (r === e) return { valid: !0, data: r };
  if (t === x.object && s === x.object) {
    const a = E.objectKeys(e),
      n = E.objectKeys(r).filter((d) => a.indexOf(d) !== -1),
      o = { ...r, ...e };
    for (const d of n) {
      const h = gt(r[d], e[d]);
      if (!h.valid) return { valid: !1 };
      o[d] = h.data;
    }
    return { valid: !0, data: o };
  } else if (t === x.array && s === x.array) {
    if (r.length !== e.length) return { valid: !1 };
    const a = [];
    for (let n = 0; n < r.length; n++) {
      const o = r[n],
        d = e[n],
        h = gt(o, d);
      if (!h.valid) return { valid: !1 };
      a.push(h.data);
    }
    return { valid: !0, data: a };
  } else
    return t === x.date && s === x.date && +r == +e
      ? { valid: !0, data: r }
      : { valid: !1 };
}
class et extends N {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e),
      a = (n, o) => {
        if (Xt(n) || Xt(o)) return C;
        const d = gt(n.value, o.value);
        return d.valid
          ? ((Qt(n) || Qt(o)) && t.dirty(), { status: t.value, value: d.data })
          : (_(s, { code: c.invalid_intersection_types }), C);
      };
    return s.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseAsync({
            data: s.data,
            path: s.path,
            parent: s,
          }),
        ]).then(([n, o]) => a(n, o))
      : a(
          this._def.left._parseSync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseSync({ data: s.data, path: s.path, parent: s }),
        );
  }
}
et.create = (r, e, t) =>
  new et({ left: r, right: e, typeName: A.ZodIntersection, ...V(t) });
class Oe extends N {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== x.array)
      return (
        _(s, {
          code: c.invalid_type,
          expected: x.array,
          received: s.parsedType,
        }),
        C
      );
    if (s.data.length < this._def.items.length)
      return (
        _(s, {
          code: c.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: 'array',
        }),
        C
      );
    !this._def.rest &&
      s.data.length > this._def.items.length &&
      (_(s, {
        code: c.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: 'array',
      }),
      t.dirty());
    const n = [...s.data]
      .map((o, d) => {
        const h = this._def.items[d] || this._def.rest;
        return h ? h._parse(new we(s, o, s.path, d)) : null;
      })
      .filter((o) => !!o);
    return s.common.async
      ? Promise.all(n).then((o) => se.mergeArray(t, o))
      : se.mergeArray(t, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Oe({ ...this._def, rest: e });
  }
}
Oe.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new Oe({ items: r, typeName: A.ZodTuple, rest: null, ...V(e) });
};
class or extends N {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== x.map)
      return (
        _(s, { code: c.invalid_type, expected: x.map, received: s.parsedType }),
        C
      );
    const a = this._def.keyType,
      n = this._def.valueType,
      o = [...s.data.entries()].map(([d, h], m) => ({
        key: a._parse(new we(s, d, s.path, [m, 'key'])),
        value: n._parse(new we(s, h, s.path, [m, 'value'])),
      }));
    if (s.common.async) {
      const d = new Map();
      return Promise.resolve().then(async () => {
        for (const h of o) {
          const m = await h.key,
            g = await h.value;
          if (m.status === 'aborted' || g.status === 'aborted') return C;
          ((m.status === 'dirty' || g.status === 'dirty') && t.dirty(),
            d.set(m.value, g.value));
        }
        return { status: t.value, value: d };
      });
    } else {
      const d = new Map();
      for (const h of o) {
        const m = h.key,
          g = h.value;
        if (m.status === 'aborted' || g.status === 'aborted') return C;
        ((m.status === 'dirty' || g.status === 'dirty') && t.dirty(),
          d.set(m.value, g.value));
      }
      return { status: t.value, value: d };
    }
  }
}
or.create = (r, e, t) =>
  new or({ valueType: e, keyType: r, typeName: A.ZodMap, ...V(t) });
class ze extends N {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== x.set)
      return (
        _(s, { code: c.invalid_type, expected: x.set, received: s.parsedType }),
        C
      );
    const a = this._def;
    (a.minSize !== null &&
      s.data.size < a.minSize.value &&
      (_(s, {
        code: c.too_small,
        minimum: a.minSize.value,
        type: 'set',
        inclusive: !0,
        exact: !1,
        message: a.minSize.message,
      }),
      t.dirty()),
      a.maxSize !== null &&
        s.data.size > a.maxSize.value &&
        (_(s, {
          code: c.too_big,
          maximum: a.maxSize.value,
          type: 'set',
          inclusive: !0,
          exact: !1,
          message: a.maxSize.message,
        }),
        t.dirty()));
    const n = this._def.valueType;
    function o(h) {
      const m = new Set();
      for (const g of h) {
        if (g.status === 'aborted') return C;
        (g.status === 'dirty' && t.dirty(), m.add(g.value));
      }
      return { status: t.value, value: m };
    }
    const d = [...s.data.values()].map((h, m) =>
      n._parse(new we(s, h, s.path, m)),
    );
    return s.common.async ? Promise.all(d).then((h) => o(h)) : o(d);
  }
  min(e, t) {
    return new ze({
      ...this._def,
      minSize: { value: e, message: b.toString(t) },
    });
  }
  max(e, t) {
    return new ze({
      ...this._def,
      maxSize: { value: e, message: b.toString(t) },
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ze.create = (r, e) =>
  new ze({
    valueType: r,
    minSize: null,
    maxSize: null,
    typeName: A.ZodSet,
    ...V(e),
  });
class dr extends N {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
dr.create = (r, e) => new dr({ getter: r, typeName: A.ZodLazy, ...V(e) });
class lr extends N {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return (
        _(t, {
          received: t.data,
          code: c.invalid_literal,
          expected: this._def.value,
        }),
        C
      );
    }
    return { status: 'valid', value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
lr.create = (r, e) => new lr({ value: r, typeName: A.ZodLiteral, ...V(e) });
function Sr(r, e) {
  return new Ie({ values: r, typeName: A.ZodEnum, ...V(e) });
}
class Ie extends N {
  _parse(e) {
    if (typeof e.data != 'string') {
      const t = this._getOrReturnCtx(e),
        s = this._def.values;
      return (
        _(t, {
          expected: E.joinValues(s),
          received: t.parsedType,
          code: c.invalid_type,
        }),
        C
      );
    }
    if (
      (this._cache || (this._cache = new Set(this._def.values)),
      !this._cache.has(e.data))
    ) {
      const t = this._getOrReturnCtx(e),
        s = this._def.values;
      return (
        _(t, { received: t.data, code: c.invalid_enum_value, options: s }),
        C
      );
    }
    return ne(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return Ie.create(e, { ...this._def, ...t });
  }
  exclude(e, t = this._def) {
    return Ie.create(
      this.options.filter((s) => !e.includes(s)),
      { ...this._def, ...t },
    );
  }
}
Ie.create = Sr;
class ur extends N {
  _parse(e) {
    const t = E.getValidEnumValues(this._def.values),
      s = this._getOrReturnCtx(e);
    if (s.parsedType !== x.string && s.parsedType !== x.number) {
      const a = E.objectValues(t);
      return (
        _(s, {
          expected: E.joinValues(a),
          received: s.parsedType,
          code: c.invalid_type,
        }),
        C
      );
    }
    if (
      (this._cache ||
        (this._cache = new Set(E.getValidEnumValues(this._def.values))),
      !this._cache.has(e.data))
    ) {
      const a = E.objectValues(t);
      return (
        _(s, { received: s.data, code: c.invalid_enum_value, options: a }),
        C
      );
    }
    return ne(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
ur.create = (r, e) => new ur({ values: r, typeName: A.ZodNativeEnum, ...V(e) });
class tt extends N {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== x.promise && t.common.async === !1)
      return (
        _(t, {
          code: c.invalid_type,
          expected: x.promise,
          received: t.parsedType,
        }),
        C
      );
    const s = t.parsedType === x.promise ? t.data : Promise.resolve(t.data);
    return ne(
      s.then((a) =>
        this._def.type.parseAsync(a, {
          path: t.path,
          errorMap: t.common.contextualErrorMap,
        }),
      ),
    );
  }
}
tt.create = (r, e) => new tt({ type: r, typeName: A.ZodPromise, ...V(e) });
class je extends N {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === A.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e),
      a = this._def.effect || null,
      n = {
        addIssue: (o) => {
          (_(s, o), o.fatal ? t.abort() : t.dirty());
        },
        get path() {
          return s.path;
        },
      };
    if (((n.addIssue = n.addIssue.bind(n)), a.type === 'preprocess')) {
      const o = a.transform(s.data, n);
      if (s.common.async)
        return Promise.resolve(o).then(async (d) => {
          if (t.value === 'aborted') return C;
          const h = await this._def.schema._parseAsync({
            data: d,
            path: s.path,
            parent: s,
          });
          return h.status === 'aborted'
            ? C
            : h.status === 'dirty' || t.value === 'dirty'
              ? Me(h.value)
              : h;
        });
      {
        if (t.value === 'aborted') return C;
        const d = this._def.schema._parseSync({
          data: o,
          path: s.path,
          parent: s,
        });
        return d.status === 'aborted'
          ? C
          : d.status === 'dirty' || t.value === 'dirty'
            ? Me(d.value)
            : d;
      }
    }
    if (a.type === 'refinement') {
      const o = (d) => {
        const h = a.refinement(d, n);
        if (s.common.async) return Promise.resolve(h);
        if (h instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return d;
      };
      if (s.common.async === !1) {
        const d = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return d.status === 'aborted'
          ? C
          : (d.status === 'dirty' && t.dirty(),
            o(d.value),
            { status: t.value, value: d.value });
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then((d) =>
            d.status === 'aborted'
              ? C
              : (d.status === 'dirty' && t.dirty(),
                o(d.value).then(() => ({ status: t.value, value: d.value }))),
          );
    }
    if (a.type === 'transform')
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        if (!Ee(o)) return C;
        const d = a.transform(o.value, n);
        if (d instanceof Promise)
          throw new Error(
            'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return { status: t.value, value: d };
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then((o) =>
            Ee(o)
              ? Promise.resolve(a.transform(o.value, n)).then((d) => ({
                  status: t.value,
                  value: d,
                }))
              : C,
          );
    E.assertNever(a);
  }
}
je.create = (r, e, t) =>
  new je({ schema: r, typeName: A.ZodEffects, effect: e, ...V(t) });
je.createWithPreprocess = (r, e, t) =>
  new je({
    schema: e,
    effect: { type: 'preprocess', transform: r },
    typeName: A.ZodEffects,
    ...V(t),
  });
class ke extends N {
  _parse(e) {
    return this._getType(e) === x.undefined
      ? ne(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ke.create = (r, e) =>
  new ke({ innerType: r, typeName: A.ZodOptional, ...V(e) });
class De extends N {
  _parse(e) {
    return this._getType(e) === x.null
      ? ne(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
De.create = (r, e) =>
  new De({ innerType: r, typeName: A.ZodNullable, ...V(e) });
class _t extends N {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return (
      t.parsedType === x.undefined && (s = this._def.defaultValue()),
      this._def.innerType._parse({ data: s, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
_t.create = (r, e) =>
  new _t({
    innerType: r,
    typeName: A.ZodDefault,
    defaultValue: typeof e.default == 'function' ? e.default : () => e.default,
    ...V(e),
  });
class vt extends N {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = { ...t, common: { ...t.common, issues: [] } },
      a = this._def.innerType._parse({
        data: s.data,
        path: s.path,
        parent: { ...s },
      });
    return Xe(a)
      ? a.then((n) => ({
          status: 'valid',
          value:
            n.status === 'valid'
              ? n.value
              : this._def.catchValue({
                  get error() {
                    return new _e(s.common.issues);
                  },
                  input: s.data,
                }),
        }))
      : {
          status: 'valid',
          value:
            a.status === 'valid'
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new _e(s.common.issues);
                  },
                  input: s.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
vt.create = (r, e) =>
  new vt({
    innerType: r,
    typeName: A.ZodCatch,
    catchValue: typeof e.catch == 'function' ? e.catch : () => e.catch,
    ...V(e),
  });
class cr extends N {
  _parse(e) {
    if (this._getType(e) !== x.nan) {
      const s = this._getOrReturnCtx(e);
      return (
        _(s, { code: c.invalid_type, expected: x.nan, received: s.parsedType }),
        C
      );
    }
    return { status: 'valid', value: e.data };
  }
}
cr.create = (r) => new cr({ typeName: A.ZodNaN, ...V(r) });
class Us extends N {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = t.data;
    return this._def.type._parse({ data: s, path: t.path, parent: t });
  }
  unwrap() {
    return this._def.type;
  }
}
class Ot extends N {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return n.status === 'aborted'
          ? C
          : n.status === 'dirty'
            ? (t.dirty(), Me(n.value))
            : this._def.out._parseAsync({
                data: n.value,
                path: s.path,
                parent: s,
              });
      })();
    {
      const a = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s,
      });
      return a.status === 'aborted'
        ? C
        : a.status === 'dirty'
          ? (t.dirty(), { status: 'dirty', value: a.value })
          : this._def.out._parseSync({
              data: a.value,
              path: s.path,
              parent: s,
            });
    }
  }
  static create(e, t) {
    return new Ot({ in: e, out: t, typeName: A.ZodPipeline });
  }
}
class xt extends N {
  _parse(e) {
    const t = this._def.innerType._parse(e),
      s = (a) => (Ee(a) && (a.value = Object.freeze(a.value)), a);
    return Xe(t) ? t.then((a) => s(a)) : s(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
xt.create = (r, e) =>
  new xt({ innerType: r, typeName: A.ZodReadonly, ...V(e) });
var A;
(function (r) {
  ((r.ZodString = 'ZodString'),
    (r.ZodNumber = 'ZodNumber'),
    (r.ZodNaN = 'ZodNaN'),
    (r.ZodBigInt = 'ZodBigInt'),
    (r.ZodBoolean = 'ZodBoolean'),
    (r.ZodDate = 'ZodDate'),
    (r.ZodSymbol = 'ZodSymbol'),
    (r.ZodUndefined = 'ZodUndefined'),
    (r.ZodNull = 'ZodNull'),
    (r.ZodAny = 'ZodAny'),
    (r.ZodUnknown = 'ZodUnknown'),
    (r.ZodNever = 'ZodNever'),
    (r.ZodVoid = 'ZodVoid'),
    (r.ZodArray = 'ZodArray'),
    (r.ZodObject = 'ZodObject'),
    (r.ZodUnion = 'ZodUnion'),
    (r.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
    (r.ZodIntersection = 'ZodIntersection'),
    (r.ZodTuple = 'ZodTuple'),
    (r.ZodRecord = 'ZodRecord'),
    (r.ZodMap = 'ZodMap'),
    (r.ZodSet = 'ZodSet'),
    (r.ZodFunction = 'ZodFunction'),
    (r.ZodLazy = 'ZodLazy'),
    (r.ZodLiteral = 'ZodLiteral'),
    (r.ZodEnum = 'ZodEnum'),
    (r.ZodEffects = 'ZodEffects'),
    (r.ZodNativeEnum = 'ZodNativeEnum'),
    (r.ZodOptional = 'ZodOptional'),
    (r.ZodNullable = 'ZodNullable'),
    (r.ZodDefault = 'ZodDefault'),
    (r.ZodCatch = 'ZodCatch'),
    (r.ZodPromise = 'ZodPromise'),
    (r.ZodBranded = 'ZodBranded'),
    (r.ZodPipeline = 'ZodPipeline'),
    (r.ZodReadonly = 'ZodReadonly'));
})(A || (A = {}));
const Bs = be.create;
Ce.create;
ye.create;
const zs = W.create;
Ke.create;
et.create;
Oe.create;
const Ws = Ie.create;
tt.create;
ke.create;
De.create;
const ra = zs({
    email: Bs().email({ message: 'Invalid email address' }),
    user_type: Ws(['DJ', 'Record Store', 'Record Collector', 'Other']),
  }),
  qs = S.lazy(() =>
    $r(
      () => import('./WaitlistForm-fmR3sx0P.js'),
      __vite__mapDeps([0, 1, 2, 3, 4]),
    ),
  ),
  Hs = () =>
    R.jsx('div', {
      className:
        'relative w-full h-screen flex flex-col justify-center items-center bg-white text-black',
      style: {
        backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      },
      children: R.jsxs('div', {
        className: 'flex flex-col items-center mt-10',
        children: [
          ' ',
          R.jsx('h1', {
            className:
              'text-large-title font-mono font-bold mb-4 drop-shadow-lg transition-transform duration-300 hover:scale-110',
            children: 'Crate',
          }),
          R.jsxs('p', {
            className:
              'text-medium-title font-mono mb-6 drop-shadow-lg inline-flex items-center',
            children: [
              'Beta under construction, join our waitlist for early access',
              R.jsx('img', {
                src: '/Smile.svg',
                alt: 'Smile',
                width: 27,
                height: 27,
                className: 'ml-2',
              }),
            ],
          }),
          R.jsx('div', {
            className:
              'w-full max-w-lg px-8 py-6 text-black shadow-xs rounded-lg transition-transform duration-300 hover:scale-105',
            children: R.jsx(S.Suspense, {
              fallback: R.jsx('div', { children: 'Loading form...' }),
              children: R.jsx(qs, {}),
            }),
          }),
        ],
      }),
    });
function Js() {
  return R.jsx('div', { children: R.jsx('main', { children: R.jsx(Br, {}) }) });
}
const sa = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Js },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export {
  Yr as C,
  ea as F,
  Xr as a,
  ta as b,
  fs as c,
  hs as d,
  ms as e,
  ps as f,
  p as g,
  sa as h,
  $ as s,
  Ks as u,
  ra as w,
};
