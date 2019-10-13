const path = require("path");
const webpack = require('webpack');

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
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: "file-loader",
            options: { name: '/static/[name].[ext]' }
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      // contentBase: './dist',
      // historyApiFallback: true,
        hot: true,
    }
};
