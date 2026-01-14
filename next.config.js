/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },

  transpilePackages: ['globe.gl', 'three'],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
