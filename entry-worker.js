// NOTE: This file is NOT used in production.
// TanStack Start uses @tanstack/react-start/server-entry as the Worker entry point.
// Access Cloudflare bindings via: import { env } from 'cloudflare:workers'
//
// This file is kept for reference only.

import server from './dist/server/server.js';

export default {
  async fetch(req, env, ctx) {
    const res = await server.fetch(req, env);
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });
  },
};
