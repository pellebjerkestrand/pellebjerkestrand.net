/* eslint-env node */
/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

const getPathsFromRoutes = require('./build/get-paths-from-routes');

module.exports = (env = {}) => {
  const shouldBuildStaticSite = env.static === true;
  const shouldMinify = env.minify === true;
  const shouldUseAnalyzer = env.analyzer === true;

  if (shouldBuildStaticSite) {
    console.log('🖥  Building static site');
  }

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
    entry: (() => {
      const entries = {
        style: './source/style.scss'
      };

      if (shouldBuildStaticSite) {
        entries.static = './source/static.js';
      } else {
        entries.client = [
          'babel-polyfill',
          'expose-loader?React!react',
          'expose-loader?ReactDOM!react-dom',
          'expose-loader?Components!./source/app.components.js'
        ];
        entries.server = [
          'expose-loader?React!react',
          'expose-loader?ReactDOM!react-dom',
          'expose-loader?ReactDOMServer!react-dom/server',
          'expose-loader?Components!./source/app.components.js'
        ];
      }

      return entries;
    })(),
    output: (() => {
      const output = {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
      };

      if (shouldBuildStaticSite) {
        output.libraryTarget = 'umd';
      }

      return output;
    })(),
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
      new ManifestPlugin(),
      new SuppressChunksPlugin([
        {
          name: 'style',
          match: /\.js(.map)?$/
        }
      ])
    ]
      .concat(
        // NOTE: When https://github.com/markdalgleish/static-site-generator-webpack-plugin/pull/115 is accepted and published we can enable chunking at the same time as static site building.
        shouldBuildStaticSite
          ? [
              new StaticSiteGeneratorPlugin({
                entry: 'static',
                paths: getPathsFromRoutes(
                  path.join(__dirname, 'source', 'routes.jsx')
                )
              }),
              new CopyWebpackPlugin(
                [
                  { from: 'source/static/assets', to: 'assets' },
                  { from: 'source/static/api', to: 'api' }
                ],
                { copyUnmodified: true }
              )
            ]
          : [
              new webpack.optimize.ModuleConcatenationPlugin(),
              new webpack.optimize.CommonsChunkPlugin({
                chunks: ['client'],
                name: 'vendor',
                minChunks: module => {
                  if (
                    module.resource &&
                    /^.*\.(css|scss)$/.test(module.resource)
                  ) {
                    return false;
                  }

                  return (
                    module.context && module.context.includes('node_modules')
                  );
                }
              })
            ]
      )
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
