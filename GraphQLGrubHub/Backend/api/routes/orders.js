const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
var dateforamt = require('dateformat')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var kafka = require('../../kafka/client')
const orders = require('../models/order')
const db = {}
app.use(bodyParser.json())
// const bcrypt = require('bcrypt')
// const saltRounds = 10
// const crypt = require('../config/crypt')

// var passport = require('passport')
// var jwt = require('jsonwebtoken')

// var requireAuth = passport.authenticate('jwt', { session: false })

// app.use(passport.initialize())
// app.use(passport.session())
// // Bring in defined Passport Strategy
// require('../config/passport')(passport)

// router.post('/ownerlogin', function (req, res) {
//   console.log('Inside OwnerLogin Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   owners
//     .find({
//       email: req.body.email
//     })
//     .then(docs => {
//       if (docs.length !== 0) {
//         // console.log(crypt.compareHash)
//         console.log(req.body.password)
//         console.log(docs[0].password)
//         // bcrypt.compare(req.body.password, docs[0].password,  (err, isMatch) => {
//         crypt.compareHash(
//           req.body.password,
//           docs[0].password,
//           (err, isMatch) => {
//             if (isMatch && !err) {
//               var token = jwt.sign(req.body, process.env.SECRET_OR_KEY, {
//                 expiresIn: 10080 // in seconds
//               })
//               res.cookie('cookie', docs[0].email, {
//                 maxAge: 900000,
//                 httpOnly: false,
//                 path: '/'
//               })
//               res.status(200).json({ success: true, token: token })
//               console.log('successful', docs)
//             } else {
//               res.writeHead(201, {
//                 'Content-Type': 'text/plain'
//               })
//               res.end('UnSuccessful')
//               console.log('Sent Invalid result- inside')
//               console.log(err)
//             }
//           },
//           err => {
//             res.writeHead(202, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('UnSuccessful')
//             console.log('Sent Invalid result')
//             console.log(err)
//           }
//         )
//       } else {
//         res.writeHead(202, {
//           'Content-Type': 'text/plain'
//         })
//         res.end('UnSuccessful')
//         console.log('Sent Invalid result')
//         console.log(err)
//       }
//     })
// })

// router.post('/ownersignup', function (req, res) {
//   console.log('Inside Owner Sign Up Post Request')
//   // console.log('Req Body : ', req.body)
//   var id = mongoose.Types.ObjectId()
//   let pswd = req.body.password
//   crypt.createHash(
//     pswd,
//     (err, hash) => {
//       // bcrypt.hash(pswd, saltRounds, (err, hash) => {
//       if (err) {
//         console.log('encountered error while hashing' + err)
//       } else {
//         // console.log(hash)
//         let owner = new owners({
//           _id: id,
//           first_name: req.body.firstname,
//           last_name: req.body.lastname,
//           email: req.body.email,
//           password: hash,
//           restaurant_name: req.body.restaurantname,
//           restaurant_zipcode: req.body.zipcode,
//           cuisine: req.body.cuisine
//         })

//         owner
//           .save()
//           .then(response => {
//             console.log('response' + response)
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//           })
//           .catch(err => {
//             console.log('Error occured while inserting data in DB' + err)
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while inserting data in DB')
//           })
//       }
//     },
//     err => {
//       res.writeHead(202, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Registration UnSuccessful')
//       console.log('Sent Invalid result')
//       console.log(err)
//     }
//   )
// })

router.post('/orderstatus', function (req, res) {
  console.log('Inside restaurant order status Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  kafka.make_request('order_status', req.body, function (err, results) {
    // console.log(results);
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while inserting data in DB')
      console.log('Unable get data')
      // console.log(err);
    } else {
      console.log('Results')
      console.log(results)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully updated order status')
    }
  })
  // orders
  //   .update(
  //     { order_id: req.body.order_id },
  //     { $set: { order_status: req.body.order_status } }
  //   )
  //   .then(response => {
  //     console.log('response' + response)
  //     console.log('update order status')
  //     res.writeHead(200, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Successfully updated order status')
  //   })
  //   .catch(err => {
  //     console.log('Error occured while inserting data in DB' + err)
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Error occured while inserting data in DB')
  //   })
})

router.post('/userorder', function (req, res) {
  console.log('Inside user order Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  kafka.make_request('user_order', req.body, function (err, results) {
    // console.log(results);
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while inserting data in DB')
      console.log('Unable get data')
      // console.log(err);
    } else {
      console.log('Results')
      console.log(results)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Ordered')
    }
  })
})

router.get('/orderlist', function (req, res) {
  console.log('Inside user order list:')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.query.person)
  kafka.make_request('order_list', req.query, function (err, results) {
    // console.log(results);
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Unable to get data')
      console.log('Unable get data')
      // console.log(err);
    } else {
      console.log('Results')
      console.log(results)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(results))
    }
  })
})

router.get('/pastorderlist', function (req, res) {
  console.log('Inside user order list:')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.query)

  kafka.make_request('past_order_list', req.query, function (err, results) {
    // console.log(results);
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Unable to get data')
      console.log('Unable get data')
      // console.log(err);
    } else {
      console.log('Results')
      console.log(results)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(results))
    }
  })

  // let str = ['Delivered', 'Cancel']
  // let person = req.query.person
  // let email = req.query.email
  // let person2 = 'order_status'
  // let email2 = { $in: str }
  // var query = {}
  // query[person] = email
  // // query.push(order_status : { $in: str })
  // query[person2] = { $in: str }
  // console.log(query)
  // orders
  //   .find(query)
  //   .then(results => {
  //     console.log('Successfully fetched data from DB')
  //     console.log(JSON.stringify(results))
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     })
  //     res.end(JSON.stringify(results))
  //   })
  //   .catch(err => {
  //     console.log('Error occured while fetching data from DB')
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Error occured while fetching data from DB')
  //   })
})

module.exports = router
