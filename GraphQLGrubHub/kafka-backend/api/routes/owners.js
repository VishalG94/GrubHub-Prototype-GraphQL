const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var dateforamt = require('dateformat')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const owners = require('../models/owner')
const db = {}
app.use(bodyParser.json())
const bcrypt = require('bcrypt')
const saltRounds = 10
const crypt = require('../config/crypt')
const upload = require('../config/multer')
var passport = require('passport')
var jwt = require('jsonwebtoken')

var requireAuth = passport.authenticate('jwt', { session: false })

app.use(passport.initialize())
app.use(passport.session())
// Bring in defined Passport Strategy
require('../config/passport')(passport)

router.post('/ownerlogin', function (req, res) {
  console.log('Inside OwnerLogin Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  owners
    .find({
      email: req.body.email
    })
    .then(docs => {
      if (docs.length !== 0) {
        // console.log(crypt.compareHash)
        console.log(req.body.password)
        console.log(docs[0].password)
        // bcrypt.compare(req.body.password, docs[0].password,  (err, isMatch) => {
        crypt.compareHash(
          req.body.password,
          docs[0].password,
          (err, isMatch) => {
            if (isMatch && !err) {
              var token = jwt.sign(req.body, process.env.SECRET_OR_KEY, {
                expiresIn: 10080 // in seconds
              })
              res.cookie('cookie', docs[0].email, {
                maxAge: 900000,
                httpOnly: false,
                path: '/'
              })
              res.status(200).json({ success: true, token: token })

              // res.cookie('userid', docs[0]._id.toString(), {maxAge: 900000, httpOnly: false, path: '/'});
              // res.cookie('username', docs[0].username, {maxAge: 900000,httpOnly: false,path: '/'});
              // res.writeHead(200, {
              //     'Content-Type': 'text/plain'
              // })
              // res.end(JSON.stringify(docs));
              // res.end("Successful");
              console.log('successful', docs)
            } else {
              res.writeHead(201, {
                'Content-Type': 'text/plain'
              })
              res.end('UnSuccessful')
              console.log('Sent Invalid result- inside')
              console.log(err)
            }
          },
          err => {
            res.writeHead(202, {
              'Content-Type': 'text/plain'
            })
            res.end('UnSuccessful')
            console.log('Sent Invalid result')
            console.log(err)
          }
        )
      } else {
        res.writeHead(202, {
          'Content-Type': 'text/plain'
        })
        res.end('UnSuccessful')
        console.log('Sent Invalid result')
        console.log(err)
      }
    })
  //   pool.getConnection((error, tempCont) => {
  //     if (error) {
  //       console.log('Error')
  //     } else {
  //       tempCont.query(
  //         'select * from owners where email="' +
  //           req.body.email +
  //           '" and password="' +
  //           req.body.password +
  //           '";',
  //         (error, result, fields) => {
  //           if (error) {
  //             res.writeHead(404, {
  //               'Content-Type': 'text/plain'
  //             })
  //             res.end('Please check the email  and password.')
  //           } else {
  //             console.log('result of query:', result)
  //             res.cookie('cookie', result.email, {
  //               maxAge: 900000,
  //               httpOnly: false,
  //               path: '/'
  //             })
  //             req.session.result = result
  //             res.writeHead(200, {
  //               'Content-Type': 'application/json'
  //             })
  //             res.end(JSON.stringify(result))
  //           }
  //         }
  //       )
  //     }
  //   })
})

// app.post('/signup', function (req, res) {
//   // Object.keys(req.body).forEach(function(key){
//   //     req.body = JSON.parse(key);
//   // });
//   // var username = req.body.username;
//   // var password = req.body.password;
//   console.log('Inside Sign Up Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   var now = new Date()

//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')

//   // var date = new Date().getDate(); //Current Date
//   //   var month = new Date().getMonth() + 1; //Current Month
//   //   var year = new Date().getFullYear();
//   //   var today= year+'-'+(month>9? '':0)+month +'-'+(date>9? '':0)+date;
//   // console.log(today.toISOString().substring(0, 10));
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'INSERT INTO users (first_name,last_name,email,password, created, modified) VALUES ("' +
//           req.body.firstname +
//           '","' +
//           req.body.lastname +
//           '","' +
//           req.body.email +
//           '","' +
//           req.body.password +
//           '","' +
//           today +
//           '","' +
//           today +
//           '");',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while inserting data in DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while inserting data in DB')
//           } else {
//             console.log('User registered sucessfully!')
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//           }
//         }
//       )
//     }
//   })
// })

router.post('/ownersignup', function (req, res) {
  console.log('Inside Owner Sign Up Post Request')
  // console.log('Req Body : ', req.body)
  var id = mongoose.Types.ObjectId()
  let pswd = req.body.password
  // const saltRounds = process.env.SALTROUNDS
  //   console.log(process.env.SALTROUNDS)
  // console.log(pswd)
  //   console.log(req.body)
  crypt.createHash(
    pswd,
    (err, hash) => {
      // bcrypt.hash(pswd, saltRounds, (err, hash) => {
      if (err) {
        console.log('encountered error while hashing' + err)
      } else {
        // console.log(hash)
        let owner = new owners({
          _id: id,
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          email: req.body.email,
          password: hash,
          restaurant_name: req.body.restaurantname,
          restaurant_zipcode: req.body.zipcode,
          cuisine: req.body.cuisine
        })

        owner
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
      }
    },
    err => {
      res.writeHead(202, {
        'Content-Type': 'text/plain'
      })
      res.end('Registration UnSuccessful')
      console.log('Sent Invalid result')
      console.log(err)
    }
  )
  // Object.keys(req.body).forEach(function(key){
  //     req.body = JSON.parse(key);
  // });
  // var username = req.body.username;
  // var password = req.body.password;
  //   console.log('Inside OwnerSign Up Post Request')
  //   // console.log("Req Body : ", username + "password : ",password);
  //   console.log('Req Body : ', req.body)
  //   var now = new Date()

  //   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')

  // var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear();
  //   var today= year+'-'+(month>9? '':0)+month +'-'+(date>9? '':0)+date;
  // console.log(today.toISOString().substring(0, 10));
  //   pool.getConnection((error, tempCont) => {
  //     if (error) {
  //       console.log('Error')
  //     } else {
  //       tempCont.query(
  //         'INSERT INTO owners (first_name,last_name,email,password,restaurant_name,restaurant_zipcode ,created, modified, cuisine) VALUES ("' +
  //           req.body.firstname +
  //           '","' +
  //           req.body.lastname +
  //           '","' +
  //           req.body.email +
  //           '","' +
  //           req.body.password +
  //           '","' +
  //           req.body.restaurantname +
  //           '","' +
  //           req.body.zipcode +
  //           '","' +
  //           today +
  //           '","' +
  //           today +
  //           '","' +
  //           req.body.cuisine +
  //           '");',
  //         (error, results, fields) => {
  //           if (error) {
  //             console.log('Error occured while inserting data in DB')
  //             res.writeHead(400, {
  //               'Content-Type': 'text/plain'
  //             })
  //             res.end('Error occured while inserting data in DB')
  //           } else {
  //             console.log('result of query:', results)
  //             // res.cookie('cookie', results.email, {
  //             //   maxAge: 900000,
  //             //   httpOnly: false,
  //             //   path: '/'
  //             // })
  //             // req.session.result = results
  //             console.log('Owner registered sucessfully!')
  //             res.writeHead(200, {
  //               'Content-Type': 'text/plain'
  //             })
  //             res.end('Successfully Registered')
  //           }
  //         }
  //       )
  //     }
  //   })
})

router.post('/restaurantcontact', function (req, res) {
  console.log('Inside restaurant contact Post Request')
  owners
    .update(
      { email: req.body.email },
      {
        $set: {
          address2: req.body.address2,
          address1: req.body.address1,
          phone: req.body.phone
        }
      }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated Contact details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
  // console.log("Req Body : ", username + "password : ",password);
  // console.log('Req Body : ', req.body)
  // let query =
  //   'UPDATE owners SET address1 = "' +
  //   req.body.address1 +
  //   '", address2 = "' +
  //   req.body.address2 +
  //   '", phone = "' +
  //   req.body.phone +
  //   '" WHERE email = "' +
  //   req.body.email +
  //   '";'

  // console.log(query)

  // pool.getConnection((error, tempCont) => {
  //   if (error) {

  //     console.log('Error')
  //   } else {
  //     tempCont.query(query, (error, results, fields) => {
  //       if (error) {
  //         console.log('Error occured while inserting data in DB')
  //         res.writeHead(400, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end('Error occured while inserting data in DB')
  //       } else {
  //         console.log('User registered sucessfully!')
  //         res.writeHead(200, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end('Successfully Registered')
  //       }
  //     })
  //   }
  // })
})

router.get('/ownerdetails', function (req, res) {
  console.log('Inside User Profile')

  owners
    .find({
      email: req.query.email
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      // console.log(JSON.stringify(results[0]));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      delete results.password
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

router.get('/restaurantdetails', function (req, res) {
  console.log('Inside restaurants details:')

  console.log('Req Body : ', req.query.details)
  let temp = req.query.details
  var nameArr = temp.split(',')
  console.log(nameArr)

  // let str = nameArr
  //   .map(function (restaurant) {
  //     // Wrap each element of the dates array with quotes
  //     return '"' + restaurant + '"'
  //   })
  //   .join(',')
  //   str = '['+str+']'
  //   console.log('str'+str)
  owners
    .find({
      restaurant_name: { $in: nameArr }
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log('results' + results)
      // console.log(JSON.stringify(results[0]));
      console.log('result of query:', results)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(results))
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while fetching data from DB')
    })
  // console.log(str);

  // let query =
  //   'SELECT image, sections, rating, restaurant_name, cuisine FROM owners WHERE restaurant_name in (' +
  //   str +
  //   ');'
  // console.log(query)
  // connection.connect();
  // pool.getConnection((error, tempCont) => {
  //   if (error) {

  //     console.log('Error')
  //   } else {
  //     tempCont.query(query, (error, result, fields) => {
  //       if (error) {
  //         res.writeHead(404, {
  //           'Content-Type': 'text/plain'
  //         })
  //         res.end('No restaurant details found.')
  //       } else {
  //         console.log('result of query:', result)
  //         res.writeHead(200, {
  //           'Content-Type': 'application/json'
  //         })
  //         res.end(JSON.stringify(result))
  //       }
  //     })
  //   }
  // })
})

router.post('/updateownername', function (req, res) {
  console.log('Inside updateusername Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  owners
    .update(
      { email: req.body.email },
      { $set: { first_name: req.body.firstname, last_name: req.body.lastname } }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated Contact details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
})

router.get('/ownerprofile', function (req, res) {
  console.log('Inside Owner Profile')
  console.log('req body: ' +req.query.email )
  owners
    .find({
      email: req.query.email
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log(JSON.stringify(results[0]));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      delete results.password
      res.end(JSON.stringify(results[0]))
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while fetching data from DB')
    })
})

router.post('/ownerrestaurantzipcode', function (req, res) {
  console.log('ownerrestaurantzipcode') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  owners
    .update(
      { email: req.body.email },
      { $set: { restaurant_zipcode: req.body.newrestaurantzipcode } }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated Contact details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
})


router.post('/ownerrestaurantname', function (req, res) {
  console.log('Inside ownerrestaurantname Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  owners
    .update(
      { email: req.body.email },
      { $set: { restaurant_name: req.body.newrestaurantname } }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated Contact details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
})


router.post('/updateownerphone', function (req, res) {
  console.log('Inside owner phone Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  owners
    .update(
      { email: req.body.email },
      { $set: { phone: req.body.newPhone } }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated Contact details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
})

router.post('/updateowneremail', function (req, res) {
  console.log('Inside owner email Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  owners
    .update(
      { email: req.body.email },
      { $set: { email: req.body.newEmail } }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated Contact details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
})

router.post('/ownerimage', function (req, res) {
  // try {
  console.log('Inside Owner Image')

  // console.log(req.body.email);
  let filename = null
  let binaryData = null
  let base64String = null

  owners
    .find({
      email: req.body.email
    })
    .then(results => {
      // let query= res[0].image;
      if (
        results[0].image === null ||
        results[0].image === [] ||
        typeof results[0].image === 'undefined'
      ) {
        console.log('No records found!')
      } else {
        console.log(results[0].image)
        binaryData = fs.readFileSync(
          __dirname.split('/api')[0] + '/public/profilepics/' + results[0].image
        )
        base64String = new Buffer(binaryData).toString('base64')
        console.log('Successfully fetched data from DB')
        // console.log(JSON.stringify(results[0]));
        res.writeHead(200, {
          'Content-Type': 'image/png'
        })
        res.end(base64String)
      }
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB.')
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while fetching data from DB')
    })
})

// router.post('/ownerimageform', function (req, res) {
//   console.log()
//   upload(req, res, err => {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with uploading')
//     } else {
//       console.log('Inside owner upload post call')
//       console.log(req.file.originalname)
//       // console.log(req.file.email);
//       pool.getConnection((error, tempCont) => {
//         if (error) {
          
//           console.log('Error')
//         } else {
//           tempCont.query(
//             'UPDATE owners SET image = "' +
//               req.file.filename +
//               '" WHERE email = "' +
//               req.file.originalname +
//               '";',
//             (error, results, fields) => {
//               if (error) {
//                 console.log('Error occured while upating data in DB')
//                 res.writeHead(400, {
//                   'Content-Type': 'text/plain'
//                 })
//                 res.end('Error occured while upating data in DB')
//               } else {
//                 console.log('Updated image.')
//                 res.writeHead(200, {
//                   'Content-Type': 'text/plain'
//                 })
//                 res.end('Successfully Registered')
//               }
//             }
//           )
//         }
//       })
//     }
//   })
// })

router.post('/ownerimageform', function (req, res) {
  upload(req, res, err => {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Issue with uploading')
    } else {
      console.log('Inside upload post call')
      console.log(req.file.originalname)
      // console.log(req.file.email);
      owners
        .update(
          { email: req.file.originalname },
          { $set: { image: req.file.filename } }
        )
        .then(response => {
          console.log('response' + response)
          console.log('Updated owner image.')
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end('Successfully Registered')
        })
        .catch(err => {
          console.log('Error occured while upating data in DB')
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Error occured while upating data in DB')
        })
    }
  })
})



module.exports = router
