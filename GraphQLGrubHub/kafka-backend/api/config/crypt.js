'use strict';
var bcrypt = require('bcrypt');

var crypt = {};
const saltRounds = 10;

crypt.createHash = function (data, successCallback, failureCallback) {
    bcrypt.hash(data, saltRounds, (err, hash) => {
    // bcrypt.genSalt(10, function (err, salt) {
        // if (err) {
        //     failureCallback(err);
        //     return;
        // }
        // bcrypt.hash(data, salt, null, function (err, hash) {
            if (err) {
                failureCallback(err);
                return;
            }
            successCallback(err, hash);
        });
    // });
};

crypt.compareHash = function (data, encrypted, successCallback, failureCallback) {
    bcrypt.compare(data, encrypted, function (err, isMatch) {
        if (err) {
            // console.log("failure while hasing")
            failureCallback(err);
            return;
        }
        successCallback(err, isMatch);
    });
};

module.exports = crypt;