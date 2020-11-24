/* eslint-env node */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

module.exports = (env, options = {}) => {
  const shouldMinify = options.mode === 'production';

  return {
    devServer: {
      disableHostCheck: true,
      inline: false,
      stats: 'minimal',
    },
    devtool: shouldMinify ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      static: './source/static.js',
      style: './source/style.scss',
    },
    output: {
      filename: '[name].[chunkhash].js',
      globalObject: 'this',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          enforce: 'pre',
          test: /\.scss$/,
          exclude: /node_modules/,
          use: 'import-glob',
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(svg|png|jpg|woff2?|ttf|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css' }),
      new SuppressChunksPlugin([
        {
          name: 'style',
          match: /\.js(.map)?$/,
        },
      ]),
      new StaticSiteGeneratorPlugin({
        entry: 'static',
        paths: '/',
      }),
    ],
  };
};
