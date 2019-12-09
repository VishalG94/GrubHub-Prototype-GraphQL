const menus = require('../../Backend/api/models/menu')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')
// mogooseConn();

function handle_request (msg, callback) {
  var now = new Date()
  var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
  console.log('Req Body : ', msg)
  menus
    .updateOne(
      { _id: msg.id },
      {
        $set: {
          dish_name: msg.dishname,
          description: msg.description,
          price: msg.price,
          section: msg.section,
          modified: today
        }
      }
    )
    .then(response => {
      console.log('response' + response)
      callback(null, results)
  
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      callback(err,"Error");
    })
  // var id = mongoose.Types.ObjectId()

  //   console.log('Req Body : ', msg)
  //   let mnu = new menus({
  //     _id: id,
  //     dish_name: msg.dishname,
  //     description: msg.description,
  //     price: msg.price,
  //     section: msg.section,
  //     restaurant_name: msg.restaurantname,
  //     restaurant_zipcode: msg.zipcode
  //   })
  //   mnu
  //     .save()
  //     .then(response => {
  //       console.log('response' + response)
  //       callback(null, results)
  //     })
  //     .catch(err => {
  //       console.log('Error occured while inserting data in DB' + err)
  //       callback(err,"Error");
  //     })
}

exports.handle_request = handle_request
