const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

console.log(path.resolve(__dirname, 'src/fonts'))
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/joy-clone/' : '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', 'scss', 'sass'],
    alias: {
      fonts: path.resolve(__dirname, 'src/fonts'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        // collapseWhitespace: true,
      },
      hash: true,
      template: './index.html',
      publicPath: process.env.NODE_ENV === 'production' ? '/joy-clone/' : '/',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/images',
          to: 'img/',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/i,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(css|scss|sass)$/i,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    port: 9999,
  },
}
