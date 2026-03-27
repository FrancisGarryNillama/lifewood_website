import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin/dashboard",
        destination: "/admin-dashboard",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/admin-dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
