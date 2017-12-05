/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = (env = {}) => {
  const shouldHashNames = env.hash === true;
  const shouldMinify = env.minify === true;
  const shouldUseAnalyzer = env.analyzer === true;

  if (shouldHashNames) {
    console.log(`${chalk.dim('[PB]')} 📝  Hashing filenames`);
  }

  if (shouldMinify) {
    console.log(`${chalk.dim('[PB]')} 📦  Minifying code`);
  }

  if (shouldUseAnalyzer) {
    console.log(`${chalk.dim('[PB]')} 🕵🏻  Starting bundle analyzer`);
  }

  return {
    devServer: {
      disableHostCheck: true,
      inline: true,
      stats: 'minimal'
    },
    devtool: shouldMinify ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      client: ['./source/index.scss', './source/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: shouldHashNames ? '[name].[chunkhash].js' : '[name].js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: require.resolve('react'),
          use: [
            {
              loader: 'expose-loader',
              options: 'React'
            }
          ]
        },
        {
          test: require.resolve('react-dom'),
          use: [
            {
              loader: 'expose-loader',
              options: 'ReactDOM'
            }
          ]
        },
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
              options: { importLoaders: 1, minimize: true, sourceMap: true }
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
    plugins: (() => {
      const plugins = [
        new ExtractTextPlugin(
          shouldHashNames ? '[name].[chunkhash].css' : '[name].css'
        ),
        new ManifestPlugin(),
        new StaticSiteGeneratorPlugin({
          paths: ['/', '/cv']
        })
      ].concat(shouldUseAnalyzer ? [new BundleAnalyzerPlugin()] : []);

      if (shouldMinify) {
        return plugins.concat([
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
        ]);
      }

      return plugins;
    })()
  };
};
