
const messages = require('../../Backend/api/models/message')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')

function handle_request (msg, callback) {

    messages
    .find({
      order_id: msg.orderId
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log(JSON.stringify(results))
      callback(null, results)
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err, 'Error')
    })
//   var now = new Date()
//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
//   var id = mongoose.Types.ObjectId()
//   console.log('Req Body : ', msg)
//   let mesg = new messages({
//     _id: id,
//     restaurant_name: msg.restaurant_name,
//     order_id: msg.order_id,
//     user_email: msg.user_email,
//     text: msg.mesg,
//     is_user: msg.is_user,
//     created: today
//   })
//   console.log(msg)
//   mesg
//     .save()
//     .then(response => {
//       console.log('response' + response)
//       callback(null, results)
//     })
//     .catch(err => {
//       console.log('Error occured while inserting data in DB' + err)
//       callback(err, 'Error')
//     })
}

exports.handle_request = handle_request
