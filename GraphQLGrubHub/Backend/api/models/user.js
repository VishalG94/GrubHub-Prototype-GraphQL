const mongoose = require('mongoose');
// const mongodb = require('mongodb');
const dateforamt = require('dateformat');
var now = new Date()
var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true, unique: true, dropDups: true },
      phone: Number,
      image: String,
      password: { type: String, required: true },
      created: { type: Date, default: today },
      modified: { type: Date, default: today }
    })

    
module.exports= mongoose.model('Users', userSchema);