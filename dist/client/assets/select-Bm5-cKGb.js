import {
  c as vt,
  r as o,
  j as r,
  aa as gt,
  a as F,
  ab as St,
  A as _,
  U as Re,
  ac as wt,
  v as Ne,
  V as yt,
  w as Ct,
  x as be,
  ad as bt,
  E as k,
  ae as G,
  W as It,
  D as T,
  z as Nt,
  af as Pe,
  ag as Tt,
  F as Rt,
  K as Pt,
  G as Et,
  J as _t,
  N as jt,
  O as Mt,
  Y as At,
  $ as Ot,
} from './main-rZFLPwin.js';
import { u as Dt } from './index-yOxD40BC.js';
import { C as Ee, a as kt } from './input-DLULWS28.js';
const Lt = vt('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
var Bt = 'Label',
  _e = o.forwardRef((t, n) =>
    r.jsx(gt.label, {
      ...t,
      ref: n,
      onMouseDown: (e) => {
        e.target.closest('button, input, select, textarea') ||
          (t.onMouseDown?.(e),
          !e.defaultPrevented && e.detail > 1 && e.preventDefault());
      },
    }),
  );
_e.displayName = Bt;
var je = _e;
const Vt = St(
    'text-sm font-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ),
  Ht = o.forwardRef(({ className: t, ...n }, e) =>
    r.jsx(je, { ref: e, className: F(Vt(), t), ...n }),
  );
Ht.displayName = je.displayName;
function Te(t, [n, e]) {
  return Math.min(e, Math.max(n, t));
}
var Me = Object.freeze({
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  }),
  Ut = 'VisuallyHidden',
  Ae = o.forwardRef((t, n) =>
    r.jsx(_.span, { ...t, ref: n, style: { ...Me, ...t.style } }),
  );
Ae.displayName = Ut;
var No = Ae,
  Ft = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  Wt = [' ', 'Enter'],
  Q = 'Select',
  [ie, de, Kt] = bt(Q),
  [oe] = Ct(Q, [Kt, Re]),
  ue = Re(),
  [$t, Y] = oe(Q),
  [zt, Gt] = oe(Q),
  Oe = (t) => {
    const {
        __scopeSelect: n,
        children: e,
        open: a,
        defaultOpen: l,
        onOpenChange: u,
        value: s,
        defaultValue: c,
        onValueChange: i,
        dir: f,
        name: v,
        autoComplete: w,
        disabled: R,
        required: I,
        form: C,
      } = t,
      d = ue(n),
      [h, g] = o.useState(null),
      [m, x] = o.useState(null),
      [W, M] = o.useState(!1),
      ne = wt(f),
      [P, O] = Ne({ prop: a, defaultProp: l ?? !1, onChange: u, caller: Q }),
      [K, X] = Ne({ prop: s, defaultProp: c, onChange: i, caller: Q }),
      L = o.useRef(null),
      B = h ? C || !!h.closest('form') : !0,
      [$, V] = o.useState(new Set()),
      H = Array.from($)
        .map((E) => E.props.value)
        .join(';');
    return r.jsx(yt, {
      ...d,
      children: r.jsxs($t, {
        required: I,
        scope: n,
        trigger: h,
        onTriggerChange: g,
        valueNode: m,
        onValueNodeChange: x,
        valueNodeHasChildren: W,
        onValueNodeHasChildrenChange: M,
        contentId: be(),
        value: K,
        onValueChange: X,
        open: P,
        onOpenChange: O,
        dir: ne,
        triggerPointerDownPosRef: L,
        disabled: R,
        children: [
          r.jsx(ie.Provider, {
            scope: n,
            children: r.jsx(zt, {
              scope: t.__scopeSelect,
              onNativeOptionAdd: o.useCallback((E) => {
                V((D) => new Set(D).add(E));
              }, []),
              onNativeOptionRemove: o.useCallback((E) => {
                V((D) => {
                  const U = new Set(D);
                  return (U.delete(E), U);
                });
              }, []),
              children: e,
            }),
          }),
          B
            ? r.jsxs(
                rt,
                {
                  'aria-hidden': !0,
                  required: I,
                  tabIndex: -1,
                  name: v,
                  autoComplete: w,
                  value: K,
                  onChange: (E) => X(E.target.value),
                  disabled: R,
                  form: C,
                  children: [
                    K === void 0 ? r.jsx('option', { value: '' }) : null,
                    Array.from($),
                  ],
                },
                H,
              )
            : null,
        ],
      }),
    });
  };
Oe.displayName = Q;
var De = 'SelectTrigger',
  ke = o.forwardRef((t, n) => {
    const { __scopeSelect: e, disabled: a = !1, ...l } = t,
      u = ue(e),
      s = Y(De, e),
      c = s.disabled || a,
      i = k(n, s.onTriggerChange),
      f = de(e),
      v = o.useRef('touch'),
      [w, R, I] = at((d) => {
        const h = f().filter((x) => !x.disabled),
          g = h.find((x) => x.value === s.value),
          m = lt(h, d, g);
        m !== void 0 && s.onValueChange(m.value);
      }),
      C = (d) => {
        (c || (s.onOpenChange(!0), I()),
          d &&
            (s.triggerPointerDownPosRef.current = {
              x: Math.round(d.pageX),
              y: Math.round(d.pageY),
            }));
      };
    return r.jsx(It, {
      asChild: !0,
      ...u,
      children: r.jsx(_.button, {
        type: 'button',
        role: 'combobox',
        'aria-controls': s.contentId,
        'aria-expanded': s.open,
        'aria-required': s.required,
        'aria-autocomplete': 'none',
        dir: s.dir,
        'data-state': s.open ? 'open' : 'closed',
        disabled: c,
        'data-disabled': c ? '' : void 0,
        'data-placeholder': st(s.value) ? '' : void 0,
        ...l,
        ref: i,
        onClick: T(l.onClick, (d) => {
          (d.currentTarget.focus(), v.current !== 'mouse' && C(d));
        }),
        onPointerDown: T(l.onPointerDown, (d) => {
          v.current = d.pointerType;
          const h = d.target;
          (h.hasPointerCapture(d.pointerId) &&
            h.releasePointerCapture(d.pointerId),
            d.button === 0 &&
              d.ctrlKey === !1 &&
              d.pointerType === 'mouse' &&
              (C(d), d.preventDefault()));
        }),
        onKeyDown: T(l.onKeyDown, (d) => {
          const h = w.current !== '';
          (!(d.ctrlKey || d.altKey || d.metaKey) &&
            d.key.length === 1 &&
            R(d.key),
            !(h && d.key === ' ') &&
              Ft.includes(d.key) &&
              (C(), d.preventDefault()));
        }),
      }),
    });
  });
ke.displayName = De;
var Le = 'SelectValue',
  Be = o.forwardRef((t, n) => {
    const {
        __scopeSelect: e,
        className: a,
        style: l,
        children: u,
        placeholder: s = '',
        ...c
      } = t,
      i = Y(Le, e),
      { onValueNodeHasChildrenChange: f } = i,
      v = u !== void 0,
      w = k(n, i.onValueNodeChange);
    return (
      G(() => {
        f(v);
      }, [f, v]),
      r.jsx(_.span, {
        ...c,
        ref: w,
        style: { pointerEvents: 'none' },
        children: st(i.value) ? r.jsx(r.Fragment, { children: s }) : u,
      })
    );
  });
Be.displayName = Le;
var Yt = 'SelectIcon',
  Ve = o.forwardRef((t, n) => {
    const { __scopeSelect: e, children: a, ...l } = t;
    return r.jsx(_.span, {
      'aria-hidden': !0,
      ...l,
      ref: n,
      children: a || '▼',
    });
  });
Ve.displayName = Yt;
var qt = 'SelectPortal',
  He = (t) => r.jsx(Nt, { asChild: !0, ...t });
He.displayName = qt;
var ee = 'SelectContent',
  Ue = o.forwardRef((t, n) => {
    const e = Y(ee, t.__scopeSelect),
      [a, l] = o.useState();
    if (
      (G(() => {
        l(new DocumentFragment());
      }, []),
      !e.open)
    ) {
      const u = a;
      return u
        ? Pe.createPortal(
            r.jsx(Fe, {
              scope: t.__scopeSelect,
              children: r.jsx(ie.Slot, {
                scope: t.__scopeSelect,
                children: r.jsx('div', { children: t.children }),
              }),
            }),
            u,
          )
        : null;
    }
    return r.jsx(We, { ...t, ref: n });
  });
Ue.displayName = ee;
var A = 10,
  [Fe, q] = oe(ee),
  Xt = 'SelectContentImpl',
  Zt = _t('SelectContent.RemoveScroll'),
  We = o.forwardRef((t, n) => {
    const {
        __scopeSelect: e,
        position: a = 'item-aligned',
        onCloseAutoFocus: l,
        onEscapeKeyDown: u,
        onPointerDownOutside: s,
        side: c,
        sideOffset: i,
        align: f,
        alignOffset: v,
        arrowPadding: w,
        collisionBoundary: R,
        collisionPadding: I,
        sticky: C,
        hideWhenDetached: d,
        avoidCollisions: h,
        ...g
      } = t,
      m = Y(ee, e),
      [x, W] = o.useState(null),
      [M, ne] = o.useState(null),
      P = k(n, (p) => W(p)),
      [O, K] = o.useState(null),
      [X, L] = o.useState(null),
      B = de(e),
      [$, V] = o.useState(!1),
      H = o.useRef(!1);
    (o.useEffect(() => {
      if (x) return Rt(x);
    }, [x]),
      Pt());
    const E = o.useCallback(
        (p) => {
          const [b, ...j] = B().map((N) => N.ref.current),
            [S] = j.slice(-1),
            y = document.activeElement;
          for (const N of p)
            if (
              N === y ||
              (N?.scrollIntoView({ block: 'nearest' }),
              N === b && M && (M.scrollTop = 0),
              N === S && M && (M.scrollTop = M.scrollHeight),
              N?.focus(),
              document.activeElement !== y)
            )
              return;
        },
        [B, M],
      ),
      D = o.useCallback(() => E([O, x]), [E, O, x]);
    o.useEffect(() => {
      $ && D();
    }, [$, D]);
    const { onOpenChange: U, triggerPointerDownPosRef: z } = m;
    (o.useEffect(() => {
      if (x) {
        let p = { x: 0, y: 0 };
        const b = (S) => {
            p = {
              x: Math.abs(Math.round(S.pageX) - (z.current?.x ?? 0)),
              y: Math.abs(Math.round(S.pageY) - (z.current?.y ?? 0)),
            };
          },
          j = (S) => {
            (p.x <= 10 && p.y <= 10
              ? S.preventDefault()
              : x.contains(S.target) || U(!1),
              document.removeEventListener('pointermove', b),
              (z.current = null));
          };
        return (
          z.current !== null &&
            (document.addEventListener('pointermove', b),
            document.addEventListener('pointerup', j, {
              capture: !0,
              once: !0,
            })),
          () => {
            (document.removeEventListener('pointermove', b),
              document.removeEventListener('pointerup', j, { capture: !0 }));
          }
        );
      }
    }, [x, U, z]),
      o.useEffect(() => {
        const p = () => U(!1);
        return (
          window.addEventListener('blur', p),
          window.addEventListener('resize', p),
          () => {
            (window.removeEventListener('blur', p),
              window.removeEventListener('resize', p));
          }
        );
      }, [U]));
    const [pe, ae] = at((p) => {
        const b = B().filter((y) => !y.disabled),
          j = b.find((y) => y.ref.current === document.activeElement),
          S = lt(b, p, j);
        S && setTimeout(() => S.ref.current.focus());
      }),
      fe = o.useCallback(
        (p, b, j) => {
          const S = !H.current && !j;
          ((m.value !== void 0 && m.value === b) || S) &&
            (K(p), S && (H.current = !0));
        },
        [m.value],
      ),
      me = o.useCallback(() => x?.focus(), [x]),
      te = o.useCallback(
        (p, b, j) => {
          const S = !H.current && !j;
          ((m.value !== void 0 && m.value === b) || S) && L(p);
        },
        [m.value],
      ),
      le = a === 'popper' ? ge : Ke,
      re =
        le === ge
          ? {
              side: c,
              sideOffset: i,
              align: f,
              alignOffset: v,
              arrowPadding: w,
              collisionBoundary: R,
              collisionPadding: I,
              sticky: C,
              hideWhenDetached: d,
              avoidCollisions: h,
            }
          : {};
    return r.jsx(Fe, {
      scope: e,
      content: x,
      viewport: M,
      onViewportChange: ne,
      itemRefCallback: fe,
      selectedItem: O,
      onItemLeave: me,
      itemTextRefCallback: te,
      focusSelectedItem: D,
      selectedItemText: X,
      position: a,
      isPositioned: $,
      searchRef: pe,
      children: r.jsx(Et, {
        as: Zt,
        allowPinchZoom: !0,
        children: r.jsx(jt, {
          asChild: !0,
          trapped: m.open,
          onMountAutoFocus: (p) => {
            p.preventDefault();
          },
          onUnmountAutoFocus: T(l, (p) => {
            (m.trigger?.focus({ preventScroll: !0 }), p.preventDefault());
          }),
          children: r.jsx(Mt, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: u,
            onPointerDownOutside: s,
            onFocusOutside: (p) => p.preventDefault(),
            onDismiss: () => m.onOpenChange(!1),
            children: r.jsx(le, {
              role: 'listbox',
              id: m.contentId,
              'data-state': m.open ? 'open' : 'closed',
              dir: m.dir,
              onContextMenu: (p) => p.preventDefault(),
              ...g,
              ...re,
              onPlaced: () => V(!0),
              ref: P,
              style: {
                display: 'flex',
                flexDirection: 'column',
                outline: 'none',
                ...g.style,
              },
              onKeyDown: T(g.onKeyDown, (p) => {
                const b = p.ctrlKey || p.altKey || p.metaKey;
                if (
                  (p.key === 'Tab' && p.preventDefault(),
                  !b && p.key.length === 1 && ae(p.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(p.key))
                ) {
                  let S = B()
                    .filter((y) => !y.disabled)
                    .map((y) => y.ref.current);
                  if (
                    (['ArrowUp', 'End'].includes(p.key) &&
                      (S = S.slice().reverse()),
                    ['ArrowUp', 'ArrowDown'].includes(p.key))
                  ) {
                    const y = p.target,
                      N = S.indexOf(y);
                    S = S.slice(N + 1);
                  }
                  (setTimeout(() => E(S)), p.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
We.displayName = Xt;
var Jt = 'SelectItemAlignedPosition',
  Ke = o.forwardRef((t, n) => {
    const { __scopeSelect: e, onPlaced: a, ...l } = t,
      u = Y(ee, e),
      s = q(ee, e),
      [c, i] = o.useState(null),
      [f, v] = o.useState(null),
      w = k(n, (P) => v(P)),
      R = de(e),
      I = o.useRef(!1),
      C = o.useRef(!0),
      {
        viewport: d,
        selectedItem: h,
        selectedItemText: g,
        focusSelectedItem: m,
      } = s,
      x = o.useCallback(() => {
        if (u.trigger && u.valueNode && c && f && d && h && g) {
          const P = u.trigger.getBoundingClientRect(),
            O = f.getBoundingClientRect(),
            K = u.valueNode.getBoundingClientRect(),
            X = g.getBoundingClientRect();
          if (u.dir !== 'rtl') {
            const y = X.left - O.left,
              N = K.left - y,
              Z = P.left - N,
              J = P.width + Z,
              he = Math.max(J, O.width),
              xe = window.innerWidth - A,
              ve = Te(N, [A, Math.max(A, xe - he)]);
            ((c.style.minWidth = J + 'px'), (c.style.left = ve + 'px'));
          } else {
            const y = O.right - X.right,
              N = window.innerWidth - K.right - y,
              Z = window.innerWidth - P.right - N,
              J = P.width + Z,
              he = Math.max(J, O.width),
              xe = window.innerWidth - A,
              ve = Te(N, [A, Math.max(A, xe - he)]);
            ((c.style.minWidth = J + 'px'), (c.style.right = ve + 'px'));
          }
          const L = R(),
            B = window.innerHeight - A * 2,
            $ = d.scrollHeight,
            V = window.getComputedStyle(f),
            H = parseInt(V.borderTopWidth, 10),
            E = parseInt(V.paddingTop, 10),
            D = parseInt(V.borderBottomWidth, 10),
            U = parseInt(V.paddingBottom, 10),
            z = H + E + $ + U + D,
            pe = Math.min(h.offsetHeight * 5, z),
            ae = window.getComputedStyle(d),
            fe = parseInt(ae.paddingTop, 10),
            me = parseInt(ae.paddingBottom, 10),
            te = P.top + P.height / 2 - A,
            le = B - te,
            re = h.offsetHeight / 2,
            p = h.offsetTop + re,
            b = H + E + p,
            j = z - b;
          if (b <= te) {
            const y = L.length > 0 && h === L[L.length - 1].ref.current;
            c.style.bottom = '0px';
            const N = f.clientHeight - d.offsetTop - d.offsetHeight,
              Z = Math.max(le, re + (y ? me : 0) + N + D),
              J = b + Z;
            c.style.height = J + 'px';
          } else {
            const y = L.length > 0 && h === L[0].ref.current;
            c.style.top = '0px';
            const Z = Math.max(te, H + d.offsetTop + (y ? fe : 0) + re) + j;
            ((c.style.height = Z + 'px'), (d.scrollTop = b - te + d.offsetTop));
          }
          ((c.style.margin = `${A}px 0`),
            (c.style.minHeight = pe + 'px'),
            (c.style.maxHeight = B + 'px'),
            a?.(),
            requestAnimationFrame(() => (I.current = !0)));
        }
      }, [R, u.trigger, u.valueNode, c, f, d, h, g, u.dir, a]);
    G(() => x(), [x]);
    const [W, M] = o.useState();
    G(() => {
      f && M(window.getComputedStyle(f).zIndex);
    }, [f]);
    const ne = o.useCallback(
      (P) => {
        P && C.current === !0 && (x(), m?.(), (C.current = !1));
      },
      [x, m],
    );
    return r.jsx(eo, {
      scope: e,
      contentWrapper: c,
      shouldExpandOnScrollRef: I,
      onScrollButtonChange: ne,
      children: r.jsx('div', {
        ref: i,
        style: {
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          zIndex: W,
        },
        children: r.jsx(_.div, {
          ...l,
          ref: w,
          style: { boxSizing: 'border-box', maxHeight: '100%', ...l.style },
        }),
      }),
    });
  });
Ke.displayName = Jt;
var Qt = 'SelectPopperPosition',
  ge = o.forwardRef((t, n) => {
    const {
        __scopeSelect: e,
        align: a = 'start',
        collisionPadding: l = A,
        ...u
      } = t,
      s = ue(e);
    return r.jsx(At, {
      ...s,
      ...u,
      ref: n,
      align: a,
      collisionPadding: l,
      style: {
        boxSizing: 'border-box',
        ...u.style,
        '--radix-select-content-transform-origin':
          'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width':
          'var(--radix-popper-available-width)',
        '--radix-select-content-available-height':
          'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
ge.displayName = Qt;
var [eo, Ie] = oe(ee, {}),
  Se = 'SelectViewport',
  $e = o.forwardRef((t, n) => {
    const { __scopeSelect: e, nonce: a, ...l } = t,
      u = q(Se, e),
      s = Ie(Se, e),
      c = k(n, u.onViewportChange),
      i = o.useRef(0);
    return r.jsxs(r.Fragment, {
      children: [
        r.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: a,
        }),
        r.jsx(ie.Slot, {
          scope: e,
          children: r.jsx(_.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...l,
            ref: c,
            style: {
              position: 'relative',
              flex: 1,
              overflow: 'hidden auto',
              ...l.style,
            },
            onScroll: T(l.onScroll, (f) => {
              const v = f.currentTarget,
                { contentWrapper: w, shouldExpandOnScrollRef: R } = s;
              if (R?.current && w) {
                const I = Math.abs(i.current - v.scrollTop);
                if (I > 0) {
                  const C = window.innerHeight - A * 2,
                    d = parseFloat(w.style.minHeight),
                    h = parseFloat(w.style.height),
                    g = Math.max(d, h);
                  if (g < C) {
                    const m = g + I,
                      x = Math.min(C, m),
                      W = m - x;
                    ((w.style.height = x + 'px'),
                      w.style.bottom === '0px' &&
                        ((v.scrollTop = W > 0 ? W : 0),
                        (w.style.justifyContent = 'flex-end')));
                  }
                }
              }
              i.current = v.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
$e.displayName = Se;
var ze = 'SelectGroup',
  [to, oo] = oe(ze),
  no = o.forwardRef((t, n) => {
    const { __scopeSelect: e, ...a } = t,
      l = be();
    return r.jsx(to, {
      scope: e,
      id: l,
      children: r.jsx(_.div, {
        role: 'group',
        'aria-labelledby': l,
        ...a,
        ref: n,
      }),
    });
  });
no.displayName = ze;
var Ge = 'SelectLabel',
  Ye = o.forwardRef((t, n) => {
    const { __scopeSelect: e, ...a } = t,
      l = oo(Ge, e);
    return r.jsx(_.div, { id: l.id, ...a, ref: n });
  });
Ye.displayName = Ge;
var ce = 'SelectItem',
  [ro, qe] = oe(ce),
  Xe = o.forwardRef((t, n) => {
    const {
        __scopeSelect: e,
        value: a,
        disabled: l = !1,
        textValue: u,
        ...s
      } = t,
      c = Y(ce, e),
      i = q(ce, e),
      f = c.value === a,
      [v, w] = o.useState(u ?? ''),
      [R, I] = o.useState(!1),
      C = k(n, (m) => i.itemRefCallback?.(m, a, l)),
      d = be(),
      h = o.useRef('touch'),
      g = () => {
        l || (c.onValueChange(a), c.onOpenChange(!1));
      };
    if (a === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.',
      );
    return r.jsx(ro, {
      scope: e,
      value: a,
      disabled: l,
      textId: d,
      isSelected: f,
      onItemTextChange: o.useCallback((m) => {
        w((x) => x || (m?.textContent ?? '').trim());
      }, []),
      children: r.jsx(ie.ItemSlot, {
        scope: e,
        value: a,
        disabled: l,
        textValue: v,
        children: r.jsx(_.div, {
          role: 'option',
          'aria-labelledby': d,
          'data-highlighted': R ? '' : void 0,
          'aria-selected': f && R,
          'data-state': f ? 'checked' : 'unchecked',
          'aria-disabled': l || void 0,
          'data-disabled': l ? '' : void 0,
          tabIndex: l ? void 0 : -1,
          ...s,
          ref: C,
          onFocus: T(s.onFocus, () => I(!0)),
          onBlur: T(s.onBlur, () => I(!1)),
          onClick: T(s.onClick, () => {
            h.current !== 'mouse' && g();
          }),
          onPointerUp: T(s.onPointerUp, () => {
            h.current === 'mouse' && g();
          }),
          onPointerDown: T(s.onPointerDown, (m) => {
            h.current = m.pointerType;
          }),
          onPointerMove: T(s.onPointerMove, (m) => {
            ((h.current = m.pointerType),
              l
                ? i.onItemLeave?.()
                : h.current === 'mouse' &&
                  m.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: T(s.onPointerLeave, (m) => {
            m.currentTarget === document.activeElement && i.onItemLeave?.();
          }),
          onKeyDown: T(s.onKeyDown, (m) => {
            (i.searchRef?.current !== '' && m.key === ' ') ||
              (Wt.includes(m.key) && g(), m.key === ' ' && m.preventDefault());
          }),
        }),
      }),
    });
  });
Xe.displayName = ce;
var se = 'SelectItemText',
  Ze = o.forwardRef((t, n) => {
    const { __scopeSelect: e, className: a, style: l, ...u } = t,
      s = Y(se, e),
      c = q(se, e),
      i = qe(se, e),
      f = Gt(se, e),
      [v, w] = o.useState(null),
      R = k(
        n,
        (g) => w(g),
        i.onItemTextChange,
        (g) => c.itemTextRefCallback?.(g, i.value, i.disabled),
      ),
      I = v?.textContent,
      C = o.useMemo(
        () =>
          r.jsx(
            'option',
            { value: i.value, disabled: i.disabled, children: I },
            i.value,
          ),
        [i.disabled, i.value, I],
      ),
      { onNativeOptionAdd: d, onNativeOptionRemove: h } = f;
    return (
      G(() => (d(C), () => h(C)), [d, h, C]),
      r.jsxs(r.Fragment, {
        children: [
          r.jsx(_.span, { id: i.textId, ...u, ref: R }),
          i.isSelected && s.valueNode && !s.valueNodeHasChildren
            ? Pe.createPortal(u.children, s.valueNode)
            : null,
        ],
      })
    );
  });
Ze.displayName = se;
var Je = 'SelectItemIndicator',
  Qe = o.forwardRef((t, n) => {
    const { __scopeSelect: e, ...a } = t;
    return qe(Je, e).isSelected
      ? r.jsx(_.span, { 'aria-hidden': !0, ...a, ref: n })
      : null;
  });
Qe.displayName = Je;
var we = 'SelectScrollUpButton',
  et = o.forwardRef((t, n) => {
    const e = q(we, t.__scopeSelect),
      a = Ie(we, t.__scopeSelect),
      [l, u] = o.useState(!1),
      s = k(n, a.onScrollButtonChange);
    return (
      G(() => {
        if (e.viewport && e.isPositioned) {
          let c = function () {
            const f = i.scrollTop > 0;
            u(f);
          };
          const i = e.viewport;
          return (
            c(),
            i.addEventListener('scroll', c),
            () => i.removeEventListener('scroll', c)
          );
        }
      }, [e.viewport, e.isPositioned]),
      l
        ? r.jsx(ot, {
            ...t,
            ref: s,
            onAutoScroll: () => {
              const { viewport: c, selectedItem: i } = e;
              c && i && (c.scrollTop = c.scrollTop - i.offsetHeight);
            },
          })
        : null
    );
  });
et.displayName = we;
var ye = 'SelectScrollDownButton',
  tt = o.forwardRef((t, n) => {
    const e = q(ye, t.__scopeSelect),
      a = Ie(ye, t.__scopeSelect),
      [l, u] = o.useState(!1),
      s = k(n, a.onScrollButtonChange);
    return (
      G(() => {
        if (e.viewport && e.isPositioned) {
          let c = function () {
            const f = i.scrollHeight - i.clientHeight,
              v = Math.ceil(i.scrollTop) < f;
            u(v);
          };
          const i = e.viewport;
          return (
            c(),
            i.addEventListener('scroll', c),
            () => i.removeEventListener('scroll', c)
          );
        }
      }, [e.viewport, e.isPositioned]),
      l
        ? r.jsx(ot, {
            ...t,
            ref: s,
            onAutoScroll: () => {
              const { viewport: c, selectedItem: i } = e;
              c && i && (c.scrollTop = c.scrollTop + i.offsetHeight);
            },
          })
        : null
    );
  });
tt.displayName = ye;
var ot = o.forwardRef((t, n) => {
    const { __scopeSelect: e, onAutoScroll: a, ...l } = t,
      u = q('SelectScrollButton', e),
      s = o.useRef(null),
      c = de(e),
      i = o.useCallback(() => {
        s.current !== null &&
          (window.clearInterval(s.current), (s.current = null));
      }, []);
    return (
      o.useEffect(() => () => i(), [i]),
      G(() => {
        c()
          .find((v) => v.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: 'nearest' });
      }, [c]),
      r.jsx(_.div, {
        'aria-hidden': !0,
        ...l,
        ref: n,
        style: { flexShrink: 0, ...l.style },
        onPointerDown: T(l.onPointerDown, () => {
          s.current === null && (s.current = window.setInterval(a, 50));
        }),
        onPointerMove: T(l.onPointerMove, () => {
          (u.onItemLeave?.(),
            s.current === null && (s.current = window.setInterval(a, 50)));
        }),
        onPointerLeave: T(l.onPointerLeave, () => {
          i();
        }),
      })
    );
  }),
  so = 'SelectSeparator',
  nt = o.forwardRef((t, n) => {
    const { __scopeSelect: e, ...a } = t;
    return r.jsx(_.div, { 'aria-hidden': !0, ...a, ref: n });
  });
nt.displayName = so;
var Ce = 'SelectArrow',
  ao = o.forwardRef((t, n) => {
    const { __scopeSelect: e, ...a } = t,
      l = ue(e),
      u = Y(Ce, e),
      s = q(Ce, e);
    return u.open && s.position === 'popper'
      ? r.jsx(Ot, { ...l, ...a, ref: n })
      : null;
  });
ao.displayName = Ce;
var lo = 'SelectBubbleInput',
  rt = o.forwardRef(({ __scopeSelect: t, value: n, ...e }, a) => {
    const l = o.useRef(null),
      u = k(a, l),
      s = Dt(n);
    return (
      o.useEffect(() => {
        const c = l.current;
        if (!c) return;
        const i = window.HTMLSelectElement.prototype,
          v = Object.getOwnPropertyDescriptor(i, 'value').set;
        if (s !== n && v) {
          const w = new Event('change', { bubbles: !0 });
          (v.call(c, n), c.dispatchEvent(w));
        }
      }, [s, n]),
      r.jsx(_.select, {
        ...e,
        style: { ...Me, ...e.style },
        ref: u,
        defaultValue: n,
      })
    );
  });
rt.displayName = lo;
function st(t) {
  return t === '' || t === void 0;
}
function at(t) {
  const n = Tt(t),
    e = o.useRef(''),
    a = o.useRef(0),
    l = o.useCallback(
      (s) => {
        const c = e.current + s;
        (n(c),
          (function i(f) {
            ((e.current = f),
              window.clearTimeout(a.current),
              f !== '' && (a.current = window.setTimeout(() => i(''), 1e3)));
          })(c));
      },
      [n],
    ),
    u = o.useCallback(() => {
      ((e.current = ''), window.clearTimeout(a.current));
    }, []);
  return (
    o.useEffect(() => () => window.clearTimeout(a.current), []),
    [e, l, u]
  );
}
function lt(t, n, e) {
  const l = n.length > 1 && Array.from(n).every((f) => f === n[0]) ? n[0] : n,
    u = e ? t.indexOf(e) : -1;
  let s = co(t, Math.max(u, 0));
  l.length === 1 && (s = s.filter((f) => f !== e));
  const i = s.find((f) =>
    f.textValue.toLowerCase().startsWith(l.toLowerCase()),
  );
  return i !== e ? i : void 0;
}
function co(t, n) {
  return t.map((e, a) => t[(n + a) % t.length]);
}
var io = Oe,
  ct = ke,
  uo = Be,
  po = Ve,
  fo = He,
  it = Ue,
  mo = $e,
  dt = Ye,
  ut = Xe,
  ho = Ze,
  xo = Qe,
  pt = et,
  ft = tt,
  mt = nt;
const To = io,
  Ro = uo,
  vo = o.forwardRef(({ className: t, children: n, ...e }, a) =>
    r.jsxs(ct, {
      ref: a,
      className: F(
        'flex h-10 w-full items-center text-text dark:text-darkText bg-white dark:bg-darkBg justify-between rounded-base border-2 border-border dark:border-darkBorder px-3 py-2 text-sm font-base ring-offset-white placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        t,
      ),
      ...e,
      children: [
        n,
        r.jsx(po, {
          asChild: !0,
          children: r.jsx(Ee, { className: 'h-4 w-4' }),
        }),
      ],
    }),
  );
vo.displayName = ct.displayName;
const ht = o.forwardRef(({ className: t, ...n }, e) =>
  r.jsx(pt, {
    ref: e,
    className: F(
      'flex cursor-default text-text items-center justify-center py-1',
      t,
    ),
    ...n,
    children: r.jsx(kt, { className: 'h-4 w-4' }),
  }),
);
ht.displayName = pt.displayName;
const xt = o.forwardRef(({ className: t, ...n }, e) =>
  r.jsx(ft, {
    ref: e,
    className: F(
      'flex cursor-default text-text items-center justify-center py-1 font-base',
      t,
    ),
    ...n,
    children: r.jsx(Ee, { className: 'h-4 w-4' }),
  }),
);
xt.displayName = ft.displayName;
const go = o.forwardRef(
  ({ className: t, children: n, position: e = 'popper', ...a }, l) =>
    r.jsx(fo, {
      children: r.jsxs(it, {
        ref: l,
        className: F(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-base border-2 border-border dark:border-darkBorder bg-main font-base text-text data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          e === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          t,
        ),
        position: e,
        ...a,
        children: [
          r.jsx(ht, {}),
          r.jsx(mo, {
            className: F(
              'p-1',
              e === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
            ),
            children: n,
          }),
          r.jsx(xt, {}),
        ],
      }),
    }),
);
go.displayName = it.displayName;
const So = o.forwardRef(({ className: t, ...n }, e) =>
  r.jsx(dt, {
    ref: e,
    className: F(
      'border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base text-black/80',
      t,
    ),
    ...n,
  }),
);
So.displayName = dt.displayName;
const wo = o.forwardRef(({ className: t, children: n, ...e }, a) =>
  r.jsxs(ut, {
    ref: a,
    className: F(
      'relative flex w-full text-text cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base outline-none focus:border-border dark:focus:border-darkBorder data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      t,
    ),
    ...e,
    children: [
      r.jsx('span', {
        className:
          'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: r.jsx(xo, { children: r.jsx(Lt, { className: 'h-4 w-4' }) }),
      }),
      r.jsx(ho, { children: n }),
    ],
  }),
);
wo.displayName = ut.displayName;
const yo = o.forwardRef(({ className: t, ...n }, e) =>
  r.jsx(mt, {
    ref: e,
    className: F('-mx-1 my-1 h-px bg-border dark:border-darkBorder', t),
    ...n,
  }),
);
yo.displayName = mt.displayName;
export {
  Lt as C,
  Ht as L,
  No as R,
  To as S,
  vo as a,
  Ro as b,
  go as c,
  wo as d,
};
