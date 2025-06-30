/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" }, 
      { hostname: "randomuser.me" },
      { hostname: "cdn.magicui.design" }
    ],
  },
};

export default nextConfig;
