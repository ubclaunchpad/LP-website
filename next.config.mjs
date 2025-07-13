/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    runtime: "edge",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // Prevent bundling of Node.js-specific modules for the Edge runtime
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    config.resolve.fallback.fs = false;
    config.resolve.fallback.stream = false;
    config.resolve.fallback.dgram = false;
    config.resolve.fallback.net = false;
    config.resolve.fallback.tls = false;
    config.resolve.fallback.child_process = false;
    config.resolve.fallback.crypto = false;
    config.resolve.fallback.os = false;
    config.resolve.fallback.path = false;
    config.resolve.fallback.util = false;
    config.resolve.fallback.dns = false;
    config.resolve.fallback.zlib = false;
    config.resolve.fallback.perf_hooks = false;

    return config;
  },
};

export default nextConfig;
