import { u as r, b as n, r as a, j as s, L as i } from './main-rZFLPwin.js';
function u() {
  const e = r(),
    { userIdentity: t } = n();
  return (
    a.useEffect(() => {
      t?.username
        ? e({ to: `/${t.username}`, replace: !0 })
        : e({ to: '/', replace: !0 });
    }, [t, e]),
    s.jsx('div', {
      className: 'flex items-center justify-center min-h-screen',
      children: s.jsx(i, {}),
    })
  );
}
export { u as component };
