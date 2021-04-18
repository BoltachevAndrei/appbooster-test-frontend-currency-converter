const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "source-map",
  devServer: {
    port: 3001,
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.join(__dirname, "public"), to: path.join(__dirname, "dist") }],
    }),
  ],
};
