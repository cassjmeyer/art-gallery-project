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
    mode: "development",
    target: "web",
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port,
    },
    devtool: "eval-source-map",
    module: {
      rules: [
        // React, TypeScript & Babel
        {
          test: /\.(tsx|ts|jsx|js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              // Executed from last to first?
              // 1. preset-typescript: Transpiles TS to JS
              // 2. preset-react: JSX to React.createElement()
              // 3. preset-env: Babel Transpiles ES6 to ES5 for example
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        // CSS & Styles
        {
          test: /\.css$/,
          // Executed from last to first
          // 1. css-loader: load CSS from JS imports
          // 2. style-loader: put CSS into <style> tag
          use: ["style-loader", "css-loader"],
        },
        // Raw Assets
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: "asset/resource", // Tells webpack to emit file to build folder and export URL for embedding.
        },
      ],
    },
    // (Resolve) For importing without extensions
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    // Plugins
    plugins: [
      // TODO: Configure ESLint with TypeScript correctly.
      // new ESLintWebpackPlugin({
      //   extensions: [".tsx", ".ts", ".jsx", ".js"],
      //   exclude: ['node_modules', 'dist'],
      //   eslintPath: path.resolve(),
      // }),

      // Only for TypeScript Type-Checking because babel-loader is only transpiling not type-checking
      new ForkTsCheckerWebpackPlugin(),

      new CopyPlugin({
        patterns: [
          {
            from: "./public",
            to: "", // Copy directly into dist
          },
        ],
      }),

      new BundleAnalyzerPlugin({
        openAnalyzer: false, // Set to TRUE if you want to see results.
      }),

      // Put js bundle script tag into HTML file.
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
