/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.scdn.co", "dailymix-images.scdn.co", "links.papareact.com"],
  },
};

module.exports = nextConfig;
