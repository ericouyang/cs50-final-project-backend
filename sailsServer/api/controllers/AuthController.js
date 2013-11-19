/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

// based on https://gist.github.com/theangryangel/5060446

var passport = require('passport');

module.exports = {
    
  login: function(req, res)
	{
	  if (!(req.param('username') && req.param('password')))
	  {
	    res.json({
			  error: "You must provide both a username and password"
			});
			return;
	  }
		passport.authenticate('local', function(err, user, info)
		{
			if (err)
			{
				res.json({
				  error: err
				});
				return;
			}
			else if (!user)
			{
			  res.json({
				  error: "Invalid credentials"
				});
				return;
			}
 
			req.logIn(user, function(err)
			{
				if (err)
				{
					res.json({
				    error: err,
				  });
					return;
				}
				
				req.session.user = user;
				res.json({
				  loggedIn: true,
				  user: user
				});
				return;
			});
		})(req, res);
	},

  logout: function (req,res)
	{
		req.logout();
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {}

  
};
