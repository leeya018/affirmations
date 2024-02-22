/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "affirmations-deploy-9e634.netlify.app",
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: `https://affirmations-deploy-9e634.netlify.app`,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
