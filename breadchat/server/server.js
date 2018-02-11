const express = require('express')
const userRouter = require('./user')

const app = new express()
app.use('/user', userRouter)

app.listen(9093, function() {
  console.log("Node app start at port 9093")
})