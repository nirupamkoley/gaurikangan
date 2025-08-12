/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8005',
        pathname: '/uploads/**',
      },
    ],
    domains: [
      'localhost',
      'backend.jaishankar.shop'
    ],
  },
};

export default nextConfig;
