var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri =
  'mongodb+srv://Vishal:' +
  process.env.MONGO_ATLAS_PW +
  '@grubhub-9ivmy.mongodb.net/grubhub?retryWrites=true&w=majority';
console.log(uri);
mongoose.connect('mongodb+srv://Vishal:Vishal@grubhub-9ivmy.mongodb.net/grubhub?retryWrites=true&w=majority',{ useNewUrlParser: true },(err) =>{
    if (err) throw err;
    console.log("Connected to MongoDB");
});
// mongoose.createConnection(uri, { useUnifiedTopology: true, useNewUrlParser: true,  poolSize: 4 })

module.exports = {mongoose};