/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["storage.googleapis.com", "images.unsplash.com"],
  },
  async headers() {
    return [
      {
        // 開発環境のストーリーブックからAPIへのアクセスを許可する
        // todo 開発環境以外は許可しないようにする
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
