var webpack = require('webpack')
var path = require('path')
var nodeExternals = require('webpack-node-externals')
var root = path.resolve(path.join(__dirname, '../../'))
var dir = {
  utils: root+'/src/classes',
  src: root+'/src/server',
  build: root+'/dist/server'
}

module.exports = {
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  entry: [
    dir.src
  ],
  resolve: {
    modules: ['node_modules', dir.src],
    extensions: ['.webpack.js', 'web.js', '.js', '.ts', '.json', '.html'],
    enforceExtension: false
  },
  output: {
    path: dir.build,
    filename: 'server.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loaders: ['source-map-loader'],
      exclude: /node_modules/
    },{
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader?configFileName=config/server/tsconfig.json'],
      exclude: /node_modules/
    },{
      test: /\.json$/,
      loaders: ['file-loader', 'json-loader'],
      exclude: /node_modules/
    },{
      test: /\.html$/,
      loaders: ['file-loader', 'html-loader', 'url-loader'],
      exclude: /node_modules/
    }]
  }
}