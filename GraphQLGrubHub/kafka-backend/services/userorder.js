const mong = require('mongoose')
const orders = require('../../Backend/api/models/order')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')

function handle_request (msg, callback) {
  var now = new Date()
  var id = mongoose.Types.ObjectId()
  var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
  let ords = new orders({
    order_id: id,
    orderlist: msg.order,
    total: msg.total,
    user_email: msg.user_email,
    restaurant_name: msg.restaurant_name,
    order_status: 'New',
    created: today,
    modified: today
  })

  ords
    .save()
    .then(response => {
      console.log('response' + response)
      callback(null, results)
      
    })
    .catch(err => {
      console.log('Error occured while inserting data in DB' + err)
      callback(err, 'Error')
      
    })
  //   let str = ['Preparing', 'Ready', 'New']
  //   let person = msg.person
  //   let email = msg.email
  //   let person2 = 'order_status'
  //   let email2 = { $in: str }
  //   var query = {}
  //   query[person] = email
  //   // query.push(order_status : { $in: str })
  //   query[person2] = { $in: str }
  //   console.log(query)
  //   orders
  //     .find(query)
  //     .then(results => {
  //       console.log('Successfully fetched data from DB')
  //       console.log(JSON.stringify(results))
  //       callback(null, results)
  //     })
  //     .catch(err => {
  //       console.log('Error occured while fetching data from DB')
  //       callback(err, 'Error')
  //     })
}

exports.handle_request = handle_request
