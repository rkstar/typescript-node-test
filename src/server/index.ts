import * as express from 'express'
import * as compression from 'compression'
import * as path from 'path'
// import {wildcard} from './routes'

const clientDir :string = path.resolve(`./dist/client`)
const host :string = 'localhost'
const port :number = 3000
const app :express.Application = express()

// we want to trust our proxy thru haproxy so that
// we can get the client ip address in our resolvers
app.enable(`trust proxy`)
app.use(compression())
// server static assets
// NOTE: this path is relative to the dir that
// the node process starting this app was executed from!
// BE CAREFUL.
app.use(express.static(clientDir))

// route handlers

// wildcard handler
app.get('*', (req, res)=>{
  res.status(200).sendFile(`${clientDir}/index.html`)
})

// start the app...
app.listen(port, (err)=>{
  if( err ){
    return console.log(err)
  }
  console.log(`listening at http://${host}:${port}`)
})