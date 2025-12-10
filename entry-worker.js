import server from './dist/server/server.js';

export default {
  async fetch(req, env, ctx) {
    // Expose Cloudflare secrets/env bindings to process.env
    // This makes them accessible via process.env in route handlers
    if (env) {
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === 'string') {
          process.env[key] = value;
        }
      }
    }

    // Forward the request to the TanStack Start server handler
    const res = await server.fetch(req, env);

    // Cloudflare Workers strictly require a native Response object.
    // The polyfilled Response from the server build might fail the internal checks.
    // We explicitly reconstruct a native Response if needed.
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });
  },
};
