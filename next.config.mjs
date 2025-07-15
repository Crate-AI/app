/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'localhost:48752',
        '127.0.0.1:3000',
        '127.0.0.1:48752',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.discogs.com',
      },
      {
        protocol: 'https',
        hostname: 'st.discogs.com',
      },
      // discogs uses this to set default profile pictures
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
    ],
  },
};

export default nextConfig;
