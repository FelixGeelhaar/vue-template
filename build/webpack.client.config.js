const base = require("./webpack.base.config");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = Object.assign({}, base, {
  mode: "development",
  plugins: base.plugins || [],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
});

config.module.rules
  .filter(x => {
    return x.loader == "vue-loader";
  })
  .forEach(x => (x.options.extractCSS = true));

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].[hash].css",
    chunkFilename: "[id].[hash].css",
    publicPath: "assets/css/"
  })
);

if (process.env.NODE_ENV === "production") {
  config.mode = "production";
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "'production'"
      }
    })
  );
}

module.exports = config;
