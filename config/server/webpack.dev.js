var webpack = require('webpack')
var path = require('path')
var nodeExternals = require('webpack-node-externals')
var root = path.resolve(path.join(__dirname, '../../'))
var dir = {
  utils: path.join(root, 'src', 'classes'),
  src: path.join(root, 'src', 'server'),
  build: path.join(root, 'dist', 'server')
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
    // bring down the file size in production!
    // https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a#.ojksydfiu
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('development')}
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
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