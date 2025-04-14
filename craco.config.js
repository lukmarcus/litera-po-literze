module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add a rule to handle assets in src/assets
      webpackConfig.module.rules.push({
        test: /\.(jpg|jpeg|png|gif|mp3)$/i,
        type: "asset/resource",
      });

      return webpackConfig;
    },
  },
};
