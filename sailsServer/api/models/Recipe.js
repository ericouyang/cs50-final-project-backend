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
    instructions: 'TEXT',
    ingredients:  'ARRAY',
    
    getVotes: function() {
      return Vote.find({
        itemId: this.id
      });
    },
    
    toJSON: function() {
      var obj = this.toObject();
      obj.createdAt = new Date(obj.createdAt).getTime();
      obj.updatedAt = new Date(obj.updatedAt).getTime();
      return obj;
    }
  }
};
