module.exports = {
  output: "export",
  turbopack: {},
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["react-component"] },
    });
    return cfg;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chlzslvdr.sirv.com",
        pathname: "/**",
      },
    ],
  },
};
