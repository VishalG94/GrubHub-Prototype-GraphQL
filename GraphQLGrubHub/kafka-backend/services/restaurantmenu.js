const menus = require('../../Backend/api/models/menu')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')
// mogooseConn();

function handle_request (msg, callback) {
    var id = mongoose.Types.ObjectId()
    
      console.log('Req Body : ', msg)
      let mnu = new menus({
        _id: id,
        dish_name: msg.dishname,
        description: msg.description,
        price: msg.price,
        section: msg.section,
        restaurant_name: msg.restaurantname,
        restaurant_zipcode: msg.zipcode
      })
      mnu
        .save()
        .then(response => {
          console.log('response' + response)
          callback(null, results)
        })
        .catch(err => {
          console.log('Error occured while inserting data in DB' + err)
          callback(err,"Error");
        })
        // menus
        // .distinct('restaurant_name', {
        //   dish_name: new RegExp(msg.dish_name, 'i'),
        //   restaurant_zipcode: msg.zipcode
        // })
        // .then(results => {
        //   console.log('Successfully fetched restaurants data from DB')
        //   console.log(results)
        //   // console.log(JSON.stringify(results[0]));
        //   callback(null, results)
        // })
        // .catch(err => {
        //   console.log('Error occured while fetching data from DB')
        //   callback(err,"Error");
        // })

}

exports.handle_request = handle_request



// const mongoose = require('mongoose')

// const menus = require('../../Backend/api/models/menu.js')
// // let mongoose = require('../mongoose.js');
// let mogooseConn = require('../../Backend/mongoose.js');
// // mogooseConn()
// // console.log(mogooseConn)


// function handle_request(msg, callback){
//     var id = mongoose.Types.ObjectId()
    
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
//     // menus
//     // .distinct('restaurant_name', {
//     //   dish_name: new RegExp(msg.dish_name, 'i'),
//     //   restaurant_zipcode: msg.zipcode
//     // })
//     // .then(results => {
//     //   console.log('Successfully fetched restaurants data from DB')
//     //   console.log(results)
//     //   // console.log(JSON.stringify(results[0]));
//     //   callback(null, results)
//     // })
//     // .catch(err => {
//     //   console.log('Error occured while fetching data from DB')
//     //   callback(err,"Error");
//     // })


// }

// exports.handle_request = handle_request;