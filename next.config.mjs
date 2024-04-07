/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.icon-icons.com',
            },
            {
                protocol: 'https',
                hostname: 'icons.veryicon.com',
            },
        ],
    },
}

export default nextConfig
