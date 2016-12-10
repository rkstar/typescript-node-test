var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')
var path = require('path')
var cssnext = require('postcss-cssnext')
var root = path.resolve(path.join(__dirname, '../../'))
var dir = {
  utils: root+'/src/classes',
  src: root+'/src/client',
  build: root+'/dist/client'
}

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client',
    dir.src
  ],
  resolve: {
    modules: ['node_modules', dir.src],
    extensions: ['.css', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx', '.json', '.html'],
    enforceExtension: false
  },
  output: {
    path: dir.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // bring down the file size in production!
    // https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a#.ojksydfiu
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('development')}
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function(){
          return [
            cssnext({browsers: ['> 1%', 'last 4 versions']})
          ]
        }
      }
    })
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loaders: ['source-map-loader'],
      exclude: /node_modules/
    },{
      test: /\.tsx?$/,
      loaders: ['react-hot-loader', 'awesome-typescript-loader?configFileName=config/client/tsconfig.json'],
      exclude: /node_modules/
    },{
      test: /\.json$/,
      loaders: ['json-loader'],
      exclude: /node_modules/
    },{
      test: /\.css$/,
      loaders: ['style-loader','css-loader','postcss-loader'],
      exclude: /node_modules/
		},{
      test: /\.html$/,
      loaders: ['file-loader', 'html-loader', 'url-loader'],
      exclude: /node_modules/
    }]
  }
}