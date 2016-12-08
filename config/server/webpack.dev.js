var webpack = require('webpack')
var path = require('path')
var root = path.resolve(path.join(__dirname, '../../'))
var dir = {
  utils: root+'/src/classes',
  src: root+'/src/server',
  build: root+'/dist/server'
}

module.exports = {
  devtool: 'source-map',
  entry: [
    dir.src
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.json', '.html'],
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
    loaders: [{
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader?configFileName=config/server/tsconfig.json'],
      include: [
        dir.src,
        dir.utils
      ],
      exclude: /node_modules/
    },{
      test: /\.json$/,
      loaders: ['file-loader', 'json-loader'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loaders: ['file-loader', 'html-loader', 'url-loader'],
      exclude: /node_modules/
    }]
  }
}