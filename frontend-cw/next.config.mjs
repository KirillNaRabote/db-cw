/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SERVER_URL: process.env.SERVER_URL,
        APP_URL: process.env.APP_URL,
    },
    images: {domains: ['loremflicker.com', 'www.aptronixindia.com', 'encrypted-tbn0.gstatic.com', 'loremflickr.com', 'avatars.githubusercontent.com']},
    async rewrites() {
        return [{
            source: '/uploads/:path*',
            destination: 'http://localhost:4200/uploads/:path*'
        }]
    }
};

export default nextConfig;
