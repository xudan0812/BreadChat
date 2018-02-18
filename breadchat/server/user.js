const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})
Router.post('/register', function (req, res) {
  const {username, pwd, type} = req.body
  User.findOne({username}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg:"username already exists"})
    }
    User.create({username, pwd, type}, function (e, d) {
      if (e) {
        return res.json({code: 1, msg:"server error"})
      }
      return res.json({code: 0})
    })
  })
})
Router.get('/info', function(req, res){
  return res.json({code: 1})
})

module.exports = Router