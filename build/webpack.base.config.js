const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const config = {
  entry: {
    app: path.resolve(__dirname, "../src/app.js"),
    vendor: ["vue", "vuex", "vuetify"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /(\.js$)|(\.vue$)/,
        loader: "eslint-loader",
        exclude: "/node_modules/"
      },
      {
        test: /(\.vue$)/,
        loader: "vue-loader",
        options: {
          css: "css-loader",
          scss: "css-loader|sass-loader"
        }
      },
      {
        test: /(\.js$)/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "assets/js/[name].js"
  }
};

module.exports = config;
