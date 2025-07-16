import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/counter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
