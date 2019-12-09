const owners = require('../../Backend/api/models/owner')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')
// mogooseConn();

function handle_request(msg, callback){
    owners
    .find({
      email: msg.email
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      // console.log(JSON.stringify(results[0]));
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
