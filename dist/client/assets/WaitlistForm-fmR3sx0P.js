import { r as f, j as t, B as E } from './main-rZFLPwin.js';
import {
  g as h,
  s as m,
  a as F,
  u as C,
  F as N,
  b as x,
  c as p,
  d as j,
  e as g,
  f as y,
  C as V,
  w as O,
} from './waitlist-DEg3YAS8.js';
import { I as k } from './input-DLULWS28.js';
import { S as I, a as J, b as R, c as T, d as u } from './select-Bm5-cKGb.js';
import './index-yOxD40BC.js';
const v = (s, a, r) => {
    if (s && 'reportValidity' in s) {
      const e = h(r, a);
      (s.setCustomValidity((e && e.message) || ''), s.reportValidity());
    }
  },
  S = (s, a) => {
    for (const r in a.fields) {
      const e = a.fields[r];
      e && e.ref && 'reportValidity' in e.ref
        ? v(e.ref, r, s)
        : e.refs && e.refs.forEach((n) => v(n, r, s));
    }
  },
  D = (s, a) => {
    a.shouldUseNativeValidation && S(s, a);
    const r = {};
    for (const e in s) {
      const n = h(a.fields, e),
        i = Object.assign(s[e] || {}, { ref: n && n.ref });
      if (P(a.names || Object.keys(s), e)) {
        const o = Object.assign({}, h(r, e));
        (m(o, 'root', i), m(r, e, o));
      } else m(r, e, i);
    }
    return r;
  },
  P = (s, a) => s.some((r) => r.startsWith(a + '.'));
var W = function (s, a) {
    for (var r = {}; s.length; ) {
      var e = s[0],
        n = e.code,
        i = e.message,
        o = e.path.join('.');
      if (!r[o])
        if ('unionErrors' in e) {
          var l = e.unionErrors[0].errors[0];
          r[o] = { message: l.message, type: l.code };
        } else r[o] = { message: i, type: n };
      if (
        ('unionErrors' in e &&
          e.unionErrors.forEach(function (b) {
            return b.errors.forEach(function (w) {
              return s.push(w);
            });
          }),
        a)
      ) {
        var c = r[o].types,
          d = c && c[e.code];
        r[o] = F(o, a, r, n, d ? [].concat(d, e.message) : e.message);
      }
      s.shift();
    }
    return r;
  },
  A = function (s, a, r) {
    return (
      r === void 0 && (r = {}),
      function (e, n, i) {
        try {
          return Promise.resolve(
            (function (o, l) {
              try {
                var c = Promise.resolve(
                  s[r.mode === 'sync' ? 'parse' : 'parseAsync'](e, a),
                ).then(function (d) {
                  return (
                    i.shouldUseNativeValidation && S({}, i),
                    { errors: {}, values: r.raw ? e : d }
                  );
                });
              } catch (d) {
                return l(d);
              }
              return c && c.then ? c.then(void 0, l) : c;
            })(0, function (o) {
              if (
                (function (l) {
                  return Array.isArray(l?.errors);
                })(o)
              )
                return {
                  values: {},
                  errors: D(
                    W(
                      o.errors,
                      !i.shouldUseNativeValidation && i.criteriaMode === 'all',
                    ),
                    i,
                  ),
                };
              throw o;
            }),
          );
        } catch (o) {
          return Promise.reject(o);
        }
      }
    );
  };
const q = () => {
  const [s, a] = f.useState(null),
    [r, e] = f.useState(null),
    n = C({
      resolver: A(O),
      mode: 'onChange',
      defaultValues: { email: '', user_type: 'DJ' },
    }),
    i = async (o) => {
      try {
        const l = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(o),
        });
        if (!l.ok) throw new Error(await l.text());
        (a('Successfully added to waitlist!'),
          e(null),
          setTimeout(() => a(null), 3e3),
          n.reset());
      } catch (l) {
        (a(null),
          e('Failed to add to waitlist'),
          console.error('Error submitting form', l),
          setTimeout(() => e(null), 3e3));
      }
    };
  return t.jsx('div', {
    className: 'max-w-lg mx-auto p-8 bg-white text-black rounded-lg',
    style: {
      backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
      backgroundSize: '10px 10px',
    },
    children: t.jsx(N, {
      ...n,
      children: t.jsxs('form', {
        onSubmit: n.handleSubmit(i),
        className: 'space-y-6',
        children: [
          t.jsx(x, {
            control: n.control,
            name: 'email',
            render: ({ field: o }) =>
              t.jsxs(p, {
                children: [
                  t.jsx(j, { children: 'Email' }),
                  t.jsx(g, {
                    children: t.jsx(k, {
                      type: 'email',
                      placeholder: 'Enter your email',
                      ...o,
                      required: !0,
                      className: 'w-full',
                    }),
                  }),
                  t.jsx(y, {}),
                ],
              }),
          }),
          t.jsx(x, {
            control: n.control,
            name: 'user_type',
            render: ({ field: o }) =>
              t.jsxs(p, {
                children: [
                  t.jsx(j, { children: 'What kind of digger are you?' }),
                  t.jsx(g, {
                    children: t.jsx(V, {
                      name: 'user_type',
                      control: n.control,
                      render: ({ field: l }) =>
                        t.jsxs(I, {
                          onValueChange: (c) => l.onChange(c),
                          value: l.value,
                          children: [
                            t.jsx(J, {
                              className: 'w-full',
                              children: t.jsx(R, {
                                placeholder: 'Select your role',
                              }),
                            }),
                            t.jsxs(T, {
                              children: [
                                t.jsx(u, { value: 'DJ', children: 'DJ' }),
                                t.jsx(u, {
                                  value: 'Record Store',
                                  children: 'Record Store',
                                }),
                                t.jsx(u, {
                                  value: 'Record Collector',
                                  children: 'Record Collector',
                                }),
                                t.jsx(u, { value: 'Other', children: 'Other' }),
                              ],
                            }),
                          ],
                        }),
                    }),
                  }),
                  t.jsx(y, {}),
                ],
              }),
          }),
          t.jsx(E, {
            type: 'submit',
            variant: 'default',
            className: 'w-full font-mono text-small-title',
            disabled: !n.formState.isValid,
            children: 'Join Waitlist',
          }),
          s &&
            t.jsxs('div', {
              className:
                'text-center text-green-600 mt-4 animate-pulse font-mono text-small-subtitle',
              children: [
                t.jsx('p', { children: s }),
                t.jsx('img', {
                  src: '/Brut164.svg',
                  alt: 'Success Icon',
                  width: 50,
                  height: 50,
                  className: 'mx-auto mt-2',
                }),
              ],
            }),
          r &&
            t.jsx('p', {
              className:
                'text-center text-red-600 mt-4 animate-pulse font-mono text-small-subtitle',
              children: r,
            }),
        ],
      }),
    }),
  });
};
export { q as default };
