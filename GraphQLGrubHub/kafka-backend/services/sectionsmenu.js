const mong = require('mongoose')
const menus = require('../../Backend/api/models/menu')
// let mongoose = require('../mongoose.js');
let mogooseConn = require('../../Backend/mongoose.js')
// mogooseConn()
// console.log(mogooseConn)

function handle_request (msg, callback) {
  menus
    .find({
      restaurant_name: msg.restaurant_name,
      section: msg.section
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      callback(null, results)
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err, 'Error')
    })
}

exports.handle_request = handle_request
