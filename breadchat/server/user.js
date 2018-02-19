const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

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
    const userModel = new User({username, type, pwd:md5Pwd(pwd)})
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg:"server error"})
      }
      const {username, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data:{username, type, _id}})
    })
  })
})
Router.post('/login', function (req, res) {
  const {username, pwd} = req.body
  User.findOne({username, pwd: md5Pwd(pwd)},_filter, function (err, doc) {
    if (doc) {
      res.cookie('userid', doc._id)
      return res.json({code: 0, data: doc})
    } else {
      return res.json({code: 1, msg:"Wrong username or password"})
    }
  })
})
Router.get('/info', function(req, res){
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg:'server error'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

function md5Pwd(pwd) {
  const salt = 'bread_talk_14756827!@#IOHSLJadijg'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router