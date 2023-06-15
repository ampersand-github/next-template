/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["storage.googleapis.com"],
  },
  async headers() {
    return [
      {
        // 開発環境のストーリーブックからAPIへのアクセスを許可する
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:6006",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
