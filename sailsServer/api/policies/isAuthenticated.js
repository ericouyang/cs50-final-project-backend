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
};
