const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function (req, res) {
  // User.remove({}, function (e,d) {})
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
    User.create({username,type,pwd:md5Pwd(pwd)}, function (e, d) {
      if (e) {
        return res.json({code: 1, msg:"server error"})
      }
      return res.json({code: 0})
    })
  })
})
Router.post('/login', function (req, res) {
  const {username, pwd} = req.body
  User.findOne({username, pwd: md5Pwd(pwd)},{'pwd': 0}, function (err, doc) {
    if (doc) {
      return res.json({code: 0, data: doc})
    } else {
      return res.json({code: 1, msg:"Wrong username or password"})
    }
  })
})
Router.get('/info', function(req, res){
  return res.json({code: 1})
})

function md5Pwd(pwd) {
  const salt = 'bread_talk_14756827!@#IOHSLJadijg'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router