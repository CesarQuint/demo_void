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
      {
        protocol: process.env.STRAPI_URL_PROTOCOL,
        hostname: process.env.STRAPI_URL_HOST,
        port: process.env.STRAPI_URL_PORT,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
