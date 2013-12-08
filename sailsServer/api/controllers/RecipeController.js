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
  like: function(req, res) {
    if (req.param('id'))
    {
      Recipe.findOne({id: req.param('id')}).exec(function(err, recipe){
        if (err) return res.send(err, 500);
        if (!recipe) return res.send({
          error: {
            message: "No recipe with that id"
          }
        }, 404);
        
        Vote.findOne({
          id: req.param('id'),
          userId: req.user.id
        }).done(function(err, vote) {
          if (vote === undefined) 
          {
            console.log(err);
            Vote.create({
              userId: req.user.id,
              itemId: recipe.id,
              weight: 1
            }).done(function(err, vote) {
              if (err) return res.send(err, 500);
              
              if (recipe.votes === undefined)
                recipe.votes = 1;
              else
                recipe.votes = recipe.votes + 1;
              
              recipe.save(function(err) {
                if (err) return res.send(err, 500);
                
                res.send(true);
              });
              
            });
          } 
          else 
          {
            return res.send({
              error: {
                message: "You've already liked this recipe"
              }
            });
          }
        });
        
      });
    }
  },
  
  unlike: function(req, res) {
    if (req.param('id'))
    {
      Recipe.findOne({id: req.param('id')}).exec(function(err, recipe){
        if (err) return res.send(err, 500);
        if (!recipe) return res.send({
          error: {
            message: "No recipe with that id"
          }
        }, 404);
        
       Vote.destroy({
          id: req.param('id'),
          userId: req.user.id
        }).done(function(err) {

          if (err)
            return res.send(err, 500);

          recipe.votes = recipe.votes - 1;
          
          
          recipe.save(function(err) {
            if (err) return res.send(err, 500);
            return res.send(true);
          });
          
        });
      });
    }
  },
  
  uploadImages: function(req, res) {
    var gm = require('gm');
    
    if (req.files)
    {
      for (var name in req.files) {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        var timestamp = new Date().toISOString();
        var newFileName = Math.floor((1 + Math.random()) * 0x10000).toString(16) + "_" + timestamp + ".png";
        var assetsRoot = "/srv/node/cs50_final_project/cs50-final-project-backend/sailsServer/assets/";
        var newPath = "uploads/images/" + newFileName;
        gm(req.files[name].path)
          .resize(2000)
          .noProfile()
          .write(assetsRoot + newPath, function (err) {
            if (err)
            {
                return res.send(false, 500);
            }
            
            Recipe.findOne({id: req.param('id')}).exec(function(err, recipe){
              if (err) return res.send(err, 500);
              if (!recipe) return res.send({
                error: {
                  message: "No recipe with that id"
                }
              }, 404);
              
              if (recipe.images === undefined)
                recipe.images = [];
              
              recipe.images.push({
                filename: newPath,
                createdAt: timestamp
              });
              
              recipe.save(function(err) {
                if (err) return res.send(false, 500);
                
                return res.json(recipe);
              });
            });
          });
        
        /*
        fs.readFile(req.files[name].path, function (err, data) {
          if (err)
          {
              return res.send(err, 500);
          }
          fs.writeFile(newPath, data, function (err) {
            if (err)
            {
              return res.send(err, 500);
            }
            Recipe.findOne({id: req.param('id')}).exec(function(err, recipe){
              if (err) return res.send(err, 500);
              if (!recipe) return res.send("No recipe with that id exists!", 404);
              
              if (recipe.images === undefined)
                recipe.images = [];
              
              recipe.images.push({
                filename: newPath,
                createdAt: new Date().toISOString()
              });
              
              recipe.save(function(err) {
                if (err) return res.send(err, 500);
                
                res.json(recipe);
              });
            });
          });
        });
        */
      }
    }
    else
    {
      res.json({"error": "No files uploaded"});
    }
  },
  
  addComment: function(req, res) {
    if (req.param('id') && req.param('content'))
    {
      Recipe.findOne({id: req.param('id')}).exec(function(err, recipe){
        if (err) 
          return res.send(false, 500);
        if (!recipe) 
          return res.send({
            error: {
              message: "No recipe with that id"
            }
          }, 404);
        
        if (recipe.comments === undefined)
            recipe.comments = [];
          
        var comment = {
          userId: req.user.id,
          userName: req.user.getFullName(),
          content: req.param('content'),
          createdAt: new Date().toISOString()
        };
        
        recipe.comments.push(comment);
        
        recipe.save(function(err) {
          if (err) return res.send(false, 500);
          
          res.json(recipe.comments);
        });
      });
    }
    else
    {
        res.json({"error": "You must provide content for the comment"});
    }
  },
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RecipeController)
   */
  _config: {}

  
};
