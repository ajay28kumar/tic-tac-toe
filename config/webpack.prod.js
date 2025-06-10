const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");


const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/ticTacToe/latest/"
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ticTacToe",
      filename: "ticTacToe-entry.js",
      exposes: {
        "./TicTacToe": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    })
  ]
};


module.exports = merge(commonConfig, prodConfig);