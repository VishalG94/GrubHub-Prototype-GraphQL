// import the require dependencies
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var cors = require('cors')
app.set('view engine', 'ejs')
var dateforamt = require('dateformat')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
let pool = require('./connection.js')
let { mongoose } = require('./mongoose.js');
const schema = require('./api/schema/schema')
// let mogooseConn = require('./mongooseConnection.js');
// console.log(pool)
app.use('/images', express.static('public'))
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
// mogooseConn();
app.use(cookieParser());
// console.log()
// const JwtStrategy = require('passport-jwt').Strategy,
//       ExtractJwt = require('passport-jwt').ExtractJwt;

// const opts ={
//    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//    secretOrKey: process.env.SECRET_OR_KEY
//   }; 

// const strategy = new JwtStrategy(opts, (payload, next)=>{
//  //Todo get user form db;

//   const user= null;
//   next(null, user); 
// })

// passport.use(strategy);
// app.use(passport.initialize());
// app.use(passport.session());





// const uri =
//   'mongodb+srv://Vishal:' +
//   process.env.MONGO_ATLAS_PW +
//   '@grubhub-9ivmy.mongodb.net/grubhub?retryWrites=true&w=majority';
// // mongoose.Promise = global.Promise;
// // mongoose.connect('mongodb://10.7.0.3:27107/data/db');
// mongoose.connect(
//   uri,
//   { useUnifiedTopology: true, useNewUrlParser: true }
// )


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'grubhub',
//   password: 'password'
// })

// let pool = mysql.createPool({
//   connectionLimit: 800,
//   port: '3306',
//   host: '127.0.0.1',
//   user: 'root',
//   database: 'grubhub',
//   password: 'password'
// })
// console.log('pool', pool)

const storage = multer.diskStorage({
  destination: './public/profilepics/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
      '_' +
      Date.now() +
      path.extname(file.originalname) +
      '.png'
    )
  }
})

const upload = multer({
  storage: storage
}).single('myImage')

// app.use(multer({dest:'./uploads/', filename: function(req, file, cb){
//   cb(null,file.fieldname+'_'+ Date.now()+path.extname(file.originalname));
// }}).single('myImage'));

// connection.connect();
// connection.end();

// connection.connect(err => {
//   if (!err) {
//     console.log('Successfully connected to database.')
// // console.log("env"+process.env.MONGO_ATLAS_PW);
//   } else {
//     console.log('Error connecting to the database.')
//   }
// })

// 'SELECT * from users', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end()

// use cors to allow cross origin resource sharing
app.use(cors({ origin: process.env.ROOT_URL, credentials: true }))
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// app.use(cors({ origin: '*', credentials: true }))

// use express session to maintain session data
app.use(
  session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
)

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json())

// Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ROOT_URL)
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  // res.setHeader('Access-Control-Allow-Origin', process.env.ROOT_URL)
  //  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// var Users = [
//   {
//     username: 'admin',
//     password: 'admin'
//   }
// ]
// const users = require('./api/models/user')
// const owners = require('./api/models/owner')
const router = express.Router()
// app.use(router);

const userRoutes = require('./api/routes/users');
app.use(userRoutes);
const ownerRoutes = require('./api/routes/owners');
app.use(ownerRoutes);

const menuRoutes = require('./api/routes/menus');
app.use(menuRoutes);
const orderRoutes = require('./api/routes/orders');
app.use(orderRoutes);

const messageRoutes = require('./api/routes/messages');
app.use(messageRoutes);
// console.log(ownerRoutes);
// console.log(userRoutes);



// router.post('/signup', function (req, res) {
//   console.log('Inside Sign Up Post Request')
//   console.log('Req Body : ', req.body)
//   var id = mongoose.Types.ObjectId();
//   var now = new Date()
//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
//   let usr = new users({
//     _id:  id,
//     first_name: req.body.firstname,
//     last_name: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password,
//     created: today,
//     modified: today
//   })
//   console.log(usr)
//   usr.save((err, res) => {
//     if (err) {
//       console.log('Error occured while inserting data in DB')
//       // res.writeHead(400, {
//       //   'Content-Type': 'text/plain'
//       // })
//       // res.end('Error occured while inserting data in DB')
//       // res.send("Succes");
//     } else {
//       console.log(res)
//       // res.writeHead(200, {
//       //   'Content-Type': 'text/plain'
//       // })
//       // res.end('Successfully Registered')
//       // res.send("Successfully Registered")
//     }
//   })
// })

// Route to handle Post Request Call

// app.post('/login', function (req, res) {
//   console.log('Inside Login Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)

//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'select email,password from users where email="' +
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
//       tempCont.release()
//     }
//   })

//   //   'select email,password from users where email="' +
//   //     req.body.email +
//   //     '" and password="' +
//   //     req.body.password +
//   //     '";',
//   //   (error, result, fields) => {
//   //     if (error) {
//   //       res.writeHead(404, {
//   //         'Content-Type': 'text/plain'
//   //       })
//   //       res.end('Please check the email  and password.')
//   //     } else {
//   //       console.log('result of query:', result)
//   //       res.cookie('cookie', result.email, {
//   //         maxAge: 900000,
//   //         httpOnly: false,
//   //         path: '/'
//   //       })
//   //       req.session.result = result
//   //       res.writeHead(200, {
//   //         'Content-Type': 'application/json'
//   //       })
//   //       res.end(JSON.stringify(result))
//   //     }
//   //   }
//   // )
// })

// pool.getConnection((err, con) => {
//   if (err) {
//     console.log("Error occurred while creating a connection ", err);
//     return callback(err, "Error occured");
//   } else {
//     con.query(queryString, (err, rows) => {
//       if (err) {
//         console.log("Error occurred while executing query ", err);
//         return callback(err, "Error occured");
//       } else {
//         return callback(null, rows);
//       }
//     });
//   }
//   con.release();
// }

// app.post('/ownerlogin', function (req, res) {
//   console.log('Inside OwnerLogin Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)

//   // connection.connect();
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
// })

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

// app.post('/ownersignup', function (req, res) {
//   // Object.keys(req.body).forEach(function(key){
//   //     req.body = JSON.parse(key);
//   // });
//   // var username = req.body.username;
//   // var password = req.body.password;
//   console.log('Inside OwnerSign Up Post Request')
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
// })

// app.post('/restaurantcontact', function (req, res) {
//   console.log('Inside restaurant contact Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query =
//     'UPDATE owners SET address1 = "' +
//     req.body.address1 +
//     '", address2 = "' +
//     req.body.address2 +
//     '", phone = "' +
//     req.body.phone +
//     '" WHERE email = "' +
//     req.body.email +
//     '";'

//   console.log(query)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('User registered sucessfully!')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Successfully Registered')
//         }
//       })
//     }
//   })
// })

// app.post('/orderstatus', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query =
//     'UPDATE orders SET order_status = "' +
//     req.body.order_status +
//     '" WHERE order_id = "' +
//     req.body.order_id +
//     '";'

//   console.log(query)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('update order status')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Successfully updated order status')
//         }
//       })
//     }
//   })
// })

// app.post('/buyerprofile', function (req, res) {
//   upload(req, res, err => {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with uploading')
//     } else {
//       console.log('Inside upload post call')
//       console.log(req.file.originalname)
//       // console.log(req.file.email);
//       pool.getConnection((error, tempCont) => {
//         if (error) {

//           console.log('Error')
//         } else {
//           tempCont.query(
//             'UPDATE users SET image = "' +
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


// app.post('/restaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')

//   console.log('Req Body : ', req.body)
//   let query =
//     'INSERT INTO menu (dish_name,description , price, section, restaurant_name, restaurant_zipcode, created, modified) VALUES ("' +
//     req.body.dishname +
//     '","' +
//     req.body.description +
//     '","' +
//     req.body.price +
//     '","' +
//     req.body.section +
//     '","' +
//     req.body.restaurantname +
//     '","' +
//     req.body.zipcode +
//     '","' +
//     today +
//     '","' +
//     today +
//     '");'

//   console.log(query)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('User registered sucessfully!')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Successfully Registered')
//         }
//       })
//     }
//   })
// })

app.post('/menuimage', function (req, res) {
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
      pool.getConnection((error, tempCont) => {
        if (error) {

          console.log('Error')
        } else {
          tempCont.query(
            'UPDATE menu SET image = "' +
            req.file.filename +
            '" WHERE email = "' +
            req.file.originalname +
            '";',
            (error, results, fields) => {
              if (error) {
                console.log('Error occured while upating data in DB')
                res.writeHead(400, {
                  'Content-Type': 'text/plain'
                })
                res.end('Error occured while upating data in DB')
              } else {
                console.log('Updated image.')
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                })
                res.end('Successfully Registered')
              }
            }
          )
        }
      })
    }
  })
})

// app.post('/userImage', function (req, res) {
//   // try {
//     console.log('Inside User Image')

//     // console.log(req.body.email);
//     let filename = null
//     let binaryData = null
//     let base64String = null

//     pool.getConnection((error, tempCont) => {
//       let query = 'Select image from users where email="' + req.body.email + '";'
//       console.log(query)
//       if (error) {

//         console.log('Error')
//       } else {
//         tempCont.query(query, (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB.')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } 
//           else {
//             if (results[0].image===null || results[0].image===[]  || typeof(results[0].image) === 'undefined') {
//               console.log('No records found!')
//             } else {
//                 console.log(results[0].image)
//                 // console.log(__dirname.split('Backend/')[0]);
//                 filename = path.resolve(
//                   __dirname,
//                   './public/profilepics/' + results[0].image
//                 )
//                 binaryData = fs.readFileSync(filename)
//                 base64String = new Buffer(binaryData).toString('base64')
//                 console.log('Successfully fetched data from DB')
//                 // console.log(JSON.stringify(results[0]));
//                 res.writeHead(200, {
//                   'Content-Type': 'image/png'
//                 })
//                 res.end(base64String)

//             }
//           }
//         })
//       }
//       // console.log('base64: ' + base64String)
//     })
//   //   let filename = null
//   //   let binaryData = null
//   //   let base64String = null

//   //   connection.query(
//   //     'Select image from users where email="' + req.body.email + '";',
//   //     (error, results, fields) => {
//   //       if (error) {
//   //         console.log('Error occured while fetching data from DB.')
//   //         res.writeHead(400, {
//   //           'Content-Type': 'text/plain'
//   //         })
//   //         res.end('Error occured while fetching data from DB')
//   //       } else {
//   //         if (results[0].image===null|| results[0].image===[] || typeof(results[0].image) === 'undefined') {
//   //           console.log('No records found!')
//   //         } else {
//   //           console.log('Found records!')
//   //           console.log(results)
//   //           filename = path.resolve(
//   //             __dirname,
//   //             './public/profilepics/' + results[0].image
//   //           )
//   //           binaryData = fs.readFileSync(filename)
//   //           base64String = new Buffer(binaryData).toString('base64')
//   //           console.log('Successfully fetched data from DB')
//   //           // console.log(JSON.stringify(results[0]));
//   //           res.writeHead(200, {
//   //             'Content-Type': 'image/png'
//   //           })
//   //           res.end(base64String)
//   //         }
//   //       }
//   //     }
//   //   )
//   // } catch (e) {
//   //   logMyErrors(e)
//   // }

//   // console.log('base64: ' + base64String)
// })

// app.post('/ownerImage', function (req, res) {
//   console.log('Inside Owners User Image')

//   // console.log(req.body.email);

//   let filename = null
//   let binaryData = null
//   let base64String = null

//   pool.getConnection((error, tempCont) => {
//     let query = 'Select image from owners where email="' + req.body.email + '";'
//     console.log(query)
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while fetching data from DB.')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while fetching data from DB')
//         } 
//         else {
//           if (results[0].image===null || results[0].image===[]  || typeof(results[0].image) === 'undefined') {
//             console.log('No records found!')
//           } else {
//               console.log(results[0].image)
//               filename = path.resolve(
//                 __dirname,
//                 './public/profilepics/' + results[0].image
//               )
//               binaryData = fs.readFileSync(filename)
//               base64String = new Buffer(binaryData).toString('base64')
//               console.log('Successfully fetched data from DB')
//               // console.log(JSON.stringify(results[0]));
//               res.writeHead(200, {
//                 'Content-Type': 'image/png'
//               })
//               res.end(base64String)

//           }
//         }
//       })
//     }
//     // console.log('base64: ' + base64String)
//   })
// })

// app.get('/userprofile', function (req, res) {
//   console.log('Inside User Profile')

//   // console.log(req.query.email)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'Select first_name, last_name, email,phone, password from users where email="' +
//           req.query.email +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully fetched data from DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results[0]))
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/updateusername', function (req, res) {
//   console.log('Inside updateusername Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'UPDATE users SET first_name = "' +
//           req.body.firstname +
//           '", last_name="' +
//           req.body.lastname +
//           '" WHERE email = "' +
//           req.body.email +
//           '" and password="' +
//           req.body.password +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while upating data in DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while upating data in DB')
//           } else {
//             console.log('Updated username.')
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

app.post('/updatecontact', function (req, res) {
  console.log('Inside email Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  let query = null
  let msg = null
  if (
    req.body.hasOwnProperty('newPhone') &&
    req.body.hasOwnProperty('newEmail')
  ) {
    query =
      'UPDATE users SET phone = "' +
      req.body.newPhone +
      '", email="' +
      req.body.newEmail +
      '" WHERE email = "' +
      req.body.email +
      '" and password="' +
      req.body.password +
      '";'
    msg = 'Upated email.'
  } else if (
    !req.body.hasOwnProperty('phone') &&
    req.body.hasOwnProperty('email')
  ) {
    query =
      'UPDATE users SET email="' +
      req.body.newEmail +
      '" WHERE email = "' +
      req.body.email +
      '" and password="' +
      req.body.password +
      '";'
    msg = 'Upated email.'
  } else if (
    req.body.hasOwnProperty('phone') &&
    req.body.hasOwnProperty('email')
  ) {
    query =
      'UPDATE users SET phone = "' +
      req.body.newPhone +
      '" WHERE email = "' +
      req.body.email +
      '" and password="' +
      req.body.password +
      '";'
  }

  pool.getConnection((error, tempCont) => {
    if (error) {

      console.log('Error')
    } else {
      tempCont.query(query, (error, results, fields) => {
        if (error) {
          console.log('Error occured while upating data in DB')
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Error occured while upating data in DB')
        } else {
          console.log('Updated contact.')
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(msg)
        }
      })
    }
  })
})

app.post('/updatepassword', function (req, res) {
  console.log('Inside password Post Request')
  // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)

  pool.getConnection((error, tempCont) => {
    if (error) {

      console.log('Error')
    } else {
      tempCont.query(
        'UPDATE users SET password = "' +
        req.body.newpassword +
        '" WHERE email = "' +
        req.body.email +
        '" and password="' +
        req.body.password +
        '";',
        (error, results, fields) => {
          if (error) {
            console.log('Error occured while upating data in DB')
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end('Error occured while upating data in DB')
          } else {
            console.log('Updated password.')
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            })
            res.end('Successfully Registered')
          }
        }
      )
    }
  })
})

// app.post('/ownerimageform', function (req, res) {
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

// app.post('/ownerimageform', function (req, res) {
//   console.log("Image body: ",req.file.originalname)
//   upload(req, res, err => {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with uploading')
//     } else {
//       // console.log('Inside upload post call')
//       console.log(req.file.originalname) // console.log(req.file.email);
//
//         'UPDATE owners SET image = "' +
//           req.file.filename +
//           '" WHERE email = "' +
//           req.file.originalname +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured', error)
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured')
//           } else {
//             console.log('Updated image.')
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/ownerimage', function (req, res) {
//   console.log('Inside Owner Image') // console.log(req.body.email);

//   let filename = null
//   let binaryData = null
//   let base64String = null

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'Select image from owners where email="' + req.body.email + '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured', error)
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log(results[0].image)
//             filename = path.resolve(
//               __dirname,
//               './public/profilepics/' + results[0].image
//             )
//             binaryData = fs.readFileSync(filename)
//             base64String = new Buffer(binaryData).toString('base64')
//             console.log('Successfully fetched data from DB') // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'image/png'
//             })
//             res.end(base64String)
//           }
//         }
//       )
//       //   console.log('base64: ' + base64String)
//     }
//   })
// })

// app.post('/ownerrestaurantname', function (req, res) {
//   console.log('Inside ownerrestaurantname Post Request') // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'UPDATE owners SET restaurant_name= "' +
//           req.body.newrestaurantname +
//           '" where email="' +
//           req.body.email +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully update data in DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end('Successfully upated restaurant name')
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/ownerrestaurantzipcode', function (req, res) {
//   console.log('ownerrestaurantzipcode') // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'UPDATE owners SET restaurant_zipcode= "' +
//           req.body.newrestaurantzipcode +
//           '" where email="' +
//           req.body.email +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully update data in DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end('Successfully upated restaurant zipcode')
//           }
//         }
//       )
//     }
//   })
// })

// app.get('/ownerprofile', function (req, res) {
//   console.log('Inside Owner Profile')

//   //   console.log(req.query.email)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'Select first_name, last_name, email,phone,restaurant_name,restaurant_zipcode, password from owners where email="' +
//           req.query.email +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully fetched data from DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results[0]))
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/updateownername', function (req, res) {
//   console.log('Inside updateusername Post Request') // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'UPDATE owners SET first_name= "' +
//           req.body.firstname +
//           '" ,last_name= "' +
//           req.body.lastname +
//           '" where email="' +
//           req.body.email +
//           '" and password="' +
//           req.body.password +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB' + error)
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully update data in DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end('Successfully upated owner first name')
//           }
//         }
//       )

//       //   'UPDATE owners SET first_name = "' +
//       //     req.body.firstname +
//       //     '", last_name="' +
//       //     req.body.lastname +
//       //     '" WHERE email = "' +
//       //     req.body.email +
//       //     '" and password="' +
//       //     req.body.password +
//       //     '";',
//       //   (error, results, fields) => {
//       //     if (error) {
//       //       console.log('Error occured', error)
//       //       res.writeHead(400, {
//       //         'Content-Type': 'text/plain'
//       //       })
//       //       res.end('Error occured')
//       //     } else {
//       //       console.log('Updated username.')
//       //       res.writeHead(200, {
//       //         'Content-Type': 'text/plain'
//       //       })
//       //       res.end('Successfully Registered')
//       //     }
//       //   }
//       // )
//     }
//   })
// })

app.post('/updateownercontact', function (req, res) {
  console.log('Inside email Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  let query = null
  let msg = null
  if (
    req.body.hasOwnProperty('newPhone') &&
    req.body.hasOwnProperty('newEmail')
  ) {
    query =
      'UPDATE owners SET phone = "' +
      req.body.newPhone +
      '", email="' +
      req.body.newEmail +
      '" WHERE email = "' +
      req.body.email +
      '" and password="' +
      req.body.password +
      '";'
    msg = 'Upated email.'
  } else if (
    !req.body.hasOwnProperty('phone') &&
    req.body.hasOwnProperty('email')
  ) {
    query =
      'UPDATE owners SET email="' +
      req.body.newEmail +
      '" WHERE email = "' +
      req.body.email +
      '" and password="' +
      req.body.password +
      '";'
    msg = 'Upated email.'
  } else if (
    req.body.hasOwnProperty('phone') &&
    req.body.hasOwnProperty('email')
  ) {
    query =
      'UPDATE owners SET phone= "' +
      req.body.newPhone +
      '" where email="' +
      req.body.email +
      '" and password="' +
      req.body.password +
      '";'
  }

  pool.getConnection((error, tempCont) => {
    if (error) {

      console.log('Error')
    } else {
      tempCont.query(query, (error, results, fields) => {
        if (error) {
          console.log('Error occured', error)
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Error occured')
        } else {
          console.log('Updated contact.')
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(msg)
        }
      })
    }
  })
})

app.post('/updateownerpassword', function (req, res) {
  console.log('Inside owner password Post Request') // console.log("Req Body : ", username + "password : ",password);
  console.log('Req Body : ', req.body)
  pool.getConnection((error, tempCont) => {
    if (error) {

      console.log('Error')
    } else {
      tempCont.query(
        'UPDATE owners SET password= "' +
        req.body.newpassword +
        '" where email="' +
        req.body.email +
        '" and password="' +
        req.body.password +
        '";',
        (error, results, fields) => {
          if (error) {
            console.log('Error occured while fetching data from DB' + error)
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end('Error occured while fetching data from DB')
          } else {
            console.log('Successfully update data in DB')
            // console.log(JSON.stringify(results[0]));
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            res.end('Successfully upated owner first name')
          }
        }
      )
    }
  })
})

// app.post('/updateownerphone', function (req, res) {
//   console.log('Inside owner phone Post Request') // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query='UPDATE owners SET phone= "' +
//   req.body.newPhone +
//   '" where email="' +
//   req.body.email +
//   '" and password="' +
//   req.body.password +
//   '";'
//   console.log(query)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         query,
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB' + error)
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully update data in DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully upated owner first name')
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/updateowneremail', function (req, res) {
//   console.log('Inside owner email Post Request') // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(
//         'UPDATE owners SET email= "' +
//           req.body.newEmail +
//           '" where email="' +
//           req.body.email +
//           '" and password="' +
//           req.body.password +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB' + error)
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully update data in DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end('Successfully upated owner email')
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/create', function (req, res) {
//   console.log('Inside Create Post Request')
//   let newBook = {
//     BookID: req.body.BookID,
//     Title: req.body.Title,
//     Author: req.body.Author
//   }
//   console.log(JSON.stringify(newBook))
//   flagDup = false
//   for (let i = 0; i < books.length; i++) {
//     if (books[i].BookID === newBook.BookID) {
//       flagDup = true
//       // break;
//     }
//   }
//   if (!flagDup) {
//     console.log('newbook:' + newBook)
//     books.push(newBook)
//     // console.log(req.body);
//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })
//     res.end(JSON.stringify(books))
//   } else {
//     res.writeHead(404, {
//       'Content-Type': 'text/plain'
//     })
//     res.end('Book already exists.')
//   }
// })

// app.post('/delete', function (req, res) {
//   console.log('Inside Delete Post Request')
//   // let newBook={"BookID" : req.body.BookID, "Title" : req.body.Title, "Author" : req.body.Author};
//   console.log(req.body.bookid)
//   flag = false
//   for (let i = 0; i < books.length; i++) {
//     console.log('Book ' + i + ': ' + books[i].BookID)
//     if (books[i].BookID === req.body.bookid) {
//       console.log('fond the book.')
//       books.splice(i, 1)
//       flag = true
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(books))
//     }
//   }
//   if (!flag) {
//     console.log('Book not fond.')
//     res.writeHead(404, {
//       'Content-Type': 'text/plain'
//     })
//     res.end('Authentication failed. Please check username and passowrd.')
//   }
// })

// Route to get All Books when user visits the Home Page
// app.get('/home', function (req, res) {
//   console.log('Inside Home Login')
//   res.writeHead(200, {
//     'Content-Type': 'application/json'
//   })
//   // console.log('Books : ', JSON.stringify(books))
//   res.end(JSON.stringify(books))
// })

// app.get('/restaurants', function (req, res) {
//   console.log('Inside restaurants:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   let query =
//     'SELECT DISTINCT restaurant_name FROM menu WHERE restaurant_zipcode="' +
//     req.query.zipcode +
//     '" and dish_name REGEXP "' +
//     req.query.dish_name +
//     '";'
//   console.log(query)
//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, result, fields) => {
//         if (error) {
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Please check the email  and password.')
//         } else {
//           console.log('result of query:', result)
//           res.cookie('cookie', result.email, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: '/'
//           })
//           req.session.result = result
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// app.get('/restaurantdetails', function (req, res) {
//   console.log('Inside restaurants details:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.details)
//   let temp = req.query.details
//   var nameArr = temp.split(',')
//   console.log(nameArr)
//   // console.log('typeof'+ typeof(temp));
//   let str = nameArr
//     .map(function (restaurant) {
//       // Wrap each element of the dates array with quotes
//       return "'" + restaurant + "'"
//     })
//     .join(',')
//   // console.log(str);

//   let query =
//     'SELECT image, sections, rating, restaurant_name, cuisine FROM owners WHERE restaurant_name in (' +
//     str +
//     ');'
//   console.log(query)
//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, result, fields) => {
//         if (error) {
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('No restaurant details found.')
//         } else {
//           console.log('result of query:', result)
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// app.get('/restaurantsections', function (req, res) {
//   console.log('Inside restaurants sections:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.restaurant_name)
//   let temp = req.query.restaurant_name
//   // console.log(str);

//   let query =
//     'select distinct(section) from menu where restaurant_name="' +
//     req.query.restaurant_name +
//     '";'
//   console.log(query)
//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, result, fields) => {
//         if (error) {
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('No restaurant details found.')
//         } else {
//           console.log('result of query:', result)
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// app.get('/sectionsmenu', function (req, res) {
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.restaurant_name)
//   let temp = req.query.restaurant_name
//   // console.log(str);

//   let query =
//     'select * from menu where restaurant_name="' +
//     req.query.restaurant_name +
//     '" and section="' +
//     req.query.section +
//     '";'
//   console.log(query)
//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, result, fields) => {
//         if (error) {
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('No restaurant details found.')
//         } else {
//           console.log('result of query:', result)
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// app.post('/userorder', function (req, res) {
//   // Object.keys(req.body).forEach(function(key){
//   //     req.body = JSON.parse(key);
//   // });
//   // var username = req.body.username;
//   // var password = req.body.password;
//   console.log('Inside user order Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   var now = new Date()

//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')

//   // var date = new Date().getDate(); //Current Date
//   //   var month = new Date().getMonth() + 1; //Current Month
//   //   var year = new Date().getFullYear();
//   //   var today= year+'-'+(month>9? '':0)+month +'-'+(date>9? '':0)+date;
//   // console.log(today.toISOString().substring(0, 10));
//   let query =
//     "INSERT INTO orders (orderlist, total, user_email, restaurant_name, order_status,created, modified ) VALUES ('" +
//     req.body.order +
//     "','" +
//     req.body.total +
//     "','" +
//     req.body.user_email +
//     "','" +
//     req.body.restaurant_name +
//     "','" +
//     'New' +
//     "','" +
//     today +
//     "','" +
//     today +
//     "');"
//   console.log(query)
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB' + error)
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('User registered sucessfully!')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Successfully Ordered')
//         }
//       })
//     }
//   })
// })

// app.get('/orderlist', function (req, res) {
//   console.log('Inside user order list:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   let query =
//     'SELECT * FROM orders WHERE ' +
//     req.query.person +
//     '="' +
//     req.query.email +
//     '" and order_status in ("Preparing", "Ready", "New");'
//   console.log(query)
//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, result, fields) => {
//         if (error) {
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Issue with the user info.')
//         } else {
//           console.log('result of query:', result)
//           req.session.result = result
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// app.get('/pastorderlist', function (req, res) {
//   console.log('Inside user order list:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   let query =
//     'SELECT * FROM orders WHERE ' +
//     req.query.person +
//     '="' +
//     req.query.email +
//     '" and order_status in ("Delivered","Cancel");'
//   console.log(query)
//   // connection.connect();
//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, result, fields) => {
//         if (error) {
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Issue with the user info.')
//         } else {
//           console.log('result of query:', result)
//           req.session.result = result
//           res.writeHead(200, {
//             'Content-Type': 'application/json'
//           })
//           console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result))
//         }
//       })
//     }
//   })
// })

// app.post('/deletedish', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query = 'Delete from menu WHERE id = "' + req.body.id + '";'

//   console.log(query)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('deleted dish from menu!')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Deleted dish from menu!')
//         }
//       })
//     }
//   })
// })

// app.post('/deletesection', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query = 'Delete from menu WHERE section = "' + req.body.section + '";'

//   console.log(query)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('deleted section from menu!')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Deleted section from menu!')
//         }
//       })
//     }
//   })
// })

// app.post('/updaterestaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')

//   console.log('Req Body : ', req.body)

//   let query =
//     'UPDATE menu SET dish_name = "' +
//     req.body.dishname +
//     '", description = "' +
//     req.body.description +
//     '", price = ' +
//     req.body.price +
//     ', section = "' +
//     req.body.section +
//     '", modified = "' +
//     today +
//     '" WHERE id = "' +
//     req.body.id +
//     '";'

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

//   console.log(query)

//   pool.getConnection((error, tempCont) => {
//     if (error) {

//       console.log('Error')
//     } else {
//       tempCont.query(query, (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while inserting data in DB')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//         } else {
//           console.log('User registered sucessfully!')
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Successfully Registered')
//         }
//       })
//     }
//   })
// })

// app.get('/menudetails', function (req, res) {
//   console.log('Inside User Profile')

//   // console.log(req.query.email)
//   pool.getConnection((error, tempCont) => {
//     if (error) {
//       tempCont.release()
//       console.log('Error')
//     } else {
//       tempCont.query(
//         'Select * from menu where id="' + req.query.id + '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//           } else {
//             console.log('Successfully fetched data from DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results[0]))
//             console.log(res.end(JSON.stringify(results[0])))
//           }
//         }
//       )
//     }
//   })
// })

const graphqlHTTP = require('express-graphql');
app.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema: schema,
  graphiql: true
}));
// start your server on port 3001
app.listen(3001)
console.log('Server Listening on port 3001')
