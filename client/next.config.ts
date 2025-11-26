import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
