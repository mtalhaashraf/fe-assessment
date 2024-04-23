/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "cdn.dummyjson.com" }],
  },
};

export default nextConfig;
