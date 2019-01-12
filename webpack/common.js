process.title = 'lunamaker:webpack';

const { cpus } = require('os');
const { resolve } = require('path');
const { EnvironmentPlugin, ProvidePlugin } = require('webpack');
const HappyPack = require('happypack');
const HtmlPlugin = require('html-webpack-plugin');


const { NODE_ENV = 'development' } = process.env;
const IS_PROD = NODE_ENV === 'production';
const IS_DEV = NODE_ENV === 'development';
const IS_TEST = NODE_ENV === 'test';

const DIST = resolve(__dirname, '..', 'dist');
const SRC = resolve(__dirname, '..', 'client');

const config = {
  context: SRC,
  target: 'web',

  entry: {
    polyfill: 'babel-polyfill',
    index: ['./index'],
  },

  output: {
    path: DIST,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.mjs', '.js'],
    modules: [
      'node_modules',
      SRC,
    ],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['happypack/loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: 'react-svg-loader',
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|webp)$/,
        loaders: ['file-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ProvidePlugin({
      color: ['ui/theme', 'color'],
      size: ['ui/theme', 'size'],
      font: ['ui/theme', 'font'],
      media: ['ui/media', 'default'],
    }),
    new HappyPack({
      threads: cpus().length,
      loaders: ['babel-loader'],
    }),
    new HtmlPlugin({
      title: 'lunamak☾r',
      template: 'index.tpl.html',
    }),
    new EnvironmentPlugin({
      NODE_ENV,
    }),
  ],

  stats: {
    colors: true,
    children: false,
  },
};

module.exports = {
  config,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  DIST,
  SRC,
};
