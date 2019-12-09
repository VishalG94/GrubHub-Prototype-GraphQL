const menus = require('../../Backend/api/models/menu')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')

function handle_request (msg, callback) {
  var now = new Date()
  var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
  console.log('Req Body : ', msg)
  menus
    .find({
      _id: msg.id
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log(JSON.stringify(results))
      callback(null, results)
      // res.writeHead(200, {
      //   'Content-Type': 'application/json'
      // })
      // //   delete results[0].password;
      // res.end(JSON.stringify(results[0]))
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err, 'Error')
      // res.writeHead(400, {
      //   'Content-Type': 'text/plain'
      // })
      // res.end('Error occured while fetching data from DB')
    })
  // menus
  //   .updateOne(
  //     { _id: msg.id },
  //     {
  //       $set: {
  //         dish_name: msg.dishname,
  //         description: msg.description,
  //         price: msg.price,
  //         section: msg.section,
  //         modified: today
  //       }
  //     }
  //   )
  //   .then(response => {
  //     console.log('response' + response)
  //     callback(null, results)
  //   })
  //   .catch(err => {
  //     console.log('Error occured while upating contact details in DB' + err)
  //     callback(err, 'Error')
  //   })
  // menus
  // .find({
  //   _id: msg.id
  // })
  // .then(results => {
  //   console.log('Successfully fetched data from DB')
  //   console.log(JSON.stringify(results))
  //   callback(null, results)

  // })
  // .catch(err => {
  //   console.log('Error occured while fetching data from DB')
  //   callback(err,"Error");
  // })

  // var id = mongoose.Types.ObjectId()

  //   console.log('Req Body : ', msg)
  //   menus
  //   .deleteOne({
  //     _id: msg.id
  //     // section: req.query.section
  //   })
  //   .then(results => {
  //     console.log('Successfully deleted data from DB')
  //     // console.log(JSON.stringify(results[0]));
  //     callback(null, results)

  //   })
  //   .catch(err => {
  //     console.log('Error occured while fetching data from DB')
  //     callback(err,"Error");
  //   })
}

exports.handle_request = handle_request
