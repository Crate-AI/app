/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
            }
        ],
    },
};

export default nextConfig;
