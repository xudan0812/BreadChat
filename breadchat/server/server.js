const express = require('express')

const app = new express()

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>')
})

app.get('/data', function(req,res){
  res.json({name:'datuzi', age: '20'})
})

app.listen(9093, function() {
  console.log("Node app start at port 9093")
})