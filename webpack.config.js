'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('es6-promise').polyfill();

// ------------------ Tasks ------------------
const jsxBuilder = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    'babel-loader'
  ]
}

const styleBuilder = {
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
      jsxBuilder,
      styleBuilder
      
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