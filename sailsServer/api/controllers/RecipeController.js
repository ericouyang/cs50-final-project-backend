/**
 * RecipeController
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

module.exports = {
  upvote: function(req, res) {
    if (req.param('id'))
    {
      Recipe.findOne({id: req.param('id')}).exec(function(err, recipe){
        if (err) return res.send(err, 500);
        if (!recipe) return res.send("No recipe with that id exists!", 404);
        
        Vote.create({
          userId: 1,
          itemId: recipe.id,
          weight: 1
        }).done(function(err, vote) {
          if (err) return res.send(err, 500);
          
          res.json(vote);
        });
      });
    }
  },
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RecipeController)
   */
  _config: {}

  
};
