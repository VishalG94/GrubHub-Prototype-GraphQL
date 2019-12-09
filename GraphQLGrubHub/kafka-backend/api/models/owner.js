const mongoose = require('mongoose');
// const mongodb = require('mongodb');
const dateforamt = require('dateformat');
var now = new Date()
var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
mongoose.set('useCreateIndex', true);
const ownerSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true, unique: true, dropDups: true },
      phone: Number,
      password: { type: String, required: true },
      restaurant_name: { type: String, required: true },
      order_status: { type: String },
      sections: String,
      address2: { type: String},
      address1: String,
      restaurant_zipcode: { type: Number, required: true },
      rating: String,
      image: String,
      cuisine: { type: String, required: true },
      created: { type: Date, default: today },
      modified: { type: Date, default: today }      
    })
    
module.exports= mongoose.model('Owners', ownerSchema);

