const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
require('dotenv').config()

const uri =
  'mongodb+srv://Vishal:' +
  process.env.MONGO_ATLAS_PW +
  '@grubhub-9ivmy.mongodb.net/grubhub?retryWrites=true&w=majority';
let mogooseConn= ()=> {
    return (
        // mongoose.createConnection(uri, { replset: { poolSize: 4 }}))
        mongoose.connect(
      uri,
      { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true }
    ))
}

module.exports = mogooseConn;