'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('es6-promise').polyfill();

// ------------------ Tasks ------------------
const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    'babel-loader'
  ]
}

const scssLoader = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  })
}

const cssLoader = {
  test: /\.css$/,
  loader: 'file-loader',
  options: {
    name: 'css/[name].[ext]'
  }
};

const urlLoader = {
  test: /\.(eot|ttf|woff|woff?2)$/,
  use: [
    'file-loader'
  ]
}

const imagesLoader = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  loader: 'file-loader',
  options: {
    name: 'img/[hash].[ext]'
  }
};
// ------------------ End Tasks ------------------

const extractTextPlugin = new ExtractTextPlugin('dist/css/app.css')
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({analyzerMode: 'static'})

// ------------------ Plugins ------------------



// ------------------ End Plugins ------------------

module.exports = { 
  entry:
    './index.js',
  output: {
    path: __dirname,
    filename: 'dist/js/bundle.js'
  },
  module: {
    rules: [
      jsLoader,
      scssLoader,
      cssLoader,
      urlLoader,
      imagesLoader
    ]
  },
  plugins: [
    extractTextPlugin,
    bundleAnalyzerPlugin
  ],
  stats: {
    colors: true
  },
  devtool: 'inline-source-map'
};