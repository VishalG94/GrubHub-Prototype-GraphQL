const mongoose = require('mongoose');
// const mongodb = require('mongodb');
const dateforamt = require('dateformat');
var now = new Date()
var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
mongoose.set('useCreateIndex', true);
const orderSchema = mongoose.Schema({
      order_id: mongoose.Schema.Types.ObjectId,
      orderlist: { type: String, required: true },
      total: { type: Number, required: true},
      user_email: { type: String, required: true },
      restaurant_name: { type: String, required: true },
      order_status: { type: String, required: true},
      created: { type: Date, default: today },
      modified: { type: Date, default: today }      
    })
    
module.exports= mongoose.model('Order', orderSchema);

