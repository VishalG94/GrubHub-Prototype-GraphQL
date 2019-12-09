
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
// const mongodb = require('mongodb');
const dateforamt = require('dateformat')
var now = new Date()
var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
mongoose.set('useCreateIndex', true)

var message = mongoose.model('message',{
  _id: mongoose.Schema.Types.ObjectId,
  restaurant_name: { type: String },
  order_id: { type: String },
  user_email: { type: String },
  text: { type: String },
  is_user: { type: Boolean },
  created: { type: Date, default: today }
}
)


module.exports = message ;
