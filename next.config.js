const prodConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    ...(process.env.NODE_ENV === "production" ? prodConfig : {}),
};

module.exports = nextConfig;
