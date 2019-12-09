const menus = require('../../Backend/api/models/menu')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')
// mogooseConn();

function handle_request (msg, callback) {
  var id = mongoose.Types.ObjectId()

  console.log('Req Body : ', msg)
  menus
    .deleteMany({
      //   _id: req.body.id
      section: msg.section,
      restaurant_name: msg.restaurantname
    })
    .then(results => {
      console.log('Successfully deleted data from DB')
      callback(null, results)
      // console.log(JSON.stringify(results[0]));
    //   res.writeHead(200, {
    //     'Content-Type': 'application/json'
    //   })
    //   //   delete results[0].password;
    //   res.end(JSON.stringify(results))
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err,"Error");
    //   res.writeHead(400, {
    //     'Content-Type': 'text/plain'
    //   })
    //   res.end('Error occured while fetching data from DB')
    })
}

exports.handle_request = handle_request
