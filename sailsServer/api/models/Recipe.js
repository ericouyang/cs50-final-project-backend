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
    tags:   'ARRAY',
    instructions: 'TEXT',
    ingredients:  'ARRAY',
    
    getVotes: function() {
      return Vote.find({
        itemId: this.id
      });
    }
  }
};
