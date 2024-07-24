/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tympanus.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/icons/**",
      },
    ],
  },
};

export default nextConfig;
