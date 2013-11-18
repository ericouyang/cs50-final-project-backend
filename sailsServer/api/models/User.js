/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'users',
    attributes: {
        first_name: {
            type: 'STRING',
            required: true
        },
        last_name: {
            type: 'STRING',
            required: true
        },
        email: {
            type: 'email',
            required: true
        },
        password: {
            type: 'STRING',
            required: true
        }
    }

};
