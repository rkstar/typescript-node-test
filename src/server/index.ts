import express = require('express')

const app :express.Application = express()
app.get('/*', (req, res)=>{
  res.send('hello world!')
})

app.listen(3000, ()=>{
  console.log("running on http://localhost:3000")
})