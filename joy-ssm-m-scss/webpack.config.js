const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', 'scss', 'sass'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader'],
      },
    ],
  },
  devServer: {
    port: 9999,
  },
}
