const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'views/train.html',
      template: './src/views/train.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'views/main.html',
      template: './src/views/main.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'views/game.html',
      template: './src/views/game.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'views/404.html',
      template: './src/views/404.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: './assets/images' },
        { from: './src/assets/sound', to: './assets/sound' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'img',
          },
        },
      },
    ],
  },
};
