// Core Modules
import path from "node:path";
import { fileURLToPath } from "node:url";

// Packages
import getPort from "get-port";

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default async (env, argv) => {
  // Mode for prod. or dev
  const { mode } = argv;

  // Replicating CommonJS variables
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory

  // Get a free port with preferred one
  const port = await getPort({ port: 6688 });

  return {
    mode: mode || "development",
    target: "web",
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port,
      historyApiFallback: true,
      hot: true,
    },
    devtool: mode === "production" ? "source-map" : "eval-source-map",
    module: {
      rules: [
        // React, TypeScript & Babel
        {
          test: /\.(tsx|ts|jsx|js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        // CSS & Styles with PostCSS (for Tailwind)
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
              },
            },
          ],
        },
        // Raw Assets
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: "asset/resource",
        },
      ],
    },
    // (Resolve) For importing without extensions
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    // Plugins
    plugins: [
      // Only for TypeScript Type-Checking because babel-loader is only transpiling not type-checking
      new ForkTsCheckerWebpackPlugin(),

      new CopyPlugin({
        patterns: [
          {
            from: "./public",
            to: "",
          },
        ],
      }),

      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),

      // Put js bundle script tag into HTML file.
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
