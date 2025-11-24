import { jsxs, jsx } from 'react/jsx-runtime';
import { useLocation, Link } from '@tanstack/react-router';
import { u as useAuthStore, c as cn } from './router-1d_kQrZ6.js';
import {
  ChevronRight,
  Home,
  Search,
  ListMusic,
  Music,
  Brain,
} from 'lucide-react';
function Breadcrumbs() {
  const { pathname } = useLocation();
  const { userIdentity } = useAuthStore();
  if (!userIdentity) return null;
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs2 = [];
    breadcrumbs2.push({
      label: 'Dashboard',
      href: `/${userIdentity.username}`,
      icon: Home,
    });
    if (pathSegments.length > 1) {
      const section = pathSegments[1];
      switch (section) {
        case 'tracks':
          breadcrumbs2.push({
            label: 'Tracks',
            href: `/${userIdentity.username}/tracks`,
            icon: Music,
          });
          break;
        case 'playlists':
          breadcrumbs2.push({
            label: 'Playlists',
            href: `/${userIdentity.username}/playlists`,
            icon: ListMusic,
          });
          if (pathSegments.length > 2) {
            const playlistId = pathSegments[2];
            breadcrumbs2.push({
              label: `Playlist ${playlistId}`,
              href: `/${userIdentity.username}/playlists/${playlistId}`,
            });
          }
          break;
        case 'collection':
          breadcrumbs2.push({
            label: 'Collection',
            href: `/${userIdentity.username}/collection`,
            icon: Search,
          });
          break;
      }
    }
    if (pathSegments[0] === 'analyze') {
      breadcrumbs2.length = 0;
      breadcrumbs2.push({
        label: 'Analyze',
        href: '/analyze',
        icon: Brain,
      });
      if (pathSegments.length > 1) {
        const subSection = pathSegments[1];
        switch (subSection) {
          case 'chat':
            breadcrumbs2.push({
              label: 'Chat',
              href: '/analyze/chat',
            });
            break;
        }
      }
    }
    if (breadcrumbs2.length > 0) {
      breadcrumbs2[breadcrumbs2.length - 1].current = true;
    }
    return breadcrumbs2;
  };
  const breadcrumbs = generateBreadcrumbs();
  if (breadcrumbs.length <= 1) {
    return null;
  }
  return /* @__PURE__ */ jsx('nav', {
    className: 'flex items-center space-x-2 text-sm text-gray-600 mb-6 px-2',
    children: /* @__PURE__ */ jsx('ol', {
      className: 'flex items-center space-x-2',
      children: breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(
          'li',
          {
            className: 'flex items-center',
            children: [
              index > 0 &&
                /* @__PURE__ */ jsx(ChevronRight, {
                  className: 'w-4 h-4 mx-2 text-gray-400',
                }),
              isLast
                ? /* @__PURE__ */ jsxs('span', {
                    className: cn(
                      'flex items-center font-medium',
                      item.current ? 'text-gray-900' : 'text-gray-600',
                    ),
                    children: [
                      Icon &&
                        /* @__PURE__ */ jsx(Icon, {
                          className: 'w-4 h-4 mr-2',
                        }),
                      item.label,
                    ],
                  })
                : /* @__PURE__ */ jsxs(Link, {
                    to: item.href,
                    className:
                      'flex items-center hover:text-gray-900 transition-colors',
                    children: [
                      Icon &&
                        /* @__PURE__ */ jsx(Icon, {
                          className: 'w-4 h-4 mr-2',
                        }),
                      item.label,
                    ],
                  }),
            ],
          },
          item.href || item.label,
        );
      }),
    }),
  });
}
function PageHeader({ title, description, children }) {
  return /* @__PURE__ */ jsxs('div', {
    className: 'mb-8',
    children: [
      /* @__PURE__ */ jsx(Breadcrumbs, {}),
      /* @__PURE__ */ jsxs('div', {
        className: 'flex items-center justify-between',
        children: [
          /* @__PURE__ */ jsxs('div', {
            children: [
              /* @__PURE__ */ jsx('h1', {
                className: 'text-2xl font-bold text-gray-900',
                children: title,
              }),
              description &&
                /* @__PURE__ */ jsx('p', {
                  className: 'mt-1 text-sm text-gray-500',
                  children: description,
                }),
            ],
          }),
          children &&
            /* @__PURE__ */ jsx('div', {
              className: 'flex items-center space-x-3',
              children,
            }),
        ],
      }),
    ],
  });
}
export { PageHeader as P };
