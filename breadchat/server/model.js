const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:32769/breadchat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'username':{type: String, require: true},
    'pwd':{type: String, require: true},
    'type':{type: String, require: true},
    'avatar':{type: String},
    'desc':{type: String},
    'title':{type: String},
    //if boss
    'company':{type: String},
    'salary':{type: String}
  },
  chat: {
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
