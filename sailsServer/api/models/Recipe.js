/**
 * Recipe
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        user_id: {
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
        ingredients:  'ARRAY'
    }

};
