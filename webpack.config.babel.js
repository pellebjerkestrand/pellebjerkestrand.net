/* eslint-env node */
/* eslint-disable no-console */
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import { default as SuppressChunksPlugin } from 'suppress-chunks-webpack-plugin';

export default (env = {}) => {
  const shouldMinify = env.minify === true;
  const shouldUseAnalyzer = env.analyzer === true;

  if (shouldMinify) {
    console.log('📦  Minifying code');
  }

  if (shouldUseAnalyzer) {
    console.log('🕵🏻  Starting bundle analyzer');
  }

  return {
    devServer: {
      disableHostCheck: true,
      inline: false,
      stats: 'minimal'
    },
    devtool: shouldMinify ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      static: ['babel-polyfill', './source/static.js'],
      style: './source/style.scss'
    },
    output: {
      filename: '[name].[chunkhash].js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          enforce: 'pre',
          test: /\.scss$/,
          exclude: /node_modules/,
          use: 'import-glob'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: shouldMinify,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer], sourceMap: true }
            },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ])
        },
        {
          test: /\.(svg|png|jpg|woff2?|ttf|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new SuppressChunksPlugin([
        {
          name: 'style',
          match: /\.js(.map)?$/
        }
      ]),
      new StaticSiteGeneratorPlugin({
        entry: 'static',
        paths: '/'
      }),
      new CopyWebpackPlugin([{ from: 'source/static/assets', to: 'assets' }], {
        copyUnmodified: true
      })
    ]
      .concat(shouldUseAnalyzer ? [new BundleAnalyzerPlugin()] : [])
      .concat(
        shouldMinify
          ? [
              new webpack.DefinePlugin({
                'process.env': {
                  NODE_ENV: JSON.stringify('production')
                }
              }),
              new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                output: { comments: false },
                sourceMap: true
              })
            ]
          : []
      )
  };
};
