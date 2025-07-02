/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" }, 
      { hostname: "randomuser.me" },
      { hostname: "cdn.magicui.design" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "xn--eckl7a9e5e6b.com" }
    ],
  },
};

export default nextConfig;
