const owners = require('../../Backend/api/models/owner')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')
// mogooseConn();


function handle_request (msg, callback) {
  let temp = msg.details
  var nameArr = temp.split(',')
  console.log(nameArr)
  owners
    .find({
      restaurant_name: { $in: nameArr }
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log('results' + results)
      // console.log(JSON.stringify(results[0]));
      console.log('result of query:', results)
      callback(null,results);
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err,"Error");
    })
  // owners
  // .update(
  //   { email: msg.email },
  //   {
  //     $set: {
  //       address2: msg.address2,
  //       address1: msg.address1,
  //       phone: msg.phone
  //     }
  //   }
  // )
  // .then(response => {
  //   console.log('response' + response)
  //   callback(null,response);
  // })
  // .catch(err => {
  //   console.log('Error occured while upating contact details in DB' + err)
  //   callback(err,"Error");
  // })
}

exports.handle_request = handle_request
