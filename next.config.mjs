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
                hostname:
                    "voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com",
                port: "",
                pathname: "/thumbnails/**",
            },
            {
                protocol: "https",
                hostname:
                    "voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com",
                port: "",
                pathname: "/icons/**",
            },
            {
                protocol: "https",
                hostname:
                    "voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com",
                port: "",
                pathname: "/uploads/**",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(glsl|frag|vert)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "raw-loader",
                },
                {
                    loader: "glslify-loader",
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
