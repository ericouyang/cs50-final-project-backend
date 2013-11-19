// based on http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/
var passport = require('passport');

module.exports = {
  express: {
    customMiddleware: function(app) {
      console.log('Load Express middleware for passport authentication');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
