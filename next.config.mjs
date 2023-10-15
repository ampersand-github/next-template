import rehypePrism from "@mapbox/rehype-prism";
import nextMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

const withMDX = nextMDX({
  extensions: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      [remarkToc, { maxDepth: 3, heading: "目次" }],
      remarkBreaks,
    ],
    rehypePlugins: [rehypeKatex, rehypePrism, rehypeSlug],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx"],
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["storage.googleapis.com", "images.unsplash.com", "placehold.jp"],
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

export default withMDX(nextConfig);
