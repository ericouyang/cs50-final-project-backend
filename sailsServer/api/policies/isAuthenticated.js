/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
 
var passport = require('passport');
 
module.exports = function(req, res, next) {
  passport.authenticate(
      'bearer', { session: false },
      function(err, user, info)
      {
          if ((err) || (!user))
          {
              res.json({
                error: {
                  message: "There was an issue with your access token"
                }
              }, 403);
              return;
          }

          req.user = user;
          return next();
      }
  )(req, res);
  
  /*
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.isAuthenticated()) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
  */
};
