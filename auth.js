// var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;

// var auth = {
//   use: function () {
//     passport.use(new LocalStrategy(
//       function (username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//           if (err) { return done(err); }
//           if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//           }
//           if (!user.validPassword(password)) {
//             return done(null, false, { message: 'Incorrect password.' });
//           }
//           return done(null, user);
//         });
//       }
//     ));
//   },

//   serializeUser: (user) => {
//     console.log("here")
//     passport.serializeUser(function (user, done) {
//       console.log("auth")
//       done(null, user.id);
//     });
//   },

//   deserializeUser: ()=>{
//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
// }
// }

// module.exports = auth;