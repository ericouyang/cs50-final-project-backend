/**
 * Recipe
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'recipes',
  attributes: {
    userId: {
      type: 'STRING',
      required: true
    },
    name: {
      type: 'STRING',
      required: true
    },
    images: 'ARRAY',
    comments: 'ARRAY',
    tags:   'ARRAY',
    instructions: 'ARRAY',
    ingredients:  'ARRAY',
    votes: 'INTEGER',
    
    getVotes: function() {
      return Vote.find({
        itemId: this.id
      });
    },
  
    toJSON: function() {
      var obj = this.toObject();
      obj.createdAt = new Date(obj.createdAt).getTime();
      obj.updatedAt = new Date(obj.updatedAt).getTime();
      
      if ("comments" in obj)
      {
        for (var i = 0; i < obj.comments.length; i++)
        {
            obj.comments[i].createdAt = new Date(obj.comments[i].createdAt).getTime();
        }
      }
      
      return obj;
    }
  },
  
  beforeCreate: function(values, next) {
      if ("access_token" in values)
        delete values.access_token;
      if (!("comments" in values))
        values.comments = [];
      if (!("instructions" in values))
        values.instructions = [];
      if (!("ingredients" in values))
        values.ingredients = [];
      if (!("votes" in values))
        values.votes = 0;
      next();
    },
};
