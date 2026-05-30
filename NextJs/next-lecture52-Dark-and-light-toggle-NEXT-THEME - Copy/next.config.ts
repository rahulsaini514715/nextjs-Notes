// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com", // allow Pexels images
      "images.unsplash.com", // optional if using Unsplash
    ],
  },
};

export default nextConfig;
