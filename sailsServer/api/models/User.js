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
    firstName: {
      type: 'STRING',
      required: true
    },
    lastName: {
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
