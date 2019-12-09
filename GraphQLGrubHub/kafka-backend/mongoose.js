var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Vishal:Vishal@grubhub-9ivmy.mongodb.net/grubhub?retryWrites=true&w=majority',{ useNewUrlParser: true },(err) =>{
    if (err) throw err;
    console.log("Connected to MongoDB");
});

module.exports = {mongoose};