/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SERVER_URL: process.env.SERVER_URL,
        APP_URL: process.env.APP_URL,
    },
    images: {domains: ['loremflicker.com', 'www.aptronixindia.com', 'encrypted-tbn0.gstatic.com', 'loremflickr.com']}
};

export default nextConfig;
