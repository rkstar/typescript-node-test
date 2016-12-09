import * as express from 'express'

const app :express.Application = express()
app.get('/*', (req, res)=>{
  res.send('hello typescript server!')
})

app.listen(3000, ()=>{
  console.log("running on http://localhost:3000")
})