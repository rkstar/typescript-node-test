import * as path from 'path'
import * as webpack from 'webpack'
const config = require('../../config/client/webpack.dev.js')
import * as hotMiddleware from 'webpack-hot-middleware'
import * as devMiddleware from 'webpack-dev-middleware'

export default function(app, environment){
  if( environment !== 'production' ){
    const compiler = webpack(config)
    app.use(devMiddleware(compiler, {
      hot: true,
      publicPath: config.output.publicPath,
      // noInfo: true
    }))
    app.use(hotMiddleware(compiler))
  }
}