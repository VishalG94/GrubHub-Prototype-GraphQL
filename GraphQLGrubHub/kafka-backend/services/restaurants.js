const mong = require('mongoose')
const menus = require('../../Backend/api/models/menu')
// let mongoose = require('../mongoose.js');
let mogooseConn = require('../../Backend/mongoose.js');
// mogooseConn()
// console.log(mogooseConn)


function handle_request(msg, callback){
    menus
    .distinct('restaurant_name', {
      dish_name: new RegExp(msg.dish_name, 'i'),
      restaurant_zipcode: msg.zipcode
    })
    .then(results => {
      console.log('Successfully fetched restaurants data from DB')
      console.log(results)
      // console.log(JSON.stringify(results[0]));
      callback(null, results)
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err,"Error");
    })

//   var id = mong.Types.ObjectId()
//   let pswd = msg.password
//   // const saltRounds = process.env.SALTROUNDS
// //   console.log(process.env.SALTROUNDS)
//   console.log(pswd)
//   console.log(msg)
//   // console.log(bcrypt)
//   crypt.createHash(
//     pswd,
//     (err, hash) => {
//       // bcrypt.hash(pswd, saltRounds, (err, hash) => {
//       if (err) {
//         console.log('encountered error while hashing' + err);
//         callback(err,"Error");
//       } else {
//         console.log('hash'+hash)
        
//         let usr = new users({
//           _id: id,
//           first_name: msg.firstname,
//           last_name: msg.lastname,
//           email: msg.email,
//           password: hash
//         })
//         console.log(usr)
//         usr
//           .save()
//           .then(response => {
//             console.log('response' + response)
//             callback(null,response);
//             // res.writeHead(200, {
//             //   'Content-Type': 'text/plain'
//             // })
//             // res.end('Successfully Registered')
//           })
//           .catch(err => {
//             console.log('Error occured while inserting data in DB' + err)
//             callback(err,"Error");
//             // res.writeHead(400, {
//             //   'Content-Type': 'text/plain'
//             // })
//             // res.end('Error occured while inserting data in DB')
//           })
//       }
//     },
//     err => {
//     //   res.writeHead(202, {
//     //     'Content-Type': 'text/plain'
//     //   })
//     //   res.end('Registration UnSuccessful')
//     callback(err,"Error");
//       console.log('Sent Invalid result')
//       console.log(err)
//     }
//   )
}

exports.handle_request = handle_request;