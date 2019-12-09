const menus = require('../../Backend/api/models/menu')
let mogooseConn = require('../../Backend/mongoose.js')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')
// mogooseConn();

function handle_request (msg, callback) {
    var id = mongoose.Types.ObjectId()
    
      console.log('Req Body : ', msg)
      menus
      .deleteOne({
        _id: msg.id
        // section: req.query.section
      })
      .then(results => {
        console.log('Successfully deleted data from DB')
        // console.log(JSON.stringify(results[0]));
        callback(null, results)
        
      })
      .catch(err => {
        console.log('Error occured while fetching data from DB')
        callback(err,"Error");
        // res.writeHead(400, {
        //   'Content-Type': 'text/plain'
        // })
        // res.end('Error occured while fetching data from DB')
      })
}

exports.handle_request = handle_request
