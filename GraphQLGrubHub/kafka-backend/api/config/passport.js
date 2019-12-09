'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// var db = require('../app/db');
// var config = require('./settings');

// Setup work and export for the JWT passport strategy
// module.exports = function (passport) {
//     var opts = {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: process.env.SECRET_OR_KEY
//     };
//     passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
//         db.findUser({username: jwt_payload.username}, function (res) {
//             var user = res;
//             delete user.password;
//             callback(null, user);
//         }, function (err) {
//             return callback(err, false);
//         });
//     }));
// };

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_OR_KEY
    };
    passport.use(new LocalStrategy({usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return UserModel.findOne({email, password})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));
    passport.use(new LocalStrategy({usernameField: 'email',
    passwordField: 'password'
}, function (jwt_payload, callback) {
        db.findUser({username: jwt_payload.username}, function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};
