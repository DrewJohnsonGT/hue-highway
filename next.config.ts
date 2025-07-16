import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        destination: '/counter',
        permanent: true,
        source: '/',
      },
    ];
  },
};

export default nextConfig;
