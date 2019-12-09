const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const messages = require('../models/message')
app.use(bodyParser.json())
var dateforamt = require('dateformat')



router.post('/postmessage', function (req, res) {
    console.log('Inside messages Post Request')
    // console.log("Req Body : ", username + "password : ",password);
  
    var now = new Date()
    var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
    var id = mongoose.Types.ObjectId()
    console.log('Req Body : ', req.body)
    let msg = new messages({
      _id: id,
      restaurant_name: req.body.restaurant_name,
      order_id: req.body.order_id,
      user_email: req.body.user_email,
      text: req.body.mesg,
      is_user: req.body.is_user,
      created: today
    })
    console.log(msg)
    msg
      .save()
      .then(response => {
        console.log('response' + response)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end('Successfully Registered')
      })
      .catch(err => {
        console.log('Error occured while inserting data in DB' + err)
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Error occured while inserting data in DB')
      })
  })


router.get('/messagedetails', function (req, res) {
    console.log('Inside menu details'+req.query.orderId)
    messages
      .find({
          order_id: req.query.orderId
      })
      .then(results => {
        console.log('Successfully fetched data from DB')
        console.log(JSON.stringify(results))
        res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        //   delete results[0].password;
        res.end(JSON.stringify(results))
      })
      .catch(err => {
        console.log('Error occured while fetching data from DB')
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Error occured while fetching data from DB')
      })
  })

// router.post('/restaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//     var now = new Date()
//     var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
//   var id = mongoose.Types.ObjectId()
//   console.log('Req Body : ', req.body)
//   let mnu = new menus({
//     _id: id,
//     dish_name: req.body.dishname,
//     description: req.body.description,
//     price: req.body.price,
//     section: req.body.section,
//     restaurant_name: req.body.restaurantname,
//     restaurant_zipcode: req.body.zipcode
//   })
//   mnu
//     .save()
//     .then(response => {
//       console.log('response' + response)
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Successfully Registered')
//     })
//     .catch(err => {
//       console.log('Error occured while inserting data in DB' + err)
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     })
//   // let query =
//   //   'INSERT INTO menu (dish_name,description , price, section, restaurant_name, restaurant_zipcode, created, modified) VALUES ("' +
//   //   req.body.dishname +
//   //   '","' +
//   //   req.body.description +
//   //   '","' +
//   //   req.body.price +
//   //   '","' +
//   //   req.body.section +
//   //   '","' +
//   //   req.body.restaurantname +
//   //   '","' +
//   //   req.body.zipcode +
//   //   '","' +
//   //   today +
//   //   '","' +
//   //   today +
//   //   '");'

//   // console.log(query)

//   // pool.getConnection((error, tempCont) => {
//   //   if (error) {

//   //     console.log('Error')
//   //   } else {
//   //     tempCont.query(query, (error, results, fields) => {
//   //       if (error) {
//   //         console.log('Error occured while inserting data in DB')
//   //         res.writeHead(400, {
//   //           'Content-Type': 'text/plain'
//   //         })
//   //         res.end('Error occured while inserting data in DB')
//   //       } else {
//   //         console.log('User registered sucessfully!')
//   //         res.writeHead(200, {
//   //           'Content-Type': 'text/plain'
//   //         })
//   //         res.end('Successfully Registered')
//   //       }
//   //     })
//   //   }
//   // })
// })

// router.get('/restaurants', function (req, res) {
//   console.log('Inside restaurants:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   // let query =
//   //   'SELECT DISTINCT restaurant_name FROM menu WHERE restaurant_zipcode="' +
//   //   req.query.zipcode +
//   //   '" and dish_name REGEXP "' +
//   //   req.query.dish_name +
//   //   '";'
//   // console.log(query)
//   //   let dish = '/'+req.query.dish_name+'/';
//   //   console.log(dish);
//   menus
//     .distinct('restaurant_name', {
//       dish_name: new RegExp(req.query.dish_name, 'i'),
//       restaurant_zipcode: req.query.zipcode
//     })
//     .then(results => {
//       console.log('Successfully fetched data from DB')
//       console.log(results)
//       // console.log(JSON.stringify(results[0]));
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(results))
//     })
//     .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//     })
// })

// router.get('/restaurantsections', function (req, res) {
//   console.log('Inside restaurants sections:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.restaurant_name)
//   let temp = req.query.restaurant_name
//   // console.log(str);
//   menus
//     .distinct('section', {
//       // dish_name: req.query.dish_name,
//       restaurant_name: req.query.restaurant_name
//     })
//     .then(results => {
//       console.log('Successfully fetched section data from DB')
//       console.log('results: ' + results)
//       // console.log(JSON.stringify(results[0]));
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(results))
//     })
//     .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//     })
//   // let query =
//   //   'select distinct(section) from menu where restaurant_name="' +
//   //   req.query.restaurant_name +
//   //   '";'
//   // console.log(query)
//   // // connection.connect();
//   // pool.getConnection((error, tempCont) => {
//   //   if (error) {

//   //     console.log('Error')
//   //   } else {
//   //     tempCont.query(query, (error, result, fields) => {
//   //       if (error) {
//   //         res.writeHead(404, {
//   //           'Content-Type': 'text/plain'
//   //         })
//   //         res.end('No restaurant details found.')
//   //       } else {
//   //         console.log('result of query:', result)
//   //         res.writeHead(200, {
//   //           'Content-Type': 'application/json'
//   //         })
//   //         res.end(JSON.stringify(result))
//   //       }
//   //     })
//   //   }
//   // })
// })

// router.get('/sectionsmenu', function (req, res) {
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Inside restaurants menu:')
//   console.log('Req Body : ', req.query.restaurant_name, req.query.section)
//   let temp = req.query.restaurant_name
//   // console.log(str);
//   menus
//     .find({
//       restaurant_name: req.query.restaurant_name,
//       section: req.query.section
//     })
//     .then(results => {
//       console.log('Successfully fetched data from DB')
//       // console.log(JSON.stringify(results[0]));
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       //   delete results[0].password;
//       res.end(JSON.stringify(results))
//     })
//     .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//     })
// })

// router.post('/deletedish', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   menus
//     .deleteOne({
//       _id: req.body.id
//       // section: req.query.section
//     })
//     .then(results => {
//       console.log('Successfully deleted data from DB')
//       // console.log(JSON.stringify(results[0]));
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       //   delete results[0].password;
//       res.end(JSON.stringify(results))
//     })
//     .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//     })
// })

// router.post('/deletesection', function (req, res) {
//   console.log('Inside delete section Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   menus
//     .deleteMany({
//       //   _id: req.body.id
//       section: req.body.section,
//       restaurant_name: req.body.restaurantname
//     })
//     .then(results => {
//       console.log('Successfully deleted data from DB')
//       // console.log(JSON.stringify(results[0]));
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       //   delete results[0].password;
//       res.end(JSON.stringify(results))
//     })
//     .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//     })
//   // let query = 'Delete from menu WHERE section = "' + req.body.section + '";'

//   // console.log(query)

//   // pool.getConnection((error, tempCont) => {
//   //   if (error) {

//   //     console.log('Error')
//   //   } else {
//   //     tempCont.query(query, (error, results, fields) => {
//   //       if (error) {
//   //         console.log('Error occured while inserting data in DB')
//   //         res.writeHead(400, {
//   //           'Content-Type': 'text/plain'
//   //         })
//   //         res.end('Error occured while inserting data in DB')
//   //       } else {
//   //         console.log('deleted section from menu!')
//   //         res.writeHead(200, {
//   //           'Content-Type': 'text/plain'
//   //         })
//   //         res.end('Deleted section from menu!')
//   //       }
//   //     })
//   //   }
//   // })
// })

// router.post('/updaterestaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu update Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   var now = new Date()
//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
//   console.log('Req Body : ', req.body)
//   menus.updateOne(
//     { _id: req.body.id },
//     { $set: { dish_name:req.body.dishname , description: req.body.description, price: req.body.price, section: req.body.section, modified:today  } }
//   ).then(response => {
//     console.log('response' + response)
//     res.writeHead(200, {
//       'Content-Type': 'text/plain'
//     })
//     res.end('Successfully Updated Contact details')
//   })
//   .catch(err => {
//     console.log('Error occured while upating contact details in DB' + err)
//     res.writeHead(400, {
//       'Content-Type': 'text/plain'
//     })
//     res.end('Error occured while updating data in DB')
//   })
// //   let query =
// //     'UPDATE menu SET dish_name = "' +
// //     req.body.dishname +
// //     '", description = "' +
// //     req.body.description +
// //     '", price = ' +
// //     req.body.price +
// //     ', section = "' +
// //     req.body.section +
// //     '", modified = "' +
// //     today +
// //     '" WHERE id = "' +
// //     req.body.id +
// //     '";'

// //   console.log(query)

// //   pool.getConnection((error, tempCont) => {
// //     if (error) {
// //       console.log('Error')
// //     } else {
// //       tempCont.query(query, (error, results, fields) => {
// //         if (error) {
// //           console.log('Error occured while inserting data in DB')
// //           res.writeHead(400, {
// //             'Content-Type': 'text/plain'
// //           })
// //           res.end('Error occured while inserting data in DB')
// //         } else {
// //           console.log('User registered sucessfully!')
// //           res.writeHead(200, {
// //             'Content-Type': 'text/plain'
// //           })
// //           res.end('Successfully Registered')
// //         }
// //       })
// //     }
// //   })
// })

// router.get('/menudetails', function (req, res) {
//     console.log('Inside menu details')
//     menus
//     .find({
//       _id: req.query.id
//     })
//     .then(results => {
//       console.log('Successfully fetched data from DB')
//       console.log(JSON.stringify(results));
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       //   delete results[0].password;
//       res.end(JSON.stringify(results[0]))
//     })
//     .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//     })
//   })




module.exports = router
