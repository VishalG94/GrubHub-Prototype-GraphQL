const mong = require('mongoose')
const orders = require('../../Backend/api/models/order')
let mogooseConn = require('../../Backend/mongoose.js')

function handle_request (msg, callback) {
  let str = ['Preparing', 'Ready', 'New']
  let person = msg.person
  let email = msg.email
  let person2 = 'order_status'
  let email2 = { $in: str }
  var query = {}
  query[person] = email
  // query.push(order_status : { $in: str })
  query[person2] = { $in: str }
  console.log(query)
  orders
    .find(query)
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log(JSON.stringify(results))
      callback(null, results)
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err, 'Error')
    })
}

exports.handle_request = handle_request
