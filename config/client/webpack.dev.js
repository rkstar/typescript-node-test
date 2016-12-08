var webpack = require('webpack')
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
  entry: [
    dir.src
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.css', '.js', '.jsx', '.ts', '.tsx', '.json', '.html'],
    enforceExtension: false
  },
  output: {
    path: dir.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
    loaders: [{
      test: /\.t?j?sx?$/,
      loaders: ['awesome-typescript-loader?configFileName=config/client/tsconfig.json'],
      include: [
        dir.src,
        dir.utils
      ],
      exclude: /node_modules/
    },{
      test: /\.css$/,
      loaders: ['style-loader','css-loader','postcss-loader'],
      exclude: /node_modules/
		},{
      test: /\.json$/,
      loaders: ['json-loader'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loaders: ['file-loader', 'html-loader', 'url-loader'],
      exclude: /node_modules/
    }]
  }
}