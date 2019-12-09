const mong = require('mongoose')
const menus = require('../../Backend/api/models/menu')
// const menus = require('../models/menu')
// let mongoose = require('../mongoose.js');
let mogooseConn = require('../../Backend/mongoose.js')
// mogooseConn()
// console.log(mogooseConn)

function handle_request (msg, callback) {
    // console.log(msg.restaurant_name)
  menus
    .distinct('section', {
      // dish_name: req.query.dish_name,
      restaurant_name: msg.restaurant_name
    })
    .then(results => {
      console.log('Successfully fetched section data from DB')
      console.log('results: ' + results)
      callback(null, results)
      // console.log(JSON.stringify(results[0]));
      
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err, 'Error')
    })
}

exports.handle_request = handle_request
