import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_EXPORT === 'true';

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        output: 'standalone',
        images: {
          remotePatterns: [{ protocol: 'https', hostname: '**' }],
        },
        experimental: {
          serverActions: { bodySizeLimit: '10mb' },
        },
      }),
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
