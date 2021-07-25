const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: { babelrc: true }
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}