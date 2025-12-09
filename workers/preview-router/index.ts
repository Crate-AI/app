/**
 * Preview Router Worker
 * 
 * Routes requests from custom preview domains (pr-123.crate.audio)
 * to the actual worker deployment (crate-app-pr-123.govi218mu.workers.dev)
 * 
 * This avoids needing Zone Workers Routes permissions for each preview.
 */

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    // Extract PR number from subdomain (123-pr.crate.audio -> 123)
    const match = hostname.match(/^(\d+)-pr\./);
    
    if (!match) {
      return new Response('Invalid preview URL. Expected format: {number}-pr.crate.audio', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    const prNumber = match[1];
    const targetHost = `crate-app-pr-${prNumber}.govi218mu.workers.dev`;
    
    // Build the target URL
    const targetUrl = new URL(request.url);
    targetUrl.hostname = targetHost;
    targetUrl.protocol = 'https:';
    targetUrl.port = '';
    
    // Create new request with modified URL
    const modifiedRequest = new Request(targetUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual', // Don't follow redirects, let client handle them
    });
    
    try {
      const response = await fetch(modifiedRequest);
      
      // Clone response and modify headers if needed
      const newHeaders = new Headers(response.headers);
      
      // Rewrite any Location headers that point to workers.dev
      const location = newHeaders.get('Location');
      if (location) {
        const locationUrl = new URL(location, targetUrl);
        if (locationUrl.hostname === targetHost) {
          locationUrl.hostname = hostname;
          newHeaders.set('Location', locationUrl.toString());
        }
      }
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new Response(`Preview pr-${prNumber} not found or not deployed yet.`, {
        status: 502,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};

