const express = require('express')
// const mongoose = require('mongoose')
const router = express.Router()
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const users = require('../models/user')
const db = {}
var dateforamt = require('dateformat')
app.use(bodyParser.json())
const bcrypt = require('bcrypt')
const saltRounds = 10
const crypt = require('../config/crypt')
const upload = require('../config/multer')
const fs = require('fs')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var kafka =require("../../kafka/client");

var requireAuth = passport.authenticate('jwt', { session: false })

app.use(passport.initialize())
app.use(passport.session())
// Bring in defined Passport Strategy
require('../config/passport')(passport)

// router.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// router.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//  //  res.setHeader('Access-Control-Allow-Origin', '*')
//    res.setHeader('Access-Control-Allow-Credentials', 'true')
//    res.setHeader(
//      'Access-Control-Allow-Methods',
//      'GET,HEAD,OPTIONS,POST,PUT,DELETE'
//    )
//    res.setHeader(
//      'Access-Control-Allow-Headers',
//      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
//    )
//    res.setHeader('Cache-Control', 'no-cache')
//    next()
//  })

router.post('/signup', function (req, res) {
  console.log('Inside Sign Up Post Request')
  // console.log('Req Body : ', req.body)
   kafka.make_request('sign_up',req.body, function(err,results){
        // console.log(results);
        if (err){
                    res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Unable to get data");
        console.log("Unable get data");
        // console.log(err);
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log("Results");
            console.log(results);
            res.end(JSON.stringify(results));
        }   
    });

  // var id = mongoose.Types.ObjectId()
  // let pswd = req.body.password
  // // const saltRounds = process.env.SALTROUNDS
  // console.log(process.env.SALTROUNDS)
  // console.log(pswd)
  // // console.log(bcrypt)
  // crypt.createHash(
  //   pswd,
  //   (err, hash) => {
  //     // bcrypt.hash(pswd, saltRounds, (err, hash) => {
  //     if (err) {
  //       console.log('encountered error while hashing' + err)
  //     } else {
  //       console.log(hash)
  //       let usr = new users({
  //         _id: id,
  //         first_name: req.body.firstname,
  //         last_name: req.body.lastname,
  //         email: req.body.email,
  //         password: hash
  //       })

  //       usr
  //         .save()
  //         .then(response => {
  //           console.log('response' + response)
  //           res.writeHead(200, {
  //             'Content-Type': 'text/plain'
  //           })
  //           res.end('Successfully Registered')
  //         })
  //         .catch(err => {
  //           console.log('Error occured while inserting data in DB' + err)
  //           res.writeHead(400, {
  //             'Content-Type': 'text/plain'
  //           })
  //           res.end('Error occured while inserting data in DB')
  //         })
  //     }
  //   },
  //   err => {
  //     res.writeHead(202, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Registration UnSuccessful')
  //     console.log('Sent Invalid result')
  //     console.log(err)
  //   }
  // )
})

router.post('/login', function (req, res) {
  console.log('Inside router Login Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)

  users
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
              // res.cookie('cookie', docs[0].email, {
              //   maxAge: 900000,
              //   httpOnly: false,
              //   path: '/'
              // })
              res.status(200).json({ success: true, token: token })
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
        // console.log(err)
      }
    })
})

//   users
//     .find({
//       email: req.body.email
//     })
//     .then(response => {
//       console.log(response)
//       crypt.compareHash(password,docs[0].password, (isMatch,err) => {

//       }

//       if (Object.entries(response).length !== 0) {
//         console.log('Inside if res ' + response + ' ponse')
//         res.cookie('cookie', req.body.email, {
//           maxAge: 900000,
//           httpOnly: false,
//           path: '/'
//         })
//         // req.session.result = result
//         res.writeHead(200, {
//           'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(response))
//         console.log('********Sent response******')
//       } else {
//         console.log('Inside else response: ' + response)
//         console.log('Error occured while trying to login!')
//         // res.writeHead(400, {
//         //   'Content-Type': 'text/plain'
//         // })
//         // res.end('Error occured while trying to login!')
//       }
//     })
//     .catch(err => {
//       console.log('err' + err)
//     })
//   // connection.connect();
//   // pool.getConnection((error, tempCont) => {
//   //   if (error) {
//   //     console.log('Error')
//   //   } else {
//   //     tempCont.query(
//   //       'select email,password from users where email="' +
//   //         req.body.email +
//   //         '" and password="' +
//   //         req.body.password +
//   //         '";',
//   //       (error, result, fields) => {
//   //         if (error) {
//   //           res.writeHead(404, {
//   //             'Content-Type': 'text/plain'
//   //           })
//   //           res.end('Please check the email  and password.')
//   //         } else {
//   //           console.log('result of query:', result)
//   //           res.cookie('cookie', result.email, {
//   //             maxAge: 900000,
//   //             httpOnly: false,
//   //             path: '/'
//   //           })
//   //           req.session.result = result
//   //           res.writeHead(200, {
//   //             'Content-Type': 'application/json'
//   //           })
//   //           res.end(JSON.stringify(result))
//   //         }
//   //       }
//   //     )
//   //     tempCont.release()
//   //   }
//   // })
// })

router.post('/buyerprofile', function (req, res) {
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
      users
        .update(
          { email: req.file.originalname },
          { $set: { image: req.file.filename } }
        )
        .then(response => {
          console.log('response' + response)
          console.log('Updated image.')
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

router.post('/userImage', function (req, res) {
  // try {
  console.log('Inside User Image')

  // console.log(req.body.email);
  let filename = null
  let binaryData = null
  let base64String = null

  users
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
        // console.log(__dirname);
        // console.log(__dirname.split('/api')[0]);
        // filename = path.resolve(
        //   __dirname.split('/api')[0],
        //   './public/profilepics/' + results[0].image
        // )
        // console.log(__dirname.split('/api')[0]+'/public/profilepics/'+results[0].image)
        // binaryData = fs.readFileSync("/Users/vishalgadapa/Documents/SJSU/CMPE 273/projects/Assignments/ReduxGrubHub/Backend/public/profilepics/myImage_1569764036857.com.png")
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

router.get('/userprofile', function (req, res) {
  console.log('Inside User Profile')

  users
    .find({
      email: req.query.email
    })
    .then(results => {
      console.log('Successfully fetched data from DB')
      // console.log(JSON.stringify(results[0]));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
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

router.post('/updateusername', function (req, res) {
  console.log('Inside updateusername Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  
  users
    .update(
      { email: req.body.email },
      { $set: { first_name: req.body.firstname, last_name : req.body.lastname } }
    )
    .then(response => {
      // console.log(response)
      console.log('Updated username!')
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
  // pool.getConnection((error, tempCont) => {
  //   if (error) {

  //     console.log('Error')
  //   } else {
  //     tempCont.query(
  //       'UPDATE users SET first_name = "' +
  //         req.body.firstname +
  //         '", last_name="' +
  //         req.body.lastname +
  //         '" WHERE email = "' +
  //         req.body.email +
  //         '" and password="' +
  //         req.body.password +
  //         '";',
  //       (error, results, fields) => {
  //         if (error) {
  //           console.log('Error occured while upating data in DB')
  //           res.writeHead(400, {
  //             'Content-Type': 'text/plain'
  //           })
  //           res.end('Error occured while upating data in DB')
  //         } else {
  //           console.log('Updated username.')
  //           res.writeHead(200, {
  //             'Content-Type': 'text/plain'
  //           })
  //           res.end('Successfully Registered')
  //         }
  //       }
  //     )
  //   }
  // })
})

router.post('/updateuseremail', function (req, res) {
  console.log('Inside owner email Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  users
        .update(
          { email: req.body.email },
          { $set: { email: req.body.newEmail } }
        )
        .then(response => {
          console.log('response' + response)
          console.log('Updated phone.')
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end('Successfully update phone')
        })
        .catch(err => {
          console.log('Error occured while upating data in DB')
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Error occured while upating data in DB')
        })
  // pool.getConnection((error, tempCont) => {
  //   if (error) {
      
  //     console.log('Error')
  //   } else {
  //     tempCont.query(
  //       'UPDATE owners SET email= "' +
  //         req.body.newEmail +
  //         '" where email="' +
  //         req.body.email +
  //         '" and password="' +
  //         req.body.password +
  //         '";',
  //       (error, results, fields) => {
  //         if (error) {
  //           console.log('Error occured while fetching data from DB' + error)
  //           res.writeHead(400, {
  //             'Content-Type': 'text/plain'
  //           })
  //           res.end('Error occured while fetching data from DB')
  //         } else {
  //           console.log('Successfully update data in DB')
  //           // console.log(JSON.stringify(results[0]));
  //           res.writeHead(200, {
  //             'Content-Type': 'application/json'
  //           })
  //           res.end('Successfully upated owner email')
  //         }
  //       }
  //     )
  //   }
  // })
})

router.post('/updateuserphone', function (req, res) {
  console.log('Inside owner phone Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  users
    .update(
      { email: req.body.email },
      { $set: { phone: req.body.newPhone } }
    )
    .then(response => {
      console.log('response' + response)
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Updated phone details')
    })
    .catch(err => {
      console.log('Error occured while upating contact details in DB' + err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while updating data in DB')
    })
})


passport.serializeUser(function (email, done) {
  done(null, user.id)
  // where is this user.id going? Are we supposed to access this anywhere?
})

// used to deserialize the user
passport.deserializeUser(function (email, done) {
  done(null, user)
})

module.exports = router
