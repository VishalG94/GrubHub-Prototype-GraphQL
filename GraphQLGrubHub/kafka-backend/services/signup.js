// const express = require('express')
const mong = require('mongoose')
// const router = express.Router()
// const app = express()
// var bodyParser = require('body-parser')
// var cookieParser = require('cookie-parser')
// var cors = require('cors')
const users = require('../../Backend/api/models/user')
let mogooseConn = require('../../Backend/mongooseConnection.js');
// let mongoose = require('../mongoose.js');
mogooseConn();
// console.log(mongoose)
// const db = {}
// var dateforamt = require('dateformat')
// app.use(bodyParserf.json())
// const bcrypt = require('bcrypt')
const saltRounds = 10
const crypt = require('../../Backend/api/config/crypt')
// const upload = require('../config/multer')
// const fs = require('fs')
// var passport = require('passport')
// var jwt = require('jsonwebtoken')

// var requireAuth = passport.authenticate('jwt', { session: false })

// app.use(passport.initialize())
// app.use(passport.session())
// Bring in defined Passport Strategy
// require('../config/passport')(passport)


function handle_request(msg, callback){

  var id = mong.Types.ObjectId()
  let pswd = msg.password
  // const saltRounds = process.env.SALTROUNDS
//   console.log(process.env.SALTROUNDS)
  console.log(pswd)
  console.log(msg)
  // console.log(bcrypt)
  crypt.createHash(
    pswd,
    (err, hash) => {
      // bcrypt.hash(pswd, saltRounds, (err, hash) => {
      if (err) {
        console.log('encountered error while hashing' + err);
        callback(err,"Error");
      } else {
        console.log('hash'+hash)
        
        let usr = new users({
          _id: id,
          first_name: msg.firstname,
          last_name: msg.lastname,
          email: msg.email,
          password: hash
        })
        console.log(usr)
        usr
          .save()
          .then(response => {
            console.log('response' + response)
            callback(null,response);
            // res.writeHead(200, {
            //   'Content-Type': 'text/plain'
            // })
            // res.end('Successfully Registered')
          })
          .catch(err => {
            console.log('Error occured while inserting data in DB' + err)
            callback(err,"Error");
            // res.writeHead(400, {
            //   'Content-Type': 'text/plain'
            // })
            // res.end('Error occured while inserting data in DB')
          })
      }
    },
    err => {
    //   res.writeHead(202, {
    //     'Content-Type': 'text/plain'
    //   })
    //   res.end('Registration UnSuccessful')
    callback(err,"Error");
      console.log('Sent Invalid result')
      console.log(err)
    }
  )
}

exports.handle_request = handle_request;