// Importing Passport, strategies, and config
const passport = require('passport'),
      User = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

// Tell passport that we have opted to use the email field rather than the username field
const localOptions = { usernameField: 'email' };

// Setting up local login Strategy
/*
will be used to authenticate users with an email address and password. A successful local
login will yield the user a JSON Web Token to use to authenticate future requests automatically.                                                                                                                                                                                            
*/
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

      return done(null, user);
    });
  });
});

// Setting up JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setup JWT login strategy and pass our options through
// Setting up JWT login Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      doen(null, false);
    }
  });
});

// Allow passport to use the strategies we defined
passport.use(jwtLogin);
passport.use(localLogin);
