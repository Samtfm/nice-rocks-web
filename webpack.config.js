const path = require("path");
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV ? process.env.NODE_ENV === 'development' : true;

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.s?css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    localIdentName: '[local]--[hash:base64:5]',
                  },
                  sourceMap: isDevelopment,
                }
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: "file-loader",
            options: { name: '/static/[name].[ext]' }
          }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    }
};
